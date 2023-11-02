import getDbClient from '../connexion.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { signToken } from '../controllers/authController.js'

// const emails = []

// const sql = `SELECT courriel FROM utilisateur`
// connection.all(sql, [], (err, rows) => {
//   console.log('yo')
//   if (err) {
//     throw err
//   }
//   console.log('row')
//   rows.forEach((row) => {
//     emails.push(row.courriel)
//   })
// })
// console.log(emails)

export const getAllUsersDb = async () => {
  const connection = await getDbClient()

  const results = await connection.all(`SELECT id_utilisateur,id_type_utilisateur,courriel,prenom,nom FROM utilisateur`)
  return results
}

export const addUserDb = async (courriel, mdp, confirmation_mdp, prenom, nom) => {
  const connection = await getDbClient()

  const emailExists = await connection.get(`SELECT id_utilisateur FROM utilisateur WHERE courriel LIKE '${courriel}'`)
  //console.log('lol', emailExists)
  if (emailExists !== undefined) throw new Error('This Email adress is already taken')
  if (mdp !== confirmation_mdp) {
    throw new Error('The passwords you entered do not match')
  }
  mdp = await bcrypt.hash(mdp, 12)
  const newUser = await connection.run(
    `INSERT INTO utilisateur(id_type_utilisateur,courriel,mot_de_passe,prenom,nom)VALUES(?,?,?,?,?)`,
    [1, courriel, mdp, prenom, nom]
  )
  const id_utilisateur = newUser.lastID
  const token = signToken(id_utilisateur)

  return [newUser, token]
}

export const deleteUserDb = async (id_utilisateur) => {
  const connection = await getDbClient()

  await connection.run(`DELETE FROM utilisateur WHERE id_utilisateur=${id_utilisateur}`)
}

export const updateUserDb = async (id_utilisateur) => {
  const connection = await getDbClient()

  await connection.get(`UPDATE utilisateur SET `)
}

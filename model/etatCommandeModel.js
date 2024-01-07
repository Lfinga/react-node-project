import getDbClient from '../connexion.js'

export const getEtatCommandeDb = async (id_utilisateur) => {
  const connection = await getDbClient()

  const etat = await connection.get(`SELECT id_etat_commande FROM etat_commande WHERE nom = "Dans le panier"`)

  const results = connection.all(
    `SELECT * FROM commande as c JOIN etat_commande as ec on c.id_etat_commande=ec.id_etat_commande 
    WHERE id_utilisateur=? AND c.id_etat_commande !=?`,
    [id_utilisateur, etat.id_etat_commande]
  )
  return results
}

export const confirmOrderDb = async (id_utilisateur) => {
  const connection = await getDbClient()

  const etat1 = await connection.get(`SELECT id_etat_commande FROM etat_commande WHERE nom = "Dans le panier"`)

  const orderId = await connection.get(
    `SELECT id_commande FROM commande WHERE id_utilisateur=? AND id_etat_commande=?`,
    [id_utilisateur, etat1.id_etat_commande]
  )
  console.log('orderID', orderId)
  const etat2 = await connection.get(`SELECT id_etat_commande FROM etat_commande WHERE nom = "En cuisine"`)
  await connection.get(`UPDATE commande SET id_etat_commande=? WHERE id_commande=?`, [
    etat2.id_etat_commande,
    orderId.id_commande,
  ])
}

export const updateEtatDb = async (id_utilisateur, id_commande, etatVoulu) => {
  const connection = await getDbClient()

  const etat = await connection.get(`SELECT id_etat_commande FROM etat_commande WHERE nom=?`, [etatVoulu])
  await connection.run(`UPDATE commande SET id_etat_commande=? WHERE id_utilisateur=? AND id_commande=? `, [
    etat.id_etat_commande,
    id_utilisateur,
    id_commande,
  ])
}

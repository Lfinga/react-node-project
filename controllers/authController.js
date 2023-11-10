import { addUserDb } from '../model/userModel.js'
import getDbClient from '../connexion.js'
import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

export const signToken = (id_utilisateur) => {
  return jwt.sign({ id_utilisateur }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

// Signup

export const userSignup = async (request, response) => {
  const { courriel, mot_de_passe, confirmation_mot_de_passe, prenom, nom } = request.body
  try {
    const [newUser, token] = await addUserDb(courriel, mot_de_passe, confirmation_mot_de_passe, prenom, nom)
    response.status(201).json({
      status: 'success',
      token,
    })
  } catch (error) {
    response.status(400).json({
      status: 'error',
      message: error.message,
    })
  }
}

// Login

export const userLogin = async (request, response) => {
  const connection = await getDbClient()

  const { courriel, mot_de_passe } = request.body

  try {
    if (!courriel || !mot_de_passe) {
      throw new Error('Please enter your Email and Password')
    }

    const currentUserMdp = await connection.get(
      `SELECT mot_de_passe FROM utilisateur WHERE courriel LIKE '${courriel}'`
    )

    if (currentUserMdp === undefined || !(await bcrypt.compare(mot_de_passe, currentUserMdp.mot_de_passe)))
      throw new Error('Email or Password incorrect')

    const userId = await connection.get(`SELECT id_utilisateur FROM utilisateur WHERE courriel LIKE '${courriel}'`)

    const token = signToken(Object.values(userId)[0])
    return response.status(200).json({
      status: 'success',
      token,
    })
  } catch (error) {
    return response.status(401).json({
      status: 'fail',
      message: error.message,
    })
  }
}

// login protection

export const protect = async (request, response, next) => {
  const connection = await getDbClient()

  let token
  if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
    token = request.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return response.status(401).json({
      status: 'fail',
      message: 'You must be logged in to do that',
    })
  }

  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return response.status(401).json({
      status: 'failed',
      message: error.message,
    })
  }

  const newUser = await connection.get(
    `SELECT * FROM utilisateur WHERE id_utilisateur LIKE '${decoded.id_utilisateur}'`
  )
  if (newUser === undefined) {
    return response.status(401).json({
      status: 'fail',
      message: 'The user user belogging to this session does no longer exist',
    })
  }

  request.user = newUser
  next()
}

// user restriction

export async function restrictTo(request, response) {
  const connection = await getDbClient()

  console.log('current userId', request.user)

  const idType = await connection.get(
    `SELECT id_type_utilisateur FROM utilisateur where id_utilisateur='${request.user.id_utilisateur}'`
  )
  if (idType.id_type_utilisateur !== 2) {
    return response.status(403).json({
      status: 'fail',
      message: 'You must be an Admin to do this action',
    })
  }
  console.log('id type ', idType)

  next()
}

export const updatePassword = async (request, response, next) => {
  const connection = await getDbClient()

  let currentUserPassword = request.user.mot_de_passe

  if (
    !request.body.mot_de_passe_actuel ||
    !(await bcrypt.compare(request.body.mot_de_passe_actuel, currentUserPassword.toString()))
  ) {
    return response.status(401).json({
      status: 'fail',
      message: 'Incorrect Password',
    })
  }
  if (request.body.nouveau_mot_de_passe !== request.body.confirmation_mot_de_passe) {
    return response.status(400).json({
      status: 'fail',
      message: 'The passwords you entered do not match',
    })
  }
  currentUserPassword = await bcrypt.hash(request.body.nouveau_mot_de_passe, 12)
  await connection.run(`UPDATE utilisateur SET mot_de_passe='${currentUserPassword}'`)
  const token = signToken(request.user.id_utilisateur)
  return response.status(200).json({
    status: 'success',
    message: 'Password updated successfully',
    token,
  })
}

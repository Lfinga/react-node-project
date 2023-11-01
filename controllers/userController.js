import { addUserDb, getAllUsersDb, deleteUserDb, updateUserDb } from '../model/userModel.js'

export const getAllUsers = async (request, response) => {
  try {
    const data = await getAllUsersDb()
    response.status(200).json(data)
  } catch (error) {
    response.sendStatus(400)
  }
}

export const addUser = async (request, response) => {
  const { id_type_utilisateur, courriel, mot_de_passe, prenom, nom } = request.body
  try {
    await addUserDb(id_type_utilisateur, courriel, mot_de_passe, prenom, nom)
    response.sendStatus(201)
  } catch (error) {
    response.sendStatus(400)
  }
}

export const deleteUser = async (request, response) => {
  try {
    await deleteUserDb(request.params.id)
    response.sendStatus(200)
  } catch (error) {
    response.sendStatus(400)
  }
}

export const updateUser = async (request, response) => {
  try {
    await updateUserDb(request.params.id)
    response.sendStatus(200)
  } catch (error) {
    response.sendStatus(400)
  }
}

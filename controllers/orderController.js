import {
  addOrderDb,
  deleteOrderDb,
  getAllOrdersDb,
  updateOrderDb,
  deleteOrderedProductDb,
  addOrderProductDb,
} from '../model/orderModel.js'

export const getAllOrders = async (request, response) => {
  try {
    let data = await getAllOrdersDb(request.user.id_utilisateur)
    response.status(200).json(data)
  } catch (error) {
    response.sendStatus(400)
  }
}

export const addOrder = async (request, response) => {
  //console.log(request.body)

  try {
    await addOrderDb(request.user.id_utilisateur, request.body.produits)
    response.sendStatus(201)
  } catch (error) {
    response.sendStatus(400)
  }
}

export const addOrderProduct = async (request, response) => {
  console.log(request.body)

  try {
    await addOrderProductDb(request.user.id_utilisateur, request.body.produit)
    response.sendStatus(201)
  } catch (error) {
    response.sendStatus(400)
  }
}

export const deleteOrder = async (request, response) => {
  try {
    await deleteOrderDb(request.user.id_utilisateur)
    response.sendStatus(204)
  } catch (error) {
    response.status(400).json({
      status: 'fail',
      message: error.messsage,
    })
  }
}

export const updateOrder = async (request, response) => {
  const { id_commande, id_produit } = request.params
  try {
    await updateOrderDb(id_commande, id_produit, request.body.quantite)
    response.sendStatus(200)
  } catch (error) {
    response.sendStatus(400)
  }
}

export const deleteOrderedProduct = async (request, response) => {
  //const { id_commande, id_produit } = request.params
  try {
    await deleteOrderedProductDb(request.user.id_utilisateur, request.params.id_produit)
    response.sendStatus(204)
  } catch (error) {
    response.sendStatus(400)
  }
}

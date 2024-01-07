import {
  deleteOrderDb,
  getProductsFromPanierDb,
  updateOrderDb,
  addProductToOrderDb,
  deleteProductFromOrderDb,
} from '../model/orderModel.js';
import { checkId } from './validation.js';

export const getProductsFromPanier = async (request, response) => {
  try {
    let data = await getProductsFromPanierDb(request.user.id_utilisateur);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({
      status: 'fail',
      message: error.messsage,
    });
  }
};

export const addProductToOrder = async (request, response) => {
  try {
    if (!checkId(request.body.id_produit)) throw new Error('id invalide');
    console.log('id_utilisateur', request.user.id_utilisateur);
    await addProductToOrderDb(request.user.id_utilisateur, request.body.id_produit);
    response.sendStatus(201);
  } catch (error) {
    response.status(400).json({
      status: 'fail',
      message: error.messsage,
    });
  }
};

export const deleteProductFromOrder = async (request, response) => {
  try {
    if (!checkId(request.params.id)) throw new Error('id invalide');

    await deleteProductFromOrderDb(request.user.id_utilisateur, request.params.id);
    response.sendStatus(204);
  } catch (error) {
    response.status(400).json({
      status: 'fail',
      message: error.messsage,
    });
  }
};

export const deleteOrder = async (request, response) => {
  try {
    await deleteOrderDb(request.user.id_utilisateur);
    response.sendStatus(204);
  } catch (error) {
    response.status(400).json({
      status: 'fail',
      message: error.messsage,
    });
  }
};

export const updateOrder = async (request, response) => {
  try {
    if (!checkId(request.params.id)) throw new Error('id invalide');

    await updateOrderDb(request.user.id_utilisateur, request.body.quantite, request.params.id);
    response.sendStatus(200);
  } catch (error) {
    response.status(400).json({
      status: 'fail',
      message: error.messsage,
    });
  }
};

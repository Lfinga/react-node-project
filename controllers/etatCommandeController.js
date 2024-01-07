import { getEtatCommandeDb, confirmOrderDb, updateEtatDb } from '../model/etatCommandeModel.js';

export const getEtatCommande = async (request, response) => {
  try {
    const data = await getEtatCommandeDb(request.user.id_utilisateur);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({
      status: 'fail',
      message: error.messsage,
    });
  }
};

export const confirmOrder = async (request, response) => {
  try {
    await confirmOrderDb(request.user.id_utilisateur);
    response.sendStatus(204);
  } catch (error) {
    response.status(400).json({
      status: 'fail',
      message: error.messsage,
    });
  }
};

export const updateEtat = async (request, response) => {
  try {
    await updateEtatDb(request.user.id_utilisateur, request.params.id, request.body.etatVoulu);
    response.sendStatus(200);
  } catch (error) {
    response.status(400).json({
      status: 'fail',
      message: error.messsage,
    });
  }
};

import { getProductsDb, addProductDb, deleteProductDb, updateProductDb } from '../model/productModel.js'

export const checkbody = (req, res, next) => {
  if (!req.body.nom || !req.body.prix) {
    return res.status(400).json({
      status: 'fail',
      message: 'you must specify a name and a price for the product',
    })
  }
  next()
}

export const getAllProducts = async (request, response) => {
  try {
    let data = await getProductsDb()
    response.status(200).json(data)
  } catch (error) {
    response.status(404).json({
      status: 'fail',
      message: error,
    })
  }
}

export const addProduct = async (request, response) => {
  try {
    await addProductDb(request.body)
    response.sendStatus(201)
  } catch (error) {
    response.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    })
  }
}

export const deleteProduct = async (request, response) => {
  try {
    await deleteProductDb(request.params.id)
    response.sendStatus(204)
  } catch (error) {
    response.status(404).json({
      status: 'fail',
      data: null,
    })
  }
}

export const updateProduct = async (request, response) => {
  try {
    await updateProductDb(request.body.nom, request.body.prix, request.params.id)
    response.sendStatus(200)
  } catch (error) {
    response.stauts(404),
      json({
        status: 'fail',
        message: error,
      })
  }
}

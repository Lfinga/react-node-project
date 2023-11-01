// Aller chercher les configurations de l'application
import 'dotenv/config'

// Importer les fichiers et librairies
import express, { json } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import cspOption from './csp-options.js'
import fs from 'fs'
import morgan from 'morgan'
import { engine } from 'express-handlebars'

import {
  getAllOrders,
  deleteOrder,
  updateOrder,
  addOrder,
  deleteOrderedProduct,
  addOrderProduct,
  getOrderedProducts,
} from './controllers/orderController.js'
import { getAllProducts, addProduct, deleteProduct, updateProduct, checkbody } from './controllers/productController.js'
import { getAllUsers, addUser, deleteUser, updateUser } from './controllers/userController.js'
import { userSignup, userLogin, protect, restrictTo, updatePassword } from './controllers/authController.js'
import { getProductsDb } from './model/productModel.js'

// Création du serveur
const app = express()
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

// Ajout de middlewares
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
)
app.use(compression())
app.use(cors())
app.use(json())
app.use(morgan('dev'))
app.use(express.static('public'))

// Routes

app.get('/', async (request, response) => {
  const products = await getProductsDb()

  response.render('home', {
    titre: 'Produits',
    produits: products,
  })
})

// authentification
app.post('/api/users/signup', userSignup)
app.post('/api/users/Login', userLogin)
app.post('/api/users/passwordUpdate', protect, updatePassword)

// produits
app.route('/api').get(getAllProducts).post(checkbody, protect, restrictTo, addProduct)
//app.route('/api/:id').delete(protect, restrictTo, deleteProduct).patch(protect, restrictTo, updateProduct)

// commandes
app.route('/api/commande').get(protect, getOrderedProducts).delete(protect, deleteOrder).post(protect, addOrderProduct)
app.route('/api/commande/:id').post(protect, addOrder)
app.route('/api/commande/:id_produit').delete(protect, deleteOrderedProduct).patch(protect, updateOrder)

// etat commande
app.route('/api/etatCommande').get((request, response) => {
  response.sendStatus(200)
})

// utilisateurs
app.route('/api/users').get(protect, getAllUsers).post(addUser)
app.route('/api/users/:id').delete(deleteUser).patch(updateUser)

// Renvoyer une erreur 404 pour les routes non définies
app.use(function (request, response) {
  // Renvoyer simplement une chaîne de caractère indiquant que la page n'existe pas
  response.status(404).send(request.originalUrl + ' not found.')
})

// Démarrage du serveur
app.listen(process.env.PORT)
console.info(`Serveurs démarré:`)
console.info(`http://localhost:${process.env.PORT}`)

// Aller chercher les configurations de l'application
import 'dotenv/config';

// Importer les fichiers et librairies
import express, { json } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cspOption from './csp-options.js';
import fs from 'fs';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import getDbClient from './connexion.js';

import {
  addProductToOrder,
  deleteOrder,
  deleteProductFromOrder,
  getProductsFromPanier,
  updateOrder,
} from './controllers/orderController.js';
import { getAllProducts } from './controllers/productController.js';
import { getAllUsers, addUser, deleteUser, updateUser } from './controllers/userController.js';
import {
  userSignup,
  userLogin,
  protect,
  restrictTo,
  updatePassword,
  isLoggedIn,
  userLogout,
} from './controllers/authController.js';
import { getProductsDb } from './model/productModel.js';
import { confirmOrder, getEtatCommande, updateEtat } from './controllers/etatCommandeController.js';
import cookieParser from 'cookie-parser';
import { getCheckoutSession } from './controllers/bookingController.js';

// Création du serveur
const app = express();

// Ajout de middlewares
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(compression());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(json());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(cookieParser());

// Routes

// produits
app.route('/api/produits').get(getAllProducts);

// commandes
app
  .route('/api/commande')
  .get(protect, getProductsFromPanier)
  .delete(protect, deleteOrder)
  .post(protect, addProductToOrder);
app.route('/api/commande/:id').delete(protect, deleteProductFromOrder).patch(protect, updateOrder);

// etat commande
app.route('/api/etatCommande').get(protect, getEtatCommande).post(protect, confirmOrder);
app.route('/api/etatCommande/:id').patch(protect, updateEtat);

// utilisateurs
app.route('/api/users').get(protect, getAllUsers).post(addUser);
app.route('/api/users/:id').delete(deleteUser).patch(updateUser);

// authentification
app.post('/api/users/signup', userSignup);
app.post('/api/users/login', userLogin);
app.get('/api/users/logout', userLogout);
app.get('/api/users/me', isLoggedIn);

app.patch('/api/users/passwordUpdate', protect, updatePassword);

app.get('api/bookings/checkout-session/:orderId', protect, getCheckoutSession);

// .post(checkbody, protect, restrictTo, addProduct)
// app.route('/api/:id').delete(protect, restrictTo, deleteProduct).patch(protect, restrictTo, updateProduct)

// Renvoyer une erreur 404 pour les routes non définies
app.use(function (request, response) {
  // Renvoyer simplement une chaîne de caractère indiquant que la page n'existe pas
  response.status(404).send(request.originalUrl + ' not found.');
});

// Démarrage du serveur
app.listen(process.env.PORT);
console.info(`Serveurs démarré:`);
console.info(`http://localhost:${process.env.PORT}`);

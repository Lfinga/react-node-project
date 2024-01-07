import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import Commande from './routes/commande.jsx';
import Compte from './routes/compte.jsx';
import EtatCommande from './routes/etatCommande.jsx';
import Login from './routes/login.jsx';
import Produits from './routes/produits.jsx';
import Root from './routes/root.jsx';
import Signup from './routes/Signup.jsx';
import LoginContextProvider from './context/AuthContextProvider.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/commande',
    element: <Commande />,
  },
  {
    path: '/Menu',
    element: <Produits />,
  },
  {
    path: '/etatCommande',
    element: <EtatCommande />,
  },
  {
    path: '/Signup',
    element: <Signup />,
  },
  {
    path: '/Login',
    element: <Login />,
  },
  {
    path: '/Compte',
    element: <Compte />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginContextProvider>
      <RouterProvider router={router} />
    </LoginContextProvider>
  </React.StrictMode>
);

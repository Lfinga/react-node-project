import { HOST } from './constants';
import { customFetch } from './utils';

export const fetchOrderedProducts = async () => {
  const response = await customFetch(`${HOST}/commande`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'text/html',
    },
  });
  const data = await response.json();
  return data;
};

export const fetchOrderDelete = async () => {
  const response = await fetch(`${HOST}/commande`, {
    credentials: 'include',
    method: 'DELETE',
  });
};

export const fetchConfirmOrder = async () => {
  const response = await fetch(`${HOST}/etatCommande`, {
    credentials: 'include',
    method: 'POST',
  });
};

export const fetchDeleteProduct = async (id_product) => {
  const response = await fetch(`${HOST}/commande/${id_product}`, {
    credentials: 'include',
    method: 'DELETE',
  });
};

export const fetchOrders = async () => {
  const response = await fetch(`${HOST}/etatCommande`, {
    credentials: 'include',
  });
  const data = await response.json();
  return data;
};

export async function updateOrder(quantite, id_produit) {
  await fetch(`${HOST}/commande/${id_produit}`, {
    credentials: 'include',
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quantite: quantite,
    }),
  });
}

export async function addProductToOrder(id_produit) {
  await fetch(`${HOST}/commande`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id_produit,
    }),
  });
}

export const fetchProducts = async () => {
  const response = await fetch(`${HOST}/produits`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export async function userSignup(nom, prenom, email, password, passwordConfirm) {
  const response = await fetch(`${HOST}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nom: nom,
      prenom: prenom,
      courriel: email,
      mot_de_passe: password,
      confirmation_mot_de_passe: passwordConfirm,
    }),
  });

  return response;
}

export async function loginUser(email, password) {
  const response = await fetch(`${HOST}/users/login`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      courriel: email,
      mot_de_passe: password,
    }),
  });
  return response;
}

export async function logoutUser() {
  const response = await fetch(`${HOST}/users/logout`, {
    credentials: 'include',
  });
  return response;
}
// export function getCookie(cname) {
//   let name = cname + '=';
//   let decodedCookie = decodeURIComponent(document.cookie);
//   let ca = decodedCookie.split(';');
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return '';
// }

export async function fetchAuthentication() {
  const result = await fetch(`${HOST}/users/me`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = await result.json();
  return response;
}

export async function fetchCheckout(orderId) {
  const result = await fetch(`${HOST}/bookings/checkout-session/${orderId}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result;
}

export async function fetchPasswordChange(currentPassword, newPassword, passwordConfirm) {
  const result = await fetch(`${HOST}/users/passwordUpdate`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mot_de_passe_actuel: currentPassword,
      nouveau_mot_de_passe: newPassword,
      confirmation_mot_de_passe: passwordConfirm,
    }),
  });
  return result;
}

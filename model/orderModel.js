import getDbClient from '../connexion.js';

// Attendre que la connexion à la base de données
// soit établie
let connection = await getDbClient();

const etat = await connection.get(`SELECT id_etat_commande FROM etat_commande WHERE nom = "Dans le panier"`);

export const getProductsFromPanierDb = async (id_utilisateur) => {
  let connection = await getDbClient();

  const hasAnOrder = await connection.get(
    `SELECT id_commande FROM commande WHERE id_utilisateur =? AND id_etat_commande=?`,
    [id_utilisateur, etat.id_etat_commande]
  );

  if (hasAnOrder === undefined) return [];
  const productIds = await connection.all(`SELECT id_produit FROM commande_produit WHERE id_commande=?`, [
    hasAnOrder.id_commande,
  ]);
  if (productIds === undefined) return [];

  let myProducts = [];
  for (const id_produit of productIds) {
    const myProduct = await connection.get(
      `SELECT * FROM produit as p  JOIN commande_produit as cp ON (p.id_produit=cp.id_produit AND cp.id_commande=?) 
      WHERE p.id_produit=?`,
      [hasAnOrder.id_commande, id_produit.id_produit]
    );
    myProducts.push(myProduct);
  }
  return myProducts;
};

export const addProductToOrderDb = async (id_utilisateur, id_produit) => {
  let connection = await getDbClient();

  const commande = await connection.get(
    `SELECT id_commande FROM commande WHERE id_utilisateur =? AND id_etat_commande=?`,
    [id_utilisateur, etat.id_etat_commande]
  );
  const prix = await connection.get(`SELECT prix FROM produit WHERE id_produit=?`, [id_produit]);

  if (commande === undefined) {
    const results = await connection.run(
      `INSERT INTO commande(id_etat_commande,id_utilisateur,
        date
        )
        VALUES (?,?,?)`,
      [etat.id_etat_commande, id_utilisateur, Date.now()]
    );

    const id_commande = results.lastID;
    await connection.run(
      `INSERT INTO commande_produit(id_commande, id_produit, quantite)
            VALUES(?, ?, ?)`,
      [id_commande, id_produit, 1]
    );
  } else {
    const hasAProduct = await connection.get(
      `SELECT id_produit FROM commande_produit WHERE id_produit=? and id_commande=?`,
      [id_produit, commande.id_commande]
    );

    if (hasAProduct === undefined) {
      await connection.run(
        `INSERT INTO commande_produit(id_commande, id_produit, quantite)
          VALUES(?, ?, ?)`,
        [commande.id_commande, id_produit, 1]
      );
    } else {
      await connection.get(`UPDATE commande_produit SET quantite = quantite+1 WHERE id_produit=? `, [id_produit]);
    }
  }
};

export const deleteProductFromOrderDb = async (id_utilisateur, id_produit) => {
  let connection = await getDbClient();

  const commande = await connection.get(
    `SELECT id_commande FROM commande WHERE id_utilisateur=? AND id_etat_commande=?`,
    [id_utilisateur, etat.id_etat_commande]
  );

  await connection.run(`DELETE FROM commande_produit WHERE id_commande=? and id_produit=?`, [
    commande.id_commande,
    id_produit,
  ]);
};

export const deleteOrderDb = async (id_utilisateur) => {
  let connection = await getDbClient();

  await connection.run(`DELETE FROM commande WHERE id_etat_commande=? AND id_utilisateur=?;`, [
    etat.id_etat_commande,
    id_utilisateur,
  ]);
};
export const updateOrderDb = async (id_utilisateur, quantite, id_produit) => {
  let connection = await getDbClient();
  console.log('db qty', quantite, id_utilisateur, id_produit);

  const commande = await connection.get(
    `SELECT id_commande FROM commande WHERE id_utilisateur=? AND id_etat_commande=?`,
    [id_utilisateur, etat.id_etat_commande]
  );

  const results = await connection.get(`UPDATE commande_produit SET quantite=? WHERE id_commande=? AND id_produit=?;`, [
    quantite,
    commande.id_commande,
    id_produit,
  ]);

  return results;
};

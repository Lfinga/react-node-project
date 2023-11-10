import getDbClient from '../connexion.js'

// Attendre que la connexion à la base de données
// soit établie

export const getProductsDb = async () => {
  let connection = await getDbClient()

  // Envoyer une requête à la base de données
  return connection.all(`SELECT * FROM produit`)
}

export const addProductDb = async (product) => {
  let connection = await getDbClient()

  const results = await connection.run(
    `INSERT INTO produit(
    nom,
    prix)
  VALUES(?,?)`,
    [product.nom, product.prix]
  )
}

export const deleteProductDb = async (productId) => {
  let connection = await getDbClient()

  const results = await connection.run(`DELETE FROM produit WHERE id_produit = ${productId}`)
}

export const updateProductDb = async (nom, prix, productId) => {
  let connection = await getDbClient()

  const results = await connection.get(
    `UPDATE produit
  SET nom=?, prix=? WHERE id_produit=?`,
    [nom, prix, productId]
  )
  return results
}

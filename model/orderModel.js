import getDbClient from '../connexion.js'

// Attendre que la connexion à la base de données
// soit établie

export const getAllOrdersDb = async (id_utilisateur) => {
  const connection = await getDbClient()

  console.log('userId', id_utilisateur)
  const results = await connection.all(
    `SELECT * FROM commande as c JOIN commande_produit as cp ON c.id_commande=cp.id_commande 
    WHERE id_utilisateur=${id_utilisateur} `
  )

  if (results.length === 0) return []
  const uniqueOrders = {}
  const uniqueOrderIds = Array.from(new Set(results.map((r) => r.id_commande)))
  uniqueOrderIds.forEach((id) => (uniqueOrders[id] = {}))

  // loop over results, then for each orderId add it to the correct uniqueKey object
  for (const result of results) {
    const orderId = result.id_commande
    if ('id_commande' in uniqueOrders[orderId] === false) {
      uniqueOrders[orderId] = {
        id_commande: result.id_commande,
        id_utilisateur: result.id_utilisateur,
        id_etat_commande: result.id_etat_commande,
        date: result.date,
        produits: [],
      }
    }

    uniqueOrders[orderId].produits.push({
      id: result.id_produit,
      quantite: result.quantite,
    })
  }

  return uniqueOrderIds.map((id) => uniqueOrders[id])
}

//TODO:
export const getOrderProductsDb = async (id_utilisateur) => {
  const connection = await getDbClient()

  const etat = await connection.get(`SELECT id_etat_commande FROM etat_commande WHERE nom = "Dans le panier"`)

  const hasAnOrder = await connection.get(
    `SELECT id_commande FROM commande WHERE id_utilisateur =? AND id_etat_commande=?`,
    [id_utilisateur, etat.id_etat_commande]
  )
  console.log(hasAnOrder)

  if (hasAnOrder === undefined) return []
  const productIds = await connection.all(`SELECT id_produit FROM commande_produit WHERE id_commande=?`, [
    hasAnOrder.id_commande,
  ])
  if (productIds === undefined) return []
  console.log('productsIds', productIds)

  let myProducts = []
  for (const productId of productIds) {
    const myProduct = await connection.get(
      `SELECT * FROM produit as p  JOIN commande_produit as cp ON p.id_produit=cp.id_produit 
      WHERE p.id_produit=?`,
      [productId.id_produit]
    )
    console.log('product')
    myProducts.push(myProduct)
  }
  return myProducts
}

export const addOrderDb = async (id_utilisateur, produits) => {
  const connection = await getDbClient()

  const etat = await connection.get(`SELECT id_etat_commande FROM etat_commande WHERE nom = "Dans le panier"`)
  const hasAnOrder = await connection.get(`SELECT id_commande FROM commande WHERE id_utilisateur =?`, [id_utilisateur])
  console.log('hasAnOrder', hasAnOrder)
  if (hasAnOrder === undefined) {
    const results = await connection.run(
      `INSERT INTO commande(id_etat_commande,id_utilisateur,
      date
      )
      VALUES (?,?,?)`,
      [etat.id_etat_commande, id_utilisateur, Date.now()]
    )

    const id_commande = results.lastID
    for (const produit of produits) {
      await connection.run(
        `INSERT INTO commande_produit(id_commande, id_produit, quantite)
            VALUES(?, ?, ?)`,
        [id_commande, produit.id, produit.quantite]
      )
    }
  } else {
    //TODO : au moment dajouter des produits pour le meme utilisateur,
    //juste augmenter la quantite des produits deja existants ne peut pas creer un nouveau
    // produit avec la meme id car la paire (id_commande,id_produit est une PK)
    for (const produit of produits) {
      console.log('produit', produit)
      const hasAProduct = await connection.get(`SELECT id_produit FROM commande_produit WHERE id_produit=?`, [
        produit.id,
      ])
      console.log('hasproduct', hasAProduct)
      if (hasAProduct === undefined) {
        console.log('produit', produit)
        await connection.run(
          `INSERT INTO commande_produit(id_commande, id_produit, quantite)
          VALUES(?, ?, ?)`,
          [hasAnOrder.id_commande, produit.id, produit.quantite]
        )
      } else {
        console.log('here')
        await connection.get(
          `UPDATE commande_produit SET quantite = quantite+${produit.quantite} WHERE id_produit=? `,
          [produit.id]
        )
      }
    }
    console.log('hasAnOrder', hasAnOrder.id_commande)
  }
}

export const addOrderProductDb = async (id_utilisateur, produit) => {
  const connection = await getDbClient()

  const etat = await connection.get(`SELECT id_etat_commande FROM etat_commande WHERE nom = "Dans le panier"`)
  const hasAnOrder = await connection.get(
    `SELECT id_commande FROM commande WHERE id_utilisateur =? AND id_etat_commande=?`,
    [id_utilisateur, etat.id_etat_commande]
  )
  console.log('hasAnOrder', hasAnOrder)
  if (hasAnOrder === undefined) {
    const results = await connection.run(
      `INSERT INTO commande(id_etat_commande,id_utilisateur,
      date
      )
      VALUES (?,?,?)`,
      [etat.id_etat_commande, id_utilisateur, Date.now()]
    )

    const id_commande = results.lastID
    await connection.run(
      `INSERT INTO commande_produit(id_commande, id_produit, quantite)
            VALUES(?, ?, ?)`,
      [id_commande, produit.id, produit.quantite]
    )
  } else {
    console.log('produit', produit)
    const hasAProduct = await connection.get(
      `SELECT id_produit FROM commande_produit WHERE id_produit=? and id_commande=?`,
      [produit.id, hasAnOrder.id_commande]
    )
    // console.log('hasproduct', hasAProduct)
    if (hasAProduct === undefined) {
      console.log('produit', produit)
      await connection.run(
        `INSERT INTO commande_produit(id_commande, id_produit, quantite)
          VALUES(?, ?, ?)`,
        [hasAnOrder.id_commande, produit.id, produit.quantite]
      )
    } else {
      console.log('here')
      await connection.get(`UPDATE commande_produit SET quantite = quantite+${produit.quantite} WHERE id_produit=? `, [
        produit.id,
      ])
    }

    console.log('hasAnOrder', hasAnOrder.id_commande)
  }
}

export const deleteOrderDb = async (userId) => {
  const connection = await getDbClient()
  const etat = await connection.get(`SELECT id_etat_commande FROM etat_commande WHERE nom = "Dans le panier"`)

  // const order = await connection.get(`SELECT id_commande FROM commande WHERE id_utilisateur=? and id_etat_commande=?`, [
  //   userId,
  //   etat.id_etat_commande,
  // ])

  await connection.run(`DELETE FROM commande WHERE id_etat_commande=? AND id_utilisateur=?;`, [
    etat.id_etat_commande,
    userId,
  ])
}

export const updateOrderDb = async (id_commande, id_produit, quantite) => {
  const connection = await getDbClient()

  const results = await connection.get(
    `UPDATE commande_produit SET quantite=? WHERE (id_commande=? AND id_produit=?);`,
    [quantite, id_commande, id_produit]
  )

  return results
}

export const deleteOrderedProductDb = async (userId, productId) => {
  const connection = await getDbClient()
  const etat = await connection.get(`SELECT id_etat_commande FROM etat_commande WHERE nom = "Dans le panier"`)

  const orderId = await connection.get(
    `SELECT id_commande FROM commande WHERE id_utilisateur=? AND id_etat_commande=?`,
    [userId, etat.id_etat_commande]
  )
  console.log('orderId', orderId)
  const deletedProduct = await connection.run(`DELETE FROM commande_produit WHERE id_commande=? and id_produit=?`, [
    orderId.id_commande,
    productId,
  ])
  console.log('just deleted', deletedProduct)
}

export const confirmOrderDb = async (id_utilisateur) => {
  const connection = await getDbClient()
  const etat1 = await connection.get(`SELECT id_etat_commande FROM etat_commande WHERE nom = "Dans le panier"`)

  const orderId = await connection.get(
    `SELECT id_commande FROM commande WHERE id_utilisateur=? AND id_etat_commande=?`,
    [id_utilisateur, etat1.id_etat_commande]
  )
  console.log('orderID', orderId)
  const etat2 = await connection.get(`SELECT id_etat_commande FROM etat_commande WHERE nom = "En cuisine"`)
  const updatedState = await connection.get(`UPDATE commande SET id_etat_commande=? WHERE id_commande=?`, [
    etat2.id_etat_commande,
    orderId.id_commande,
  ])
}

export const getEtatCommandeDb = async (id_utilisateur) => {
  const connection = await getDbClient()

  const etat = await connection.get(`SELECT id_etat_commande FROM etat_commande WHERE nom = "Dans le panier"`)

  const activeOrders = await connection.all(
    `SELECT id_commande FROM commande WHERE id_utilisateur =? AND id_etat_commande!=?`,
    [id_utilisateur, etat.id_etat_commande]
  )
  console.log(activeOrders)

  if (activeOrders === undefined) return []
  //TODO: boucle pour trouver les produits de chaque commande
  let myOrders = []
  for (const order of activeOrders) {
    const productId = await connection.all(
      `SELECT cp.id_commande,cp.id_produit,c.id_etat_commande,cp.quantite,prix,c.date FROM produit as p JOIN commande_produit as cp 
      on cp.id_produit = p.id_produit  JOIN commande as c on c.id_commande=cp.id_commande WHERE cp.id_commande=?`,
      [order.id_commande]
    )
    myOrders.push(productId)
  }

  return myOrders
}

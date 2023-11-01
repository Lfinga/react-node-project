import connectionPromise from '../connexion.js'

// Attendre que la connexion à la base de données
// soit établie

const connection = await connectionPromise

export const getAllOrdersDb = async (id_utilisateur) => {
  const results = await connection.all(
    `SELECT * FROM commande as c JOIN commande_produit as cp ON c.id_commande=cp.id_commande WHERE id_utilisateur=${id_utilisateur} `
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

export const addOrderDb = async (id_utilisateur, produits) => {
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

export const deleteOrderDb = async (orderId) => {
  await connection.run(`DELETE FROM commande WHERE id_commande =?;`, [orderId])
}

export const updateOrderDb = async (id_commande, id_produit, quantite) => {
  const results = await connection.get(
    `UPDATE commande_produit SET quantite=? WHERE (id_commande=? AND id_produit=?);`,
    [quantite, id_commande, id_produit]
  )

  return results
}

export const deleteOrderedProductDb = async (userId, productId) => {
  const orderId = await connection.get(`SELECT id_commande FROM commande WHERE id_utilisateur=?`, [userId])
  console.log('orderId', orderId)
  await connection.run(`DELETE FROM commande_produit WHERE id_commande=? and id_produit=?`, [
    orderId.id_commande,
    productId,
  ])
}

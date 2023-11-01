const HOST = 'http://127.0.0.1:5000'

const getProductsServer = async () => {
  const response = await fetch(`${HOST}/api`)
  const products = await response.json()
  console.log('response', products)
  return products
}

const addOrderServer = async (date, produits) => {
  await fetch(`${HOST}/api/commande`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: date,
      produits: produits,
    }),
  })
}

//getProductsServer()
document.querySelectorAll('.btn-addtocart').forEach((item) => {
  item.addEventListener('click', async (e) => {
    const produits = await getProductsServer()
    console.log('produits', produits, e.target.id, typeof e.target.id)
    const produit = produits.filter((p) => p.id_produit === +e.target.id)
    console.log('ptodduit', produit)
    addOrderServer(Date.now(), [{ id: produit[0].id_produit, quantite: 1 }])
  })
})

const HOST = 'http://127.0.0.1:5000'

const getProductsServer = async () => {
  const response = await fetch(`${HOST}/api`)
  const products = await response.json()
  console.log('response', products)
  return products
}

const addOrderServer = async (produit) => {
  await fetch(`${HOST}/api/commande`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91dGlsaXNhdGV1ciI6MiwiaWF0IjoxNjk5NjAyNTgwLCJleHAiOjE3MDczNzg1ODB9.3XPPrRp3a30nJgyk3hBWkTpgCn9-t54T2MxbUkZ4QII',
    },
    body: JSON.stringify({
      produit: produit,
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
    addOrderServer({ id: produit[0].id_produit, quantite: 1 })
  })
})

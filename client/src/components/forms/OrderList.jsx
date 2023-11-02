import { useState } from 'react'
import { OrderItem } from './OrderItem'
import { HOST } from '../../constants'

export function OrderList({ orderedProducts }) {
  async function fetchDeleteProduct(id_product) {
    //console.log(id_product)
    const response = await fetch(`${HOST}/commande/${id_product}`, {
      method: 'DELETE',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91dGlsaXNhdGV1ciI6MiwiaWF0IjoxNjk4Nzk2NTA1LCJleHAiOjE3MDY1NzI1MDV9.DtxZWl0nQ9VqqiyNGXgUY9QH-Yzqi0ml4MVojntxnTI',
      },
    })

    setMyProducts(myProducts.filter((p) => p.id_produit !== id_product))
  }

  const [myProducts, setMyProducts] = useState(orderedProducts)
  // const myOrder = orders[0]
  if (!orderedProducts) return []
  console.log('orderedProduts', orderedProducts)
  return orderedProducts.map((product) => {
    return (
      <div key={product.id_produit} className='product-container'>
        <OrderItem name={product.nom} price={product.prix} quantite={product.quantite} imgPath={product.chemin_image} />
        <button onClick={() => fetchDeleteProduct(product.id_produit)} className='deleteOrder'>
          X
        </button>
      </div>
    )
  })
}

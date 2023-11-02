import { HOST } from '../../constants'
import { fetchOrderedProducts } from '../../services'
import { OrderItem } from './OrderItem'

export function OrderList({ orderedProducts, setOrders }) {
  async function fetchDeleteProduct(id_product) {
    await fetch(`${HOST}/commande/${id_product}`, {
      method: 'DELETE',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91dGlsaXNhdGV1ciI6MiwiaWF0IjoxNjk4Nzk2NTA1LCJleHAiOjE3MDY1NzI1MDV9.DtxZWl0nQ9VqqiyNGXgUY9QH-Yzqi0ml4MVojntxnTI',
      },
    })

    const products = await fetchOrderedProducts()

    setOrders(products)
  }

  if (!orderedProducts) return []
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

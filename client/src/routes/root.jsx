import { useEffect, useState } from 'react'
import { OrderProductList } from '../components/forms/OrderProductList'

import { fetchOrderedProducts, fetchConfirmOrder, fetchOrderDelete } from '../services'
//TODO : delete element when deleting product from DB
//      delete order when you delete last product of that order
//      add delete order button

export default function Root() {
  const [orderedProducts, setOrders] = useState([])

  let totalPrice = 0
  for (const product of orderedProducts) {
    totalPrice += product.prix * product.quantite
  }

  useEffect(() => {
    async function wrapFetch() {
      const myOrderedProducts = await fetchOrderedProducts()

      setOrders(myOrderedProducts)
    }
    wrapFetch()
  }, [])

  const deleteCommand = async () => {
    await fetchOrderDelete()
    const products = await fetchOrderedProducts()
    setOrders(products)
  }

  const confirmCommand = async () => {
    await fetchConfirmOrder()
    setOrders([])
  }
  console.log('myorder', orderedProducts)
  return (
    <>
      <header className='header'>
        <h1 className='titre'>Aldente Restaurant</h1>
        <nav>
          <a href='/'>Accueil</a>
          <a href=''>Menu</a>
          <a id='22' className='test' href=''>
            A propos
          </a>
          <a href=''></a>
          <a href='etatCommande'>Etat de ma commande</a>
          <a id='topMenu' href=''>
            Connexion
          </a>
          <a className='topMenu' href='maCommande.html'>
            Ma commande
          </a>
        </nav>
      </header>
      <div id='page-container'>
        <h1 style={{ textAlign: 'center' }}>Ma commande</h1>
        <div className='order-container'>
          {orderedProducts && <OrderProductList setOrders={setOrders} orderedProducts={orderedProducts} />}
          {orderedProducts.length > 0 && (
            <>
              <p className='total-price'>Total : ${totalPrice}</p>
              <div className='order-btns'>
                <button className='delete-order-btn' onClick={deleteCommand}>
                  Supprimer la commande
                </button>
                <button className='confirm-order-btn' onClick={confirmCommand}>
                  confirmer la commande
                </button>
              </div>
            </>
          )}
        </div>

        <footer className='footer'>
          <p>Copyright &copy 2023</p>
          <p></p>
        </footer>
      </div>
    </>
  )
}

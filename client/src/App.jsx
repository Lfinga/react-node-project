import { useEffect, useState } from 'react'
import { OrderList } from './components/forms/OrderList'

import { fetchOrderedProducts, fetchConfirmOrder, fetchOrderDelete } from './services'
//TODO : delete element when deleting product from DB
//      delete order when you delete last product of that order
//      add delete order button

function App() {
  const [orderedProducts, setOrders] = useState([])

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
          <a href='index.html'>Accueil</a>
          <a href=''>Menu</a>
          <a id='22' className='test' href=''>
            A propos
          </a>
          <a href=''></a>
          <a href='etatCommande.html'>Etat de ma commande</a>
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
          {orderedProducts && <OrderList setOrders={setOrders} orderedProducts={orderedProducts} />}
          {orderedProducts.length > 0 && (
            <div className='order-btns'>
              <button className='delete-order-btn' onClick={deleteCommand}>
                Supprimer la commande
              </button>
              <button className='confirm-order-btn' onClick={confirmCommand}>
                confirmer la commande
              </button>
            </div>
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

export default App

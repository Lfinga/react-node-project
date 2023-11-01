import { OrderItem } from './components/forms/OrderItem'
import { OrderList } from './components/forms/OrderList'
import { useEffect, useState } from 'react'
import { HOST } from './constants'

const fetchOrderedProducts = async () => {
  const response = await fetch(`${HOST}/commande`, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91dGlsaXNhdGV1ciI6MiwiaWF0IjoxNjk4Nzk2NTA1LCJleHAiOjE3MDY1NzI1MDV9.DtxZWl0nQ9VqqiyNGXgUY9QH-Yzqi0ml4MVojntxnTI',
    },
  })
  const data = await response.json()
  return data
}
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

        {orderedProducts && <OrderList orderedProducts={orderedProducts} />}

        <footer className='footer'>
          <p>Copyright &copy 2023</p>
          <p></p>
        </footer>
      </div>
    </>
  )
}

export default App

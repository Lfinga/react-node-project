import { OrderItem } from './components/forms/OrderItem'
import { OrderList } from './components/forms/OrderList'
import { useEffect, useState } from 'react'
import { HOST } from './constants'

const fetchOrders = async () => {
  const response = await fetch(`${HOST}/commande`, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91dGlsaXNhdGV1ciI6MiwiaWF0IjoxNjk4Nzk2NTA1LCJleHAiOjE3MDY1NzI1MDV9.DtxZWl0nQ9VqqiyNGXgUY9QH-Yzqi0ml4MVojntxnTI',
    },
  })
  const data = await response.json()
  return data
}
const fetchProducts = async () => {
  const response = await fetch(`${HOST}/`)
  const data = await response.json()
  return data
}

function App() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function wrapFetchAll() {
      const myOrders = await fetchOrders()
      const myProducts = await fetchProducts()
      setOrders(myOrders)
      setProducts(myProducts)
    }
    wrapFetchAll()
  }, [])

  // useEffect(() => {
  //   async function wrapfetchProducts() {
  //   }
  //   wrapfetchProducts()
  // }, [])

  // console.log('orders', orders)
  // console.log('products', products)

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

        {orders && products && <OrderList products={products} orders={orders} />}

        <footer className='footer'>
          <p>Copyright &copy 2023</p>
          <p></p>
        </footer>
      </div>
    </>
  )
}

export default App

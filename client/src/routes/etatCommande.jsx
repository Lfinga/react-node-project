import { useEffect, useState } from 'react'
import { OrderList } from '../components/forms/OrderList'
import { fetchOrders } from '../services'

export default function EtatCommande() {
  const [orderStatus, setOrderStatus] = useState([])
  useEffect(() => {
    const getOrderStatus = async () => {
      const myOrders = await fetchOrders()
      console.log('nyOrders', myOrders)
      setOrderStatus(myOrders)
    }
    getOrderStatus()
  }, [])

  console.log(orderStatus)
  return (
    <>
      <header className='header'>
        <h1 className='titre'>Aldente Restaurant</h1>
        <nav>
          <a href='/'>Accueil </a>
          <a href=''>|Menu </a>
          <a id='22' className='test' href=''>
            |A propos
          </a>
          <a href='etatCommande'> |Etat de ma commande </a>
          <a id='topMenu' href=''>
            |Connexion
          </a>
          <a className='topMenu' href='maCommande.html'>
            |Ma commande
          </a>
        </nav>
      </header>
      <div id='page-container'>
        {orderStatus.length > 0 && <OrderList orderStatus={orderStatus} />}
        <footer className='footer'>
          <p>Copyright &copy 2023</p>
          <p></p>
        </footer>
      </div>
    </>
  )
}

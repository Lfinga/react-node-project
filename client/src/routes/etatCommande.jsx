import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/forms/Footer';
import Header from '../components/forms/Header';
import { OrderList } from '../components/forms/OrderList';
import { fetchOrders } from '../services';

export default function EtatCommande() {
  const [orderStatus, setOrderStatus] = useState([]);

  useEffect(() => {
    const getOrderStatus = async () => {
      const myOrders = await fetchOrders();
      console.log('nyOrders', myOrders);
      setOrderStatus(myOrders);
    };
    getOrderStatus();
  }, []);

  console.log(orderStatus);
  return (
    <>
      <Header />
      <div className='page_container'>{orderStatus.length > 0 && <OrderList orderStatus={orderStatus} />}</div>
      <Footer />
    </>
  );
}

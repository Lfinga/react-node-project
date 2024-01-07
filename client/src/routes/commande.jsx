import { useEffect, useMemo, useState } from 'react';
import Footer from '../components/forms/Footer';
import Header from '../components/forms/Header';
import { OrderProductList } from '../components/forms/OrderProductList';

import { fetchCheckout, fetchConfirmOrder, fetchOrderDelete, fetchOrderedProducts } from '../services';
export default function Commande() {
  const [orderedProducts, setOrders] = useState([]);
  const totalPrice = useMemo(() => {
    let totalPrice = 0;
    if (orderedProducts > 0) {
      for (const product of orderedProducts) {
        totalPrice += product.prix * product.quantite;
      }
    }
    return totalPrice;
  }, [orderedProducts]);

  useEffect(() => {
    async function wrapFetch() {
      const myOrderedProducts = await fetchOrderedProducts();
      setOrders(myOrderedProducts);
    }
    wrapFetch();
  }, []);

  const deleteCommand = async () => {
    await fetchOrderDelete();
    const products = await fetchOrderedProducts();
    setOrders(products);
  };

  const confirmCommand = async () => {
    await fetchConfirmOrder();
    await fetchCheckout(3);
    setOrders([]);
  };
  console.log('myorder', orderedProducts);
  return (
    <>
      <Header />
      <div className='page_container'>
        <h1 className='home' style={{ textAlign: 'center' }}>
          Ma commande
        </h1>
        <div className='order-container'>
          {orderedProducts && orderedProducts.length > 0 && (
            <OrderProductList setOrders={setOrders} orderedProducts={orderedProducts} />
          )}
          {orderedProducts && orderedProducts.length > 0 && (
            <>
              <p className='total-price' style={{ fontWeight: 'bold' }}>
                Total : ${totalPrice}
              </p>
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
      </div>
      <Footer />
    </>
  );
}

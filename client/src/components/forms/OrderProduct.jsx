import { useEffect, useState } from 'react';
import { fetchOrderedProducts, updateOrder } from '../../services';

export function OrderProduct({ name, price, quantite, imgPath, id, setOrders }) {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    setItemCount(quantite);
  }, []);

  async function increaseCount(product_id) {
    setItemCount((itemCount) => itemCount + 1);
    await updateOrder(itemCount + 1, product_id);
    const products = await fetchOrderedProducts();
    setOrders(products);
  }

  async function decreaseCount(product_id) {
    if (itemCount < 1) return setItemCount(0);
    setItemCount((itemCount) => itemCount - 1);
    await updateOrder(itemCount - 1, product_id);
    const products = await fetchOrderedProducts();
    setOrders(products);
  }

  return (
    <>
      <img className='order-product-img' src={imgPath} alt='avatar' />
      <div className='orderInfo'>
        <h4>
          <b>{name}</b>
        </h4>
        <p>${price}</p>
      </div>
      <div className='order-btns'>
        <div className='quantity'>
          <button onClick={() => decreaseCount(id)} className='minus-btn'>
            -
          </button>
          <span className='item-count'>{itemCount}</span>
          <button onClick={() => increaseCount(id)} className='plus-btn'>
            +
          </button>
        </div>
      </div>
    </>
  );
}

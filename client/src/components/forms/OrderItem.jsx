import { useEffect, useState } from 'react'
import { HOST } from '../../constants'

export function OrderItem({ name, price, quantite, imgPath }) {
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    setItemCount(quantite)
  }, [])

  function increaseCount() {
    setItemCount((itemCount) => itemCount + 1)
  }

  function decreaseCount() {
    if (itemCount < 1) return setItemCount(0)
    setItemCount((itemCount) => itemCount - 1)
  }

  return (
    <>
      <div className='orderItem'>
        <img src='../public/img/burger-card.png' alt='avatar' />
        <div className='orderInfo'>
          <h4>
            <b>{name}</b>
          </h4>
          <p>${price}</p>
          <div className='quantity'>
            <button onClick={decreaseCount} className='minus'>
              -
            </button>
            <span className='item-count'>{itemCount}</span>
            <button onClick={increaseCount} className='plus'>
              +
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

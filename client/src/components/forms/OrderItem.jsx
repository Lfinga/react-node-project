import { useEffect, useState } from 'react'
import { HOST } from '../../constants'

export function OrderItem({ id_product, name, price, quantite, imgPath }) {
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    setItemCount(quantite)
  }, [])

  function increaseCount() {
    setItemCount((itemCount) => itemCount + 1)
  }

  function decreaseCount() {
    if (itemCount < 1) return 0
    setItemCount((itemCount) => itemCount - 1)
  }

  async function fetchDeleteProduct() {
    console.log(id_product)
    const response = await fetch(`${HOST}/commande/${id_product}`, {
      method: 'DELETE',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91dGlsaXNhdGV1ciI6MiwiaWF0IjoxNjk4Nzk2NTA1LCJleHAiOjE3MDY1NzI1MDV9.DtxZWl0nQ9VqqiyNGXgUY9QH-Yzqi0ml4MVojntxnTI',
      },
    })
  }

  return (
    <>
      <div className='orderItem'>
        <img src='../public/img/burger-card.png' alt='avatar' />
        <div className='orderInfo'>
          <button onClick={fetchDeleteProduct} className='deleteOrder'>
            X
          </button>
          <h4>
            <b>{name}</b>
          </h4>
          <p>${price}</p>
          <div className='quantity'>
            <button onClick={decreaseCount} className='minus'>
              -
            </button>
            <p>{itemCount}</p>
            <button onClick={increaseCount} className='plus'>
              +
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

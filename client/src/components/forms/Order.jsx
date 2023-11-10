import { useState, useEffect } from 'react'

export function Order({ order_id, total, date, status }) {
  return (
    <>
      <div className='order-status'>
        <img src='' alt='' />
        <div>
          <p>Commande {order_id} :</p>
          <p>Total Price : ${total}</p>
          <p></p>
        </div>
        <p>Ordered at : {date}</p>
        <p></p>
        <p>Status : {status}</p>
        <p></p>
      </div>
    </>
  )
}

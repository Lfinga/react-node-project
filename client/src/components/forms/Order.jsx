import { useState, useEffect } from 'react'

export function Order({ total, date, status }) {
  return (
    <>
      <div className='order-status'>
        <img src='' alt='' />
        <div>
          <p>Total Price : {total}</p>
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

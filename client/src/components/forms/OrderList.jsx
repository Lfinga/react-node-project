import { fetchOrders } from '../../services'
import { Order } from './Order'

export function OrderList({ orderStatus }) {
  if (!orderStatus) return []
  return orderStatus.map((order) => {
    console.log('order', order)
    return (
      <Order
        key={order.id_commande}
        order_id={order.id_commande}
        total={order.total}
        date={Date(order.date)}
        status={order.nom}
      />
    )
  })
}

// TODO: l'api de etat comande retourne un mauvais tableau

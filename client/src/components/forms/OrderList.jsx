import { fetchOrders } from '../../services'
import { Order } from './Order'

export function OrderList({ orderStatus }) {
  let total = 0
  for (const order of orderStatus) {
    total += order[0].prix * order[0].quantite
  }
  if (!orderStatus) return []
  for (const orderstat of orderStatus) {
    return orderstat.map((order) => {
      console.log('order', order)
      return <Order key={order.id_produit} total={total} date={order.date} status={order.id_etat_commande} />
    })
  }
}

// TODO: l'api de etat comande retourne un mauvais tableau

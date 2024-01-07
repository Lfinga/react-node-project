import { Order } from './Order';

export function OrderList({ orderStatus }) {
  if (!orderStatus) return [];
  return orderStatus.map((order) => {
    return <Order key={order.id_commande} order_id={order.id_commande} date={Date(order.date)} status={order.nom} />;
  });
}

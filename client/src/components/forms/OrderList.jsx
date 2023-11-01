import { OrderItem } from './OrderItem'

export function OrderList({ products, orders }) {
  let productIdsAndQuantity = []
  let myProducts = []
  const myOrder = orders[0]
  if (myOrder && products) {
    myOrder.produits.forEach((order) => productIdsAndQuantity.push(order))
    console.log('dsdsd', myOrder)

    for (let ob of productIdsAndQuantity) {
      myProducts.push(products.filter((p) => p.id_produit === ob.id))
    }
    for (let i = 0; i < myProducts.length; i++) {
      myProducts[i][0]['quantite'] = productIdsAndQuantity[i].quantite
    }
    console.log('myroducts', myProducts)
    return myProducts.map((product) => {
      //console.log('p', product)
      return (
        <OrderItem
          key={product[0].id_produit}
          id_product={product[0].id_produit}
          name={product[0].nom}
          price={product[0].prix}
          quantite={product[0].quantite}
          imgPath={product[0].chemin_image}
        />
      )
    })
  }
}

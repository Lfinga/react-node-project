import { fetchDeleteProduct, fetchOrderedProducts } from '../../services';
import { OrderProduct } from './OrderProduct';

export function OrderProductList({ orderedProducts, setOrders }) {
  async function DeleteProduct(id_product) {
    await fetchDeleteProduct(id_product);
    const products = await fetchOrderedProducts();
    setOrders(products);
  }

  if (!orderedProducts) return [];
  return orderedProducts.map((product) => {
    return (
      <div key={product.id_produit} className='orderItem'>
        <OrderProduct
          name={product.nom}
          price={product.prix}
          quantite={product.quantite}
          imgPath={product.chemin_image}
          id={product.id_produit}
          setOrders={setOrders}
        />

        <button onClick={() => DeleteProduct(product.id_produit)} className='deleteProduct'>
          x
        </button>
      </div>
    );
  });
}

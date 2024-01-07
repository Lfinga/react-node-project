import { addProductToOrder } from '../../services';

export function Product({ name, imgPath, price, id }) {
  async function addProductToCart(product_id) {
    await addProductToOrder(product_id);
  }
  return (
    <div className='grid_item'>
      <img src={imgPath} alt='{{name}}' className='product-img' />
      <div className='container'>
        <h4>
          <b>{name}</b>
        </h4>
        <p>${price}</p>
        <button onClick={() => addProductToCart(id)} className='btn-addtocart'>
          ajouter au panier
        </button>
      </div>
    </div>
  );
}

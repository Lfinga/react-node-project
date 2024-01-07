import { useEffect, useState } from 'react';
import Footer from '../components/forms/Footer';
import Header from '../components/forms/Header';
import { ProductList } from '../components/forms/ProductList';
import { fetchProducts } from '../services';

export default function Produits() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function wrapFetch() {
      const products = await fetchProducts();
      setProducts(products);
    }
    wrapFetch();
  }, []);
  return (
    <>
      <Header />
      <div className='main_page_container'>
        <div className='grid_container'>{products && <ProductList products={products} />}</div>
      </div>
      <Footer />
    </>
  );
}

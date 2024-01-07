import { useEffect } from 'react';
import { fetchProducts } from '../../services';
import { Product } from './Product';

export function ProductList({ products }) {
  console.log('produit', products);
  return products.map((p) => {
    return <Product key={p.id_produit} name={p.nom} imgPath={p.chemin_image} price={p.prix} id={p.id_produit} />;
  });
}

import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

// Hook untuk memakai data produk di halaman mana pun
export default function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error('useProducts harus dipakai di dalam <ProductProvider>');
  }
  return ctx;
}
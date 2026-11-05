import { useState, useEffect, useCallback } from 'react';
import { ambilProduk, simpanProduk, customOutfitProducts } from '../services/api';

export default function useProducts() {
  const [products, setProductsState] = useState(() => ambilProduk());
  const [error, setError] = useState(null);

  // Setiap daftar produk berubah, langsung disimpan ke localStorage
  useEffect(() => {
    const berhasil = simpanProduk(products);
    setError(berhasil ? null : 'Gagal menyimpan ke penyimpanan browser.');
  }, [products]);

  const setProducts = useCallback((nilai) => {
    setProductsState((prev) => (typeof nilai === 'function' ? nilai(prev) : nilai));
  }, []);

  const addProduct = useCallback((produkBaru) => {
    const produk = {
      rating: { rate: 0, count: 0 },
      ...produkBaru,
      id: Date.now(),
      price: Number(produkBaru.price),
    };
    setProductsState((prev) => [produk, ...prev]);
    return produk;
  }, []);

  const deleteProduct = useCallback((id) => {
    setProductsState((prev) => prev.filter((item) => item.id !== Number(id)));
  }, []);

  const resetProducts = useCallback(() => {
    setProductsState(customOutfitProducts);
  }, []);

  return { products, setProducts, addProduct, deleteProduct, resetProducts, loading: false, error };
}
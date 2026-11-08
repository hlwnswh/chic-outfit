import React, { createContext, useState, useEffect, useCallback } from 'react';
import {
  customOutfitProducts,
  bacaProdukTersimpan,
  simpanProduk,
  STORAGE_KEY,
} from '../services/api';
import { fetchProductsFromApi } from '../services/productService';

export const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil data lokal dari localStorage (kalau versinya cocok), kalau tidak pakai data awal
  const [localProducts, setLocalProducts] = useState(() => {
    const tersimpan = bacaProdukTersimpan();
    if (Array.isArray(tersimpan) && tersimpan.length > 0) return tersimpan;
    return customOutfitProducts;
  });

  const muat = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const external = await fetchProductsFromApi();
      setApiProducts(external);
    } catch (err) {
      setError(err.message || 'Gagal memuat data dari server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    muat();
  }, [muat]);

  // Simpan perubahan ke localStorage setiap ada penambahan/penghapusan/edit
  useEffect(() => {
    simpanProduk(localProducts);
  }, [localProducts]);

  // Gabungkan produk lokal dan API
  const products = [...localProducts, ...apiProducts];

  const setProducts = useCallback((action) => {
    setLocalProducts((prev) => {
      const next = typeof action === 'function' ? action(prev) : action;
      return next;
    });
  }, []);

  const addProduct = useCallback((produkBaru) => {
    const produk = {
      rating: { rate: 0, count: 0 },
      ...produkBaru,
      id: Date.now(),
      price: Number(produkBaru.price),
    };
    setLocalProducts((prev) => [produk, ...prev]);
    return produk;
  }, []);

  const deleteProduct = useCallback((id) => {
    setLocalProducts((prev) => prev.filter((item) => item.id !== Number(id)));
  }, []);

  const resetProducts = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setLocalProducts(customOutfitProducts);
  }, []);

  const value = {
    products,
    setProducts,
    addProduct,
    deleteProduct,
    resetProducts,
    loading,
    error,
    reload: muat,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

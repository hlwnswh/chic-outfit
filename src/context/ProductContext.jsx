import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { fetchProductsFromApi } from '../services/productService';
import { customOutfitProducts, STORAGE_KEY } from '../services/api';

export const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil data dari localStorage atau gunakan customOutfitProducts dari api.js
  const [localProducts, setLocalProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // abaikan jika error
    }
    return customOutfitProducts;
  });

  const muat = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setApiProducts(await fetchProductsFromApi());
    } catch (err) {
      setError(err.message || 'Gagal memuat data dari server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    muat();
  }, [muat]);

  // Simpan setiap ada perubahan ke localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(localProducts));
    } catch {
      // abaikan jika penuh
    }
  }, [localProducts]);

  // Gabungkan produk lokal (dari api.js) dengan produk API eksternal
  const products = useMemo(() => {
    return [...localProducts, ...apiProducts];
  }, [localProducts, apiProducts]);

  const setProducts = useCallback((action) => {
    setLocalProducts((prev) => {
      const next = typeof action === 'function' ? action(prev) : action;
      return next;
    });
  }, []);

  const addProduct = useCallback(
    (produkBaru) => {
      const produk = {
        rating: { rate: 0, count: 0 },
        ...produkBaru,
        id: Date.now(),
        price: Number(produkBaru.price),
      };
      setLocalProducts((prev) => [produk, ...prev]);
      return produk;
    },
    []
  );

  const deleteProduct = useCallback(
    (id) => {
      setLocalProducts((prev) => prev.filter((item) => item.id !== Number(id)));
    },
    []
  );

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
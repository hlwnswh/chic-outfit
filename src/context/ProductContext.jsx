import React, { createContext, useState, useEffect, useCallback } from 'react';
import { bacaProdukTersimpan, simpanProduk, STORAGE_KEY } from '../services/api';
import { fetchLocalProducts, fetchProductsFromApi } from '../services/productService';

export const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [localProducts, setLocalProducts] = useState(() => {
    const tersimpan = bacaProdukTersimpan();
    return Array.isArray(tersimpan) && tersimpan.length > 0 ? tersimpan : null;
  });
  const [loading, setLoading] = useState(localProducts === null);
  const [error, setError] = useState(null);

  // Ambil data: produk lokal + produk dari public API (DummyJSON)
  const muat = useCallback(async (force = false) => {
    if (!force && localProducts !== null) return;
    setLoading(true);
    setError(null);
    try {
      const [lokal, api] = await Promise.allSettled([
        fetchLocalProducts(),
        fetchProductsFromApi(),
      ]);
      const daftarLokal = lokal.status === 'fulfilled' ? lokal.value : [];
      const daftarApi = api.status === 'fulfilled' ? api.value : [];

      if (daftarLokal.length === 0 && daftarApi.length === 0) {
        throw new Error('Gagal memuat data produk.');
      }
      setLocalProducts([...daftarLokal, ...daftarApi]);

      // Kalau API gagal, katalog tetap tampil dari data lokal + pesan error
      if (api.status === 'rejected') {
        setError(api.reason?.message || 'Gagal memuat data dari server.');
      }
    } catch (err) {
      setError(err.message || 'Gagal memuat data dari server.');
    } finally {
      setLoading(false);
    }
  }, [localProducts]);

  useEffect(() => {
    muat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localProducts !== null) simpanProduk(localProducts);
  }, [localProducts]);

  const products = localProducts ?? [];

  const setProducts = useCallback((action) => {
    setLocalProducts((prev) => {
      const base = prev ?? [];
      return typeof action === 'function' ? action(base) : action;
    });
  }, []);

  const addProduct = useCallback((produkBaru) => {
    const produk = {
      rating: { rate: 0, count: 0 },
      ...produkBaru,
      id: Date.now(),
      price: Number(produkBaru.price),
    };
    setLocalProducts((prev) => [produk, ...(prev ?? [])]);
    return produk;
  }, []);

  const deleteProduct = useCallback((id) => {
    setLocalProducts((prev) => (prev ?? []).filter((item) => item.id !== Number(id)));
  }, []);

  const resetProducts = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setLocalProducts(null);
    muat(true);
  }, [muat]);

  const value = {
    products,
    setProducts,
    addProduct,
    deleteProduct,
    resetProducts,
    loading,
    error,
    reload: () => muat(true),
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}
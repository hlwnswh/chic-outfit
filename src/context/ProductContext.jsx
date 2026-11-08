import React, { createContext, useState, useEffect, useCallback } from 'react';
import { bacaProdukTersimpan, simpanProduk, STORAGE_KEY } from '../services/api';

export const ProductContext = createContext(null);

// Alamat data produk (file public/products.json) yang diambil lewat fetch
const API_URL = `${import.meta.env.BASE_URL}products.json`;

export function ProductProvider({ children }) {
  // Data produk: dari localStorage kalau ada (hasil tambah/edit/hapus), kalau tidak null dulu
  const [localProducts, setLocalProducts] = useState(() => {
    const tersimpan = bacaProdukTersimpan();
    return Array.isArray(tersimpan) && tersimpan.length > 0 ? tersimpan : null;
  });
  const [loading, setLoading] = useState(localProducts === null);
  const [error, setError] = useState(null);

  // Ambil data dari API (fetch). Dilewati kalau sudah ada data tersimpan, kecuali force = true
  const muat = useCallback(async (force = false) => {
    if (!force && localProducts !== null) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Gagal memuat data produk.');
      const data = await res.json();
      setLocalProducts(data);
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

  // Simpan perubahan ke localStorage setiap ada tambah/hapus/edit
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

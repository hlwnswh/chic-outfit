import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { fetchProductsFromApi } from '../services/productService';
import { customOutfitProducts } from '../services/api';

export const ProductContext = createContext(null);

const KEY = 'chic_outfit_overrides_v1';
const KEY_LAMA = 'chic_outfit_products';
const KOSONG = { deleted: [], edited: {}, added: [] };

// Baca perubahan yang tersimpan di browser (hapus / edit / tambah)
const bacaOverrides = () => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw);
      return { deleted: p.deleted || [], edited: p.edited || {}, added: p.added || [] };
    }
    // Migrasi: ambil produk tambahan sendiri dari penyimpanan versi lama
    const lama = JSON.parse(localStorage.getItem(KEY_LAMA) || 'null');
    if (Array.isArray(lama)) {
      return { ...KOSONG, added: lama.filter((p) => p.id > 1000000) };
    }
  } catch {
    // abaikan data rusak
  }
  return KOSONG;
};

// Data dasar + perubahan pengguna = daftar yang ditampilkan
const gabung = (base, o) => [
  ...o.added,
  ...base
    .filter((p) => !o.deleted.includes(p.id))
    .map((p) => (o.edited[p.id] ? o.edited[p.id] : p)),
];

// Kebalikan dari gabung: dari daftar baru, hitung lagi apa yang dihapus/diedit/ditambah
const turunkan = (base, next, prev) => {
  const idBase = new Set(base.map((p) => p.id));
  const idNext = new Set(next.map((p) => p.id));
  const asli = new Map(base.map((p) => [p.id, p]));

  const deleted = [
    ...prev.deleted.filter((id) => !idBase.has(id)),
    ...base.filter((p) => !idNext.has(p.id)).map((p) => p.id),
  ];

  const edited = {};
  Object.keys(prev.edited).forEach((id) => {
    if (!idBase.has(Number(id))) edited[id] = prev.edited[id];
  });
  next.forEach((p) => {
    if (idBase.has(p.id) && JSON.stringify(asli.get(p.id)) !== JSON.stringify(p)) {
      edited[p.id] = p;
    }
  });

  const added = next.filter((p) => !idBase.has(p.id));
  return { deleted, edited, added };
};

export function ProductProvider({ children }) {
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [overrides, setOverrides] = useState(bacaOverrides);

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

  // Simpan perubahan setiap kali berubah
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(overrides));
    } catch {
      // penyimpanan penuh, abaikan
    }
  }, [overrides]);

  const base = useMemo(() => [...customOutfitProducts, ...apiProducts], [apiProducts]);
  const products = useMemo(() => gabung(base, overrides), [base, overrides]);

  // Bisa dipanggil: setProducts([...]) atau setProducts(prev => prev.filter(...))
  const setProducts = useCallback(
    (nilai) => {
      setOverrides((prev) => {
        const sekarang = gabung(base, prev);
        const next = typeof nilai === 'function' ? nilai(sekarang) : nilai;
        return turunkan(base, next, prev);
      });
    },
    [base]
  );

  const addProduct = useCallback(
    (produkBaru) => {
      const produk = {
        rating: { rate: 0, count: 0 },
        ...produkBaru,
        id: Date.now(),
        price: Number(produkBaru.price),
      };
      setProducts((prev) => [produk, ...prev]);
      return produk;
    },
    [setProducts]
  );

  const deleteProduct = useCallback(
    (id) => {
      setProducts((prev) => prev.filter((item) => item.id !== Number(id)));
    },
    [setProducts]
  );

  const resetProducts = useCallback(() => {
    setOverrides(KOSONG);
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
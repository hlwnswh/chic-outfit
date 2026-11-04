import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Saat pertama kali dibuka, cek apakah ada data tersimpan di localStorage
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const savedProducts = localStorage.getItem('chic_outfit_products');
        
        if (savedProducts) {
          // Jika ada data di localStorage (hasil hapus/tambah sebelumnya), pakai itu
          setProducts(JSON.parse(savedProducts));
        } else {
          // Jika belum ada, ambil dari API/data awal lalu simpan ke localStorage
          const data = await fetchProducts();
          setProducts(data);
          localStorage.setItem('chic_outfit_products', JSON.stringify(data));
        }
        setError(null);
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan saat mengambil data.');
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // 2. Fungsi pembantu untuk menyimpan perubahan produk (tambah/hapus) agar permanen
  const updateProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem('chic_outfit_products', JSON.stringify(newProducts));
  };

  // 3. Fungsi opsional untuk mereset kembali ke data awal dari API jika diperlukan
  const resetProducts = async () => {
    localStorage.removeItem('chic_outfit_products');
    const data = await fetchProducts();
    setProducts(data);
    localStorage.setItem('chic_outfit_products', JSON.stringify(data));
  };

  return { products, setProducts: updateProducts, loading, error, resetProducts };
}
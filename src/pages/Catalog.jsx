import React, { useState } from 'react';
import useProducts from '../hooks/useProducts'; // Menggunakan hook yang sudah ada localStorage-nya
import ProductCard from '../components/ProductCard';
import { Loader, Trash2, Search } from 'lucide-react';

export default function Catalog() {
  // Mengambil data, fungsi setProducts, dan status loading dari hook useProducts
  const { products, setProducts, loading } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [sortBy, setSortBy] = useState('default');

  // Fungsi untuk menghapus produk berdasarkan ID (otomatis tersimpan ke localStorage)
  const handleDeleteProduct = (id) => {
    const confirmed = window.confirm("Apakah kamu yakin ingin menghapus outfit ini dari katalog?");
    if (confirmed) {
      const updatedProducts = products.filter(item => item.id !== id);
      setProducts(updatedProducts); // Ini akan otomatis memperbarui state & localStorage
    }
  };

  // Proses Filter, Search, & Sorting
  const filteredProducts = products.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'lowest') return a.price - b.price;
    if (sortBy === 'highest') return b.price - a.price;
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    return 0;
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem', color: '#849b88', gap: '0.5rem' }}>
        <Loader size={28} className="animate-spin" /> Memuat katalog outfit...
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d372e', marginBottom: '1.5rem' }}>
        Katalog Outfit Pilihan ✨
      </h1>

      {/* Bagian Filter, Search & Sorting */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '0.6rem 1rem', borderRadius: '12px', border: '1px solid #e2e8df', flex: 1, minWidth: '250px' }}>
          <Search size={18} color="#849b88" style={{ marginRight: '0.5rem' }} />
          <input
            type="text"
            placeholder="Cari outfit pilihanmu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', background: 'transparent', font: 'inherit' }}
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '0.6rem 1rem', borderRadius: '12px', border: '1px solid #e2e8df', background: 'white', outline: 'none', font: 'inherit' }}
        >
          <option value="Semua">Semua Kategori</option>
          <option value="Pakaian Wanita">Pakaian Wanita</option>
          <option value="Pakaian Pria">Pakaian Pria</option>
          <option value="Celana">Celana</option>
          <option value="Sandal & Sepatu">Sandal & Sepatu</option>
          <option value="Rok">Rok</option>
          <option value="Jaket">Jaket</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: '0.6rem 1rem', borderRadius: '12px', border: '1px solid #e2e8df', background: 'white', outline: 'none', font: 'inherit' }}
        >
          <option value="default">Urutkan: Default</option>
          <option value="lowest">Harga Terendah</option>
          <option value="highest">Harga Tertinggi</option>
          <option value="name">Nama (A-Z)</option>
        </select>
      </div>

      {/* Grid Produk */}
      {sortedProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#6e7a6f' }}>
          <p style={{ fontSize: '1.1rem' }}>Produk atau outfit tidak ditemukan.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {sortedProducts.map((product) => (
            <div key={product.id} style={{ position: 'relative' }}>
              <ProductCard product={product} />
              <button
                onClick={() => handleDeleteProduct(product.id)}
                title="Hapus produk"
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: '#fee2e2',
                  color: '#ef4444',
                  border: 'none',
                  borderRadius: '50%',
                  width: '35px',
                  height: '35px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  zIndex: 10
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { Loader, Trash2, Search, Pencil } from 'lucide-react';

const ITEMS_PER_PAGE = 8;

export default function Catalog() {
  const { products, setProducts, loading, error, reload } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state: ?q=...&kategori=...&urut=...&hal=...
  const searchTerm = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('kategori') || 'Semua';
  const sortBy = searchParams.get('urut') || 'default';
  const page = Math.max(1, Number(searchParams.get('hal')) || 1);

  const updateParams = (changes, resetPage = true) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      if (!value || value === 'Semua' || value === 'default') next.delete(key);
      else next.set(key, value);
    });
    if (resetPage) next.delete('hal');
    setSearchParams(next, { replace: true });
  };

  const handleDeleteProduct = (id) => {
    const confirmed = window.confirm('Apakah kamu yakin ingin menghapus outfit ini dari katalog?');
    if (confirmed) {
      setProducts(products.filter((item) => item.id !== id));
    }
  };

  const categories = ['Semua', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((item) => {
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

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem', color: '#849b88', gap: '0.5rem' }}>
        <Loader size={28} className="animate-spin" /> Memuat katalog outfit...
      </div>
    );
  }

  const tombolBulat = {
    position: 'absolute', top: '12px', border: 'none', borderRadius: '50%',
    width: '35px', height: '35px', display: 'flex', alignItems: 'center',
    justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10
  };

  const inputStyle = {
    padding: '0.6rem 1rem', borderRadius: '12px', border: '1px solid #e2e8df',
    background: 'white', outline: 'none', font: 'inherit'
  };

  const pageButton = (active, disabled) => ({
    padding: '0.5rem 0.9rem', borderRadius: '10px', border: '1px solid #e2e8df',
    background: active ? '#849b88' : 'white', color: active ? 'white' : '#2d372e',
    cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, font: 'inherit'
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d372e', marginBottom: '1.5rem' }}>
        Katalog Outfit Pilihan ✨
      </h1>

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', background: '#fee2e2', color: '#b91c1c', padding: '0.8rem 1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
          <span>⚠️ {error} Produk dari server belum tampil.</span>
          <button onClick={reload} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '8px', cursor: 'pointer' }}>
            Coba lagi
          </button>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', flex: 1, minWidth: '250px' }}>
          <Search size={18} color="#849b88" style={{ marginRight: '0.5rem' }} />
          <input
            type="text"
            placeholder="Cari outfit pilihanmu..."
            value={searchTerm}
            onChange={(e) => updateParams({ q: e.target.value })}
            style={{ border: 'none', outline: 'none', width: '100%', background: 'transparent', font: 'inherit' }}
          />
        </div>

        <select value={selectedCategory} onChange={(e) => updateParams({ kategori: e.target.value })} style={inputStyle}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat === 'Semua' ? 'Semua Kategori' : cat}</option>
          ))}
        </select>

        <select value={sortBy} onChange={(e) => updateParams({ urut: e.target.value })} style={inputStyle}>
          <option value="default">Urutkan: Default</option>
          <option value="lowest">Harga Terendah</option>
          <option value="highest">Harga Tertinggi</option>
          <option value="name">Nama (A-Z)</option>
        </select>
      </div>

      {sortedProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#6e7a6f' }}>
          <p style={{ fontSize: '1.1rem' }}>Produk atau outfit tidak ditemukan.</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {paginatedProducts.map((product) => (
              <div key={product.id} style={{ position: 'relative' }}>
                <ProductCard product={product} />
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  title="Hapus produk"
                  style={{ ...tombolBulat, left: '12px', backgroundColor: '#fee2e2', color: '#ef4444' }}
                >
                  <Trash2 size={16} />
                </button>
                <Link
                  to={`/edit/${product.id}`}
                  title="Edit produk"
                  style={{ ...tombolBulat, left: '55px', backgroundColor: '#e0f2fe', color: '#0284c7', textDecoration: 'none' }}
                >
                  <Pencil size={16} />
                </Link>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <button
                disabled={currentPage === 1}
                onClick={() => updateParams({ hal: currentPage - 1 }, false)}
                style={pageButton(false, currentPage === 1)}
              >
                ‹ Sebelumnya
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => updateParams({ hal: n }, false)} style={pageButton(n === currentPage, false)}>
                  {n}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => updateParams({ hal: currentPage + 1 }, false)}
                style={pageButton(false, currentPage === totalPages)}
              >
                Selanjutnya ›
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
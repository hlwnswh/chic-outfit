import React from 'react';
import { useFavorites } from '../context/FavoriteContext';
import ProductCard from '../components/ProductCard';
import { Heart } from 'lucide-react';

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#2d372e', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Heart color="#849b88" /> Produk Favorit Saya
      </h1>
      <p style={{ color: '#6e7a6f', marginBottom: '2rem' }}>Daftar item outfit pilihan yang kamu simpan.</p>

      {favorites.length === 0 ? (
        <div style={{ backgroundColor: 'white', padding: '4rem', borderRadius: '20px', textAlign: 'center', border: '1px solid #e2e8df', color: '#6e7a6f' }}>
          <h3>Belum ada produk favorit</h3>
          <p>Klik tanda hati pada produk di katalog untuk menyimpannya ke sini.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
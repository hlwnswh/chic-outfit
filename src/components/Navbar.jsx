import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, PlusCircle, Home, Layers } from 'lucide-react';
import { useFavorites } from '../context/FavoriteContext';

export default function Navbar() {
  const { favorites } = useFavorites();

  return (
    <nav style={{
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #e2e8df',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <ShoppingBag color="#849b88" size={32} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#3a4a3d', lineHeight: '1.2' }}>
            ChicOutfit
          </span>
          <span style={{ fontSize: '0.75rem', color: '#6e7a6f', fontWeight: 500 }}>
            by Hilwa Hilyatun Niswah
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#556b5a', fontWeight: 500, textDecoration: 'none' }}>
          <Home size={18} /> Beranda
        </Link>
        <Link to="/katalog" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#556b5a', fontWeight: 500, textDecoration: 'none' }}>
          <Layers size={18} /> Katalog
        </Link>
        <Link to="/tambah" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#556b5a', fontWeight: 500, textDecoration: 'none' }}>
          <PlusCircle size={18} /> Tambah Produk
        </Link>
        <Link to="/favorit" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#556b5a', fontWeight: 500, textDecoration: 'none', position: 'relative' }}>
          <Heart size={18} /> Favorit
          {favorites.length > 0 && (
            <span style={{
              backgroundColor: '#849b88',
              color: 'white',
              borderRadius: '50%',
              padding: '0.1rem 0.4rem',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}>
              {favorites.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
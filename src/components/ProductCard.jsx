import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { useFavorites } from '../context/FavoriteContext';

export default function ProductCard({ product }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  // Konversi harga dari USD ke Rupiah (Kurs perkiraan: 1 USD = Rp 16.000)
  const formatRupiah = (priceInUSD) => {
    const rate = 16000;
    const priceInIDR = priceInUSD * rate;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(priceInIDR);
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8df',
      borderRadius: '16px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 4px 15px rgba(132, 155, 136, 0.05)',
      transition: 'transform 0.2s ease',
    }}>
      <div style={{ position: 'relative', height: '220px', backgroundColor: '#fdfefe', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img 
          src={product.image} 
          alt={product.title} 
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
        />
        <button 
          onClick={() => toggleFavorite(product)}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '35px',
            height: '35px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <Heart size={18} color={favorite ? "#db2777" : "#849b88"} fill={favorite ? "#db2777" : "none"} />
        </button>
      </div>

      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#849b88', fontWeight: 600, letterSpacing: '0.5px' }}>
          {product.category}
        </span>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#2d372e', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.title}
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.75rem' }}>
          <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#3a4a3d' }}>
            {formatRupiah(product.price)}
          </span>
          <Link 
            to={`/katalog/${product.id}`}
            style={{
              backgroundColor: '#e3ebdf',
              color: '#3a4a3d',
              padding: '0.4rem 0.8rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <Eye size={14} /> Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
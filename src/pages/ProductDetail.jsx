import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { useFavorites } from '../context/FavoriteContext';
import { ArrowLeft, Heart, Star, ShoppingBag, Loader } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const getDetail = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Gagal memuat detail produk.');
      } finally {
        setLoading(false);
      }
    };
    getDetail();
  }, [id]);

  // Harga di data sudah dalam Rupiah, jadi tidak perlu dikali kurs lagi
  const formatRupiah = (harga) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(harga);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem', color: '#849b88', gap: '0.5rem' }}>
        <Loader size={28} className="animate-spin" /> Memuat detail outfit...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <p>{error || 'Produk tidak ditemukan.'}</p>
        <Link to="/katalog" style={{ color: '#849b88', fontWeight: 600 }}>Kembali ke Katalog</Link>
      </div>
    );
  }

  const favorite = isFavorite(product.id);

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <Link to="/katalog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#556b5a', marginBottom: '1.5rem', fontWeight: 500 }}>
        <ArrowLeft size={18} /> Kembali ke Katalog
      </Link>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        border: '1px solid #e2e8df',
        padding: '2.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2.5rem',
        boxShadow: '0 8px 30px rgba(132, 155, 136, 0.08)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfefe', borderRadius: '16px', padding: '1.5rem' }}>
          <img src={product.image} alt={product.title} style={{ maxHeight: '350px', maxWidth: '100%', objectFit: 'contain' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#849b88', fontWeight: 600, letterSpacing: '1px' }}>
            {product.category}
          </span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#2d372e' }}>{product.title}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b', fontSize: '0.9rem' }}>
            <Star size={18} fill="#f59e0b" />
            <span>{product.rating?.rate || '4.5'}</span>
            <span style={{ color: '#6e7a6f' }}>({product.rating?.count || 120} ulasan)</span>
          </div>

          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#3a4a3d', margin: '0.5rem 0' }}>
            {formatRupiah(product.price)}
          </div>

          <p style={{ color: '#6e7a6f', lineHeight: 1.6 }}>{product.description}</p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '1rem' }}>
            <button
              onClick={() => toggleFavorite(product)}
              style={{
                padding: '0.8rem 1.2rem',
                borderRadius: '12px',
                border: '1px solid #e2e8df',
                backgroundColor: favorite ? '#fce7f3' : 'white',
                color: favorite ? '#db2777' : '#2d372e',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Heart size={20} fill={favorite ? "#db2777" : "none"} color={favorite ? "#db2777" : "#849b88"} />
              {favorite ? 'Disimpan' : 'Tambah Favorit'}
            </button>

            <button style={{
              backgroundColor: '#849b88',
              color: 'white',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexGrow: 1,
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <ShoppingBag size={20} /> Beli Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
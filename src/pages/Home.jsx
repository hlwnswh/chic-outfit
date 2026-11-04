import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function Home() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #e8f0e9 0%, #f5f7f4 100%)',
        borderRadius: '24px',
        padding: '3.5rem 2.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '1.25rem',
        border: '1px solid #e2e8df',
        boxShadow: '0 10px 30px rgba(132, 155, 136, 0.06)',
        marginBottom: '3rem'
      }}>
        <span style={{
          backgroundColor: '#d8e4d6',
          color: '#3a4a3d',
          padding: '0.4rem 1rem',
          borderRadius: '50px',
          fontSize: '0.85rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}>
          <Sparkles size={16} /> Koleksi Fashion Pilihan
        </span>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2d372e', lineHeight: 1.2, maxWidth: '650px' }}>
          Tampil Elegan & Nyaman dengan Gaya Pastel Setiap Hari
        </h1>

        <p style={{ color: '#6e7a6f', fontSize: '1.05rem', maxWidth: '550px', lineHeight: 1.6 }}>
          Temukan berbagai koleksi pakaian, celana, sepatu, rok, dan jaket berkualitas tinggi dengan nuansa warna yang menenangkan dan estetis.
        </p>

        <Link
          to="/katalog"
          style={{
            backgroundColor: '#849b88',
            color: 'white',
            padding: '0.85rem 1.75rem',
            borderRadius: '12px',
            fontWeight: 600,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 12px rgba(132, 155, 136, 0.3)',
            marginTop: '0.5rem'
          }}
        >
          Jelajahi Katalog <ArrowRight size={18} />
        </Link>
      </div>

      {/* Bagian Koleksi Eksklusif (Sub-teks tema sudah dihapus di sini) */}
      <div style={{ marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#2d372e' }}>Koleksi Eksklusif</h2>
        </div>
      </div>

      {/* Keunggulan / Features Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8df', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ backgroundColor: '#e8f0e9', padding: '0.75rem', borderRadius: '12px', color: '#849b88' }}>
            <Truck size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#2d372e', marginBottom: '0.2rem' }}>Pengiriman Cepat</h3>
            <p style={{ fontSize: '0.85rem', color: '#6e7a6f' }}>Jaminan pengiriman aman dan cepat ke seluruh wilayah Indonesia.</p>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8df', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ backgroundColor: '#e8f0e9', padding: '0.75rem', borderRadius: '12px', color: '#849b88' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#2d372e', marginBottom: '0.2rem' }}>Kualitas Premium</h3>
            <p style={{ fontSize: '0.85rem', color: '#6e7a6f' }}>Bahan pilihan terbaik yang nyaman dan adem saat dikenakan.</p>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8df', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ backgroundColor: '#e8f0e9', padding: '0.75rem', borderRadius: '12px', color: '#849b88' }}>
            <RefreshCw size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#2d372e', marginBottom: '0.2rem' }}>Garansi Tukar Ukuran</h3>
            <p style={{ fontSize: '0.85rem', color: '#6e7a6f' }}>Kemudahan pengembalian jika ukuran tidak pas di badan.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
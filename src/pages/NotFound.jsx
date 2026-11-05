import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ padding: '3rem', textAlign: 'center' }}>
      <h1>404</h1>
      <p>Halaman tidak ditemukan.</p>
      <Link to="/" style={{ color: '#849b88', fontWeight: 600 }}>Kembali ke Beranda</Link>
    </div>
  );
}
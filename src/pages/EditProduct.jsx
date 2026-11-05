import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import useProducts from '../hooks/useProducts';

const KATEGORI = ['Pakaian Wanita', 'Pakaian Pria', 'Celana', 'Sandal & Sepatu', 'Rok', 'Jaket'];

const inputStyle = {
  width: '100%',
  padding: '0.7rem 1rem',
  borderRadius: '12px',
  border: '1px solid #e2e8df',
  background: 'white',
  outline: 'none',
  font: 'inherit',
  boxSizing: 'border-box'
};

const labelStyle = { display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: '#2d372e' };

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, setProducts } = useProducts();

  const produk = products.find((p) => p.id === Number(id));

  const [form, setForm] = useState(() =>
    produk
      ? {
          title: produk.title,
          price: produk.price,
          category: produk.category,
          description: produk.description || '',
          image: produk.image || ''
        }
      : null
  );

  if (!produk || !form) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <p>Produk tidak ditemukan.</p>
        <Link to="/katalog" style={{ color: '#849b88', fontWeight: 600 }}>Kembali ke Katalog</Link>
      </div>
    );
  }

  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const pilihGambar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 800 * 1024) {
      alert('Ukuran gambar maksimal 800 KB, atau pakai link gambar saja.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const simpan = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.price) {
      alert('Nama dan harga wajib diisi.');
      return;
    }
    setProducts((prev) =>
      prev.map((p) =>
        p.id === produk.id
          ? { ...p, ...form, title: form.title.trim(), price: Number(form.price) }
          : p
      )
    );
    navigate('/katalog');
  };

  const daftarKategori = KATEGORI.includes(form.category) ? KATEGORI : [form.category, ...KATEGORI];

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <Link to="/katalog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#556b5a', marginBottom: '1.5rem', fontWeight: 500 }}>
        <ArrowLeft size={18} /> Kembali ke Katalog
      </Link>

      <form
        onSubmit={simpan}
        style={{
          background: 'white',
          border: '1px solid #e2e8df',
          borderRadius: '20px',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem'
        }}
      >
        <h1 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#2d372e', margin: 0 }}>Edit Outfit ✏️</h1>

        <div>
          <label style={labelStyle}>Nama Produk</label>
          <input style={inputStyle} name="title" value={form.title} onChange={ubah} />
        </div>

        <div>
          <label style={labelStyle}>Harga (Rp)</label>
          <input style={inputStyle} type="number" name="price" value={form.price} onChange={ubah} />
        </div>

        <div>
          <label style={labelStyle}>Kategori</label>
          <select style={inputStyle} name="category" value={form.category} onChange={ubah}>
            {daftarKategori.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Deskripsi</label>
          <textarea style={{ ...inputStyle, minHeight: '100px' }} name="description" value={form.description} onChange={ubah} />
        </div>

        <div>
          <label style={labelStyle}>Gambar</label>
          {form.image && (
            <img src={form.image} alt="Pratinjau" style={{ maxHeight: '160px', borderRadius: '12px', marginBottom: '0.7rem', display: 'block' }} />
          )}
          <input
            style={{ ...inputStyle, marginBottom: '0.6rem' }}
            name="image"
            placeholder="Tempel link gambar"
            value={form.image.startsWith('data:') ? '' : form.image}
            onChange={ubah}
          />
          <input type="file" accept="image/*" onChange={pilihGambar} />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#849b88',
            color: 'white',
            border: 'none',
            padding: '0.9rem 1.5rem',
            borderRadius: '12px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}
        >
          <Save size={20} /> Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
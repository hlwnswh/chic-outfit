import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function AddProduct() {
  const [formData, setFormData] = useState({ title: '', price: '', category: "women's clothing", description: '', image: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Nama outfit wajib diisi';
    else if (formData.title.length < 4) errs.title = 'Nama minimal 4 karakter';

    if (!formData.price) errs.price = 'Harga wajib diisi';
    else if (Number(formData.price) <= 0) errs.price = 'Harga harus lebih dari 0';

    if (!formData.description.trim()) errs.description = 'Deskripsi wajib diisi';
    if (!formData.image.trim()) errs.image = 'URL gambar wajib diisi';

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSubmitted(true);
      setFormData({ title: '', price: '', category: "women's clothing", description: '', image: '' });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '650px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#2d372e', marginBottom: '0.5rem' }}>
        Tambah Outfit Baru
      </h1>
      <p style={{ color: '#6e7a6f', marginBottom: '2rem' }}>Tambahkan data produk koleksi baru ke dalam sistem lokal.</p>

      {submitted && (
        <div style={{ padding: '1rem', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <CheckCircle2 size={20} /> Produk berhasil ditambahkan!
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '20px', border: '1px solid #e2e8df', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.9rem' }}>Nama Outfit</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: errors.title ? '1px solid #ef4444' : '1px solid #e2e8df', outline: 'none' }}
            placeholder="Contoh: Blouse Pastel Silk"
          />
          {errors.title && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'inline-block' }}>{errors.title}</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.9rem' }}>Harga (Rp)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: errors.price ? '1px solid #ef4444' : '1px solid #e2e8df', outline: 'none' }}
              placeholder="150000"
            />
            {errors.price && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'inline-block' }}>{errors.price}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.9rem' }}>Kategori</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8df', outline: 'none', backgroundColor: 'white' }}
            >
              <option value="women's clothing">Pakaian Wanita</option>
              <option value="men's clothing">Pakaian Pria</option>
              <option value="jewelery">Aksesoris</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.9rem' }}>URL Gambar</label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: errors.image ? '1px solid #ef4444' : '1px solid #e2e8df', outline: 'none' }}
            placeholder="https://fakestoreapi.com/img/..."
          />
          {errors.image && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'inline-block' }}>{errors.image}</span>}
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.9rem' }}>Deskripsi Produk</label>
          <textarea
            rows="4"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: errors.description ? '1px solid #ef4444' : '1px solid #e2e8df', outline: 'none' }}
            placeholder="Jelaskan spesifikasi dan bahan produk..."
          />
          {errors.description && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'inline-block' }}>{errors.description}</span>}
        </div>

        <button type="submit" style={{ backgroundColor: '#849b88', color: 'white', padding: '0.85rem', borderRadius: '10px', border: 'none', fontWeight: 600, fontSize: '1rem', marginTop: '0.5rem' }}>
          Simpan Produk
        </button>
      </form>
    </div>
  );
}
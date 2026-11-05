import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import useProducts from '../hooks/useProducts';
import FormField from '../components/FormField';

const KATEGORI_AWAL = 'Pakaian Wanita';
const FORM_KOSONG = { title: '', price: '', category: KATEGORI_AWAL, description: '', image: '' };

export default function AddProduct() {
  const { addProduct } = useProducts();
  const [formData, setFormData] = useState(FORM_KOSONG);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    const title = formData.title.trim();
    const description = formData.description.trim();
    const image = formData.image.trim();

    if (!title) errs.title = 'Nama outfit wajib diisi';
    else if (title.length < 4) errs.title = 'Nama minimal 4 karakter';

    if (!formData.price) errs.price = 'Harga wajib diisi';
    else if (Number(formData.price) <= 0) errs.price = 'Harga harus lebih dari 0';

    if (!description) errs.description = 'Deskripsi wajib diisi';
    else if (description.length < 10) errs.description = 'Deskripsi minimal 10 karakter';

    if (!image) errs.image = 'URL gambar wajib diisi';
    else if (!/^https?:\/\/.+/i.test(image)) errs.image = 'URL harus diawali http:// atau https://';

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    addProduct({
      title: formData.title.trim(),
      price: formData.price,
      category: formData.category,
      description: formData.description.trim(),
      image: formData.image.trim()
    });

    setSubmitted(true);
    setFormData(FORM_KOSONG);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '650px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#2d372e', marginBottom: '0.5rem' }}>
        Tambah Outfit Baru
      </h1>
      <p style={{ color: '#6e7a6f', marginBottom: '2rem' }}>Tambahkan data produk koleksi baru ke dalam sistem lokal.</p>

      {submitted && (
        <div style={{ padding: '1rem', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <CheckCircle2 size={20} /> Produk berhasil ditambahkan dan disimpan secara permanen!
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '20px', border: '1px solid #e2e8df', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <FormField
          label="Nama Outfit"
          type="text"
          value={formData.title}
          onChange={handleChange('title')}
          error={errors.title}
          placeholder="Contoh: Blouse Pastel Silk"
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <FormField
            label="Harga (Rp)"
            type="number"
            value={formData.price}
            onChange={handleChange('price')}
            error={errors.price}
            placeholder="150000"
          />

          <FormField
            label="Kategori"
            as="select"
            value={formData.category}
            onChange={handleChange('category')}
          >
            <option value="Pakaian Wanita">Pakaian Wanita</option>
            <option value="Pakaian Pria">Pakaian Pria</option>
            <option value="Celana">Celana</option>
            <option value="Sandal & Sepatu">Sandal & Sepatu</option>
            <option value="Rok">Rok</option>
            <option value="Jaket">Jaket</option>
          </FormField>
        </div>

        <FormField
          label="URL Gambar"
          type="text"
          value={formData.image}
          onChange={handleChange('image')}
          error={errors.image}
          placeholder="https://images.pexels.com/photos/..."
        />

        <FormField
          label="Deskripsi Produk"
          as="textarea"
          rows="4"
          value={formData.description}
          onChange={handleChange('description')}
          error={errors.description}
          placeholder="Jelaskan spesifikasi dan bahan produk..."
        />

        <button type="submit" style={{ backgroundColor: '#849b88', color: 'white', padding: '0.85rem', borderRadius: '10px', border: 'none', fontWeight: 600, fontSize: '1rem', marginTop: '0.5rem', cursor: 'pointer' }}>
          Simpan Produk
        </button>
      </form>
    </div>
  );
}
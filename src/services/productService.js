// Pemanggilan public API (DummyJSON). Hanya berisi akses data, tanpa tampilan.
const BASE_URL = 'https://dummyjson.com/products/category';
const KURS = 16000; // harga API dalam USD, dikonversi sekali di sini

// slug kategori API -> kategori di katalog
const KATEGORI_API = {
  tops: 'Pakaian Wanita',
  'womens-dresses': 'Pakaian Wanita',
  'mens-shirts': 'Pakaian Pria',
  'womens-shoes': 'Sandal & Sepatu',
  'mens-shoes': 'Sandal & Sepatu',
};
const BATAS_PRODUK = 1; // jumlah produk per kategori dari API

const keRupiah = (usd) => Math.round((usd * KURS) / 1000) * 1000;

// Samakan bentuk data API dengan bentuk produk di aplikasi.
// ID digeser +1000 supaya tidak bentrok dengan produk lokal (1-25).
const petakan = (p, kategori) => ({
  id: 1000 + p.id,
  title: p.title,
  price: keRupiah(p.price),
  category: kategori,
  description: p.description,
  image: p.thumbnail || (p.images && p.images[0]) || '',
  rating: { rate: p.rating ?? 0, count: p.reviews ? p.reviews.length : 0 },
});

export async function fetchProductsFromApi() {
  const hasil = await Promise.all(
    Object.entries(KATEGORI_API).map(async ([slug, kategori]) => {
     const res = await fetch(`${BASE_URL}/${slug}?limit=${BATAS_PRODUK}`);
      if (!res.ok) {
        throw new Error(`Gagal memuat data dari server (kode ${res.status}).`);
      }
     const data = await res.json();
      return data.products.slice(0, BATAS_PRODUK).map((p) => petakan(p, kategori));
    })
  );
  return hasil.flat().slice(0, 3);
}

// Cadangan: data produk lokal (public/products.json)
const LOCAL_URL = `${import.meta.env.BASE_URL}products.json`;

export async function fetchLocalProducts() {
  const res = await fetch(LOCAL_URL);
  if (!res.ok) throw new Error('Gagal memuat data produk.');
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('Format data produk tidak valid.');
  return data;
}
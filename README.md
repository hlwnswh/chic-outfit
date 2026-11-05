# ChicOutfit

Aplikasi katalog pakaian berbasis React yang menampilkan data dari public API. Dibuat sebagai tugas individu materi React Routing, State Management, Data Fetching, dan Application Architecture.

- Website: https://chicoutfit.byhilwa.my.id/
- Repository: https://github.com/hlwnswh/chic-outfit

## Teknologi
React, React Router, Vite, JavaScript, Context API, DummyJSON API

## Fitur
- Katalog outfit dengan search, filter kategori, sorting, dan pagination
- Halaman detail produk berdasarkan ID di URL
- Tambah, edit, dan hapus produk (tersimpan di localStorage)
- Favorit (tersimpan di localStorage)
- Form dengan validasi input
- Loading, pesan error (dengan tombol coba lagi), dan empty state
- Halaman 404

## Routing
Memakai React Router dengan client-side routing, jadi pindah halaman tanpa reload penuh.
- `/` : beranda
- `/katalog` : daftar produk
- `/katalog/:id` : detail produk (dynamic route)
- `/tambah` : form tambah produk
- `/edit/:id` : form edit produk (dynamic route)
- `/favorit` : daftar favorit
- `*` : halaman 404

Semua halaman berada di dalam `Layout` (nested route) yang menampilkan isi halaman lewat `<Outlet />`.

## State Management
- **Local state**: `useState` untuk kondisi komponen dan input form.
- **Global state**: Context API lewat `ProductContext` (data produk) dan `FavoriteContext` (favorit).
- **Server state**: data produk diambil dari API dan dikelola di `ProductContext` (loading, error, data).
- **URL state**: search, kategori, urutan, dan halaman disimpan di URL lewat `useSearchParams` (contoh: `/katalog?q=kemeja&urut=lowest&hal=2`).
- **Form state**: controlled components dengan validasi di halaman tambah dan edit produk.

## Data Fetching
Data diambil dari DummyJSON (`https://dummyjson.com/products/category/...`) memakai `fetch`. Kode pemanggilan API dipisah di `src/services/productService.js`. Aplikasi menangani tiga kondisi: loading, error, dan data kosong.

## Custom Hook
- `useProducts`: mengambil data dan fungsi produk dari `ProductContext`.

## Reusable Components
`ProductCard`, `Layout`, `Sidebar`, `Pagination`, `FormField`

## Struktur Folder

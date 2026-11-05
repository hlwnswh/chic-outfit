import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoriteProvider } from './context/FavoriteContext';
import { ProductProvider } from './context/ProductContext';
import Layout from './components/Layout';
import HomeView from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Favorites from './pages/Favorites';
import Ekspor from './pages/Ekspor';

export default function App() {
  return (
    <FavoriteProvider>
      <ProductProvider>
        <Router>
          <Routes>
            {/* Route induk: semua halaman tampil di dalam Layout */}
            <Route element={<Layout />}>
            <Route path="*" element={<h2 style={{ padding: 16 }}>Halaman tidak ditemukan</h2>} />
              <Route path="/" element={<HomeView />} />

              {/* Nested route: /katalog dan /katalog/:id */}
              <Route path="katalog">
                <Route index element={<Catalog />} />
                <Route path=":id" element={<ProductDetail />} />
              </Route>

              <Route path="tambah" element={<AddProduct />} />
              <Route path="edit/:id" element={<EditProduct />} />
              <Route path="favorit" element={<Favorites />} />
              <Route path="ekspor" element={<Ekspor />} />
            </Route>
          </Routes>
        </Router>
      </ProductProvider>
    </FavoriteProvider>
  );
}
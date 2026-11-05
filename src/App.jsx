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

export default function App() {
  return (
    <FavoriteProvider>
      <ProductProvider>
        <Router>
          <Routes>
            {/* Route induk: semua halaman tampil di dalam Layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomeView />} />

              {/* Nested route: /katalog dan /katalog/:id */}
              <Route path="katalog">
                <Route index element={<Catalog />} />
                <Route path=":id" element={<ProductDetail />} />
              </Route>

              <Route path="tambah" element={<AddProduct />} />
              <Route path="edit/:id" element={<EditProduct />} />
              <Route path="favorit" element={<Favorites />} />
            </Route>
          </Routes>
        </Router>
      </ProductProvider>
    </FavoriteProvider>
  );
}
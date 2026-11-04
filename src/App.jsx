import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FavoriteProvider, useFavorites } from './context/FavoriteContext';
import { Heart, PlusCircle, Home, Layers } from 'lucide-react';
import HomeView from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import Favorites from './pages/Favorites';

function SidebarNavbar() {
  const { favorites } = useFavorites();
  const location = useLocation();

  return (
    <aside className="sidebar">
  <div className="logo">
    <div className="logo-icon">✨</div>
    <div>
      <h2>ChicOutfit</h2>
      <p>by Hilwa Hilyatun Niswah</p>
    </div>
  </div>

      <div className="menu-title">MENU UTAMA</div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
        >
          <Home size={20} />
          <span>Beranda</span>
        </Link>

        <Link 
          to="/katalog" 
          className={`nav-link ${location.pathname.startsWith('/katalog') ? 'active' : ''}`}
          style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
        >
          <Layers size={20} />
          <span>Katalog</span>
        </Link>

        <Link 
          to="/tambah" 
          className={`nav-link ${location.pathname === '/tambah' ? 'active' : ''}`}
          style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
        >
          <PlusCircle size={20} />
          <span>Tambah Produk</span>
        </Link>

        <Link 
          to="/favorit" 
          className={`nav-link ${location.pathname === '/favorit' ? 'active' : ''}`}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Heart size={20} />
            <span>Favorit</span>
          </div>
          {favorites.length > 0 && (
            <span style={{
              background: '#829d7c',
              color: 'white',
              borderRadius: '50%',
              width: '22px',
              height: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}>
              {favorites.length}
            </span>
          )}
        </Link>
      </nav>

      <div className="profile-card" style={{ marginTop: 'auto' }}>
        <h4>Koleksi Eksklusif</h4>
      </div>
    </aside>
  );
}

export default function App() {
  return (
    <FavoriteProvider>
      <Router>
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
          <SidebarNavbar />
          <main className="main-content" style={{ flex: 1, minWidth: 0 }}>
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/katalog" element={<Catalog />} />
              <Route path="/katalog/:id" element={<ProductDetail />} />
              <Route path="/tambah" element={<AddProduct />} />
              <Route path="/favorit" element={<Favorites />} />
            </Routes>
          </main>
        </div>
      </Router>
    </FavoriteProvider>
  );
}
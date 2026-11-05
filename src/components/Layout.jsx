import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

// Layout utama: sidebar tetap, isi halaman berganti lewat <Outlet />
export default function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <Sidebar />
      <main className="main-content" style={{ flex: 1, minWidth: 0 }}>
        <Outlet />
      </main>
    </div>
  );
}
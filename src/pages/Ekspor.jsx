import { useState } from 'react';

const bacaSemua = () => {
  try {
    const hasil = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      hasil[key] = localStorage.getItem(key);
    }
    return Object.keys(hasil).length
      ? JSON.stringify(hasil, null, 2)
      : 'Tidak ada data di browser ini.';
  } catch {
    return 'Gagal membaca penyimpanan browser.';
  }
};

export default function Ekspor() {
  const [tersalin, setTersalin] = useState(false);
  const data = bacaSemua();

  const handleSalin = async () => {
    try {
      await navigator.clipboard.writeText(data);
      setTersalin(true);
    } catch {
      // kalau gagal, salin manual dari kotak teks
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Ekspor data</h2>
      <textarea readOnly value={data} rows={15} style={{ width: '100%' }} />
      <button onClick={handleSalin}>{tersalin ? 'Tersalin!' : 'Salin'}</button>
    </div>
  );
}
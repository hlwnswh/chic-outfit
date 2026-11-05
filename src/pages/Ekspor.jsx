import { useState } from 'react';

export default function Ekspor() {
  const [tersalin, setTersalin] = useState(false);
  const data =
    localStorage.getItem('chic_outfit_overrides_v1') ||
    'Tidak ada data di browser ini.';

  const handleSalin = async () => {
    try {
      await navigator.clipboard.writeText(data);
      setTersalin(true);
    } catch {
      // kalau gagal, data bisa disalin manual dari kotak teks
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
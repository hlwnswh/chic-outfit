import { useState } from 'react';

export default function Ekspor() {
  const [tersalin, setTersalin] = useState(false);

  const data =
    localStorage.getItem('chic_outfit_overrides_v1') ||
    'Data tidak ditemukan';

  const handleSalin = async () => {
    await navigator.clipboard.writeText(data);
    setTersalin(true);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Ekspor Outfit Tambahan</h2>
      <textarea
        readOnly
        value={data}
        rows={20}
        style={{ width: '100%' }}
      />
      <button onClick={handleSalin}>
        {tersalin ? 'Tersalin!' : 'Salin Data'}
      </button>
    </div>
  );
}
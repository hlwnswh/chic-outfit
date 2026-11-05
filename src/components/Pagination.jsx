import Pagination from '../components/Pagination';
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pageButton = (active, disabled) => ({
    padding: '0.5rem 0.9rem',
    borderRadius: '10px',
    border: '1px solid #e2e8df',
    background: active ? '#849b88' : 'white',
    color: active ? 'white' : '#2d372e',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    font: 'inherit'
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem', flexWrap: 'wrap' }}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        style={pageButton(false, currentPage === 1)}
      >
        ‹ Sebelumnya
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button key={n} onClick={() => onPageChange(n)} style={pageButton(n === currentPage, false)}>
          {n}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={pageButton(false, currentPage === totalPages)}
      >
        Selanjutnya ›
      </button>
    </div>
  );
}
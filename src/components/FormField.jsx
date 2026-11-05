export default function FormField({ label, error, as = 'input', children, ...props }) {
  const Tag = as;

  return (
    <div>
      <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.9rem' }}>
        {label}
      </label>
      <Tag
        {...props}
        style={{
          width: '100%',
          padding: '0.75rem',
          borderRadius: '10px',
          border: error ? '1px solid #ef4444' : '1px solid #e2e8df',
          outline: 'none',
          backgroundColor: 'white',
          font: 'inherit'
        }}
      >
        {children}
      </Tag>
      {error && (
        <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'inline-block' }}>
          {error}
        </span>
      )}
    </div>
  );
}
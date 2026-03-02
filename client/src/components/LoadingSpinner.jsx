const LoadingSpinner = ({ size = 'md', text = '' }) => {
  const sizes = { sm: 20, md: 40, lg: 60 };
  const s = sizes[size] || sizes.md;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 40 }}>
      <div style={{
        width: s, height: s,
        border: `3px solid rgba(52, 43, 238, 0.2)`,
        borderTopColor: '#342bee',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      {text && <p style={{ color: '#94a3b8', fontSize: 14, fontWeight: 500 }}>{text}</p>}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default LoadingSpinner;

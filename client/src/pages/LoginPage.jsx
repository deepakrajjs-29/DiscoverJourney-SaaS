const LoginPage = () => {
  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL || '/api';
    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)' }}>
      {/* Header */}
      <header style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ width: 32, height: 32, background: '#342bee', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12, color: 'white' }}>DJ</div>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>DiscoverJourney</h2>
      </header>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ width: '100%', maxWidth: 440, borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}>
          {/* Top gradient section */}
          <div style={{
            height: 200, background: 'linear-gradient(to bottom, #1a1a2e, var(--bg-dark-surface))',
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
          }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, background: 'radial-gradient(circle at center, #342bee, transparent 70%)' }} />
            <div style={{ fontSize: 64, fontWeight: 900, color: 'white', opacity: 0.9, position: 'relative', zIndex: 1 }}>DJ</div>
          </div>

          {/* Content */}
          <div style={{ padding: '16px 40px 40px', background: 'var(--bg-dark-surface)' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.5px', marginBottom: 12 }}>Start Your DiscoverJourney</h1>
              <p style={{ color: '#94a3b8', fontSize: 15 }}>Build your LinkedIn authority with AI-powered insights.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <button onClick={handleGoogleLogin} className="btn-google">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 2 }}>Secure Entry</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
              </div>

              <p style={{ fontSize: 12, color: '#64748b', textAlign: 'center', lineHeight: 1.6 }}>
                By continuing, you agree to our <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Terms of Service</a> and <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</a>.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, fontSize: 11, fontWeight: 600, color: '#64748b' }}>
                <span>🔒 Encrypted</span>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <span>⚡ Fast Access</span>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <span>🛡️ Verified</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer style={{ padding: 32, textAlign: 'center' }}>
        <p style={{ fontSize: 18, fontStyle: 'italic', color: '#94a3b8', fontWeight: 500 }}>"Your journey is yours. We only help you structure it."</p>
        <p style={{ fontSize: 11, color: '#475569', marginTop: 24, fontWeight: 500, letterSpacing: 1 }}>© 2025 DISCOVERJOURNEY INC. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

export default LoginPage;

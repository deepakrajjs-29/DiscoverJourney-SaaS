import { Link } from 'react-router-dom';
import { FiEdit3, FiFileText, FiEye, FiPieChart } from 'react-icons/fi';

const LandingPage = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(11, 10, 26, 0.8)', backdropFilter: 'blur(12px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, background: '#342bee', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14, color: 'white' }}>DJ</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.5px' }}>DiscoverJourney</h2>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hide-mobile">
            <a href="#features" style={{ fontSize: 14, fontWeight: 500, color: '#94a3b8', textDecoration: 'none' }}>Features</a>
            <a href="#about" style={{ fontSize: 14, fontWeight: 500, color: '#94a3b8', textDecoration: 'none' }}>About</a>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link to="/login" style={{ fontSize: 14, fontWeight: 600, color: '#94a3b8', textDecoration: 'none' }} className="hide-mobile">Log In</Link>
            <Link to="/login" className="btn-primary" style={{ padding: '10px 24px' }}>Start Your Journey</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main style={{ flex: 1 }}>
        <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 100px' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50%', height: '50%', background: 'rgba(52, 43, 238, 0.15)', filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50%', height: '50%', background: 'rgba(99, 102, 241, 0.1)', filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: 60, position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32, textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, background: 'rgba(52, 43, 238, 0.1)', border: '1px solid rgba(52, 43, 238, 0.2)', alignSelf: 'center' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#342bee', animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#342bee', textTransform: 'uppercase', letterSpacing: 2 }}>AI-Powered Platform</span>
              </div>
              <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-2px' }}>
                Stop Posting. <br />
                <span style={{ background: 'linear-gradient(135deg, #342bee, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Start Positioning.</span>
              </h1>
              <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#94a3b8', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
                The AI-powered platform to build LinkedIn authority and visibility. Move beyond noise and start building a professional legacy that gets you hired.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', paddingTop: 16 }}>
                <Link to="/login" className="btn-primary" style={{ height: 56, padding: '0 32px', display: 'flex', alignItems: 'center', fontSize: 18, borderRadius: 14, boxShadow: '0 8px 30px rgba(52, 43, 238, 0.3)' }}>
                  Start Your Journey
                </Link>
                <a href="#features" className="btn-secondary" style={{ height: 56, padding: '0 32px', display: 'flex', alignItems: 'center', textDecoration: 'none', fontSize: 18, borderRadius: 14 }}>
                  Explore DiscoverJourney
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quote */}
        <section style={{ background: 'rgba(15, 23, 42, 0.5)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '40px 24px' }}>
          <p style={{ fontSize: 'clamp(16px, 2.5vw, 22px)', fontWeight: 500, textAlign: 'center', fontStyle: 'italic', color: '#cbd5e1', maxWidth: 800, margin: '0 auto' }}>
            "In the digital age, your personal brand is your resume's loudest voice."
            <span style={{ display: 'block', marginTop: 12, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: '#342bee', fontStyle: 'normal' }}>— Authority Positioning Principle</span>
          </p>
        </section>

        {/* Features */}
        <section id="features" style={{ padding: '100px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, marginBottom: 24, letterSpacing: '-1px' }}>
              You're Not Invisible. <br className="hide-mobile" />
              You're Just <span style={{ color: '#342bee', textDecoration: 'underline', textDecorationColor: 'rgba(52, 43, 238, 0.3)', textUnderlineOffset: 8 }}>Unpositioned.</span>
            </h2>
            <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 700, margin: '0 auto', lineHeight: 1.7 }}>
              Traditional job applications are a lottery. Authority positioning is a strategy.
            </p>
          </div>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {[
              { icon: <FiEdit3 />, title: 'Authority Content Engine', desc: 'Generate high-impact posts that position you as an industry thought leader using our fine-tuned AI.' },
              { icon: <FiFileText />, title: 'Resume Analyzer', desc: 'Align your profile with top-tier industry standards and optimize for ATS keyword matching.' },
              { icon: <FiEye />, title: 'Visibility Intelligence', desc: 'Understand which themes build your brand and expand your digital reach.' },
              { icon: <FiPieChart />, title: 'Authority Dashboard', desc: 'A centralized command center to manage your growth, content schedule, and strategy.' },
            ].map((feat, i) => (
              <div key={i} className="glass-card" style={{ padding: 32, transition: 'all 0.3s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(52, 43, 238, 0.05)'; e.currentTarget.style.borderColor = 'rgba(52, 43, 238, 0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.borderColor = ''; }}
              >
                <div style={{ fontSize: 32, marginBottom: 20, color: '#818cf8', display: 'flex' }}>{feat.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{feat.title}</h3>
                <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.7 }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '60px 24px 100px' }}>
          <div className="glass-card" style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(40px, 6vw, 80px)', textAlign: 'center', position: 'relative', overflow: 'hidden', borderRadius: 24 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(52, 43, 238, 0.1), transparent)', pointerEvents: 'none' }} />
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, marginBottom: 24, position: 'relative', zIndex: 1, letterSpacing: '-1px' }}>
              Ready to claim your <br className="hide-mobile" /> professional space?
            </h2>
            <p style={{ fontSize: 18, color: '#94a3b8', marginBottom: 40, maxWidth: 600, margin: '0 auto 40px', position: 'relative', zIndex: 1, lineHeight: 1.6 }}>
              Join the next generation of professionals who don't just apply for jobs—they are sought after by employers.
            </p>
            <Link to="/login" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', height: 56, padding: '0 40px', fontSize: 18, borderRadius: 14, position: 'relative', zIndex: 1, boxShadow: '0 8px 30px rgba(52, 43, 238, 0.4)' }}>
              Start Your Journey
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '48px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, background: '#342bee', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 11, color: 'white' }}>DJ</div>
            <span style={{ fontWeight: 700 }}>DiscoverJourney</span>
          </div>
          <div style={{ display: 'flex', gap: 32, fontSize: 14, color: '#64748b' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
          </div>
          <p style={{ fontSize: 13, color: '#475569' }}>© {new Date().getFullYear()} DiscoverJourney. Independent product. Serious results.</p>
        </div>
      </footer>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
    </div>
  );
};

export default LandingPage;

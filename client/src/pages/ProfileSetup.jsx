import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../services/api';

const ProfileSetup = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    university: user?.university || '',
    degree: user?.degree || '',
    yearOfStudy: user?.yearOfStudy || '',
    domainFocus: user?.domainFocus || '',
    targetRole: user?.targetRole || '',
    careerAim: user?.careerAim || '',
    coreSkills: user?.coreSkills?.join(', ') || '',
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        coreSkills: form.coreSkills.split(',').map(s => s.trim()).filter(Boolean),
      };
      await updateProfile(payload);
      await refreshUser();
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const completeness = [form.fullName, form.university, form.degree, form.domainFocus].filter(Boolean).length;
  const pct = Math.round((completeness / 4) * 100);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(11,10,26,0.8)', backdropFilter: 'blur(12px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, background: 'white', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14, color: '#111022' }}>DJ</div>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>DiscoverJourney</h2>
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 24px' }}>
        <div style={{ maxWidth: 700, width: '100%', display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* Header */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#342bee', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 8 }}>Welcome to DiscoverJourney</p>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, fontStyle: 'italic', color: '#342bee', marginBottom: 24 }}>
              'Define yourself before the world defines you.'
            </h2>
            <div style={{ maxWidth: 400, margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                <span style={{ color: '#94a3b8' }}>Profile Completion</span>
                <span style={{ color: '#342bee' }}>{pct}%</span>
              </div>
              <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${pct}%` }} /></div>
            </div>
          </div>

          {/* Form Card */}
          <div className="glass-card" style={{ padding: 32, boxShadow: '0 0 40px -10px rgba(52, 43, 238, 0.3)' }}>
            <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>Build Your Authority</h3>
            <p style={{ color: '#94a3b8', marginBottom: 32 }}>Let AI help you stand out on LinkedIn by completing your profile.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Photo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: 24, background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px dashed rgba(255,255,255,0.1)' }}>
                <img src={user?.profilePhoto || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.fullName || 'U')} alt="Profile" style={{ width: 80, height: 80, borderRadius: '50%', border: '3px solid rgba(52, 43, 238, 0.2)', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: 4 }}>Profile Photo</h4>
                  <p style={{ fontSize: 13, color: '#94a3b8' }}>Connected from Google account</p>
                </div>
              </div>

              {/* Fields grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
                <div>
                  <label className="field-label">Full Name</label>
                  <input className="input-field" name="fullName" value={form.fullName} onChange={handleChange} placeholder="e.g. Alex Rivera" />
                </div>
                <div>
                  <label className="field-label">University</label>
                  <input className="input-field" name="university" value={form.university} onChange={handleChange} placeholder="e.g. Stanford University" />
                </div>
                <div>
                  <label className="field-label">Degree / Major</label>
                  <input className="input-field" name="degree" value={form.degree} onChange={handleChange} placeholder="e.g. B.S. Computer Science" />
                </div>
                <div>
                  <label className="field-label">Domain Focus</label>
                  <select className="select-field" name="domainFocus" value={form.domainFocus} onChange={handleChange}>
                    <option value="">Select your field</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Product Design">Product Design</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="FinTech & Finance">FinTech & Finance</option>
                    <option value="Data Science & AI">Data Science & AI</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="field-label">Target Role</label>
                  <input className="input-field" name="targetRole" value={form.targetRole} onChange={handleChange} placeholder="e.g. Software Engineer Intern" />
                </div>
                <div>
                  <label className="field-label">Year of Study</label>
                  <select className="select-field" name="yearOfStudy" value={form.yearOfStudy} onChange={handleChange}>
                    <option value="">Select year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="field-label">Core Skills (comma-separated)</label>
                <input className="input-field" name="coreSkills" value={form.coreSkills} onChange={handleChange} placeholder="e.g. React, Python, Machine Learning" />
              </div>

              <div>
                <label className="field-label">Career Aim</label>
                <textarea className="textarea-field" name="careerAim" value={form.careerAim} onChange={handleChange} placeholder="Describe your career goals..." rows={3} style={{ height: 80 }} />
              </div>

              {/* AI Ready Tip */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: 20, background: 'rgba(52, 43, 238, 0.05)', border: '1px solid rgba(52, 43, 238, 0.2)', borderRadius: 12 }}>
                <span style={{ fontSize: 24 }}>✨</span>
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: 4 }}>AI Optimization Ready</h4>
                  <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>
                    Once you complete this step, our AI will analyze your focus to draft a compelling LinkedIn headline.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 16 }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, height: 48, fontSize: 16 }} disabled={loading}>
                  {loading ? 'Saving...' : 'Continue to Dashboard →'}
                </button>
                <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')} style={{ height: 48, padding: '0 24px' }}>
                  Skip for Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSetup;

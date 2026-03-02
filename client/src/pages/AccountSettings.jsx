import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile, exportUserData, deleteAccount } from '../services/api';

const AccountSettings = () => {
  const { user, setUser, logout } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    domainFocus: user?.domainFocus || '',
    targetRole: user?.targetRole || '',
    coreSkills: user?.coreSkills?.join(', ') || '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const skillsArray = formData.coreSkills.split(',').map(s => s.trim()).filter(Boolean);
      const res = await updateProfile({ ...formData, coreSkills: skillsArray });
      setUser(res.data.user);
      setMessage('Profile updated successfully.');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async () => {
    try {
      const response = await exportUserData();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'discoverjourney_data.json');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      setError('Failed to export data.');
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
      return;
    }
    try {
      await deleteAccount();
      await logout();
    } catch (err) {
      setError('Failed to delete account.');
    }
  };

  return (
    <div className="fade-in" style={{ padding: 32, maxWidth: 800, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-1px' }}>Account Settings</h2>
        <p style={{ color: '#94a3b8', fontSize: 16, marginTop: 4 }}>Manage your profile, preferences, and data.</p>
      </div>

      {message && (
        <div style={{ padding: 16, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: 12, marginBottom: 24, border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          {message}
        </div>
      )}
      {error && (
        <div style={{ padding: 16, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 12, marginBottom: 24, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          {error}
        </div>
      )}

      {/* Edit Profile */}
      <div className="glass-card" style={{ padding: 32, marginBottom: 24 }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Profile Details</h3>
        <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 8 }}>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="input-field" required />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 8 }}>Domain Focus</label>
            <input type="text" name="domainFocus" value={formData.domainFocus} onChange={handleChange} className="input-field" placeholder="e.g. AI Engineering, Digital Marketing" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 8 }}>Target Role</label>
            <input type="text" name="targetRole" value={formData.targetRole} onChange={handleChange} className="input-field" placeholder="e.g. Junior Product Manager" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 8 }}>Core Skills (comma separated)</label>
            <input type="text" name="coreSkills" value={formData.coreSkills} onChange={handleChange} className="input-field" placeholder="e.g. React, Node.js, System Design" />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
            <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '12px 24px' }}>
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>

      {/* Data & Privacy */}
      <div className="glass-card" style={{ padding: 32 }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Data & Privacy</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div>
            <h4 style={{ fontWeight: 600, fontSize: 16 }}>Export My Data</h4>
            <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>Download a JSON copy of all your profile, content, and system data.</p>
          </div>
          <button onClick={handleExportData} className="btn-secondary" style={{ padding: '8px 16px', fontSize: 14 }}>Export JSON</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24 }}>
          <div>
            <h4 style={{ fontWeight: 600, fontSize: 16, color: '#ef4444' }}>Delete Account</h4>
            <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>Permanently delete your account and all associated data.</p>
          </div>
          <button onClick={handleDeleteAccount} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;

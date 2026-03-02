import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiPieChart, FiEdit3, FiFileText, FiActivity, FiEye, FiSettings, FiLogOut } from 'react-icons/fi';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: <FiPieChart /> },
  { path: '/content-engine', label: 'Content Engine', icon: <FiEdit3 /> },
  { path: '/formatting-lab', label: 'Formatting Lab', icon: <FiActivity /> },
  { path: '/resume-analyzer', label: 'Resume Analyzer', icon: <FiFileText /> },
  { path: '/visibility', label: 'Visibility Intel', icon: <FiEye /> },
  { path: '/account', label: 'Account Settings', icon: <FiSettings /> },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <aside style={{
      width: 260,
      minHeight: '100vh',
      background: '#0d0c1a',
      borderRight: '1px solid rgba(52, 43, 238, 0.15)',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 40,
    }}>
      {/* Logo */}
      <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 40, height: 40, background: 'var(--bg-dark)',
          borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(52, 43, 238, 0.2)', fontSize: 18, fontWeight: 900,
          color: 'white',
        }}>DJ</div>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.5px' }}>DiscoverJourney</h1>
          <p style={{ fontSize: 11, color: 'rgba(52, 43, 238, 0.6)', fontWeight: 500 }}>AI Authority Builder</p>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 14px', borderRadius: 10, fontSize: 14, fontWeight: 500,
              textDecoration: 'none', transition: 'all 0.2s',
              background: isActive ? 'rgba(52, 43, 238, 0.1)' : 'transparent',
              color: isActive ? '#342bee' : '#94a3b8',
              border: isActive ? '1px solid rgba(52, 43, 238, 0.2)' : '1px solid transparent',
            })}
          >
            <span style={{ fontSize: 18, display: 'flex', alignItems: 'center' }}>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div style={{
        padding: '16px', borderTop: '1px solid rgba(52, 43, 238, 0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
          <img
            src={user?.profilePhoto || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.fullName || 'U')}
            alt="Profile"
            style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid rgba(52, 43, 238, 0.3)', objectFit: 'cover' }}
          />
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.fullName || 'User'}</p>
            <p style={{ fontSize: 11, color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.domainFocus || 'Student'}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          title="Logout"
          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 18, padding: 4, display: 'flex', alignItems: 'center' }}
        ><FiLogOut /></button>
      </div>
    </aside>
  );
};

export default Sidebar;

import { useState, useEffect } from 'react';
import { getDashboard } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: d } = await getDashboard();
        setData(d);
      } catch (err) {
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <LoadingSpinner text="Loading dashboard..." />;
  if (!data) return <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>Failed to load dashboard data.</div>;

  const scoreCards = [
    { label: 'Market Position Score', value: data.marketPositionScore, max: 100, suffix: '/100' },
    { label: 'Profile Strength', value: data.profileStrength, suffix: '%' },
    { label: 'Visibility Score', value: `${data.visibilityScore}%`, raw: data.visibilityScore },
  ];

  return (
    <div className="fade-in" style={{ padding: 32 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h2 style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-1px' }}>Authority Dashboard</h2>
          <p style={{ color: '#94a3b8', fontSize: 16, marginTop: 4 }}>Track your market position and visibility growth.</p>
        </div>
      </div>

      {!data.hasActivity ? (
        <div style={{ padding: '60px 24px', textAlign: 'center', background: 'rgba(52, 43, 238, 0.05)', borderRadius: 24, border: '1px solid rgba(52, 43, 238, 0.2)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌱</div>
          <h3 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginBottom: 12 }}>No data available yet</h3>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>Complete your profile or generate content to unlock insights and start building your authority score.</p>
        </div>
      ) : (
        <>
          {/* Banner */}
          <div style={{
            borderRadius: 16, padding: 32, marginBottom: 32,
            background: 'linear-gradient(135deg, #342bee, #6366f1, #342bee)',
            color: 'white', position: 'relative', overflow: 'hidden',
          }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, fontStyle: 'italic' }}>"Small improvements. Massive visibility."</h3>
            <p style={{ marginTop: 8, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
              Keep consistent. Your authority score is {data.stats.authorityScore || 0}.
            </p>
          </div>

          {/* Score Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 32 }}>
            {scoreCards.map((card, i) => (
              <div key={i} className="score-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ color: '#94a3b8', fontWeight: 500 }}>{card.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 36, fontWeight: 700 }}>{typeof card.value === 'number' ? card.value : card.value}</span>
                  {card.suffix && typeof card.value === 'number' && <span style={{ color: '#64748b' }}>{card.suffix}</span>}
                </div>
                <div className="progress-bar" style={{ marginTop: 16 }}>
                  <div className="progress-bar-fill" style={{ width: `${card.raw || card.value || 0}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
            {/* Visibility Plan */}
            <div className="glass-card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Visibility Plan</h3>
              <p style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>AI recommendations for this week</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {data.suggestedContentFocus.map((item, i) => (
                  <div key={i} style={{
                    padding: 16, borderRadius: 12,
                    background: i === 0 ? 'rgba(52, 43, 238, 0.1)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${i === 0 ? 'rgba(52, 43, 238, 0.2)' : 'rgba(255,255,255,0.05)'}`,
                  }}>
                    <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.title}</p>
                    <p style={{ fontSize: 12, color: '#94a3b8' }}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Authority Moves Table */}
            <div className="glass-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700 }}>This Week's Authority Moves</h3>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      {['Activity', 'Status', 'Impact', 'Points'].map(h => (
                        <th key={h} style={{ textAlign: h === 'Points' ? 'right' : 'left', padding: '0 0 16px', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.weeklyAuthorityMoves.map((move, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '16px 0' }}>
                          <span style={{ fontSize: 14, fontWeight: 500 }}>{move.activity}</span>
                        </td>
                        <td style={{ padding: '16px 0' }}>
                          <span className={`badge badge-${move.status === 'Completed' ? 'success' : move.status === 'In Progress' ? 'info' : 'muted'}`}>
                            {move.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px 0', fontSize: 13, color: '#94a3b8' }}>{move.impact}</td>
                        <td style={{ padding: '16px 0', textAlign: 'right', fontWeight: 700, color: move.points > 0 ? '#342bee' : '#64748b' }}>
                          {move.points > 0 ? `+${move.points}` : '--'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

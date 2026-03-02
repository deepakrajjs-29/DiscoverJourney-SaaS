import { useState, useEffect } from 'react';
import { getVisibilityInsights } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const VisibilityIntel = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: d } = await getVisibilityInsights();
        setData(d);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <LoadingSpinner text="Loading visibility insights..." />;
  if (!data) return <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>Failed to load</div>;

  return (
    <div className="fade-in" style={{ padding: 32 }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-1px' }}>Visibility Intelligence</h2>
        <p style={{ color: '#64748b', fontSize: 16, marginTop: 4 }}>AI-powered insights to maximize your LinkedIn reach and student authority.</p>
      </div>

      {/* Stats Cards */}
      {!data.hasActivity ? (
        <div style={{ padding: '60px 24px', textAlign: 'center', background: 'rgba(52, 43, 238, 0.05)', borderRadius: 24, border: '1px solid rgba(52, 43, 238, 0.2)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>👁️</div>
          <h3 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginBottom: 12 }}>No visibility data yet</h3>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>Generate some posts or set up your domain focus to unlock audience insights and best posting times.</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
            <div className="glass-card" style={{ padding: 24, borderColor: 'rgba(52, 43, 238, 0.2)' }}>
              <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Avg. Reach</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 28, fontWeight: 700 }}>{data.stats.avgReach}</span>
                {data.stats.avgReachChange !== 0 && (
                  <span className={`badge ${data.stats.avgReachChange >= 0 ? 'badge-success' : 'badge-warning'}`}>
                    {data.stats.avgReachChange > 0 ? '+' : ''}{data.stats.avgReachChange}%
                  </span>
                )}
              </div>
            </div>
            <div className="glass-card" style={{ padding: 24, borderColor: 'rgba(52, 43, 238, 0.2)' }}>
              <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Engagement Rate</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 28, fontWeight: 700 }}>{data.stats.engagementRate}</span>
                {data.stats.engagementChange !== 0 && (
                  <span className={`badge ${data.stats.engagementChange >= 0 ? 'badge-success' : 'badge-warning'}`}>
                    {data.stats.engagementChange > 0 ? '+' : ''}{data.stats.engagementChange}%
                  </span>
                )}
              </div>
            </div>
            <div className="glass-card" style={{ padding: 24, borderColor: 'rgba(52, 43, 238, 0.2)' }}>
              <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Best Post Type</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 28, fontWeight: 700 }}>{data.stats.bestPostType}</span>
                <span>✨</span>
              </div>
            </div>
          </div>
    
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {/* Left column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Post Types */}
              <div className="glass-card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>High-Performing Post Types</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {data.highPerformingPostTypes.map((pt, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 16, padding: 16,
                      background: 'rgba(255,255,255,0.03)', borderRadius: 12,
                      border: '1px solid transparent', cursor: 'pointer', transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(52, 43, 238, 0.3)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
                    >
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: `rgba(99, 102, 241, 0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                        {pt.icon === 'school' ? '🎓' : pt.icon === 'terminal' ? '💻' : pt.icon === 'group' ? '👥' : '↔️'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontWeight: 700, fontSize: 14 }}>{pt.title}</h4>
                        <p style={{ fontSize: 12, color: '#94a3b8' }}>{pt.description}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: 14, fontWeight: 700, color: '#10b981' }}>{pt.matchScore}% Match</p>
                        <p style={{ fontSize: 11, color: '#64748b' }}>{pt.growth}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
    
              {/* Hook Frameworks */}
              <div className="glass-card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Hook Frameworks</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {data.hookFrameworks.map((hf, i) => (
                    <div key={i} style={{ padding: 16, background: 'rgba(52, 43, 238, 0.1)', borderRadius: 12, border: '1px solid rgba(52, 43, 238, 0.2)' }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: '#342bee', textTransform: 'uppercase', marginBottom: 8 }}>{hf.name}</p>
                      <p style={{ fontSize: 13, fontStyle: 'italic', color: '#cbd5e1', lineHeight: 1.5 }}>{hf.template}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
    
            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Best Posting Times */}
              <div className="glass-card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>⏰ Best Posting Time</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                  {data.bestPostingTimes.map((pt, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 14 }}>{pt.day}</span>
                      <span className="badge badge-primary" style={{ fontWeight: 700, fontSize: 13, padding: '6px 12px' }}>{pt.time}</span>
                    </div>
                  ))}
                </div>
                {/* Mini bar chart */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 96, marginTop: 8 }}>
                  {data.weeklyEngagement.map((v, i) => (
                    <div key={i} style={{ flex: 1, background: `rgba(52, 43, 238, ${0.1 + (v / 100) * 0.6})`, height: `${v}%`, borderRadius: '4px 4px 0 0', transition: 'height 0.5s ease' }} />
                  ))}
                </div>
                <p style={{ fontSize: 11, textAlign: 'center', color: '#64748b', marginTop: 8 }}>Peak engagement hours for your audience</p>
              </div>
    
              {/* Weekly Plan */}
              <div className="glass-card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📅 Weekly Plan</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {data.weeklyPlanTemplate.map((wp, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: i === 0 ? '#342bee' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0, color: i === 0 ? 'white' : '#94a3b8' }}>
                        {wp.day.slice(0, 2)}
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600 }}>{wp.day}</p>
                        <p style={{ fontSize: 12, color: '#94a3b8' }}>{wp.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
    
              {/* Content Themes */}
              <div className="glass-card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🎯 Content Themes</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {data.contentThemes.map((ct, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{ct.theme}</span>
                      <span className={`badge ${ct.priority === 'high' ? 'badge-primary' : 'badge-muted'}`}>{ct.frequency}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VisibilityIntel;

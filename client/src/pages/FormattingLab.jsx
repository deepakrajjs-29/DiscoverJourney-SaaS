import { useState } from 'react';
import { formatContent } from '../services/api';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';

const FormattingLab = () => {
  const [activeTab, setActiveTab] = useState('editor'); // editor, templates, hooks
  const [rawText, setRawText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormat = async () => {
    if (!rawText.trim()) return setError('Please enter some text');
    setLoading(true);
    setError('');
    try {
      const { data } = await formatContent({ rawText });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to format content');
    } finally {
      setLoading(false);
    }
  };

  const useTemplate = (text) => {
    setRawText(text);
    setActiveTab('editor');
  };

  const templates = [
    { title: 'The Project Reveal', text: 'I just finished building [Project Name].\n\nHere are the top 3 technical challenges I faced:\n1.\n2.\n3.\n\nCode link in the comments.' },
    { title: 'The Career Update', text: 'I’m excited to share that I’ll be joining [Company] as a [Role].\n\nA huge thank you to [Tag Person] for the guidance. Can’t wait to get started!' },
  ];

  const hooks = [
    { title: 'Contrarian Opening', text: '"Everyone told me [Popular Advice] was true. They were wrong."' },
    { title: 'Data-Backed Claim', text: '"I analyzed 100 [Subject] in my field. Here is the #1 thing top performers do differently..."' },
    { title: 'The Journey Hook', text: '"3 months ago, I didn’t know how to [Skill]. Today, I just shipped my first [Result]."' },
  ];

  const formattedFull = result ? `${result.boldConvertedText || result.formattedLinkedInText || ''}\n\n${(result.optimizedHashtags || []).map(h => h.startsWith('#') ? h : '#' + h).join(' ')}` : '';

  return (
    <div className="fade-in" style={{ padding: 32 }}>
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#64748b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
          <span>Home</span> <span>›</span> <span style={{ color: '#342bee' }}>Formatting Lab</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h2 style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-1px' }}>Formatting Lab</h2>
            <p style={{ color: '#94a3b8', fontSize: 16, marginTop: 4 }}>Transform your drafts into high-authority LinkedIn posts with AI-driven optimization.</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: 32, marginTop: 16 }}>
        <button onClick={() => setActiveTab('editor')} style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, borderBottom: activeTab === 'editor' ? '2px solid #342bee' : 'none', color: activeTab === 'editor' ? '#342bee' : '#64748b', background: 'none', cursor: 'pointer' }}>📝 Post Editor</button>
        <button onClick={() => setActiveTab('templates')} style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, borderBottom: activeTab === 'templates' ? '2px solid #342bee' : 'none', color: activeTab === 'templates' ? '#342bee' : '#64748b', background: 'none', cursor: 'pointer' }}>📋 Templates</button>
        <button onClick={() => setActiveTab('hooks')} style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, borderBottom: activeTab === 'hooks' ? '2px solid #342bee' : 'none', color: activeTab === 'hooks' ? '#342bee' : '#64748b', background: 'none', cursor: 'pointer' }}>📈 Hook Generator</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 32 }}>
        {/* Left Panel */}
        <div>
          {activeTab === 'editor' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>📄 Raw Content</h3>
                <span style={{ fontSize: 12, color: '#64748b' }}>{rawText.length} characters</span>
              </div>
              <div className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <textarea
                  className="textarea-field"
                  style={{ flex: 1, minHeight: 400, border: 'none', borderRadius: '16px 16px 0 0', background: 'transparent' }}
                  value={rawText}
                  onChange={e => setRawText(e.target.value)}
                  placeholder="Paste your rough draft here... 🚀"
                />
                <div style={{ padding: 12, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
                  <button className="btn-primary" style={{ fontSize: 14, padding: '12px 12px' }} onClick={handleFormat} disabled={loading}>
                    {loading ? 'Optimizing...' : '✨ Apply Format & Optimize'}
                  </button>
                </div>
              </div>
              {error && <p style={{ color: '#ef4444', fontSize: 13, fontWeight: 500, marginTop: 8 }}>{error}</p>}
            </>
          )}

          {activeTab === 'templates' && (
            <div className="glass-card" style={{ padding: 24, minHeight: 400 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Starter Templates</h3>
              <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 24 }}>Select a structure to populate your editor.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {templates.map((tpl, i) => (
                  <div key={i} onClick={() => useTemplate(tpl.text)} style={{ padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 12, cursor: 'pointer', border: '1px solid transparent', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(52,43,238,0.4)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
                    <h4 style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{tpl.title}</h4>
                    <p style={{ fontSize: 12, color: '#94a3b8', whiteSpace: 'pre-line' }}>{tpl.text.length > 80 ? tpl.text.substring(0, 80) + '...' : tpl.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hooks' && (
            <div className="glass-card" style={{ padding: 24, minHeight: 400 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Proven Hook Structures</h3>
              <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 24 }}>Start your post strong. Click to copy into editor.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {hooks.map((hk, i) => (
                  <div key={i} onClick={() => useTemplate(hk.text + '\n\n' + rawText)} style={{ padding: 16, background: 'rgba(52, 43, 238, 0.05)', borderRadius: 12, cursor: 'pointer', border: '1px solid rgba(52, 43, 238, 0.1)', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(52,43,238,0.4)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(52,43,238,0.1)'}>
                    <h4 style={{ fontWeight: 600, fontSize: 14, color: '#342bee', marginBottom: 8 }}>{hk.title}</h4>
                    <p style={{ fontSize: 13, fontStyle: 'italic', color: '#cbd5e1' }}>{hk.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* LinkedIn Preview */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>✅ LinkedIn Preview</h3>
            {result && <span className="badge badge-success">Optimized</span>}
          </div>
          <div className="glass-card" style={{ padding: 24, position: 'relative', minHeight: 400, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            {loading ? (
              <LoadingSpinner text="Optimizing..." />
            ) : result ? (
              <div className="fade-in">
                {/* LinkedIn-style post header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #342bee, #6366f1)', border: '2px solid rgba(52, 43, 238, 0.3)' }} />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700 }}>You • 1st</p>
                    <p style={{ fontSize: 12, color: '#64748b' }}>Just now • 🌐</p>
                  </div>
                </div>

                {/* Content */}
                <div style={{ fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-line', color: '#e2e8f0' }}>
                  {result.boldConvertedText || result.formattedLinkedInText || ''}
                </div>

                {/* Hashtags */}
                {result.optimizedHashtags && (
                  <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {result.optimizedHashtags.map((tag, i) => (
                      <span key={i} style={{ color: '#342bee', fontWeight: 600, fontSize: 13 }}>{tag.startsWith('#') ? tag : `#${tag}`}</span>
                    ))}
                  </div>
                )}

                {/* CTA */}
                {result.improvedCTA && (
                  <div style={{ marginTop: 16, padding: 12, background: 'rgba(52, 43, 238, 0.05)', borderRadius: 8, border: '1px solid rgba(52, 43, 238, 0.1)' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>Improved CTA</p>
                    <p style={{ fontSize: 13, fontWeight: 600 }}>{result.improvedCTA}</p>
                  </div>
                )}

                {/* LinkedIn actions bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: 13, color: '#64748b', fontWeight: 600 }}>
                  <span>👍 Like</span><span>💬 Comment</span><span>🔄 Repost</span><span>📤 Send</span>
                </div>

                <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
                  <CopyButton text={formattedFull} label="📋 Copy for LinkedIn" style={{ background: 'white', color: '#1f2937', fontWeight: 700, borderRadius: 999, padding: '10px 20px' }} />
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 300, color: '#64748b' }}>
                <span style={{ fontSize: 48, marginBottom: 16 }}>🔬</span>
                <p style={{ fontWeight: 600 }}>Formatted preview will appear here</p>
                <p style={{ fontSize: 13, marginTop: 4 }}>Paste your draft and click Apply Format</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pro Tip */}
      <div style={{ marginTop: 32, padding: 24, background: 'rgba(52, 43, 238, 0.05)', border: '1px solid rgba(52, 43, 238, 0.2)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 40 }}>💡</span>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h4 style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Pro Tip: Use line breaks for readability</h4>
          <p style={{ fontSize: 14, color: '#94a3b8' }}>LinkedIn algorithms favor content that is easy to scan. Our formatter automatically optimizes white space.</p>
        </div>
      </div>
    </div>
  );
};

export default FormattingLab;

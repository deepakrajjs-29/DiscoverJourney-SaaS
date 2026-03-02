import { useState } from 'react';
import { generateContent } from '../services/api';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';

const ContentEngine = () => {
  const [form, setForm] = useState({
    topic: '',
    contentType: 'text post',
    tone: 'Professional & Insightful',
    targetAudience: 'Fellow Students',
    customInstructions: '',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.topic.trim()) return setError('Topic is required');
    setLoading(true);
    setError('');
    try {
      const { data } = await generateContent(form);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  const applyHookSuggestion = (hookText) => {
    setForm(prev => ({ ...prev, topic: hookText + '\n\n' + prev.topic }));
  };

  const fullPost = result ? `${result.hook || ''}\n\n${result.content || ''}\n\n${(result.hashtags || []).map(h => h.startsWith('#') ? h : '#' + h).join(' ')}` : '';

  return (
    <div className="fade-in" style={{ padding: 32 }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-1px' }}>Authority Content Engine</h2>
        <p style={{ color: '#94a3b8', fontSize: 16, marginTop: 4 }}>AI-powered LinkedIn post generation for student leaders.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }}>
        {/* Input Panel */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24 }}>
          <div className="glass-card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              🎛️ Post Parameters
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label className="field-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Topic or Core Message</span>
                  <span style={{ fontSize: 11, color: '#342bee', cursor: 'pointer' }} onClick={() => applyHookSuggestion("I analyzed 50 rejections, and here is what I learned:")}>+ Insert Hook</span>
                </label>
                <textarea className="textarea-field" style={{ height: 120 }} value={form.topic} onChange={e => setForm(p => ({...p, topic: e.target.value}))} placeholder="e.g. My experience landing a summer internship at a Tier 1 tech company and what I learned from 50 rejections." />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label className="field-label">Tone of Voice</label>
                  <select className="select-field" value={form.tone} onChange={e => setForm(p => ({...p, tone: e.target.value}))}>
                    <option>Professional & Insightful</option>
                    <option>Authentic & Vulnerable</option>
                    <option>Direct & Tactical</option>
                    <option>Bold & Challenging</option>
                  </select>
                </div>
                <div>
                  <label className="field-label">Target Audience</label>
                  <select className="select-field" value={form.targetAudience} onChange={e => setForm(p => ({...p, targetAudience: e.target.value}))}>
                    <option>Fellow Students</option>
                    <option>Hiring Managers</option>
                    <option>Industry Leaders</option>
                    <option>Startup Founders</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="field-label">Custom Instructions (optional)</label>
                <input className="input-field" value={form.customInstructions} onChange={e => setForm(p => ({...p, customInstructions: e.target.value}))} placeholder="Any extra guidance for the AI..." />
              </div>
              {error && <p style={{ color: '#ef4444', fontSize: 13, fontWeight: 500 }}>{error}</p>}
              <button type="submit" className="btn-primary" style={{ width: '100%', height: 52, fontSize: 16 }} disabled={loading}>
                {loading ? 'Generating...' : '✨ Generate High-Authority Post'}
              </button>
            </form>

            {/* Tip & Hook Suggestions */}
            <div style={{ marginTop: 20, padding: 16, background: 'rgba(52, 43, 238, 0.05)', border: '1px solid rgba(52, 43, 238, 0.2)', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <span>💡</span>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Pro Tip: Use the 'Hook' Strategy</h4>
                  <p style={{ fontSize: 12, color: '#94a3b8' }}>Dynamic hook suggestions to boost engagement:</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingLeft: 30 }}>
                <button type="button" onClick={() => applyHookSuggestion("Unpopular opinion on [Topic]:")} className="btn-secondary" style={{ padding: '4px 10px', fontSize: 11, borderRadius: 100 }}>Unpopular opinion</button>
                <button type="button" onClick={() => applyHookSuggestion("How I went from [State A] to [State B] in 3 months:")} className="btn-secondary" style={{ padding: '4px 10px', fontSize: 11, borderRadius: 100 }}>The Journey</button>
                <button type="button" onClick={() => applyHookSuggestion("3 mistakes I made when building [Project]:")} className="btn-secondary" style={{ padding: '4px 10px', fontSize: 11, borderRadius: 100 }}>3 Mistakes</button>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="glass-card" style={{ padding: 0, display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#10b981' }}>✓</span>
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>Generated Content</h3>
              </div>
              {result && <CopyButton text={fullPost} label="📋 Copy Text" />}
            </div>
            <div style={{ padding: 32, flex: 1, overflowY: 'auto' }}>
              {loading ? (
                <LoadingSpinner text="AI is crafting your post..." />
              ) : result ? (
                <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {result.hook && <p style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.4 }}>{result.hook}</p>}
                  {result.content && <div style={{ color: '#cbd5e1', lineHeight: 1.8, whiteSpace: 'pre-line', fontSize: 14 }}>{result.content}</div>}
                  {result.hashtags && result.hashtags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 8 }}>
                      {result.hashtags.map((tag, i) => (
                        <span key={i} style={{ color: '#342bee', fontWeight: 700, fontSize: 13 }}>{tag.startsWith('#') ? tag : `#${tag}`}</span>
                      ))}
                    </div>
                  )}
                  {result.imagePrompt && (
                    <div style={{ marginTop: 8, padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px dashed rgba(255,255,255,0.1)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: 1 }}>📷 Visual Recommendation</p>
                        <CopyButton text={result.imagePrompt} label="Copy Prompt" />
                      </div>
                      <p style={{ fontSize: 13, fontStyle: 'italic', color: '#94a3b8', marginBottom: 16 }}>{result.imagePrompt}</p>
                      
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <button 
                          onClick={() => { navigator.clipboard.writeText(result.imagePrompt); window.open('https://chatgpt.com/', '_blank'); }}
                          className="btn-secondary" style={{ fontSize: 11, padding: '6px 12px' }}>
                          🎨 Generate with ChatGPT
                        </button>
                        <button 
                          onClick={() => { navigator.clipboard.writeText(result.imagePrompt); window.open('https://gemini.google.com/', '_blank'); }}
                          className="btn-secondary" style={{ fontSize: 11, padding: '6px 12px' }}>
                          ✨ Generate with Gemini
                        </button>
                      </div>
                    </div>
                  )}
                  {result.usage && (
                    <p style={{ fontSize: 11, color: '#64748b', marginTop: 8 }}>
                      AI Usage: {result.usage.used}/{result.usage.limit} today ({result.usage.remaining} remaining)
                    </p>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 300, color: '#64748b' }}>
                  <span style={{ fontSize: 48, marginBottom: 16 }}>✍️</span>
                  <p style={{ fontWeight: 600 }}>Your generated post will appear here</p>
                  <p style={{ fontSize: 13, marginTop: 4 }}>Fill in the parameters and click Generate</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEngine;

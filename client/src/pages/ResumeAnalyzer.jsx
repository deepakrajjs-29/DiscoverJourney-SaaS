import { useState } from 'react';
import { analyzeResume } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import CopyButton from '../components/CopyButton';

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (f) => {
    const allowed = ['.pdf', '.docx', '.csv'];
    const ext = f.name.toLowerCase().substring(f.name.lastIndexOf('.'));
    if (!allowed.includes(ext)) {
      return setError('Only PDF, DOCX, and CSV files are allowed');
    }
    if (f.size > 5 * 1024 * 1024) {
      return setError('File too large. Maximum 5MB.');
    }
    setFile(f);
    setError('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleAnalyze = async () => {
    if (!file) return setError('Please select a file');
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('resume', file);
      const { data } = await analyzeResume(formData);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to analyze resume');
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (score) => score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="fade-in" style={{ padding: 32 }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-1px', background: 'linear-gradient(135deg, white, rgba(52, 43, 238, 0.5))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI Resume Intelligence</h2>
        <p style={{ color: '#64748b', fontSize: 16, marginTop: 4 }}>Optimize your resume for LinkedIn algorithms and recruiters using neural analysis.</p>
      </div>

      {/* Upload Area */}
      {!result && (
        <div style={{ marginBottom: 40, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: -4, background: 'linear-gradient(135deg, #342bee, #7c3aed)', borderRadius: 20, filter: 'blur(20px)', opacity: dragOver ? 0.4 : 0.15, transition: 'opacity 0.3s' }} />
          <div
            className="glass-card"
            style={{
              position: 'relative', padding: 48, textAlign: 'center',
              border: dragOver ? '2px solid #342bee' : '2px dashed rgba(52, 43, 238, 0.3)',
              cursor: 'pointer', transition: 'all 0.3s',
            }}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <input id="fileInput" type="file" accept=".pdf,.docx,.csv" style={{ display: 'none' }} onChange={e => e.target.files[0] && handleFile(e.target.files[0])} />
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(52, 43, 238, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 36 }}>☁️</div>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
              {file ? file.name : 'Upload your resume'}
            </h3>
            <p style={{ color: '#94a3b8', marginBottom: 32 }}>
              {file ? `${(file.size / 1024).toFixed(0)}KB — Ready to analyze` : 'Drag and drop your PDF or DOCX file here'}
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={(e) => { e.stopPropagation(); file ? handleAnalyze() : document.getElementById('fileInput').click(); }} disabled={loading} style={{ padding: '14px 32px', fontSize: 15 }}>
                {loading ? 'Analyzing...' : file ? '🔍 Analyze Resume' : '📁 Browse Files'}
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 32, fontSize: 12, color: '#64748b' }}>
              <span>🔒 AES-256 Encrypted</span>
              <span>✅ GDPR Compliant</span>
              <span>🛡️ Data Privacy Guaranteed</span>
            </div>
          </div>
          {error && <p style={{ color: '#ef4444', fontSize: 13, fontWeight: 500, marginTop: 12, textAlign: 'center' }}>{error}</p>}
        </div>
      )}

      {loading && <LoadingSpinner text="AI is analyzing your resume..." />}

      {/* Results */}
      {result && !loading && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Score & Keywords */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {/* Authority Score */}
            <div className="glass-card" style={{ padding: 32, textAlign: 'center' }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16 }}>Authority Score</h4>
              <div style={{ position: 'relative', width: 160, height: 160, margin: '0 auto 16px' }}>
                <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle cx="80" cy="80" r="70" fill="none" stroke={scoreColor(result.authorityScore)} strokeWidth="12"
                    strokeDasharray={440} strokeDashoffset={440 - (440 * (result.authorityScore || 0) / 100)} strokeLinecap="round" />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 40, fontWeight: 900 }}>{result.authorityScore || 0}</span>
                  <span style={{ fontSize: 12, color: '#64748b' }}>/ 100</span>
                </div>
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: scoreColor(result.authorityScore) }}>
                {result.authorityScore >= 75 ? 'Exceptional' : result.authorityScore >= 50 ? 'Good' : 'Needs Work'}
              </p>
            </div>

            {/* Keyword Gap */}
            <div className="glass-card" style={{ padding: 24, gridColumn: 'span 1' }}>
              <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Keyword Gap Analysis</h4>
              {result.keywordGapAnalysis && result.keywordGapAnalysis.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Missing Keywords</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {result.keywordGapAnalysis.map((kw, i) => (
                      <span key={i} style={{ padding: '4px 12px', borderRadius: 999, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: 12, border: '1px solid rgba(239, 68, 68, 0.2)' }}>{kw}</span>
                    ))}
                  </div>
                </div>
              )}
              {result.missingMetrics && result.missingMetrics.length > 0 && (
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Missing Metrics</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {result.missingMetrics.map((m, i) => (
                      <span key={i} style={{ padding: '4px 12px', borderRadius: 999, background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', fontSize: 12, border: '1px solid rgba(245, 158, 11, 0.2)' }}>{m}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Rewrites */}
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', background: 'rgba(52, 43, 238, 0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>✨</span>
              <h4 style={{ fontWeight: 700 }}>AI Content Optimization</h4>
            </div>
            <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
              {result.headlineRewrite && (
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 12 }}>Headline Options</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {(Array.isArray(result.headlineRewrite) ? result.headlineRewrite : [result.headlineRewrite]).map((headline, idx) => (
                      <div key={idx} style={{ padding: 16, background: 'rgba(11, 10, 26, 0.5)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                        <p style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.6 }}>{headline}</p>
                        <div style={{ marginTop: 8 }}><CopyButton text={headline} label="Copy" /></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {result.aboutRewrite && (
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 12 }}>"About" Section Options</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {(Array.isArray(result.aboutRewrite) ? result.aboutRewrite : [result.aboutRewrite]).map((about, idx) => (
                      <div key={idx} style={{ padding: 16, background: 'rgba(11, 10, 26, 0.5)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
                        <p style={{ fontSize: 14, lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{about}</p>
                        <div style={{ marginTop: 8 }}><CopyButton text={about} label="Copy" /></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Experience Suggestions */}
          {result.experienceSuggestions && result.experienceSuggestions.length > 0 && (
            <div className="glass-card" style={{ padding: 24 }}>
              <h4 style={{ fontWeight: 700, marginBottom: 16 }}>Experience Improvement Suggestions</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {result.experienceSuggestions.map((s, i) => (
                  <li key={i} style={{ padding: 12, background: 'rgba(255,255,255,0.03)', borderRadius: 8, fontSize: 14, color: '#cbd5e1', display: 'flex', gap: 8 }}>
                    <span style={{ color: '#342bee' }}>→</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button className="btn-secondary" onClick={() => { setResult(null); setFile(null); }} style={{ alignSelf: 'center', padding: '12px 32px' }}>
            📄 Analyze Another Resume
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;

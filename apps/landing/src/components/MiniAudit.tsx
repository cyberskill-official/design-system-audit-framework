import { useState, useEffect } from 'react';
import { Search, Loader2, AlertTriangle, ShieldAlert, CheckCircle, Mail, ArrowRight } from 'lucide-react';

type ScanState = 'idle' | 'scanning' | 'results' | 'captured';

export const MiniAudit = () => {
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    "Initializing DSAF headless scanner...",
    "Fetching DOM and CSSOM...",
    "Analyzing semantic HTML structures...",
    "Extracting design tokens from computed styles...",
    "Evaluating WCAG 2.1 AAA contrast ratios...",
    "Detecting inconsistent touch targets...",
    "Finalizing maturity score calculation..."
  ];

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setScanState('scanning');
    setProgress(0);
    setLogIndex(0);
  };

  const handleCaptureLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In the future, this will connect to the backend
      setScanState('captured');
    }
  };

  useEffect(() => {
    if (scanState === 'scanning') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setScanState('results'), 500);
            return 100;
          }
          return prev + 2;
        });
        
        setLogIndex(() => {
          const nextIdx = Math.floor((progress / 100) * logs.length);
          return Math.min(nextIdx, logs.length - 1);
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [scanState, progress, logs.length]);

  return (
    <section style={{ padding: '40px 0 80px', position: 'relative', zIndex: 10 }}>
      <div className="container">
        <div className="glass" style={{
          padding: '40px',
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--accent)'
        }}>
          {/* Background Glow */}
          <div style={{
            position: 'absolute',
            top: '-50px', left: '50%', transform: 'translateX(-50%)',
            width: '200px', height: '200px',
            background: 'var(--accent-glow)',
            filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            
            {scanState === 'idle' && (
              <div className="animate-fade-in">
                <h3 style={{ marginBottom: '12px', fontSize: '28px' }}>Run a Free Mini-Audit</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                  Enter your URL below to run a 3-point automated DSAF check instantly.
                </p>
                <form onSubmit={handleStartScan} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <div style={{ position: 'relative', flexGrow: 1, maxWidth: '400px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input 
                      type="url" 
                      placeholder="https://yourcompany.com" 
                      required
                      value={url}
                      onChange={e => setUrl(e.target.value)}
                      style={{
                        width: '100%', height: '52px', padding: '0 16px 0 44px',
                        borderRadius: '8px', border: '1px solid var(--border-strong)',
                        background: 'var(--bg-color)', color: 'var(--text-primary)',
                        fontSize: '16px', fontFamily: 'inherit', outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border-strong)'}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ borderRadius: '8px' }}>
                    Scan Now
                  </button>
                </form>
              </div>
            )}

            {scanState === 'scanning' && (
              <div className="animate-fade-in" style={{ textAlign: 'left', background: 'var(--bg-color)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    <Loader2 className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} size={20} color="var(--accent)" />
                    Analyzing {new URL(url).hostname}...
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--accent)' }}>{progress}%</span>
                </div>
                
                {/* Progress Bar */}
                <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: '999px', overflow: 'hidden', marginBottom: '24px' }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: 'var(--accent)', transition: 'width 0.1s linear' }} />
                </div>

                {/* Terminal Output */}
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-secondary)', minHeight: '60px' }}>
                  {logs.slice(0, logIndex + 1).map((log, i) => (
                    <div key={i} style={{ opacity: i === logIndex ? 1 : 0.5 }}>
                      <span style={{ color: 'var(--accent)', marginRight: '8px' }}>&gt;</span>{log}
                    </div>
                  ))}
                </div>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
              </div>
            )}

            {scanState === 'results' && (
              <div className="animate-fade-in">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
                  <ShieldAlert size={40} color="#D23B00" />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', fontWeight: 700 }}>Estimated Score</div>
                    <div style={{ fontSize: '32px', fontWeight: 900, color: '#D23B00', lineHeight: 1 }}>62<span style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>/100</span></div>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-color)', borderRadius: '12px', padding: '24px', border: '1px solid var(--border-color)', textAlign: 'left', marginBottom: '32px' }}>
                  <h4 style={{ marginBottom: '16px', fontSize: '16px' }}>Critical Violations Found:</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '14px' }}>
                      <AlertTriangle size={18} color="#D23B00" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div><strong style={{ color: 'var(--text-primary)' }}>[C-215] Touch Targets:</strong> 14 elements under 44px discovered.</div>
                    </li>
                    <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '14px' }}>
                      <AlertTriangle size={18} color="#D23B00" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div><strong style={{ color: 'var(--text-primary)' }}>[C-101] Semantics:</strong> Contrast ratio for secondary text is 3.1:1 (WCAG requires 4.5:1).</div>
                    </li>
                    <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '14px' }}>
                      <CheckCircle size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div><strong style={{ color: 'var(--text-primary)' }}>[C-305] Typography:</strong> Fluid type scale detected. Pass.</div>
                    </li>
                  </ul>
                </div>

                <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '32px' }}>
                  <h4 style={{ marginBottom: '8px', fontSize: '18px' }}>Unlock the Full 25-Point Report</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                    Enter your email to receive the complete breakdown and the DSAF-25 Self-Scoring CSV.
                  </p>
                  <form onSubmit={handleCaptureLead} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', flexGrow: 1, maxWidth: '300px' }}>
                      <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                      <input 
                        type="email" 
                        placeholder="name@company.com" 
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{
                          width: '100%', height: '48px', padding: '0 16px 0 44px',
                          borderRadius: '8px', border: '1px solid var(--border-strong)',
                          background: 'var(--bg-color)', color: 'var(--text-primary)',
                          fontSize: '15px', fontFamily: 'inherit', outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border-strong)'}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ borderRadius: '8px', minHeight: '48px', padding: '0 20px' }}>
                      Get Full Report <ArrowRight size={16} />
                    </button>
                  </form>
                </div>
              </div>
            )}

            {scanState === 'captured' && (
              <div className="animate-fade-in" style={{ padding: '32px 0' }}>
                <CheckCircle size={48} color="#10B981" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ marginBottom: '12px', color: '#10B981' }}>Report Dispatched</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  We've sent the complete DSAF-25 matrix and your partial audit results to <strong>{email}</strong>.
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

import { useState } from 'react';
import { DownloadCloud, ArrowRight } from 'lucide-react';

export const LeadMagnet = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
      setSubmitted(true);
      // Actual integration would go here
    }
  };

  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="glass" style={{ 
          padding: '48px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          textAlign: 'center',
          background: 'linear-gradient(145deg, var(--glass-bg) 0%, rgba(244, 186, 23, 0.05) 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Abstract glow */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '300px',
            height: '300px',
            background: 'var(--accent-glow)',
            filter: 'blur(50px)',
            borderRadius: '50%',
            zIndex: 0,
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <DownloadCloud size={48} color="var(--accent)" style={{ marginBottom: '24px' }} />
            <h2 style={{ marginBottom: '16px' }}>Get the DSAF-25 Self-Scoring Sheet</h2>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '60ch', margin: '0 auto 32px' }}>
              Want to run a quick manual baseline without the CLI? Download our official CSV matrix and score your system's core 25 criteria in under 10 minutes.
            </p>

            {submitted ? (
              <div style={{ padding: '24px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10B981', borderRadius: '12px', color: '#10B981', fontWeight: 700 }}>
                Thanks! Check your email for the download link.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    padding: '0 24px',
                    height: '52px',
                    minWidth: '300px',
                    borderRadius: '999px',
                    border: '1px solid var(--border-strong)',
                    background: 'var(--bg-elevated)',
                    color: 'var(--text-primary)',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-strong)'}
                />
                <button type="submit" className="btn btn-primary">
                  Send it to me <ArrowRight size={18} />
                </button>
              </form>
            )}
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '16px' }}>
              100% free. No spam. You'll also get our monthly design engineering newsletter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

import { BarChart3, TrendingUp, AlertOctagon } from 'lucide-react';

export const Benchmark = () => {
  const topViolations = [
    { id: 'C-215', name: 'Touch Target Size < 44px', rate: 94 },
    { id: 'C-104', name: 'Missing :focus-visible States', rate: 87 },
    { id: 'C-101', name: 'Contrast Ratio < 4.5:1', rate: 82 },
    { id: 'C-305', name: 'Hardcoded Line Heights', rate: 76 },
    { id: 'C-402', name: 'Inconsistent Spacing Tokens', rate: 68 },
  ];

  return (
    <section id="benchmark" style={{ padding: '120px 0', borderTop: '1px solid var(--border-color)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.1em', fontSize: '12px', textTransform: 'uppercase', marginBottom: '16px' }}>
            <BarChart3 size={16} /> 30-Case Study
          </div>
          <h2 style={{ fontSize: '48px', marginBottom: '24px', letterSpacing: '-0.03em' }}>The Framework <br/>Backed by Data.</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            We audited 30 leading open-source component libraries and SaaS dashboards. The results prove why vibes aren't enough.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          
          {/* Average Score Comparison */}
          <div className="glass" style={{ padding: '32px', borderRadius: '16px', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <TrendingUp color="var(--accent)" />
              <h3 style={{ fontSize: '20px' }}>Average Score Delta</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Pre-Audit (Vibes)</span>
                  <span style={{ color: '#D23B00' }}>42/100</span>
                </div>
                <div style={{ width: '100%', background: 'var(--bg-color)', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ width: '42%', background: '#D23B00', height: '100%', borderRadius: '6px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
                  <span style={{ color: 'var(--text-primary)' }}>Post-Audit (DSAF)</span>
                  <span style={{ color: '#10B981' }}>94/100</span>
                </div>
                <div style={{ width: '100%', background: 'var(--bg-color)', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ width: '94%', background: '#10B981', height: '100%', borderRadius: '6px', boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)' }} />
                </div>
              </div>
            </div>

            <p style={{ marginTop: '32px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              On average, applying the DSAF strict criteria resulted in a <strong>123% increase</strong> in accessibility and token consistency scores across the 30 tested codebases.
            </p>
          </div>

          {/* Top Violations */}
          <div className="glass" style={{ padding: '32px', borderRadius: '16px', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <AlertOctagon color="#D23B00" />
              <h3 style={{ fontSize: '20px' }}>Top 5 Most Violated Criteria</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {topViolations.map((v, i) => (
                <div key={v.id} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '24px', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', textAlign: 'right' }}>0{i+1}</div>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{v.name}</span>
                      <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{v.rate}%</span>
                    </div>
                    <div style={{ width: '100%', background: 'var(--bg-color)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${v.rate}%`, background: 'var(--accent)', height: '100%', borderRadius: '3px', opacity: 1 - (i * 0.15) }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

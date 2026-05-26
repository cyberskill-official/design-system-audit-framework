import { useState } from 'react';
import { AlertCircle, CheckCircle2, Download } from 'lucide-react';

export const BeforeAfter = () => {
  const [isAfter, setIsAfter] = useState(true);

  // Example "System Components" to show Before vs After
  return (
    <section id="demo" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '24px', marginBottom: '40px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent)' }}>02</span>
          <h2>The DSAF Effect</h2>
        </div>
        
        <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '66ch', marginBottom: '32px', marginTop: '-12px' }}>
          See the difference between a design system governed by vibes vs one strictly aligned to the DSAF criteria.
        </p>

        {/* Toggle Switch */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
          <div className="glass" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 24px', borderRadius: '999px' }}>
            <span style={{ fontWeight: 700, color: isAfter ? 'var(--text-secondary)' : 'var(--text-primary)', transition: 'color 0.3s ease' }}>Un-Audited (Vibes)</span>
            <button 
              onClick={() => setIsAfter(!isAfter)}
              style={{
                width: '64px', height: '32px', borderRadius: '999px',
                background: 'var(--border-color)', border: 'none', position: 'relative', cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
              aria-label="Toggle Before/After"
            >
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%', background: 'var(--text-primary)',
                position: 'absolute', top: '4px', left: isAfter ? '36px' : '4px',
                transition: 'left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }} />
            </button>
            <span style={{ fontWeight: 700, color: isAfter ? 'var(--accent)' : 'var(--text-secondary)', transition: 'color 0.3s ease' }}>DSAF Audited</span>
          </div>
        </div>

        {/* Component Showcase */}
        <div className="glass" style={{ padding: '48px', position: 'relative', overflow: 'visible' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            opacity: isAfter ? 1 : 0.8,
            transition: 'opacity 0.5s ease',
            filter: isAfter ? 'none' : 'grayscale(30%)'
          }}>
            {/* Example 1: Alert Component */}
            <div style={{ position: 'relative' }}>
              <h4 style={{ marginBottom: '16px', color: 'var(--text-secondary)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Feedback Alert</h4>
              <div style={{
                padding: '16px',
                borderRadius: isAfter ? '8px' : '0px',
                border: isAfter ? '1px solid #10B981' : '2px dashed var(--border-strong)',
                background: isAfter ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                color: 'var(--text-primary)'
              }}>
                {isAfter ? <CheckCircle2 color="#10B981" /> : <AlertCircle />}
                <div>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>System Status</strong>
                  <p style={{ fontSize: '14px', margin: 0, color: isAfter ? 'inherit' : 'var(--text-secondary)' }}>
                    {isAfter ? 'All services are operational. Token pipeline deployed.' : 'its fine'}
                  </p>
                </div>
              </div>
              {/* Tooltip */}
              {isAfter && (
                <div className="criteria-tooltip-react" style={{ position: 'absolute', top: '24px', left: '16px' }}>
                  <div className="pulse" />
                  <div className="popover">
                    <strong>[C-101] Semantics: L0 → L4</strong>
                    Proper semantic color mapping and iconography added for accessibility. Contrast improved from 2.1 to 5.4.
                  </div>
                </div>
              )}
            </div>

            {/* Example 2: Button Component */}
            <div style={{ position: 'relative' }}>
              <h4 style={{ marginBottom: '16px', color: 'var(--text-secondary)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Primary Action</h4>
              <div style={{
                padding: '32px',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'var(--bg-elevated)'
              }}>
                <button style={{
                  padding: isAfter ? '12px 24px' : '8px 16px',
                  background: isAfter ? 'var(--accent)' : 'gray',
                  color: isAfter ? 'var(--accent-contrast)' : 'white',
                  border: 'none',
                  borderRadius: isAfter ? '999px' : '4px',
                  fontWeight: isAfter ? 700 : 400,
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: isAfter ? '0 4px 14px var(--accent-glow)' : 'none',
                  transition: 'all 0.3s ease'
                }}>
                  {isAfter ? <Download size={18} /> : null}
                  Download Report
                </button>
              </div>
              {/* Tooltip */}
              {isAfter && (
                <div className="criteria-tooltip-react" style={{ position: 'absolute', top: '50%', right: '20%' }}>
                  <div className="pulse" />
                  <div className="popover" style={{ left: 'auto', right: '0', transform: 'translateY(-120%)' }}>
                    <strong>[C-215] Touch Targets: L1 → L5</strong>
                    Button height increased to 48px to pass WCAG 2.1 AAA touch target sizing. Hover states and focus rings defined.
                  </div>
                </div>
              )}
            </div>
            
            {/* Example 3: Typography */}
            <div style={{ position: 'relative' }}>
              <h4 style={{ marginBottom: '16px', color: 'var(--text-secondary)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Type Hierarchy</h4>
              <div style={{ padding: '24px', background: 'var(--bg-elevated)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ 
                  fontSize: isAfter ? '24px' : '20px', 
                  fontWeight: isAfter ? 800 : 'normal', 
                  marginBottom: isAfter ? '8px' : '12px',
                  color: 'var(--text-primary)',
                  letterSpacing: isAfter ? '-0.02em' : 'normal',
                  fontFamily: isAfter ? 'var(--font-sans)' : 'Times New Roman'
                }}>
                  Heading Component
                </div>
                <div style={{ 
                  fontSize: '15px', 
                  lineHeight: isAfter ? 1.6 : 1.2, 
                  color: isAfter ? 'var(--text-secondary)' : 'var(--text-primary)',
                  fontFamily: isAfter ? 'var(--font-sans)' : 'Times New Roman'
                }}>
                  The quick brown fox jumps over the lazy dog. Proper line-height and contrast create legible paragraphs.
                </div>
              </div>
              {/* Tooltip */}
              {isAfter && (
                <div className="criteria-tooltip-react" style={{ position: 'absolute', top: '30%', left: '10%' }}>
                  <div className="pulse" />
                  <div className="popover">
                    <strong>[C-305] Type Scales: L0 → L4</strong>
                    Modular type scale implemented. Replaced explicit pixel values with fluid rem-based calculations.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

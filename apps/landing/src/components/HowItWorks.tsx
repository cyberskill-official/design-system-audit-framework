import { Terminal, BarChart, Wrench } from 'lucide-react';

export const HowItWorks = () => {
  return (
    <section id="how-it-works" style={{ padding: '80px 0', background: 'var(--bg-elevated)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ marginBottom: '16px' }}>How It Works</h2>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '60ch', margin: '0 auto' }}>
            From your first scan to a fully compliant design system in three steps.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '40px',
          position: 'relative'
        }}>
          {/* Step 1 */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bg-color)',
              border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '24px', boxShadow: 'var(--shadow-sm)'
            }}>
              <Terminal size={32} color="var(--accent)" />
            </div>
            <span className="badge" style={{ marginBottom: '16px' }}>STEP 01</span>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Install & Scan</h3>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
              Run <code style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', background: 'var(--bg-color)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>npx @cyberskill/dsaf audit .</code> in your terminal. DSAF's AI agent will parse your components and tokens.
            </p>
          </div>

          {/* Step 2 */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bg-color)',
              border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '24px', boxShadow: 'var(--shadow-sm)'
            }}>
              <BarChart size={32} color="var(--accent)" />
            </div>
            <span className="badge" style={{ marginBottom: '16px' }}>STEP 02</span>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Get Your Score</h3>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
              Receive a deterministic maturity score across 125 criteria, mapped to our L0–L5 progression scale.
            </p>
          </div>

          {/* Step 3 */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bg-color)',
              border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '24px', boxShadow: 'var(--shadow-sm)'
            }}>
              <Wrench size={32} color="var(--accent)" />
            </div>
            <span className="badge" style={{ marginBottom: '16px' }}>STEP 03</span>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Fix & Ship</h3>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
              Follow the auto-generated improvement plan. Fix violations incrementally or engage CyberSkill for rapid implementation.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

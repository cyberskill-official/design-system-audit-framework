
export const Footer = () => {
  return (
    <footer style={{
      marginTop: '80px',
      padding: '80px 0 40px',
      borderTop: '1px solid var(--border-color)',
      background: 'var(--bg-elevated)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: '40px',
          marginBottom: '64px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900, fontSize: '20px', letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '16px' }}>
              DSAF
              <div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%', boxShadow: '0 0 8px var(--accent-glow)' }} />
            </div>
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', maxWidth: '36ch', lineHeight: 1.6 }}>
              The Design System Audit Framework. Bringing mathematical rigor and AI agents to design systems governance.
            </p>
            <div style={{ marginTop: '24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Ready to audit?</div>
              <code style={{
                background: 'var(--bg-color)',
                border: '1px solid var(--border-color)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-primary)',
                display: 'inline-block'
              }}>
                npx @cyberskill/dsaf audit .
              </code>
            </div>
          </div>
          
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '16px' }}>Framework</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><a href="#oss" style={{ fontSize: '14.5px', color: 'var(--text-secondary)' }}>Open Source Core</a></li>
              <li><a href="#benchmark" style={{ fontSize: '14.5px', color: 'var(--text-secondary)' }}>Maturity Benchmark</a></li>
              <li><a href="#demo" style={{ fontSize: '14.5px', color: 'var(--text-secondary)' }}>Interactive Demo</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '16px' }}>Services</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><a href="#services" style={{ fontSize: '14.5px', color: 'var(--text-secondary)' }}>Pro Services</a></li>
              <li><a href="#services" style={{ fontSize: '14.5px', color: 'var(--text-secondary)' }}>Book an Audit</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '16px' }}>Connect</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><a href="https://github.com/cyberskill-official/design-system-audit-framework" style={{ fontSize: '14.5px', color: 'var(--text-secondary)' }}>GitHub</a></li>
              <li><a href="https://cyberskill.world" style={{ fontSize: '14.5px', color: 'var(--text-secondary)' }}>CyberSkill</a></li>
            </ul>
          </div>
        </div>

        <div style={{
          paddingTop: '32px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '13px',
          color: 'var(--text-secondary)'
        }}>
          <span>&copy; {new Date().getFullYear()} CyberSkill. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

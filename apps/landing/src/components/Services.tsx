import { ArrowUpRight } from 'lucide-react';

export const Services = () => {
  const services = [
    {
      badge: 'TIER 1',
      title: 'Baseline Audit',
      description: 'A 25-criteria third-party certification of your design system’s foundation. Includes signed executive summary and roadmap.',
      price: 'From $4,900'
    },
    {
      badge: 'TIER 2',
      title: 'Maximal Enterprise',
      description: 'Full 371-row deep dive. Ideal for heavily regulated environments, covering a11y, localization, and procurement tracking.',
      price: 'Custom Quote'
    },
    {
      badge: 'SPRINT',
      title: 'Implementation Sprint',
      description: 'We don’t just audit; we fix. Our team opens the exact Pull Requests needed to bring your system into DSAF compliance.',
      price: 'Scoped Sprint'
    },
    {
      badge: 'RETAINER',
      title: 'Continuous Assurance',
      description: 'Quarterly re-audits, stale-claim cleanups, and benchmark watching. Keep your maturity claims verified year-round.',
      price: 'From $1,500/mo'
    }
  ];

  return (
    <section id="services" style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '24px', marginBottom: '40px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent)' }}>02</span>
          <h2>CyberSkill Professional Services</h2>
        </div>
        
        <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '66ch', marginBottom: '48px', marginTop: '-12px' }}>
          Need third-party certification or expert help applying the fixes? We offer productized service packages to accelerate your maturity curve.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {services.map((s, i) => (
            <div key={i} className="glass" style={{ padding: '32px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span className="badge">{s.badge}</span>
                <ArrowUpRight size={18} color="var(--text-secondary)" />
              </div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>{s.title}</h3>
              <p style={{ fontSize: '14.5px', marginBottom: '24px', flexGrow: 1 }}>{s.description}</p>
              
              <div style={{ 
                borderTop: '1px dashed var(--border-color)', 
                paddingTop: '16px', 
                marginTop: 'auto',
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                fontWeight: 700,
                fontSize: '14px'
              }}>
                <span style={{ color: 'var(--text-secondary)' }}>Pricing</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{s.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

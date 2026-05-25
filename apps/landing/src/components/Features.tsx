import { ShieldCheck, Database, Code2 } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: <ShieldCheck size={24} />,
      label: 'Criteria, Not Vibes',
      title: 'Scored & Objective',
      description: 'Stop arguing about what "good" looks like. DSAF grades tokens, documentation, and UX against 125 strictly defined criteria.'
    },
    {
      icon: <Database size={24} />,
      label: 'Agent-Native',
      title: 'Built for LLMs',
      description: 'Markdown-native and structured for agents. Pipe the rubric directly into Claude or GPT-4 for rapid gap analysis.'
    },
    {
      icon: <Code2 size={24} />,
      label: 'Developer-First',
      title: 'No-Silent Regressions',
      description: 'The strict SCAN and FIX mode boundary ensures AI agents never silently modify your codebase without explicit human sign-off.'
    }
  ];

  return (
    <section id="oss" style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '24px', marginBottom: '40px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent)' }}>01</span>
          <h2>Open Source Core</h2>
        </div>
        
        <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '66ch', marginBottom: '48px', marginTop: '-12px' }}>
          The methodology is free, open, and vendor-neutral. We believe design system health shouldn't be locked behind a proprietary SaaS paywall.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {features.map((f, i) => (
            <div key={i} className="glass" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ 
                width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-soft)', 
                color: 'var(--accent)', display: 'grid', placeItems: 'center',
                border: '1px solid rgba(244, 186, 23, 0.2)'
              }}>
                {f.icon}
              </div>
              <span className="badge" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>{f.label}</span>
              <h3 style={{ margin: 0, fontSize: '22px' }}>{f.title}</h3>
              <p style={{ margin: 0, fontSize: '15px' }}>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

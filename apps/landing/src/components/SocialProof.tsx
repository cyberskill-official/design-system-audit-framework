import { Star, FileCode, CheckCircle2 } from 'lucide-react';

export const SocialProof = () => {
  return (
    <section style={{ padding: '60px 0', background: 'var(--accent)', color: 'var(--accent-contrast)' }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', justifyContent: 'space-around', alignItems: 'center' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '32px', fontWeight: 900 }}>
            125 <CheckCircle2 size={28} />
          </div>
          <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.8 }}>Scored Criteria</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '32px', fontWeight: 900 }}>
            30 <FileCode size={28} />
          </div>
          <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.8 }}>Case Studies</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '32px', fontWeight: 900 }}>
            MIT <Star size={28} fill="currentColor" />
          </div>
          <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.8 }}>Fully Open Source</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '32px', fontWeight: 900 }}>
            Agent-Native
          </div>
          <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.8 }}>Works with Claude & GPT-4</span>
        </div>

      </div>
    </section>
  );
};

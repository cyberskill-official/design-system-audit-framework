import { useState } from 'react';
import { ArrowRight, FileCheck2, Terminal, Copy, Check } from 'lucide-react';

export const Hero = () => {
  const [copied, setCopied] = useState(false);
  return (
    <section style={{
      padding: '160px 0 100px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Abstract Background Elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: -1,
        animation: 'pulseGlow 8s infinite alternate ease-in-out'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(69, 33, 14, 0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: -1
      }} />

      <div className="container animate-fade-in" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '24px' }}>
          <span className="badge">v0.1</span>
          <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginLeft: '12px' }}>
            Open Methodology · MIT Licensed
          </span>
        </div>
        
        <h1 style={{ maxWidth: '16ch', marginBottom: '28px' }}>
          Audit your design system with criteria, not vibes.
        </h1>
        
        <p style={{ fontSize: 'clamp(19px, 2.2vw, 22px)', lineHeight: 1.55, maxWidth: '60ch', marginBottom: '24px', color: 'var(--text-primary)' }}>
          DSAF is the first open-source, mathematically scored framework for evaluating design-system maturity and generating phased improvement plans.
        </p>
        
        <p style={{ fontSize: '16.5px', color: 'var(--text-secondary)', maxWidth: '64ch', marginBottom: '40px' }}>
          From a 5-minute DSAF-25 baseline scan to a 371-row maximal enterprise audit. Vendor-neutral, markdown-native, and designed for human reviewers working alongside AI agents.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <a href="#mini-audit" className="btn btn-primary">
            Run Your First Audit <ArrowRight size={18} />
          </a>
          <a href="#oss" className="btn btn-secondary">
            <FileCheck2 size={18} /> View DSAF-25 Core
          </a>
        </div>

        <div style={{ marginTop: '48px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '13.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>Quick Start:</span>
          <div style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-color)',
            padding: '6px 6px 6px 12px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <code style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <Terminal size={14} color="var(--accent)" /> npx @cyberskill/dsaf audit .
            </code>
            <button 
              onClick={() => {
                navigator.clipboard.writeText('npx @cyberskill/dsaf audit .');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              style={{
                background: 'var(--border-color)',
                border: 'none',
                cursor: 'pointer',
                color: copied ? '#10B981' : 'var(--text-primary)',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                transition: 'all 0.2s ease'
              }}
              title="Copy to clipboard"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

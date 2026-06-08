import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check initial system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      padding: '16px 24px',
      transition: 'all 0.3s ease',
      background: isScrolled ? 'var(--glass-bg)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      borderBottom: isScrolled ? '1px solid var(--glass-border)' : '1px solid transparent'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900, fontSize: '20px', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          DSAF
          <div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%', boxShadow: '0 0 8px var(--accent-glow)' }} />
        </a>
        
        <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="desktop-nav">
          <a href="#oss" style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-secondary)' }}>Open Source</a>
          <a href="#benchmark" style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-secondary)' }}>Benchmark</a>
          <a href="#services" style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-secondary)' }}>Services</a>
          <a href="https://saas-dashboard.cyberskill.world" target="_blank" rel="noreferrer" style={{ fontWeight: 600, fontSize: '14px', color: 'var(--accent)' }}>Dashboard</a>
          
          <button onClick={toggleTheme} style={{
            background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }} aria-label="Toggle theme">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <a href="https://github.com/cyberskill-official/design-system-audit-framework" className="btn btn-primary" style={{ minHeight: '40px', padding: '0 20px', fontSize: '13px' }}>
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
};

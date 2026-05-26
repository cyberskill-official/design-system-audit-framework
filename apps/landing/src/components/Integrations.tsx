export const Integrations = () => {
  const ecosystems = [
    { name: 'Figma', icon: '🎨' },
    { name: 'Storybook', icon: '📖' },
    { name: 'GitHub Actions', icon: '🐙' },
    { name: 'zeroheight', icon: '📏' },
    { name: 'CLI', icon: '💻' },
  ];

  return (
    <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-color)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '32px' }}>
          Integrates seamlessly with your stack
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center', opacity: 0.8 }}>
          {ecosystems.map((eco, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>
              <span>{eco.icon}</span> {eco.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

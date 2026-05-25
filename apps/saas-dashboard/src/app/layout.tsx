import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DSAF SaaS Dashboard",
  description: "Audit your design system with criteria, not vibes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <header style={{
          padding: '16px 24px',
          background: 'var(--bg-elevated)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900, fontSize: '20px', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            DSAF <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>Dashboard</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Organization: CyberSkill</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent)', color: 'var(--accent-contrast)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              C
            </div>
          </div>
        </header>
        <main style={{ padding: '40px 24px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: "Is DSAF free?",
    a: "Yes. The entire DSAF methodology (including the 125 criteria) is MIT-licensed and fully open source. You can self-audit your organization at no cost."
  },
  {
    q: "How is this different from Lighthouse?",
    a: "Lighthouse audits a single web page's performance and basic accessibility. DSAF audits the foundational architecture of your design system — things like design token structures, component documentation, semantic mapping, and cross-framework consistency."
  },
  {
    q: "Can I use this with my existing design system?",
    a: "Absolutely. DSAF is completely vendor-neutral. It works whether you're using React, Vue, Angular, Web Components, or just plain CSS. It also integrates with common tooling like Figma, Storybook, and Style Dictionary."
  },
  {
    q: "What are the maturity levels?",
    a: "The DSAF score maps to a 6-level maturity scale: L0 (Absent), L1 (Ad-hoc), L2 (Defined), L3 (Managed), L4 (Measured), and L5 (Optimizing). Most enterprise design systems start around L2."
  },
  {
    q: "Do I need to hire CyberSkill?",
    a: "No. The self-audit is entirely free and open. Our professional services are entirely optional, designed for teams that need third-party certification, intensive implementation sprints, or expert help fixing their violations."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" style={{ padding: '100px 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2>Frequently Asked Questions</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="glass" 
                style={{ 
                  padding: '24px', 
                  cursor: 'pointer',
                  border: isOpen ? '1px solid var(--accent)' : '1px solid var(--border-color)'
                }}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '18px', margin: 0, fontWeight: 700 }}>{faq.q}</h4>
                  <div style={{ color: isOpen ? 'var(--accent)' : 'var(--text-secondary)' }}>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
                {isOpen && (
                  <div style={{ marginTop: '16px', color: 'var(--text-secondary)', fontSize: '15.5px', lineHeight: 1.6 }} className="animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

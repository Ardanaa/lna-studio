import React, { useState, useEffect } from 'react';
import { sections, scrollToElement } from '../../utils/scroll';

export default function SectionDots() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="section-dots">
      {sections.map((s) => (
        <button
          key={s.id}
          className={`section-dot ${activeSection === s.id ? 'active' : ''}`}
          onClick={() => scrollToElement(s.id)}
          title={s.label}
          aria-label={`Scroll to ${s.label}`}
        />
      ))}
    </div>
  );
}

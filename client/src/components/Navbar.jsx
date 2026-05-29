import { useState, useEffect } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Mission', href: '#mission' },
  { label: 'Community', href: '#community' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coral to-coral-light flex items-center justify-center shadow-lg shadow-coral/20 group-hover:shadow-coral/40 transition-shadow duration-300">
              <span className="text-white font-bold text-lg font-heading">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-heading font-bold text-lg leading-tight tracking-tight">
                She Can
              </span>
              <span className="text-coral-light text-[10px] font-body font-medium uppercase tracking-widest leading-none">
                Foundation
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? 'text-coral'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-coral rounded-full" />
                )}
              </a>
            ))}
            <a
              href="#community"
              onClick={(e) => handleLinkClick(e, '#community')}
              className="ml-3 px-5 py-2.5 bg-coral hover:bg-coral-dark text-white text-sm font-body font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-coral/30 active:scale-95"
            >
              Join the Wall
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={`absolute transition-all duration-300 ${
                isOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
              }`}
            >
              <HiMenuAlt3 size={24} />
            </span>
            <span
              className={`absolute transition-all duration-300 ${
                isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
              }`}
            >
              <HiX size={24} />
            </span>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-80 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          <div className="bg-navy-light/80 backdrop-blur-lg rounded-2xl p-4 border border-white/5 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`block px-4 py-3 rounded-xl text-sm font-body font-medium transition-all duration-200 ${
                  activeSection === link.href.slice(1)
                    ? 'bg-coral/10 text-coral'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#community"
                onClick={(e) => handleLinkClick(e, '#community')}
                className="block text-center px-5 py-3 bg-coral hover:bg-coral-dark text-white text-sm font-body font-semibold rounded-xl transition-all duration-300"
              >
                Join the Wall
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

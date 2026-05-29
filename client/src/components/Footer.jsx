import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Mission', href: '#mission' },
  { label: 'Community', href: '#community' },
];

const socialLinks = [
  { icon: FaFacebook, href: '#', label: 'Facebook' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const handleClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy relative overflow-hidden">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-coral via-coral-light to-soft-peach" />

      {/* Background accents */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-light/30 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-coral/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coral to-coral-light flex items-center justify-center shadow-lg shadow-coral/20">
                <span className="text-white font-bold text-lg font-heading">S</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-heading font-bold text-lg leading-tight">
                  She Can
                </span>
                <span className="text-coral-light text-[10px] font-body font-medium uppercase tracking-widest leading-none">
                  Foundation
                </span>
              </div>
            </div>
            <p className="text-white/40 font-body text-sm leading-relaxed max-w-xs mb-6">
              Empowering women through education, mentorship, and community. 
              Because every woman can rise, lead, and transform.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-coral/20 flex items-center justify-center text-white/40 hover:text-coral transition-all duration-300"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-body font-semibold text-sm uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-white/40 hover:text-coral font-body text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-0.5 bg-coral rounded-full transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-white font-body font-semibold text-sm uppercase tracking-widest mb-5">
              Get Involved
            </h4>
            <ul className="space-y-3">
              {['Volunteer', 'Donate', 'Partner With Us', 'Events'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/40 hover:text-coral font-body text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-0.5 bg-coral rounded-full transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 font-body text-sm">
              © {new Date().getFullYear()} She Can Foundation. All rights reserved.
            </p>
            <p className="text-white/30 font-body text-sm flex items-center gap-1.5">
              Made with{' '}
              <span className="text-coral text-base animate-pulse-soft">❤️</span>{' '}
              for women everywhere
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

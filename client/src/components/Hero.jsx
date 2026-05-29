import { useEffect, useRef } from 'react';

export default function Hero() {
  const orbRefs = useRef([]);

  useEffect(() => {
    // Trigger entrance animations
    const timer = setTimeout(() => {
      document.querySelectorAll('.hero-animate').forEach((el, i) => {
        el.style.animationDelay = `${i * 0.15}s`;
        el.classList.add('animate-fade-in-up');
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToForm = (e) => {
    e.preventDefault();
    const el = document.getElementById('community');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" />

      {/* Decorative grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-[10%] w-72 h-72 bg-coral/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-coral/5 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-mid/50 rounded-full blur-3xl animate-float-slower" />

      {/* Coral accent circles */}
      <div className="absolute top-20 right-[20%] w-3 h-3 bg-coral/40 rounded-full animate-pulse-soft" />
      <div className="absolute bottom-32 left-[15%] w-2 h-2 bg-coral-light/30 rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }} />
      <div className="absolute top-[40%] right-[8%] w-4 h-4 bg-soft-peach/20 rounded-full animate-pulse-soft" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="hero-animate opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-coral animate-pulse-soft" />
          <span className="text-white/70 text-sm font-body font-medium">
            Building a community of empowered women
          </span>
        </div>

        {/* Main heading */}
        <h1 className="hero-animate opacity-0 font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight mb-6">
          Empowering Women,{' '}
          <span className="text-gradient">Transforming Communities</span>
        </h1>

        {/* Sub heading */}
        <p className="hero-animate opacity-0 max-w-2xl mx-auto text-white/60 text-lg sm:text-xl font-body font-light leading-relaxed mb-10">
          Join our community wall — share your story, uplift others, and be part of a movement 
          that believes every woman can rise, lead, and inspire change.
        </p>

        {/* CTA Buttons */}
        <div className="hero-animate opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToForm}
            className="group relative px-8 py-4 bg-coral hover:bg-coral-dark text-white text-base font-body font-semibold rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-coral/30 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Share Your Voice
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-coral-light/0 via-white/10 to-coral-light/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>

          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 border border-white/20 text-white/80 hover:text-white hover:border-white/40 text-base font-body font-medium rounded-2xl transition-all duration-300 hover:bg-white/5"
          >
            Learn More
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="hero-animate opacity-0 mt-16 flex flex-col items-center gap-2">
          <span className="text-white/30 text-xs font-body uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/40 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

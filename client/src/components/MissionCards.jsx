import { useEffect, useRef, useState } from 'react';

const missions = [
  {
    icon: '💪',
    title: 'Empower',
    description:
      'Building confidence and self-reliance through mentorship programs, leadership training, and community support networks.',
    accent: 'from-coral/10 to-coral/5',
    border: 'hover:border-coral/30',
  },
  {
    icon: '📚',
    title: 'Educate',
    description:
      'Providing access to quality education, skill-building workshops, and scholarship opportunities for women and girls.',
    accent: 'from-navy/5 to-navy/[0.02]',
    border: 'hover:border-navy/20',
  },
  {
    icon: '📢',
    title: 'Advocate',
    description:
      'Championing gender equality, policy change, and systemic reform to create equitable opportunities for all women.',
    accent: 'from-coral-light/10 to-coral-light/5',
    border: 'hover:border-coral-light/30',
  },
  {
    icon: '✨',
    title: 'Inspire',
    description:
      'Sharing stories of resilience and triumph to motivate the next generation of women leaders and changemakers.',
    accent: 'from-soft-peach/30 to-soft-peach/10',
    border: 'hover:border-soft-peach/50',
  },
];

export default function MissionCards() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-warm-white overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-peach-light/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className={`inline-block text-coral font-body font-semibold text-sm uppercase tracking-widest mb-3 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            What We Stand For
          </span>
          <h2
            className={`font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-navy leading-tight mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Our <span className="text-gradient">Mission</span> Pillars
          </h2>
          <p
            className={`max-w-2xl mx-auto text-navy/50 text-lg font-body transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Four foundational pillars that guide everything we do and every life we touch.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {missions.map((mission, index) => (
            <div
              key={mission.title}
              className={`group relative bg-white rounded-2xl p-7 border border-transparent ${mission.border} card-shadow hover:card-shadow-hover transition-all duration-500 hover:-translate-y-2 cursor-default ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? `${300 + index * 120}ms` : '0ms' }}
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${mission.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-peach-light to-soft-peach flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                  {mission.icon}
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl text-navy mb-3 group-hover:text-coral transition-colors duration-300">
                  {mission.title}
                </h3>

                {/* Description */}
                <p className="text-navy/50 font-body text-sm leading-relaxed">
                  {mission.description}
                </p>

                {/* Bottom accent line */}
                <div className="mt-5 w-8 h-1 rounded-full bg-soft-peach group-hover:w-12 group-hover:bg-coral transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

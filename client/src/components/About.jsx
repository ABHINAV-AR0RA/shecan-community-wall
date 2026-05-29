import { useEffect, useRef, useState } from 'react';



export default function About() {
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-warm-white overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-soft-peach/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-peach-light/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className={`inline-block text-coral font-body font-semibold text-sm uppercase tracking-widest mb-3 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Who We Are
          </span>
          <h2
            className={`font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-navy leading-tight transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            About <span className="text-gradient">She Can Foundation</span>
          </h2>
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Text content */}
          <div
            className={`space-y-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <p className="text-navy/80 text-lg leading-relaxed font-body">
              The <strong className="text-navy font-semibold">She Can Foundation</strong> is a
              community-driven organization dedicated to empowering women and girls through
              education, mentorship, and advocacy. Founded on the belief that every woman has
              the potential to lead and transform her community.
            </p>
            <p className="text-navy/60 text-base leading-relaxed font-body">
              We create safe spaces for women to share their stories, connect with mentors,
              and access resources that help them thrive. From workshops and skill-building
              programs to community events, we are building a network of support that
              transcends barriers and unlocks potential.
            </p>
            <p className="text-navy/60 text-base leading-relaxed font-body">
              Our Community Wall is a digital reflection of this mission — a place where
              voices are heard, stories are celebrated, and every message adds strength to
              our collective movement.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="w-12 h-0.5 bg-coral rounded-full" />
              <span className="text-coral font-subheading font-semibold text-sm">
                Together, we rise.
              </span>
            </div>
          </div>

          {/* Visual element */}
          <div
            className={`relative transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="relative">
              {/* Main visual card */}
              <div className="bg-gradient-to-br from-navy via-navy-light to-navy-mid rounded-3xl p-8 sm:p-10 text-center overflow-hidden relative">
                {/* Pattern overlay */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                  }}
                />

                <div className="relative z-10">
                  <div className="text-6xl mb-4">🌟</div>
                  <h3 className="font-heading font-bold text-2xl text-white mb-3">
                    Our Vision
                  </h3>
                  <p className="text-white/60 font-body leading-relaxed max-w-sm mx-auto">
                    A world where every woman has equal opportunity to lead, learn, and
                    create lasting impact in her community and beyond.
                  </p>

                  {/* Decorative elements */}
                  <div className="flex justify-center gap-3 mt-6">
                    {['💪', '📚', '🌍', '❤️'].map((emoji, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg"
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating accent card */}
              <div className="absolute -bottom-4 -left-4 bg-coral text-white px-5 py-3 rounded-2xl card-shadow font-body font-semibold text-sm animate-float">
                ✨ Making a difference
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}

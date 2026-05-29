import { useState, useEffect, useRef } from 'react';
import { fetchMessages } from '../api/messages';
import MessageCard from './MessageCard';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 card-shadow border border-soft-peach/20">
      <div className="flex items-start gap-3.5 mb-4">
        <div className="w-11 h-11 rounded-full shimmer-bg animate-shimmer shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-28 rounded-lg shimmer-bg animate-shimmer" />
          <div className="h-3 w-16 rounded-lg shimmer-bg animate-shimmer" />
        </div>
      </div>
      <div className="space-y-2 mb-5">
        <div className="h-3 w-full rounded-lg shimmer-bg animate-shimmer" />
        <div className="h-3 w-4/5 rounded-lg shimmer-bg animate-shimmer" />
        <div className="h-3 w-3/5 rounded-lg shimmer-bg animate-shimmer" />
      </div>
      <div className="pt-3 border-t border-soft-peach/30">
        <div className="h-4 w-16 rounded-lg shimmer-bg animate-shimmer" />
      </div>
    </div>
  );
}

export default function CommunityFeed() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const loadMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMessages();
      // Sort latest first
      const sorted = Array.isArray(data)
        ? [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];
      setMessages(sorted);
    } catch (err) {
      setError('Unable to load messages. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();

    // Listen for new messages from the form
    const handleNew = () => loadMessages();
    window.addEventListener('messageCreated', handleNew);
    return () => window.removeEventListener('messageCreated', handleNew);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="community"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-warm-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-peach-muted to-transparent" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-soft-peach/15 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <span
            className={`inline-block text-coral font-body font-semibold text-sm uppercase tracking-widest mb-3 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Our Community
          </span>
          <h2
            className={`font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-navy leading-tight mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Community <span className="text-gradient">Wall</span>
          </h2>
          <p
            className={`text-navy/50 text-lg font-body max-w-xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Messages of hope, empowerment, and solidarity from our community.
          </p>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">😔</div>
            <p className="text-navy/60 font-body text-lg mb-6">{error}</p>
            <button
              onClick={loadMessages}
              className="px-6 py-3 bg-coral hover:bg-coral-dark text-white font-body font-semibold rounded-xl transition-all duration-300 active:scale-95"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && messages.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-peach-light rounded-full flex items-center justify-center">
              <span className="text-4xl">💬</span>
            </div>
            <h3 className="font-heading font-bold text-xl text-navy mb-2">
              No messages yet
            </h3>
            <p className="text-navy/50 font-body mb-6 max-w-md mx-auto">
              Be the first to share your voice! Scroll up to leave an encouraging message
              on the community wall.
            </p>
            <button
              onClick={() =>
                document.querySelector('#community')?.previousElementSibling?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-6 py-3 bg-coral hover:bg-coral-dark text-white font-body font-semibold rounded-xl transition-all duration-300 active:scale-95"
            >
              Share First Message ✨
            </button>
          </div>
        )}

        {/* Messages grid */}
        {!loading && !error && messages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages.map((msg, index) => (
              <div
                key={msg._id || index}
                className={`transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{
                  transitionDelay: isVisible ? `${300 + (index % 6) * 80}ms` : '0ms',
                }}
              >
                <MessageCard message={msg} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

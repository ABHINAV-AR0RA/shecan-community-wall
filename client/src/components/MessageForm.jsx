import { useState, useEffect, useRef } from 'react';
import { createMessage } from '../api/messages';
import { HiPaperAirplane, HiCheckCircle } from 'react-icons/hi2';

export default function MessageForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please share your message';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await createMessage(formData);
      setFormData({ name: '', email: '', message: '' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // Dispatch custom event to refresh the feed
      window.dispatchEvent(new CustomEvent('messageCreated'));
    } catch (err) {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-gradient-to-b from-warm-white to-peach-muted overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-soft-peach/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-coral/5 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span
            className={`inline-block text-coral font-body font-semibold text-sm uppercase tracking-widest mb-3 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Your Voice Matters
          </span>
          <h2
            className={`font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-navy leading-tight mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Share Your <span className="text-gradient">Message</span>
          </h2>
          <p
            className={`text-navy/50 text-lg font-body transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Leave an encouraging note, share your story, or uplift the community.
          </p>
        </div>

        {/* Form card */}
        <div
          className={`bg-white rounded-3xl p-8 sm:p-10 card-shadow border border-soft-peach/30 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Name field */}
            <div>
              <label
                htmlFor="name"
                className="block text-navy font-body font-medium text-sm mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full px-5 py-3.5 rounded-xl bg-warm-white border-2 font-body text-navy placeholder:text-navy/30 focus:outline-none focus:ring-0 transition-all duration-300 ${
                  errors.name
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-soft-peach/40 focus:border-coral/40'
                }`}
              />
              {errors.name && (
                <p className="mt-1.5 text-red-500 text-sm font-body flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-navy font-body font-medium text-sm mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-5 py-3.5 rounded-xl bg-warm-white border-2 font-body text-navy placeholder:text-navy/30 focus:outline-none focus:ring-0 transition-all duration-300 ${
                  errors.email
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-soft-peach/40 focus:border-coral/40'
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-red-500 text-sm font-body flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message field */}
            <div>
              <label
                htmlFor="message"
                className="block text-navy font-body font-medium text-sm mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Share your story, encouragement, or thoughts..."
                className={`w-full px-5 py-3.5 rounded-xl bg-warm-white border-2 font-body text-navy placeholder:text-navy/30 focus:outline-none focus:ring-0 transition-all duration-300 resize-none ${
                  errors.message
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-soft-peach/40 focus:border-coral/40'
                }`}
              />
              {errors.message && (
                <p className="mt-1.5 text-red-500 text-sm font-body flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm font-body">
                {errors.submit}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full group relative px-8 py-4 bg-coral hover:bg-coral-dark disabled:bg-coral/50 text-white text-base font-body font-semibold rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-coral/20 active:scale-[0.98] disabled:cursor-not-allowed overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg
                      className="w-5 h-5"
                      style={{ animation: 'spin 1s linear infinite' }}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Share Your Message
                    <HiPaperAirplane className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </form>
        </div>

        {/* Success toast */}
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-navy text-white px-6 py-4 rounded-2xl card-shadow transition-all duration-500 ${
            showSuccess
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
          }`}
        >
          <HiCheckCircle className="w-6 h-6 text-green-400 shrink-0" />
          <div>
            <p className="font-body font-semibold text-sm">Message shared!</p>
            <p className="font-body text-white/60 text-xs">
              Your voice has been added to the wall.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

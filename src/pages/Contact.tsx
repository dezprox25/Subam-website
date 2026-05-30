import React, { useEffect, useRef, useState } from 'react';

const contacts = [
  { label: 'Visit', detail: 'No:3 Sri Griha House, 8th Avenue\nAshok Nagar, Chennai - 600083' },
  { label: 'Write', detail: 'Consultingsubham@gmail.com\nCareers.consultingsubham@gmail.com' },
  { label: 'Call', detail: '+91 84385 30234 (WhatsApp)\nMon–Fri · 10:00 AM – 4:00 PM' },
];

const reachOptions = [
  {
    title: 'Instagram',
    desc: 'Follow our journey and see our latest sustainable construction projects and material studies.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700',
    alt: 'Social media interaction',
    link: 'https://www.instagram.com/subham_consulting'
  },
  {
    title: 'LinkedIn',
    desc: 'Connect with us for professional consulting, structural analysis, and corporate collaborations.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700',
    alt: 'Professional networking',
    link: 'https://www.linkedin.com/in/subhamconsulting-andconstruction'
  },
  {
    title: 'Project Inquiry',
    desc: 'Share your vision for a sustainable space. We respond to every inquiry with a tailored next step.',
    image: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=700',
    alt: 'Architectural planning documents',
  },
];

function Reveal({ children, delay = 0, as: Tag = 'div' as any, style = {}, className = '', ...rest }: any) {
  const ref = useRef<any>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(   
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
        transitionDelay: `${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default function Contact() {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  const [heroLoaded, setHeroLoaded] = useState({ l1: false, l2: false, scroll: false });
  const [cardHovered, setCardHovered] = useState<any>({});
  const [rowHovered, setRowHovered] = useState<any>({});
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const quoteRef = useRef<any>(null);
  const [quoteOffset, setQuoteOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      if (quoteRef.current) {
        const rect = quoteRef.current.getBoundingClientRect();
        setQuoteOffset((window.innerHeight - rect.top) * 0.05);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setHeroLoaded({ l1: true, l2: true, scroll: true });
      return;
    }
    const t1 = setTimeout(() => setHeroLoaded((s) => ({ ...s, l1: true })), 300);
    const t2 = setTimeout(() => setHeroLoaded((s) => ({ ...s, l2: true })), 520);
    const t3 = setTimeout(() => setHeroLoaded((s) => ({ ...s, scroll: true })), 900);
    return () => { [t1, t2, t3].forEach(clearTimeout); };
  }, []);

  const isMobile = windowWidth <= 768;
  const heroParallax = scrollY * 0.15;

  const onChange = (k: string) => (e: any) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const onSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-brand-bg text-brand-dark font-sans">
      {/* HERO */}
      <header className="relative w-full h-screen overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920"
          alt="Atmospheric studio interior"
          className="absolute inset-0 w-full h-[115%] object-cover animate-[heroload_1.8s_ease-out_forwards] will-change-transform"
          style={{
            transform: `translateY(${heroParallax}px)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F1F1F]/55 via-[#1F1F1F]/30 to-[#1F1F1F]/10" />
        <div className="absolute left-6 md:left-12 lg:left-20 bottom-[12%] md:bottom-[20%] z-10 max-w-[660px]">
          <div className="h-[1px] w-[60px] bg-white/60 mb-6" />
          <h1 className="font-serif text-[48px] md:text-[64px] lg:text-[84px] font-normal text-white leading-none m-0">
            <span className="block overflow-hidden">
              <span className={`inline-block transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${heroLoaded.l1 ? "translate-y-0 opacity-100" : "translate-y-[50px] opacity-0"}`}>
                Let's Start a
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className={`inline-block italic transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${heroLoaded.l2 ? "translate-y-0 opacity-100" : "translate-y-[50px] opacity-0"}`}>
                Conversation
              </span>
            </span>
          </h1>
          <div className="h-[1px] w-[120px] bg-white/60 mt-7 ml-auto" />
        </div>
        <div className={`absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 transition-opacity duration-600 ${heroLoaded.scroll ? "opacity-100" : "opacity-0"}`}>
          <div className="w-[22px] h-[34px] border-[1.5px] border-white rounded-[12px] relative">
            <div className="absolute left-1/2 top-1.5 w-[2px] h-[5px] bg-white rounded-[2px] -translate-x-1/2 animate-[mousedot_1.8s_ease-in-out_infinite]" />
          </div>
          <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/70">Scroll Down</div>
        </div>
      </header>

      <main>
        {/* CONTACT INFO GRID */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-[100px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
            {/* INFO */}
            <div>
              <Reveal>
                <span className="top-title mb-3">Contact</span>
                <h2 className="font-serif text-[32px] md:text-[44px] text-brand-earth mt-3 mb-6 font-normal">Get in touch with us.</h2>
                <p className="max-w-[440px] m-0">
                  Whether you have a specific project in mind, want to explore sustainable materials, or wish to consult on a structural system, we'd love to hear from you.
                </p>
              </Reveal>

              <div className="mt-16">
                {contacts.map((c, i) => (
                  <Reveal key={c.label} delay={i * 100}>
                    <div
                      className="group flex items-center justify-between py-8 border-t border-brand-earth/12 cursor-pointer transition-colors duration-200 gap-6 hover:bg-brand-earth/5"
                      onMouseEnter={() => setRowHovered({ ...rowHovered, [i]: true })}
                      onMouseLeave={() => setRowHovered({ ...rowHovered, [i]: false })}
                    >
                      <span className="font-serif italic text-[28px] text-brand-earth">{c.label}</span>
                      <span className="flex-1 text-right whitespace-pre-line">{c.detail}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* FORM */}
            <Reveal delay={200} className="bg-brand-parchment p-8 md:p-14 rounded-[2px]">
              {submitted ? (
                <div className="text-center py-10">
                  <h3 className="font-serif text-[32px] text-brand-earth mb-4">Thank You</h3>
                  <p>Your message has been received. We will get back to you within two working days.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="top-title mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={onChange('name')}
                        required
                        className="w-full bg-transparent border-b border-brand-earth/30 py-2 focus:border-brand-earth outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="top-title mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={onChange('email')}
                        required
                        className="w-full bg-transparent border-b border-brand-earth/30 py-2 focus:border-brand-earth outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="top-title mb-2">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={onChange('message')}
                      required
                      rows={4}
                      className="w-full bg-transparent border-b border-brand-earth/30 py-2 focus:border-brand-earth outline-none transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-brand-earth text-white font-sans text-[12px] uppercase tracking-[0.2em] py-5 rounded-[2px] hover:bg-brand-earth-light transition-colors duration-300"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </section>

        {/* MAP / LOCATION */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 border-t border-brand-earth/10">
          <div className="text-center mb-16">
            <Reveal>
              <span className="top-title mb-3">Visit Us</span>
              <h2 className="font-serif text-[36px] md:text-[52px] text-brand-earth mt-3 font-normal">Our Location</h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reachOptions.map((opt, i) => (
              <Reveal key={opt.title} delay={i * 120}>
                <a 
                  href={opt.link} 
                  target={opt.link ? "_blank" : undefined} 
                  rel="noreferrer"
                  className="group cursor-pointer no-underline text-inherit"
                  onMouseEnter={() => setCardHovered({ ...cardHovered, [i]: true })}
                  onMouseLeave={() => setCardHovered({ ...cardHovered, [i]: false })}
                >
                  <div className="overflow-hidden rounded-[2px] aspect-[3/4]">
                    <img src={opt.image} alt={opt.alt} className="w-full h-full object-cover block transition-transform duration-750 ease-in-out group-hover:scale-[1.06]" />
                  </div>
                  <h3 className="font-serif text-[26px] text-brand-earth mt-5 mb-2.5 font-normal leading-tight">{opt.title}</h3>
                  <p className="m-0">{opt.desc}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* MAP PLACEHOLDER */}
        <section className="h-[480px] bg-brand-parchment relative overflow-hidden" ref={quoteRef}>
          <img
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1920"
            alt="Chennai landscape aerial"
            className="w-full h-[120%] object-cover will-change-transform"
            style={{ transform: `translateY(${quoteOffset}px)` }}
          />
          <div className="absolute inset-0 bg-brand-dark/30 flex items-center justify-center">
            <div className="bg-white p-8 md:p-12 text-center shadow-[0_24px_48px_rgba(0,0,0,0.15)]">
              <h3 className="font-serif text-[24px] text-brand-earth mb-2">Our Studio</h3>
              <p className="text-[14px] text-brand-text font-light">Ashok Nagar, Chennai</p>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-block mt-5 text-[11px] uppercase tracking-[0.12em] text-brand-earth-light no-underline border-b border-brand-earth-light hover:text-brand-earth hover:border-brand-earth transition-colors">View on Maps →</a>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        @keyframes heroload { from { transform: scale(1.05) } to { transform: scale(1) } }
        @keyframes mousedot { 0%,100% { transform: translateY(0) } 50% { transform: translateY(6px) } }
      `}</style>
    </div>
  );
}

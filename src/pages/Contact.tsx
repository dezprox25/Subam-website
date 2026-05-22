import React, { useEffect, useRef, useState } from 'react';

const theme = {
  bg: '#F7F3EE',
  dark: '#2C1F14',
  earth: '#8B5E3C',
  earthLight: '#C4956A',
  muted: '#9C8B7A',
  parchment: '#EDE3D2',
  white: '#FFFFFF',
  overlayDark: 'rgba(30,18,10,0.48)',
};

const contacts = [
  { label: 'Visit', detail: 'No:3 Sri Griha House, 8th Avenue\nAshok Nagar, Chennai - 600083' },
  { label: 'Write', detail: 'consultingsubham@gmail.com\nsubhamconsulting@gmail.com' },
  { label: 'Call', detail: '+91 84385 30234 (WhatsApp)\nMon–Fri · 10:00 AM – 4:00 PM' },
];

const reachOptions = [
  {
    title: 'Studio Visit',
    desc: 'Walk through our material library, see samples of rammed earth, lime plaster, and natural finishes, and meet the team in person.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700',
    alt: 'Studio with natural materials and workspace',
  },
  {
    title: 'Project Inquiry',
    desc: 'Share your site, vision, and timeline. We respond to every inquiry within two working days with a tailored next step.',
    image: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=700',
    alt: 'Architectural plans and project documents',
  },
  {
    title: 'Press & Collaboration',
    desc: 'For media features, speaking engagements, or collaborations with allied practices, write to us directly with context and intent.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=700',
    alt: 'Collaboration meeting around a table',
  },
];

function Reveal({ children, delay = 0, as: Tag = 'div' as any, style = {}, ...rest }: any) {
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
  const isTablet = windowWidth <= 1024;
  const heroParallax = scrollY * 0.15;
  const sectionPadX = isMobile ? 24 : isTablet ? 48 : 80;

  const onChange = (k: string) => (e: any) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const onSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputBase: any = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid rgba(139,94,60,0.25)`,
    padding: '14px 0',
    fontFamily: 'Jost, sans-serif', fontSize: 15, fontWeight: 300,
    color: theme.dark, outline: 'none',
    transition: 'border-color 0.3s ease',
  };
  const labelBase: any = {
    display: 'block',
    fontFamily: 'Jost, sans-serif', fontSize: 11,
    textTransform: 'uppercase', letterSpacing: '0.18em',
    color: theme.muted, marginBottom: 8,
  };

  return (
    <div style={{ background: theme.bg, color: theme.dark, fontFamily: "Jost, sans-serif" }}>
      {/* HERO */}
      <header style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920"
          alt="Atmospheric studio interior"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '115%', objectFit: 'cover',
            transform: `translateY(${heroParallax}px)`, animation: 'heroload 1.8s ease-out forwards',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(30,18,10,0.55) 0%, rgba(30,18,10,0.3) 50%, rgba(30,18,10,0.1) 100%)' }} />
        <div style={{ position: 'absolute', left: sectionPadX, bottom: isMobile ? '12%' : '20%', zIndex: 10, maxWidth: 660 }}>
          <div style={{ height: 1, width: 60, background: 'rgba(255,255,255,0.6)', marginBottom: 24 }} />
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? 48 : isTablet ? 64 : 84,
            fontWeight: 400, color: '#FFFFFF', lineHeight: 1.0, margin: 0,
          }}>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span style={{
                display: 'inline-block', transform: heroLoaded.l1 ? 'translateY(0)' : 'translateY(50px)',
                opacity: heroLoaded.l1 ? 1 : 0, transition: 'all 900ms cubic-bezier(0.16,1,0.3,1)',
              }}>Let's Start a</span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span style={{
                display: 'inline-block', fontStyle: 'italic',
                transform: heroLoaded.l2 ? 'translateY(0)' : 'translateY(50px)',
                opacity: heroLoaded.l2 ? 1 : 0, transition: 'all 900ms cubic-bezier(0.16,1,0.3,1)',
              }}>Conversation</span>
            </span>
          </h1>
          <div style={{ height: 1, width: 120, background: 'rgba(255,255,255,0.6)', marginTop: 28, marginLeft: 'auto' }} />
        </div>
        <div style={{
          position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 10,
          opacity: heroLoaded.scroll ? 1 : 0, transition: 'opacity 0.6s ease',
        }}>
          <div style={{ width: 22, height: 34, border: '1.5px solid #fff', borderRadius: 12, position: 'relative' }}>
            <div style={{
              position: 'absolute', left: '50%', top: 6, width: 2, height: 5, background: '#fff',
              borderRadius: 2, transform: 'translateX(-50%)', animation: 'mousedot 1.8s ease-in-out infinite',
            }} />
          </div>
          <div style={{ fontFamily: 'Jost, sans-serif', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)' }}>Scroll Down</div>
        </div>
      </header>

      <main>
        {/* CONTACT INFO GRID */}
        <section style={{ padding: `${isMobile ? 64 : 100}px ${sectionPadX}px` }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 80, alignItems: 'start' }}>
            <div>
              <Reveal>
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: theme.muted }}>Contact</span>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? 32 : 44, color: theme.earth, marginTop: 12, marginBottom: 24, fontWeight: 400 }}>Get in touch with us.</h2>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: 15, fontWeight: 300, color: theme.muted, lineHeight: 1.85, maxWidth: 440, margin: 0 }}>
                  Whether you have a specific project in mind, want to explore sustainable materials, or simply wish to learn more about our approach, we'd love to hear from you.
                </p>
              </Reveal>

              <div style={{ marginTop: 64 }}>
                {contacts.map((c, i) => (
                  <Reveal key={c.label} delay={i * 100}>
                    <div
                      onMouseEnter={() => setRowHovered({ ...rowHovered, [i]: true })}
                      onMouseLeave={() => setRowHovered({ ...rowHovered, [i]: false })}
                      style={{
                        padding: '32px 0', borderTop: '1px solid rgba(139,94,60,0.12)',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
                      }}
                    >
                      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 28, color: theme.earth }}>{c.label}</span>
                      <span style={{ flex: 1, textAlign: 'right', fontSize: 14, color: theme.muted, fontWeight: 300, whiteSpace: 'pre-line', lineHeight: 1.6 }}>{c.detail}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* FORM */}
            <Reveal delay={200} style={{ background: theme.parchment, padding: isMobile ? 32 : 56, borderRadius: 2 }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, color: theme.earth, marginBottom: 16 }}>Thank You</h3>
                  <p style={{ fontSize: 15, color: theme.muted, fontWeight: 300 }}>Your message has been received. We will get back to you within two working days.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  <div style={{ marginBottom: 32 }}>
                    <label style={labelBase}>Full Name</label>
                    <input style={inputBase} placeholder="Enter your name" required value={form.name} onChange={onChange('name')} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 32, marginBottom: 32 }}>
                    <div>
                      <label style={labelBase}>Email Address</label>
                      <input type="email" style={inputBase} placeholder="Enter your email" required value={form.email} onChange={onChange('email')} />
                    </div>
                    <div>
                      <label style={labelBase}>Phone Number</label>
                      <input style={inputBase} placeholder="Enter phone number" value={form.phone} onChange={onChange('phone')} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 32 }}>
                    <label style={labelBase}>Subject</label>
                    <select style={inputBase} value={form.subject} onChange={onChange('subject')}>
                      <option>General Inquiry</option>
                      <option>Project Consultation</option>
                      <option>Material Studio Visit</option>
                      <option>Press & Collaboration</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: 40 }}>
                    <label style={labelBase}>Message</label>
                    <textarea style={{ ...inputBase, height: 120, resize: 'none' }} placeholder="How can we help you?" required value={form.message} onChange={onChange('message')} />
                  </div>
                  <button
                    type="submit"
                    style={{
                      width: '100%', background: theme.earth, color: '#fff', border: 'none',
                      padding: '16px', fontFamily: 'Jost, sans-serif', fontSize: 12,
                      textTransform: 'uppercase', letterSpacing: '0.14em', cursor: 'pointer',
                      transition: 'background 0.3s ease',
                    }}
                  >
                    Send Message
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </section>

        {/* REACH OPTIONS */}
        <section style={{ padding: `0 ${sectionPadX}px ${isMobile ? 64 : 100}px` }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Reveal>
              <span style={{ fontFamily: 'Jost, sans-serif', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: theme.muted }}>Visit Us</span>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? 36 : 52, color: theme.earth, marginTop: 12, fontWeight: 400 }}>Ways to Reach</h2>
            </Reveal>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 32 }}>
            {reachOptions.map((opt, i) => (
              <Reveal key={opt.title} delay={i * 120}>
                <div
                  onMouseEnter={() => setCardHovered({ ...cardHovered, [i]: true })}
                  onMouseLeave={() => setCardHovered({ ...cardHovered, [i]: false })}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ overflow: 'hidden', borderRadius: 2 }}>
                    <img src={opt.image} alt={opt.alt} style={{
                      width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block',
                      transform: cardHovered[i] ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.75s ease',
                    }} />
                  </div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, color: theme.earth, marginTop: 20, marginBottom: 10, fontWeight: 400 }}>{opt.title}</h3>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: 14, fontWeight: 300, color: theme.muted, lineHeight: 1.7, margin: 0 }}>{opt.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* MAP PLACEHOLDER */}
        <section style={{ height: 480, background: theme.parchment, position: 'relative', overflow: 'hidden' }} ref={quoteRef}>
          <img
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1920"
            alt="Chennai landscape aerial"
            style={{ width: '100%', height: '120%', objectFit: 'cover', transform: `translateY(${quoteOffset}px)`, willChange: 'transform' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(44,31,20,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', padding: '32px 48px', textAlign: 'center', boxShadow: '0 24px 48px rgba(0,0,0,0.15)' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, color: theme.earth, marginBottom: 8 }}>Our Studio</h3>
              <p style={{ fontSize: 14, color: theme.muted, fontWeight: 300 }}>Ashok Nagar, Chennai</p>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 20, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: theme.earthLight, textDecoration: 'none', borderBottom: `1px solid ${theme.earthLight}` }}>View on Maps →</a>
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

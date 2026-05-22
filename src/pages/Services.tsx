import React, { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "Sustainable Construction",
    body:
      "We design and build environmentally responsible spaces using sustainable materials and nature-friendly construction methods that promote long-term durability and healthier living environments. From rammed earth walls to passive cooling systems, we build homes that work with nature, not against it.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900",
    alt: "Sustainable construction using natural materials",
    imageLeft: false,
  },
  {
    title: "Farmhouse Development",
    body:
      "Thoughtfully designed farmhouses that blend modern comfort with natural living, creating peaceful and functional spaces connected to the surrounding landscape. We integrate traditional wisdom with modern engineering for breathable, durable living.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900",
    alt: "Farmhouse development with natural surroundings",
    imageLeft: true,
  },
  {
    title: "Institutional & School Projects",
    body:
      "Sustainable and functional educational and institutional spaces designed to enhance comfort, learning, community interaction, and environmental responsibility.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900",
    alt: "Sustainable institutional building project",
    imageLeft: false,
  },
  {
    title: "Consulting Services",
    body:
      "End-to-end consulting services covering project planning, sustainable design guidance, material selection, construction strategy, and structural consulting for safe, efficient building systems.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900",
    alt: "Construction consulting and project planning",
    imageLeft: true,
  },
];

const additionalServices = [
  {
    title: "Workshops & Knowledge",
    desc: "Conducting awareness programs focused on sustainable living, traditional construction, and alternative building practices.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=700",
    alt: "Sustainable building workshop",
  },
  {
    title: "Government Projects",
    desc: "Execution and consulting for public sector projects with a focus on quality, sustainability, and structural reliability.",
    image: "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=700",
    alt: "Public sector infrastructure project",
  },
  {
    title: "Real Estate & Site Development",
    desc: "End-to-end solutions focused on creating well-planned, sustainable, and future-ready spaces from land planning to layout execution.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=700",
    alt: "Sustainable site development planning",
  },
];

const roofFinishes = [
  "Traditional Lime Plasters",
  "Vaulted Domes",
  "Madras Terrace",
  "Mangalore Tiles",
  "Bamboo & Thatch",
  "Artisanal Textures",
];

function Reveal({ children, delay = 0, as: Tag = "div" as any, style = {}, className = "", ...rest }: any) {
  const ref = useRef<any>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
        transitionDelay: `${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default function Services() {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [cardHovered, setCardHovered] = useState<any>({});
  const [linkHovered, setLinkHovered] = useState<any>({});
  const [imgHovered, setImgHovered] = useState<any>({});

  const quoteBannerRef = useRef<any>(null);
  const [quoteBannerParallax, setQuoteBannerParallax] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      if (quoteBannerRef.current) {
        const rect = quoteBannerRef.current.getBoundingClientRect();
        setQuoteBannerParallax((window.innerHeight - rect.top) * 0.1);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 30);
    return () => clearTimeout(t);
  }, []);

  const isMobile = windowWidth <= 768;
  const heroParallax = scrollY * 0.15;

  return (
    <div className="bg-brand-bg text-brand-dark font-sans">
      {/* ====== HERO ====== */}
      <header className="relative w-full h-screen overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920"
          alt="Sustainable architecture and planning"
          className="absolute inset-0 w-full h-[115%] object-cover will-change-transform"
          style={{
            transform: `translateY(${heroParallax}px)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F1F1F]/60 via-[#1F1F1F]/35 to-[#1F1F1F]/15" />
        <div className="absolute left-[6%] md:left-[8%] bottom-[12%] md:bottom-[20%] z-10 max-w-[800px] right-[6%] md:right-auto">
          <div className={`h-[1px] w-[60px] bg-white/60 mb-6 transition-opacity duration-900 delay-200 ${heroLoaded ? "opacity-100" : "opacity-0"}`} />
          <h1 className="font-serif text-[44px] md:text-[62px] lg:text-[82px] font-normal text-white leading-none m-0">
            <span className="block overflow-hidden">
              <span className={`inline-block transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300 ${heroLoaded ? "translate-y-0 opacity-100" : "translate-y-[50px] opacity-0"}`}>
                Our Expertise
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className={`inline-block italic transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] delay-520 ${heroLoaded ? "translate-y-0 opacity-100" : "translate-y-[50px] opacity-0"}`}>
                In Sustainable Design
              </span>
            </span>
          </h1>
          <div className={`h-[1px] w-[120px] bg-white/60 mt-7 ml-auto transition-opacity duration-900 delay-720 ${heroLoaded ? "opacity-100" : "opacity-0"}`} />
        </div>
      </header>

      <main>
        {/* ====== CORE SERVICES ====== */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-20 lg:py-24">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[100px] items-center ${i === services.length - 1 ? "" : "mb-20 md:mb-[140px]"}`}
            >
              <div className={isMobile ? "order-2" : s.imageLeft ? "order-2" : "order-1"}>
                <Reveal>
                  <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                    Service {i + 1}
                  </span>
                  <h2 className="font-serif text-[32px] md:text-[44px] text-brand-earth mt-3 mb-6 font-normal">
                    {s.title}
                  </h2>
                  <p className="font-sans text-[15px] font-light text-brand-text leading-[1.95] m-0">
                    {s.body}
                  </p>
                  <a
                    href="/contact"
                    className={`inline-block mt-8 font-sans text-[12px] uppercase tracking-[0.12em] text-brand-earth no-underline border-b transition-all duration-300 ${linkHovered[i] ? "border-brand-earth" : "border-transparent"}`}
                    onMouseEnter={() => setLinkHovered({ ...linkHovered, [i]: true })}
                    onMouseLeave={() => setLinkHovered({ ...linkHovered, [i]: false })}
                  >
                    Inquire about this service →
                  </a>
                </Reveal>
              </div>

              <div className={isMobile ? "order-1" : s.imageLeft ? "order-1" : "order-2"}>
                <Reveal delay={120}>
                  <div
                    className="overflow-hidden rounded-[3px] shadow-[0_24px_48px_rgba(31,31,31,0.12)] group"
                    onMouseEnter={() => setImgHovered({ ...imgHovered, [i]: true })}
                    onMouseLeave={() => setImgHovered({ ...imgHovered, [i]: false })}
                  >
                    <img
                      src={s.image}
                      alt={s.alt}
                      className="w-full h-[320px] md:h-[540px] object-cover block transition-transform duration-800 ease-in-out group-hover:scale-[1.04]"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          ))}
        </section>

        {/* ====== QUOTE BANNER ====== */}
        <section ref={quoteBannerRef} className="relative w-full h-[340px] md:h-[480px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1518005020250-6eb5f3f2754d?w=1920"
            alt="Natural stone texture close-up"
            className="absolute inset-0 w-full h-[120%] object-cover will-change-transform"
            style={{
              transform: `translateY(${quoteBannerParallax}px)`,
            }}
          />
          <div className="absolute inset-0 bg-brand-dark/40" />
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <Reveal>
              <h2 className="font-serif text-[28px] md:text-[42px] italic text-white max-w-[800px] m-0 font-normal leading-tight">
                "Traditional building wisdom meets modern engineering for spaces that truly breathe."
              </h2>
            </Reveal>
          </div>
        </section>

        {/* ====== FINISHES SECTION ====== */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-20 lg:py-24 bg-brand-parchment">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center">
            <Reveal>
              <h2 className="font-serif text-[36px] md:text-[52px] text-brand-earth mb-6 leading-tight">Luxury Finishes & Roof Options</h2>
              <p className="text-brand-text leading-[1.8] mb-8 font-light">Natural finishes and climate-conscious roofing systems crafted for timeless elegance. We specialize in artisanal textures that support healthy indoor air quality.</p>
              <div className="grid grid-cols-2 gap-[16px_32px]">
                {roofFinishes.map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-earth-light" />
                    <span className="text-[14px] text-brand-dark font-light">{f}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="overflow-hidden rounded-[3px]">
                <img src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800" alt="Artisanal wall finish" className="w-full h-[300px] md:h-[440px] object-cover" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ====== ADDITIONAL SERVICES ====== */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-20 lg:py-24">
          <div className="text-center mb-[72px]">
            <Reveal>
              <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Specialised Expertise
              </span>
              <h2 className="font-serif text-[36px] md:text-[52px] text-brand-earth mt-3 font-normal">
                Additional Offerings
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((s, i) => (
              <Reveal key={s.title} delay={i * 120}>
                <div
                  className="cursor-pointer group"
                  onMouseEnter={() => setCardHovered({ ...cardHovered, [i]: true })}
                  onMouseLeave={() => setCardHovered({ ...cardHovered, [i]: false })}
                >
                  <div className="overflow-hidden rounded-[2px] aspect-[3/4]">
                    <img
                      src={s.image}
                      alt={s.alt}
                      className="w-full h-full object-cover block transition-transform duration-750 ease-in-out group-hover:scale-[1.06]"
                    />
                  </div>
                  <h3 className="font-serif text-[26px] text-brand-earth mt-5 mb-2.5 font-normal leading-tight">
                    {s.title}
                  </h3>
                  <p className="font-sans text-[14px] font-light text-brand-text leading-[1.7] m-0">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

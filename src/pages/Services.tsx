import React, { useEffect, useRef, useState } from "react";

const theme = {
  bg: "#F7F3EE",
  dark: "#2C1F14",
  earth: "#8B5E3C",
  earthLight: "#C4956A",
  muted: "#9C8B7A",
  parchment: "#EDE3D2",
  white: "#FFFFFF",
  overlayDark: "rgba(30,18,10,0.48)",
};

const services = [
  {
    title: "Sustainable Construction",
    body:
      "We design and build environmentally responsible spaces using natural materials and nature-friendly methods that promote long-term durability and healthier living environments. Every material is chosen for its ecological footprint, structural integrity, and contribution to a healthier indoor environment. From rammed earth walls to passive cooling systems, we build homes that work with nature, not against it.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900",
    alt: "Sustainable construction using natural materials",
    imageLeft: false,
  },
  {
    title: "Construction Consulting",
    body:
      "End-to-end consulting covering project planning, sustainable design guidance, material selection, and execution support from concept to completion. We work alongside architects, developers, and individual homeowners to ensure every decision aligns with environmental responsibility, structural soundness, and long-term value. Our consultants bring decades of combined expertise to every engagement.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900",
    alt: "Construction consulting and project planning",
    imageLeft: true,
  },
  {
    title: "Farmhouse Development",
    body:
      "Thoughtfully designed farmhouses that blend modern comfort with natural living, creating peaceful spaces connected to the surrounding landscape. Our farmhouse projects are built using locally sourced natural materials, integrated water harvesting systems, and passive design strategies that reduce energy consumption while maximising comfort across every season.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900",
    alt: "Farmhouse development with natural surroundings",
    imageLeft: false,
  },
  {
    title: "Institutional Projects",
    body:
      "Sustainable schools, wellness centres, and community institutions built with the same commitment to natural materials and healthy environments. We believe institutional buildings carry the greatest responsibility — they shape how communities live, learn, and heal. Our institutional projects set a new standard for what public and educational spaces can be.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900",
    alt: "Sustainable institutional building project",
    imageLeft: true,
  },
];

const additionalServices = [
  {
    title: "Interior Consultation",
    desc: "Natural material finishes, breathable walls, and zero-chemical interiors designed for long-term human health and aesthetic harmony.",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=700",
    alt: "Natural interior design consultation",
  },
  {
    title: "Landscape & Site Design",
    desc: "Site planning that honours the natural topography, integrates native planting, and creates outdoor spaces that feel like extensions of the land.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=700",
    alt: "Sustainable landscape and site design",
  },
  {
    title: "Renovation & Restoration",
    desc: "Breathing new life into existing structures using natural materials, structural upgrades, and sustainable retrofits that restore beauty without compromise.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=700",
    alt: "Building renovation and restoration project",
  },
];

function Reveal({ children, delay = 0, as: Tag = "div" as any, style = {}, ...rest }: any) {
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
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition:
          "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
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
  const [heroParallax, setHeroParallax] = useState(0);
  const [quoteBannerParallax, setQuoteBannerParallax] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [imgHovered, setImgHovered] = useState<any>({});
  const [linkHovered, setLinkHovered] = useState<any>({});
  const [cardHovered, setCardHovered] = useState<any>({});

  const quoteBannerRef = useRef<any>(null);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onScroll = () => {
      const y = window.scrollY;
      if (!reduced) {
        setHeroParallax(y * 0.15);
        if (quoteBannerRef.current) {
          const rect = quoteBannerRef.current.getBoundingClientRect();
          const offset = (window.innerHeight - rect.top) * 0.1;
          setQuoteBannerParallax(Math.max(-60, Math.min(60, offset * 0.2)));
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const t2 = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t2);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024;

  const sectionPad = isMobile ? "64px 24px" : isTablet ? "80px 48px" : "100px 80px";

  return (
    <div style={{ background: theme.bg, color: theme.dark, fontFamily: "Jost, sans-serif" }}>
      {/* ====== HERO ====== */}
      <header
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920"
          alt="Sustainable architecture and planning"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "115%",
            objectFit: "cover",
            transform: `translateY(${heroParallax}px)`,
            willChange: "transform",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom right, rgba(30,18,10,0.6) 0%, rgba(30,18,10,0.35) 50%, rgba(30,18,10,0.15) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: isMobile ? "6%" : "8%",
            bottom: isMobile ? "12%" : "20%",
            zIndex: 10,
            maxWidth: 800,
            right: isMobile ? "6%" : "auto",
          }}
        >
          <div
            style={{
              height: 1,
              width: 60,
              background: "rgba(255,255,255,0.6)",
              marginBottom: 24,
              opacity: heroLoaded ? 1 : 0,
              transition: "opacity 900ms ease 200ms",
            }}
          />
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? 44 : isTablet ? 62 : 82,
              fontWeight: 400,
              color: "#FFFFFF",
              lineHeight: 1.0,
              margin: 0,
            }}
          >
            <span style={{ display: "block", overflow: "hidden" }}>
              <span
                style={{
                  display: "inline-block",
                  transform: heroLoaded ? "translateY(0)" : "translateY(50px)",
                  opacity: heroLoaded ? 1 : 0,
                  transition: "all 900ms cubic-bezier(0.16,1,0.3,1) 300ms",
                }}
              >
                Our Services
              </span>
            </span>
            <span style={{ display: "block", overflow: "hidden" }}>
              <span
                style={{
                  display: "inline-block",
                  fontStyle: "italic",
                  transform: heroLoaded ? "translateY(0)" : "translateY(50px)",
                  opacity: heroLoaded ? 1 : 0,
                  transition: "all 900ms cubic-bezier(0.16,1,0.3,1) 520ms",
                }}
              >
                Rooted in Nature
              </span>
            </span>
          </h1>
          <div
            style={{
              height: 1,
              width: 120,
              background: "rgba(255,255,255,0.6)",
              marginTop: 28,
              marginLeft: "auto",
              opacity: heroLoaded ? 1 : 0,
              transition: "opacity 900ms ease 720ms",
            }}
          />
        </div>
      </header>

      <main>
        {/* ====== CORE SERVICES ====== */}
        <section style={{ padding: sectionPad }}>
          {services.map((s, i) => (
            <div
              key={s.title}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? 40 : 100,
                alignItems: "center",
                marginBottom: i === services.length - 1 ? 0 : isMobile ? 80 : 140,
              }}
            >
              <div
                style={{
                  order: isMobile ? 2 : s.imageLeft ? 2 : 1,
                }}
              >
                <Reveal>
                  <span
                    style={{
                      fontFamily: "Jost, sans-serif",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      color: theme.muted,
                    }}
                  >
                    Service {i + 1}
                  </span>
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: isMobile ? 32 : 44,
                      color: theme.earth,
                      marginTop: 12,
                      marginBottom: 24,
                      fontWeight: 400,
                    }}
                  >
                    {s.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "Jost, sans-serif",
                      fontSize: 15,
                      fontWeight: 300,
                      color: theme.muted,
                      lineHeight: 1.95,
                      margin: 0,
                    }}
                  >
                    {s.body}
                  </p>
                  <a
                    href="#"
                    onMouseEnter={() => setLinkHovered({ ...linkHovered, [i]: true })}
                    onMouseLeave={() => setLinkHovered({ ...linkHovered, [i]: false })}
                    style={{
                      display: "inline-block",
                      marginTop: 32,
                      fontFamily: "Jost, sans-serif",
                      fontSize: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: theme.earth,
                      textDecoration: "none",
                      borderBottom: linkHovered[i]
                        ? `1px solid ${theme.earth}`
                        : "1px solid transparent",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Inquire about this service →
                  </a>
                </Reveal>
              </div>

              <div
                style={{
                  order: isMobile ? 1 : s.imageLeft ? 1 : 2,
                }}
              >
                <Reveal delay={120}>
                  <div
                    onMouseEnter={() => setImgHovered({ ...imgHovered, [i]: true })}
                    onMouseLeave={() => setImgHovered({ ...imgHovered, [i]: false })}
                    style={{
                      overflow: "hidden",
                      borderRadius: 3,
                      boxShadow: "0 24px 48px rgba(44,31,20,0.12)",
                    }}
                  >
                    <img
                      src={s.image}
                      alt={s.alt}
                      style={{
                        width: "100%",
                        height: isMobile ? 320 : 540,
                        objectFit: "cover",
                        display: "block",
                        transform: imgHovered[i] ? "scale(1.04)" : "scale(1)",
                        transition: "transform 0.8s ease",
                      }}
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          ))}
        </section>

        {/* ====== QUOTE BANNER ====== */}
        <section
          ref={quoteBannerRef}
          style={{
            position: "relative",
            width: "100%",
            height: isMobile ? 340 : 480,
            overflow: "hidden",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1518005020250-6eb5f3f2754d?w=1920"
            alt="Natural stone texture close-up"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "120%",
              objectFit: "cover",
              transform: `translateY(${quoteBannerParallax}px)`,
              willChange: "transform",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(30,18,10,0.42)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 24px",
              textAlign: "center",
            }}
          >
            <Reveal>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: isMobile ? 28 : 42,
                  fontStyle: "italic",
                  color: "#FFFFFF",
                  maxWidth: 800,
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                "The buildings of the future should not only protect us from the
                elements but reconnect us with the world around us."
              </h2>
            </Reveal>
          </div>
        </section>

        {/* ====== ADDITIONAL SERVICES ====== */}
        <section style={{ padding: sectionPad }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <Reveal>
              <span
                style={{
                  fontFamily: "Jost, sans-serif",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: theme.muted,
                }}
              >
                Specialised Expertise
              </span>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: isMobile ? 36 : 52,
                  color: theme.earth,
                  marginTop: 12,
                  fontWeight: 400,
                }}
              >
                Additional Offerings
              </h2>
            </Reveal>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
              gap: 32,
            }}
          >
            {additionalServices.map((s, i) => (
              <Reveal key={s.title} delay={i * 120}>
                <div
                  onMouseEnter={() => setCardHovered({ ...cardHovered, [i]: true })}
                  onMouseLeave={() => setCardHovered({ ...cardHovered, [i]: false })}
                  style={{ cursor: "pointer" }}
                >
                  <div style={{ overflow: "hidden", borderRadius: 2 }}>
                    <img
                      src={s.image}
                      alt={s.alt}
                      style={{
                        width: "100%",
                        aspectRatio: "3/4",
                        objectFit: "cover",
                        display: "block",
                        transform: cardHovered[i] ? "scale(1.06)" : "scale(1)",
                        transition: "transform 0.75s ease",
                      }}
                    />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 26,
                      color: theme.earth,
                      marginTop: 20,
                      marginBottom: 10,
                      fontWeight: 400,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Jost, sans-serif",
                      fontSize: 14,
                      fontWeight: 300,
                      color: theme.muted,
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
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

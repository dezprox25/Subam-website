import React, { useState, useEffect, useRef } from "react";

const theme = {
  bg: "#F7F3EE",
  dark: "#2C1F14",
  earth: "#8B5E3C",
  earthLight: "#C4956A",
  muted: "#9C8B7A",
  text: "#4A3B28",
  parchment: "#EDE3D2",
  white: "#FFFFFF",
  overlayDark: "rgba(30,18,10,0.48)",
};

const EASE = "cubic-bezier(0.22,1,0.36,1)";

// ---------- Reveal hook ----------
function useReveal(threshold = 0.12) {
  const ref = useRef<any>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, shown];
}

function Reveal({ children, delay = 0, as: Tag = "div" as any, style = {}, ...rest }: any) {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s ${EASE}, transform 0.8s ${EASE}`,
        transitionDelay: `${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ---------- Hover-zoom image ----------
function ZoomImage({ src, alt, height, style = {}, wrapperStyle = {}, radius = 3 }: any) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ overflow: "hidden", borderRadius: radius, ...wrapperStyle }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: height || "100%",
          objectFit: "cover",
          display: "block",
          transform: hover ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94)",
          ...style,
        }}
      />
    </div>
  );
}

// ---------- Count up ----------
function CountUp({ target, suffix = "" }: any) {
  const ref = useRef<any>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const start = performance.now();
            const dur = 1800;
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(Math.round(eased * target));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

function PolaroidSection({ parallaxY, isMobile }: any) {
  const ref = useRef<any>(null);
  const [trig, setTrig] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTrig(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const polaroidBase: any = {
    background: "#FFFFFF",
    padding: "12px 12px 36px",
    boxShadow: "0 18px 40px rgba(30,18,10,0.35)",
  };

  const imgSize = isMobile
    ? { width: 150, height: 120 }
    : { width: 240, height: 200 };

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        height: isMobile ? 420 : 560,
        overflow: "hidden",
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920"
        alt="Immersive architectural interior"
        style={{
          position: "absolute",
          inset: 0,
          objectFit: "cover",
          width: "100%",
          height: "110%",
          transform: `translateY(${parallaxY * 0.4}px)`,
          willChange: "transform",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(30,18,10,0.55) 0%, rgba(30,18,10,0.35) 50%, rgba(30,18,10,0.1) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 48,
          right: isMobile ? "4%" : "8%",
          zIndex: 10,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            ...polaroidBase,
            zIndex: 2,
            marginRight: -40,
            opacity: trig ? 1 : 0,
            transform: trig
              ? "rotate(-6deg) translateY(0)"
              : "rotate(-6deg) translateY(20px)",
            transition:
              "opacity 900ms ease-out, transform 900ms ease-out",
            transitionDelay: "200ms",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=400"
            alt="Interior architectural detail"
            style={{ ...imgSize, objectFit: "cover", display: "block" }}
          />
        </div>
        <div
          style={{
            ...polaroidBase,
            zIndex: 1,
            opacity: trig ? 1 : 0,
            transform: trig
              ? "rotate(4deg) translateY(0)"
              : "rotate(4deg) translateY(20px)",
            transition:
              "opacity 900ms ease-out, transform 900ms ease-out",
            transitionDelay: "450ms",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400"
            alt="Natural material texture detail"
            style={{ ...imgSize, objectFit: "cover", display: "block" }}
          />
        </div>
      </div>
    </section>
  );
}

export default function About() {
  const [mounted, setMounted] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  const ghostRef = useRef<any>(null);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setParallaxY(window.scrollY * 0.25);
      if (ghostRef.current) {
        ghostRef.current.style.transform = `translateY(${window.scrollY * 0.2}px)`;
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

  const stats = [
    { target: 50, suffix: "+", label: "Projects Completed" },
    { target: 12, suffix: "+", label: "Service Offerings" },
    { target: 100, suffix: "%", label: "Natural Materials" },
  ];

  const team = [
    {
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600",
      alt: "Sanchana Subbarayan, Founder",
      name: "Sanchana Subbarayan",
      role: "Founder & Civil Engineer",
      bio: "A civil engineering graduate with a vision to make sustainable construction practical, beautiful, and accessible across India.",
    },
    {
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600",
      alt: "Design and consulting team member",
      name: "Design & Consulting Team",
      role: "Structural & Sustainable Design",
      bio: "Our team of engineers and consultants brings deep expertise in natural materials, structural systems, and climate-responsive design.",
    },
    {
      img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600",
      alt: "Construction specialist on site",
      name: "Construction Specialists",
      role: "Site Execution & Quality",
      bio: "Skilled builders trained in traditional construction methods — rammed earth, mud block, natural COB — executed with modern precision.",
    },
  ];

  const sectionPad = isMobile
    ? "64px 24px"
    : isTablet
      ? "80px 48px"
      : "100px 80px";

  return (
    <div style={{ background: theme.bg, color: theme.dark, fontFamily: "Jost, sans-serif" }}>
      <header
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920"
          alt="Sustainable architectural facade at golden hour"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            animation: "heroload 1.8s ease-out forwards",
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
            left: "6%",
            bottom: isMobile ? "12%" : "20%",
            zIndex: 10,
            maxWidth: 700,
            right: isMobile ? "6%" : "auto",
          }}
        >
          <div
            style={{
              height: 1,
              width: 80,
              background: "rgba(255,255,255,0.6)",
              marginBottom: 24,
              opacity: mounted ? 1 : 0,
              transition: "opacity 900ms ease",
              transitionDelay: "200ms",
            }}
          />
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? 44 : isTablet ? 62 : 78,
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
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(50px)",
                  transition: `opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)`,
                  transitionDelay: "300ms",
                }}
              >
                Reviving Wisdom
              </span>
            </span>
            <span style={{ display: "block", overflow: "hidden" }}>
              <span
                style={{
                  display: "inline-block",
                  fontStyle: "italic",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(50px)",
                  transition: `opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)`,
                  transitionDelay: "520ms",
                }}
              >
                Engineering Change
              </span>
            </span>
          </h1>
        </div>
      </header>

      <main>
        <section
          style={{
            background: theme.bg,
            padding: isMobile ? "60px 0 24px" : "80px 0 40px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <p
            ref={ghostRef}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? 32 : isTablet ? 48 : 72,
              fontStyle: "italic",
              fontWeight: 400,
              color: "rgba(139,94,60,0.12)",
              textAlign: "center",
              lineHeight: 1.2,
              whiteSpace: isTablet ? "normal" : "nowrap" as any,
              width: "100%",
              margin: 0,
              padding: "0 40px",
              willChange: "transform",
            }}
          >
            Crafting future-ready spaces that breathe.
          </p>
        </section>

        <section
          style={{
            background: theme.bg,
            padding: isMobile ? "40px 24px 64px" : "60px 80px 100px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 32 : 60,
              alignItems: "start",
            }}
          >
            <Reveal>
              <ZoomImage
                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800"
                alt="Construction site with natural materials"
                height={isMobile ? 360 : 560}
              />
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <Reveal delay={100}>
                <ZoomImage
                  src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=700"
                  alt="Sustainable architecture detail"
                  height={240}
                  wrapperStyle={{ marginTop: isMobile ? 0 : 60 }}
                />
              </Reveal>
              <Reveal delay={220} style={{ marginTop: 8 }}>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 80,
                    color: theme.earthLight,
                    lineHeight: 0,
                    display: "block",
                    marginBottom: 12,
                    height: 40,
                  }}
                >
                  “
                </span>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: isMobile ? 22 : 26,
                    fontWeight: 400,
                    color: theme.earth,
                    lineHeight: 1.55,
                    maxWidth: 440,
                    margin: 0,
                  }}
                >
                  Our vision is to redefine the future of construction through sustainable innovation, conscious design, and environmentally responsible building practices.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section
          style={{
            background: theme.bg,
            padding: isMobile ? "48px 24px 56px" : "60px 80px 80px",
            borderTop: "1px solid rgba(139,94,60,0.1)",
            borderBottom: "1px solid rgba(139,94,60,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "center",
              alignItems: "center",
              gap: isMobile ? 32 : 0,
            }}
          >
            {stats.map((s, i) => (
              <React.Fragment key={s.label}>
                <Reveal
                  delay={i * 120}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: isMobile ? 0 : "0 40px",
                    width: isMobile ? "100%" : "auto",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: isTablet ? 56 : 72,
                      fontWeight: 400,
                      color: theme.earth,
                      lineHeight: 1,
                    }}
                  >
                    <CountUp target={s.target} suffix={s.suffix} />
                  </div>
                  <p
                    style={{
                      fontFamily: "Jost, sans-serif",
                      fontSize: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: theme.muted,
                      marginTop: 12,
                    }}
                  >
                    {s.label}
                  </p>
                </Reveal>
                {!isMobile && i < stats.length - 1 && (
                  <span
                    aria-hidden
                    style={{
                      width: 1,
                      height: 60,
                      background: "rgba(139,94,60,0.2)",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        <section style={{ background: theme.bg, padding: sectionPad }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 80,
            }}
          >
            <div>
              <Reveal as="p"
                style={{
                  fontFamily: "Jost, sans-serif",
                  fontSize: 11,
                  color: "rgba(139,94,60,0.45)",
                  letterSpacing: "0.06em",
                  marginBottom: 32,
                  marginTop: 0,
                }}
              >
                About · Our Story · Foundation
              </Reveal>
              <Reveal as="p"
                delay={80}
                style={{
                  fontFamily: "Jost, sans-serif",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: theme.muted,
                  marginBottom: 16,
                  marginTop: 0,
                }}
              >
                Our Story
              </Reveal>
              <Reveal as="h3"
                delay={160}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: isMobile ? 30 : 38,
                  color: theme.earth,
                  lineHeight: 1.2,
                  marginBottom: 32,
                  marginTop: 0,
                  fontWeight: 400,
                }}
              >
                Building for wellness and nature.
              </Reveal>
              {[
                "Sanchana Subbarayan, Founder of Shubham Consulting and Construction, is a Civil Engineering graduate driven by a vision to create healthier and more sustainable living environments. Her journey began with a simple realization: modern buildings not only impact the environment through resource consumption, but also affect human health through chemical emissions from conventional materials.",
                "Believing that the spaces we live in should support both human well-being and nature, Sanchana explored how traditional architecture could be merged with modern engineering principles. Her goal was to make sustainable building practices practical, affordable, and relevant for contemporary lifestyles.",
                "Today, Shubham Consulting and Construction is dedicated to reviving traditional building wisdom through modern and environmentally responsible practices. We create thoughtfully designed spaces using natural materials and climate-conscious design that remain connected to nature and local context.",
              ].map((p, i) => (
                <Reveal as="p"
                  key={i}
                  delay={240 + i * 100}
                  style={{
                    fontFamily: "Jost, sans-serif",
                    fontSize: 15,
                    fontWeight: 300,
                    color: theme.text,
                    lineHeight: 1.95,
                    margin: "0 0 24px",
                  }}
                >
                  {p}
                </Reveal>
              ))}
            </div>
            <div />
          </div>
        </section>

        <PolaroidSection
          parallaxY={parallaxY}
          isMobile={isMobile}
        />

        <section style={{ background: theme.bg, padding: sectionPad }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <Reveal as="h2"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: isMobile ? 36 : 52,
                fontStyle: "italic",
                color: theme.earth,
                lineHeight: 1.2,
                fontWeight: 400,
                margin: 0,
              }}
            >
              The People Behind
            </Reveal>
            <Reveal as="h2"
              delay={100}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: isMobile ? 36 : 52,
                fontStyle: "italic",
                color: theme.earth,
                lineHeight: 1.2,
                fontWeight: 400,
                margin: 0,
              }}
            >
              The Purpose.
            </Reveal>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 60,
              alignItems: "start",
            }}
          >
            <Reveal>
              <ZoomImage
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600"
                alt="Sustainable construction project"
                height={300}
                wrapperStyle={{ marginBottom: 24 }}
              />
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 24,
                  color: theme.earth,
                  lineHeight: 1.3,
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                Commitment to Lasting Value.
              </h3>
              <p
                style={{
                  fontFamily: "Jost, sans-serif",
                  fontSize: 13,
                  fontWeight: 300,
                  color: theme.text,
                  lineHeight: 1.8,
                  marginTop: 12,
                }}
              >
                Shubham is a sustainable consulting and construction company working across India. Our expertise includes farmhouses, residences, institutional spaces, schools, and eco-development projects. We balance functionality, long-term value, and environmental responsibility in every site we develop.
              </p>
            </Reveal>

            <div style={{ marginTop: isMobile ? 0 : 80 }}>
              {[
                {
                  year: "Knowledge",
                  head: "Workshops & Programs",
                  body:
                    "Alongside construction, we conduct workshops and knowledge programs to promote sustainable living and alternative building practices.",
                },
                {
                  year: "Strategy",
                  head: "Construction Consulting",
                  body:
                    "End-to-end services covering project planning, sustainable design guidance, material selection, and structural systems.",
                },
                {
                  year: "Future",
                  head: "Conscious Innovation",
                  body:
                    "Committed to creating environmentally conscious, climate-responsive, and naturally connected spaces for future generations.",
                },
              ].map((m, i) => (
                <Reveal
                  key={m.head}
                  delay={i * 120}
                  style={{
                    padding: "24px 0",
                    borderBottom:
                      i < 2 ? "1px solid rgba(139,94,60,0.12)" : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Jost, sans-serif",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: theme.earthLight,
                    }}
                  >
                    {m.year}
                  </span>
                  <h4
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 22,
                      color: theme.earth,
                      marginTop: 6,
                      marginBottom: 0,
                      fontWeight: 400,
                    }}
                  >
                    {m.head}
                  </h4>
                  <p
                    style={{
                      fontFamily: "Jost, sans-serif",
                      fontSize: 13,
                      fontWeight: 300,
                      color: theme.text,
                      lineHeight: 1.7,
                      marginTop: 8,
                      marginBottom: 0,
                    }}
                  >
                    {m.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: theme.bg, padding: sectionPad }}>
          <div style={{ marginBottom: 60 }}>
            <Reveal as="p"
              style={{
                fontFamily: "Jost, sans-serif",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: theme.muted,
                marginBottom: 12,
                marginTop: 0,
              }}
            >
              The Team
            </Reveal>
            <Reveal as="h2"
              delay={100}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: isMobile ? 36 : 48,
                color: theme.earth,
                fontWeight: 400,
                margin: 0,
              }}
            >
              Experts in Sustainable Design.
            </Reveal>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : isTablet
                  ? "repeat(2,1fr)"
                  : "repeat(3,1fr)",
              gap: 32,
            }}
          >
            {team.map((p, i) => (
              <Reveal key={p.name} delay={i * 120}>
                <ZoomImage
                  src={p.img}
                  alt={p.alt}
                  wrapperStyle={{ aspectRatio: "3/4" }}
                />
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 24,
                    color: theme.earth,
                    marginTop: 18,
                    marginBottom: 0,
                    fontWeight: 400,
                  }}
                >
                  {p.name}
                </h3>
                <p
                  style={{
                    fontFamily: "Jost, sans-serif",
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: theme.muted,
                    marginTop: 6,
                    marginBottom: 0,
                  }}
                >
                  {p.role}
                </p>
                <p
                  style={{
                    fontFamily: "Jost, sans-serif",
                    fontSize: 13,
                    fontWeight: 300,
                    color: theme.text,
                    lineHeight: 1.7,
                    marginTop: 10,
                    marginBottom: 0,
                  }}
                >
                  {p.bio}
                </p>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <style>{`
        @keyframes heroload { from { transform: scale(1.05); } to { transform: scale(1); } }
      `}</style>
    </div>
  );
}

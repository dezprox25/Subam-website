import React, { useState, useEffect, useRef } from "react";

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

function Reveal({ children, delay = 0, as: Tag = "div" as any, style = {}, className = "", ...rest }: any) {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      className={className}
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
function ZoomImage({ src, alt, height, style = {}, wrapperStyle = {}, radius = 3, className = "" }: any) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={className}
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

  const imgSize = isMobile
    ? { width: 150, height: 120 }
    : { width: 240, height: 200 };

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden h-[420px] md:h-[560px]"
    >
      <img
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920"
        alt="Immersive architectural interior"
        className="absolute left-0 lg:top-[-60%] top-[-90%] w-full h-[116%] md:h-[122%] object-cover will-change-transform"
        style={{
          transform: `translateY(${parallaxY * 0.4}px)`,
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#1F1F1F]/55 via-[#1F1F1F]/35 to-[#1F1F1F]/10 pointer-events-none"
      />
      <div
        className="absolute bottom-12 right-[4%] md:right-[8%] z-10 flex items-end"
      >
        <div
          className={`bg-white p-3 pb-9 shadow-[0_18px_40px_rgba(31,31,31,0.35)] z-[2] -mr-10 transition-all duration-900 ease-out delay-200 ${trig ? "opacity-100 rotate-[-6deg] translate-y-0" : "opacity-0 rotate-[-6deg] translate-y-5"}`}
        >
          <img
            src="https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=400"
            alt="Interior architectural detail"
            className="object-cover block"
            style={imgSize}
          />
        </div>
        <div
          className={`bg-white p-3 pb-9 shadow-[0_18px_40px_rgba(31,31,31,0.35)] z-[1] transition-all duration-900 ease-out delay-[450ms] ${trig ? "opacity-100 rotate-[4deg] translate-y-0" : "opacity-0 rotate-[4deg] translate-y-5"}`}
        >
          <img
            src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400"
            alt="Natural material texture detail"
            className="object-cover block"
            style={imgSize}
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

  return (
    <div className="bg-brand-bg text-brand-dark font-sans">
      <header className="relative w-full h-screen overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920"
          alt="Sustainable architectural facade at golden hour"
          className="absolute inset-0 w-full h-full object-cover animate-[heroload_1.8s_ease-out_forwards]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F1F1F]/60 via-[#1F1F1F]/35 to-[#1F1F1F]/15" />
        <div className="absolute left-[6%] bottom-[12%] md:bottom-[20%] z-10 max-w-[700px] right-[6%] md:right-auto">
          <div className={`h-[1px] w-20 bg-white/60 mb-6 transition-opacity duration-900 delay-200 ${mounted ? "opacity-100" : "opacity-0"}`} />
          <h1 className="font-serif text-[44px] md:text-[62px] lg:text-[78px] font-normal text-white leading-none m-0">
            <span className="block overflow-hidden">
              <span className={`inline-block transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300 ${mounted ? "translate-y-0 opacity-100" : "translate-y-[50px] opacity-0"}`}>
                Reviving Wisdom
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className={`inline-block italic transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] delay-520 ${mounted ? "translate-y-0 opacity-100" : "translate-y-[50px] opacity-0"}`}>
                Engineering Change
              </span>
            </span>
          </h1>
        </div>
      </header>

      <main>
        <section className="bg-brand-bg py-10 md:py-15 lg:py-20 overflow-hidden relative">
          <p
            ref={ghostRef}
            className="font-serif text-[32px] md:text-[48px] lg:text-[72px] italic font-normal text-brand-earth/10 text-center leading-[1.2] w-full m-0 px-10 will-change-transform whitespace-normal lg:whitespace-nowrap"
          >
            Crafting future-ready spaces that breathe.
          </p>
        </section>

        <section className="bg-brand-bg px-6 md:px-12 lg:px-20 py-10 md:py-15 lg:py-[100px] pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[60px] items-start">
            <Reveal>
              <ZoomImage
                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800"
                alt="Construction site with natural materials"
                height={isMobile ? 360 : 560}
              />
            </Reveal>
            <div className="flex flex-col gap-8">
              <Reveal delay={100}>
                <ZoomImage
                  src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=700"
                  alt="Sustainable architecture detail"
                  height={240}
                  wrapperStyle={{ marginTop: isMobile ? 0 : 60 }}
                />
              </Reveal>
              <Reveal delay={220} className="mt-2">
                <span className="font-serif text-[80px] text-brand-earth-light leading-none block mb-3 h-10">“</span>
                <p className="font-serif italic text-brand-earth max-w-[440px] m-0">
                  Our vision is to redefine the future of construction through sustainable innovation, conscious design, and environmentally responsible building practices.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-brand-bg px-6 md:px-12 lg:px-20 py-12 md:py-15 lg:py-20 border-t border-brand-earth/10 border-b border-brand-earth/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100} className="text-center">
                <span className="font-serif text-[48px] md:text-[62px] text-brand-earth block mb-2 leading-none">
                  <CountUp target={s.target} suffix={s.suffix} />
                </span>
                <span className="top-title">
                  {s.label}
                </span>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-brand-bg px-6 md:px-12 lg:px-20 py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <Reveal as="p" className="top-title mb-8 mt-0">
                About · Our Story · Foundation
              </Reveal>
              <Reveal as="p" delay={80} className="top-title mb-4 mt-0">
                Our Story
              </Reveal>
              <Reveal as="h3" delay={160} className="font-serif text-[30px] md:text-[38px] text-brand-earth leading-[1.2] mb-8 mt-0 font-normal">
                Building for wellness and nature.
              </Reveal>
              {[
                "Sanchana Subbarayan, Founder of Shubham Consulting and Construction, is a Civil Engineering graduate driven by a vision to create healthier and more sustainable living environments. Her journey began with a simple realization: modern buildings not only impact the environment through resource consumption, but also affect human health through chemical emissions from conventional materials.",
                "Believing that the spaces we live in should support both human well-being and nature, Sanchana explored how traditional architecture could be merged with modern engineering principles. Her goal was to make sustainable building practices practical, affordable, and relevant for contemporary lifestyles.",
                "Today, Shubham Consulting and Construction is dedicated to reviving traditional building wisdom through modern and environmentally responsible practices. We create thoughtfully designed spaces using natural materials and climate-conscious design that remain connected to nature and local context.",
              ].map((p, i) => (
                <Reveal as="p" key={i} delay={240 + i * 100} className="mb-6">
                  {p}
                </Reveal>
              ))}
            </div>
            <Reveal delay={220} className="self-center">
              <div className="max-w-[540px] ml-auto">
                <ZoomImage
                  src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=900"
                  alt="Natural architecture and sustainable material palette"
                  wrapperStyle={{ aspectRatio: "4 / 5" }}
                  className="shadow-[0_28px_60px_rgba(31,31,31,0.12)]"
                />
                <div className="mt-5 pt-5 border-t border-brand-earth/15">
                  <span className="top-title mb-2">Sustainable Vision</span>
                  <p className="m-0">
                    A visual reflection of Shubham&apos;s approach: grounded materials, soft light, and spaces that stay connected to nature.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <PolaroidSection
          parallaxY={parallaxY}
          isMobile={isMobile}
        />

        <section className="bg-brand-bg px-6 md:px-12 lg:px-20 py-16 md:py-20 lg:py-24 pt-16 md:pt-20 lg:pt-24">
          <div className="text-center mb-16 md:mb-[72px]">
            <Reveal as="h2" className="font-serif text-[36px] md:text-[52px] italic text-brand-earth leading-[1.2] font-normal m-0">
              The People Behind
            </Reveal>
            <Reveal as="h2" delay={100} className="font-serif text-[36px] md:text-[52px] italic text-brand-earth leading-[1.2] font-normal m-0">
              The Purpose.
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-[60px] items-start">
            <Reveal>
              <ZoomImage
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600"
                alt="Sustainable construction project"
                height={300}
                className="mb-6"
              />
              <h3 className="font-serif text-[24px] text-brand-earth leading-[1.3] font-normal m-0">
                Commitment to Lasting Value.
              </h3>
              <p className="mt-3">
                Shubham is a sustainable consulting and construction company working across India. Our expertise includes farmhouses, residences, institutional spaces, schools, and eco-development projects. We balance functionality, long-term value, and environmental responsibility in every site we develop.
              </p>
            </Reveal>

            <div className="mt-0 md:mt-20">
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
                  className={`py-6 ${i < 2 ? "border-b border-brand-earth/12" : ""}`}
                >
                  <span className="top-title mb-1.5">
                    {m.year}
                  </span>
                  <h4 className="font-serif text-[22px] text-brand-earth mt-1.5 mb-0 font-normal">
                    {m.head}
                  </h4>
                  <p className="mt-2 mb-0">
                    {m.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-bg px-6 md:px-12 lg:px-20 py-16 md:py-20 lg:py-24">
          <div className="mb-15 md:mb-[60px]">
            <Reveal as="p" className="top-title mb-3 mt-0">
              The Team
            </Reveal>
            <Reveal as="h2" delay={100} className="font-serif text-[36px] md:text-[48px] text-brand-earth font-normal m-0">
              Experts in Sustainable Design.
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {team.map((p, i) => (
              <Reveal key={p.name} delay={i * 120}>
                <ZoomImage
                  src={p.img}
                  alt={p.alt}
                  wrapperStyle={{ aspectRatio: "3/4" }}
                />
                <h3 className="font-serif text-[24px] text-brand-earth mt-[18px] mb-0 font-normal leading-tight">
                  {p.name}
                </h3>
                <p className="top-title text-[11px] mt-1.5 mb-0">
                  {p.role}
                </p>
                <p className="mt-2.5 mb-0">
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

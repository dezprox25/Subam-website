import React, { useEffect, useRef, useState } from "react";

const SLIDES = [
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920",
  "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=1920",
];

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showHl1, setShowHl1] = useState(false);
  const [showHl2, setShowHl2] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const bleedRef = useRef<HTMLImageElement>(null);
  const quoteRef = useRef<HTMLImageElement>(null);
  const bleedSec = useRef<HTMLElement>(null);
  const quoteSec = useRef<HTMLElement>(null);

  useEffect(() => {
    const t0 = setTimeout(() => setLoaded(true), 0);
    const t1 = setTimeout(() => setShowHl1(true), 300);
    const t2 = setTimeout(() => setShowHl2(true), 520);
    const t3 = setTimeout(() => setShowScroll(true), 900);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActiveSlide((s) => (s + 1) % SLIDES.length), 5500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const siblings = Array.from(e.target.parentElement?.children ?? []).filter((c) =>
            c.classList.contains("reveal"),
          );
          const i = siblings.indexOf(e.target as Element);
          setTimeout(() => e.target.classList.add("in"), Math.max(0, i) * 100);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (bleedRef.current && bleedSec.current) {
          const r = bleedSec.current.getBoundingClientRect();
          const off = (window.innerHeight - r.top) * 0.12;
          bleedRef.current.style.transform = `translateY(${off * 0.25}px)`;
        }
        if (quoteRef.current && quoteSec.current) {
          const r = quoteSec.current.getBoundingClientRect();
          const off = (window.innerHeight - r.top) * 0.15;
          quoteRef.current.style.transform = `translateY(${off * 0.3}px)`;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="hero">
        {SLIDES.map((src, i) => (
          <div key={src} className={`hero__slide${i === activeSlide ? " active" : ""}`}>
            <img src={src} alt="Subham sustainable architecture" />
          </div>
        ))}
        <div className="hero__overlay" />
        <div className="hero__content">
          <div className={`hero__line${showHl1 ? " show" : ""}`}><span>Where Luxury</span></div>
          <span className="hero__rule" />
          <div className={`hero__line${showHl2 ? " show" : ""}`}><span>Meets Wanderlust</span></div>
          <span className="hero__rule hero__rule--end" />
        </div>
        <div className={`scroll-down${showScroll ? " show" : ""}`}>
          <div className="mouse" />
          <div className="scroll-down__text">Scroll Down</div>
        </div>
      </header>

      <section className="intro">
        <div className="intro__inner">
          <h2 className="reveal">Not just a structure.<br />A living, breathing space.</h2>
          <p className="reveal">We design and build high-end, self-sustainable spaces that are eco-conscious and deeply connected to nature — without compromising on luxury. Inspired by traditional building wisdom and guided by modern engineering, every space we create is crafted to create harmony between architecture, human well-being, and the environment.</p>
        </div>
      </section>

      <section className="bleed" ref={bleedSec}>
        <img ref={bleedRef} src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920" alt="Atmospheric Subham project landscape" />
        <div className="bleed__label"><h2>Our Work & Services</h2></div>
      </section>

      <section className="projects">
        {[
          { img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", t: "— Sustainable Construction", d: "Eco-conscious homes built with natural materials" },
          { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", t: "— Farmhouse Development", d: "Nature-connected living spaces" },
          { img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", t: "— Institutional Projects", d: "Sustainable schools and institutions" },
        ].map((p) => (
          <article key={p.t} className="project reveal">
            <div className="project__img"><img src={p.img} alt={p.t.replace("— ", "")} /></div>
            <div className="project__meta"><h3>{p.t}</h3><p>{p.d}</p></div>
          </article>
        ))}
      </section>

      <section className="trust">
        <h2 className="reveal">Experience why Subham is a trusted name in sustainable construction.</h2>
        <div className="trust__cols">
          <p className="reveal">For years, we have been redefining what construction means in India — building spaces that are environmentally responsible, structurally sound, and deeply connected to the land. Our commitment to traditional materials, sustainable systems, and thoughtful design has earned us the trust of homeowners, institutions, and communities across the country.</p>
          <p className="reveal">What sets Subham apart is our belief that a building should heal its occupants, not harm them. From zero hazardous chemicals to breathable walls and passive cooling — every decision we make is guided by the health of the people who will live inside, and the health of the planet they live on. This is not just construction. This is conscious living.</p>
        </div>
      </section>

      <section className="values">
        {[
          { img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600", tag: "Legacy", h: "Rooted in Purpose", b: "Subham was founded on a single conviction — that buildings should support life, not deplete it." },
          { img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600", tag: "Local", h: "Sourced from the Land", b: "We source natural materials locally — rammed earth, mud blocks, natural COB — honouring the region's building heritage." },
          { img: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600", tag: "Wellness", h: "Healthy by Design", b: "Zero hazardous chemicals. Breathable materials. Every finish chosen for long-term human health." },
          { img: "https://images.unsplash.com/photo-1574482620826-7f5f77f48d75?w=600", tag: "Nature", h: "Built Within Nature", b: "Natural materials — wood, stone, earth — treated with respect for the environment they come from." },
        ].map((v) => (
          <article key={v.h} className="value reveal">
            <div className="value__img">
              <img src={v.img} alt={v.h} />
              <span className="value__tag">{v.tag}</span>
            </div>
            <div className="value__body"><h3>{v.h}</h3><p>{v.b}</p></div>
          </article>
        ))}
      </section>

      <section className="services">
        <div className="services__left">
          <span className="lbl">Our Services</span>
          <h2>Our Services</h2>
          {[
            { h: "Sustainable Construction", b: "We design and build environmentally responsible spaces using natural materials and nature-friendly methods that promote long-term durability and healthier living environments." },
            { h: "Construction Consulting", b: "End-to-end consulting covering project planning, sustainable design guidance, material selection, and execution support from concept to completion." },
            { h: "Farmhouse Development", b: "Thoughtfully designed farmhouses that blend modern comfort with natural living, creating peaceful spaces connected to the surrounding landscape." },
          ].map((s) => (
            <div key={s.h} className="service reveal"><h3>{s.h}</h3><p>{s.b}</p></div>
          ))}
        </div>
        <div className="services__right">
          {[
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900",
            "https://images.unsplash.com/photo-1505409859467-3a796fd5798e?w=900",
          ].map((src) => (
            <div key={src} className="imgwrap"><img src={src} alt="Subham project" /></div>
          ))}
        </div>
      </section>

      <section className="quote" ref={quoteSec}>
        <img ref={quoteRef} src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920" alt="Mountain landscape" />
        <div className="quote__overlay" />
        <div className="quote__content">
          <span className="quote__mark">"</span>
          <p className="quote__text">Build a home that lives with you, not against nature.</p>
        </div>
      </section>

      <section className="editorial">
        <div className="editorial__col">
          <div className="editorial__img editorial__img--a reveal"><img src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=800" alt="Forest landscape" /></div>
          <div className="editorial__text reveal">
            <h3>An environmentally responsible approach.</h3>
            <p>Subham Consulting & Construction exists to prove that luxury and sustainability are not opposites. We build with a deep commitment to environmental stewardship — protecting the ecosystems our buildings inhabit, and preserving the natural beauty of every site we work on.</p>
            <a href="#" className="editorial__link">Learn more →</a>
          </div>
        </div>
        <div className="editorial__col">
          <div className="editorial__img editorial__img--b reveal"><img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800" alt="Mountain lake" /></div>
          <div className="editorial__img editorial__img--c reveal"><img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800" alt="Stone pathway" /></div>
        </div>
      </section>

      <section className="connect">
        <div className="connect__img">
          <img src="https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=900" alt="Subham project at golden hour" />
          <div className="connect__title">Let's Connect</div>
        </div>
        <div className="connect__right">
          {[
            { l: "Visit", d: "No:3 Sri Griha House, 8th Avenue\nAshok Nagar, Chennai - 600083" },
            { l: "Write", d: "consultingsubham@gmail.com\nsubhamconsulting@gmail.com" },
            { l: "Call", d: "+91 84385 30234 (WhatsApp)\nMon–Fri · 10:00 AM – 4:00 PM" },
          ].map((c) => (
            <div key={c.l} className="crow">
              <span className="crow__label">{c.l}</span>
              <span className="crow__rule" />
              <span className="crow__detail">{c.d}</span>
              <span className="crow__arrow">→</span>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .hero { position: relative; width: 100%; height: 100vh; overflow: hidden; }
        .hero__slide { position: absolute; inset: 0; opacity: 0; transition: opacity 1s ease-in-out; }
        .hero__slide.active { opacity: 1; }
        .hero__slide img { width: 100%; height: 100%; object-fit: cover; }
        .hero__slide.active img { animation: kenburns 8s ease-in-out forwards; }
        .hero__overlay { position: absolute; inset: 0; background: linear-gradient(to bottom right,rgba(30,18,10,.55) 0%,rgba(30,18,10,.3) 40%,rgba(30,18,10,.1) 100%); }
        .hero__content { position: absolute; left: 6%; bottom: 18%; z-index: 10; max-width: 660px; }
        .hero__line { overflow: hidden; }
        .hero__line span { display: block; font-family: 'Cormorant Garamond', serif; font-size: 82px; font-weight: 400; color: #fff; line-height: 1.0; transform: translateY(50px); opacity: 0; }
        .hero__line.show span { transform: translateY(0); opacity: 1; transition: transform .9s cubic-bezier(.16,1,.3,1), opacity .9s ease; }
        .hero__rule { display: block; width: 60px; height: 1px; background: rgba(255,255,255,.5); margin: 18px 0; }
        .hero__rule--end { margin-left: auto; margin-top: 18px; }
        .scroll-down { position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 10; opacity: 0; transition: opacity .6s ease; }
        .scroll-down.show { opacity: 1; }
        .mouse { width: 22px; height: 34px; border: 1.5px solid #fff; border-radius: 12px; position: relative; }
        .mouse::after { content: ''; position: absolute; left: 50%; top: 6px; transform: translateX(-50%); width: 2px; height: 5px; background: #fff; border-radius: 2px; animation: mousedot 1.8s ease-in-out infinite; }
        .scroll-down__text { font-family: 'Jost', sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: .2em; color: rgba(255,255,255,.7); margin-top: 6px; }

        .intro { background: var(--bg); padding: 120px 80px 100px; text-align: center; }
        .intro__inner { max-width: 720px; margin: 0 auto; }
        .intro h2 { font-style: italic; font-size: 52px; color: var(--earth); line-height: 1.15; }
        .intro p { margin-top: 32px; font-size: 15px; line-height: 1.9; color: var(--muted); max-width: 680px; margin-left: auto; margin-right: auto; font-weight: 300; }

        .bleed { position: relative; width: 100%; height: 560px; overflow: hidden; }
        .bleed img { width: 100%; height: 100%; object-fit: cover; will-change: transform; }
        .bleed__label { position: absolute; bottom: 0; left: 0; width: 100%; padding: 32px 48px; background: linear-gradient(to top, rgba(30,18,10,.7) 0%, transparent 100%); }
        .bleed__label h2 { font-size: 42px; color: #fff; }

        .projects { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; background: var(--bg); padding-bottom: 80px; }
        .project { cursor: pointer; }
        .project__img { overflow: hidden; }
        .project__img img { width: 100%; height: 340px; object-fit: cover; transition: transform .75s cubic-bezier(.25,.46,.45,.94); }
        .project:hover .project__img img { transform: scale(1.06); }
        .project__meta { padding: 20px 28px 0; }
        .project__meta h3 { font-size: 20px; color: var(--earth); }
        .project__meta p { font-size: 13px; color: var(--muted); margin-top: 6px; font-weight: 300; }

        .trust { background: var(--bg); padding: 100px 80px; }
        .trust h2 { font-size: 52px; color: var(--earth); max-width: 780px; margin-bottom: 48px; line-height: 1.15; }
        .trust__cols { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
        .trust__cols p { font-size: 14px; line-height: 1.9; color: var(--muted); font-weight: 300; }

        .values { background: var(--bg); padding: 0 80px 100px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .value__img { position: relative; overflow: hidden; aspect-ratio: 3/4; }
        .value__img img { width: 100%; height: 100%; object-fit: cover; transition: transform .7s ease; }
        .value:hover .value__img img { transform: scale(1.06); }
        .value__tag { position: absolute; bottom: 16px; left: 16px; background: rgba(247,243,238,.92); color: var(--earth); font-family: 'Jost', sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: .14em; padding: 5px 12px; border-radius: 2px; }
        .value__body { padding-top: 20px; }
        .value__body h3 { font-size: 24px; color: var(--earth); }
        .value__body p { font-size: 13px; color: var(--muted); line-height: 1.75; margin-top: 10px; font-weight: 300; }

        .services { background: var(--bg); padding: 80px 0 0; display: grid; grid-template-columns: .85fr 1.15fr; gap: 0; }
        .services__left { padding: 80px; }
        .lbl { font-family: 'Jost', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: .16em; color: var(--muted); }
        .services__left h2 { font-size: 48px; color: var(--earth); margin-top: 12px; margin-bottom: 64px; }
        .service { padding-top: 28px; border-top: 1px solid rgba(139,94,60,.2); max-width: 380px; margin-bottom: 60px; }
        .service:last-child { margin-bottom: 0; }
        .service h3 { font-size: 26px; color: var(--earth); }
        .service p { font-size: 14px; color: var(--muted); line-height: 1.75; margin-top: 10px; font-weight: 300; }
        .services__right { display: flex; flex-direction: column; }
        .services__right .imgwrap { overflow: hidden; }
        .services__right img { width: 100%; height: 360px; object-fit: cover; display: block; transition: transform .7s ease; }
        .services__right .imgwrap:hover img { transform: scale(1.04); }

        .quote { position: relative; width: 100%; height: 320px; overflow: hidden; }
        .quote img { width: 100%; height: 100%; object-fit: cover; will-change: transform; }
        .quote__overlay { position: absolute; inset: 0; background: linear-gradient(to right,rgba(30,18,10,.15) 0%,rgba(30,18,10,.55) 55%,rgba(30,18,10,.65) 100%); }
        .quote__content { position: absolute; right: 8%; top: 50%; transform: translateY(-50%); text-align: right; max-width: 560px; z-index: 10; }
        .quote__mark { font-family: 'Cormorant Garamond', serif; font-size: 80px; color: rgba(255,255,255,.7); line-height: 0; float: left; margin-right: 8px; padding-top: 40px; }
        .quote__text { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 34px; color: #fff; line-height: 1.45; }

        .editorial { background: var(--bg); padding: 100px 80px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
        .editorial__col { display: flex; flex-direction: column; gap: 24px; }
        .editorial__img { overflow: hidden; border-radius: 3px; }
        .editorial__img img { width: 100%; object-fit: cover; transition: transform .65s ease; }
        .editorial__img:hover img { transform: scale(1.05); }
        .editorial__img--a img { height: 280px; }
        .editorial__img--b img { height: 360px; }
        .editorial__img--b { margin-top: 40px; }
        .editorial__img--c img { height: 240px; }
        .editorial__text { padding: 8px 0; }
        .editorial__text h3 { font-size: 38px; color: var(--earth); line-height: 1.2; }
        .editorial__text p { margin-top: 20px; font-size: 14px; color: var(--muted); line-height: 1.85; font-weight: 300; }
        .editorial__link { display: inline-block; margin-top: 24px; position: relative; font-family: 'Jost', sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: .1em; color: var(--earth); transition: color .3s ease, letter-spacing .3s ease; }
        .editorial__link::after { content: ''; position: absolute; left: 0; bottom: -4px; width: 0; height: 1px; background: currentColor; transition: width .3s ease; }
        .editorial__link:hover { color: var(--earth-light); letter-spacing: .14em; }
        .editorial__link:hover::after { width: 100%; }

        .connect { display: grid; grid-template-columns: 1fr 1fr; min-height: 440px; margin-top: 80px; }
        .connect__img { position: relative; overflow: hidden; }
        .connect__img img { width: 100%; height: 100%; object-fit: cover; min-height: 440px; transition: transform .8s ease; }
        .connect__img:hover img { transform: scale(1.04); }
        .connect__img::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(30,18,10,.72) 0%, rgba(30,18,10,.1) 60%, transparent 100%); pointer-events: none; }
        .connect__title { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); z-index: 10; text-align: center; font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 48px; color: #fff; }
        .connect__right { background: var(--parchment); padding: 64px 72px; display: flex; flex-direction: column; justify-content: center; }
        .crow { display: flex; align-items: center; justify-content: space-between; padding: 28px 0; border-bottom: 1px solid rgba(139,94,60,0.18); cursor: pointer; transition: background .2s ease; gap: 24px; }
        .crow:hover { background: rgba(139,94,60,0.04); }
        .crow__label { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 32px; color: var(--earth); flex-shrink: 0; }
        .crow__rule { flex: 0 0 40px; height: 1px; background: rgba(139,94,60,0.3); }
        .crow__detail { flex: 1; text-align: right; font-size: 13px; color: var(--muted); line-height: 1.6; font-weight: 300; white-space: pre-line; }
        .crow__arrow { font-family: 'Jost', sans-serif; font-size: 18px; color: var(--earth-light); transition: transform .25s ease; }
        .crow:hover .crow__arrow { transform: translateX(4px); }

        @media (max-width: 1024px) {
          .intro, .trust, .values, .editorial { padding-left: 48px; padding-right: 48px; }
          .hero__line span { font-size: 64px; }
          .services { grid-template-columns: 1fr; }
          .services__left { padding: 64px 48px; }
          .values { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .hero__content { left: 5%; bottom: 12%; }
          .hero__line span { font-size: 48px; }
          .intro { padding: 80px 24px; } .intro h2 { font-size: 38px; }
          .bleed { height: 380px; } .bleed__label h2 { font-size: 30px; }
          .projects { grid-template-columns: 1fr; }
          .trust { padding: 80px 24px; } .trust h2 { font-size: 36px; }
          .trust__cols { grid-template-columns: 1fr; gap: 32px; }
          .values { padding: 0 24px 80px; grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .services__left { padding: 48px 24px; } .services__left h2 { font-size: 36px; }
          .services__right { flex-direction: row; } .services__right img { height: 200px; }
          .quote { height: 280px; } .quote__text { font-size: 24px; } .quote__mark { font-size: 60px; padding-top: 30px; }
          .editorial { padding: 80px 24px; grid-template-columns: 1fr; } .editorial__img--b { margin-top: 0; }
          .connect { grid-template-columns: 1fr; margin-top: 48px; }
          .connect__img img { height: 280px; min-height: 280px; }
          .connect__right { padding: 48px 24px; }
          .crow__label { font-size: 26px; }
        }
      `}</style>
    </>
  );
}

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
      <header className="relative w-full h-screen overflow-hidden">
        {SLIDES.map((src, i) => (
          <div 
            key={src} 
            className={`absolute inset-0 opacity-0 transition-opacity duration-1000 ease-in-out ${i === activeSlide ? "opacity-100" : ""}`}
          >
            <img 
              src={src} 
              alt="Shubham sustainable architecture" 
              className={`w-full h-full object-cover ${i === activeSlide ? "animate-[kenburns_8s_ease-in-out_forwards]" : ""}`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F1F1F]/55 via-[#1F1F1F]/30 to-[#1F1F1F]/10" />
        <div className="absolute left-[6%] bottom-[18%] z-10 max-w-[660px]">
          <div className="overflow-hidden">
            <span className={`block font-serif text-[48px] md:text-[64px] lg:text-[82px] font-normal text-white leading-none transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${showHl1 ? "translate-y-0 opacity-100" : "translate-y-[50px] opacity-0"}`}>
              Luxury That
            </span>
          </div>
          <span className="block w-[60px] h-[1px] bg-white/50 my-[18px]" />
          <div className="overflow-hidden">
            <span className={`block font-serif text-[48px] md:text-[64px] lg:text-[82px] font-normal text-white leading-none transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${showHl2 ? "translate-y-0 opacity-100" : "translate-y-[50px] opacity-0"}`}>
              Breathes
            </span>
          </div>
          <span className="block w-[60px] h-[1px] bg-white/50 my-[18px] ml-auto" />
        </div>
        <div className={`absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 transition-opacity duration-600 ${showScroll ? "opacity-100" : "opacity-0"}`}>
          <div className="w-[22px] height-[34px] border-[1.5px] border-white rounded-f-12 relative after:content-[''] after:absolute after:left-1/2 after:top-[6px] after:-translate-x-1/2 after:w-[2px] after:h-[5px] after:bg-white after:rounded-[2px] after:animate-[mousedot_1.8s_ease-in-out_infinite]" style={{ height: '34px', borderRadius: '12px' }} />
          <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/70 mt-1.5">Scroll Down</div>
        </div>
      </header>

      <section className="bg-brand-bg px-6 md:px-12 lg:px-20 py-[120px] pb-[100px] text-center">
        <div className="max-w-[720px] margin-0-auto" style={{ margin: '0 auto' }}>
          <h2 className="reveal italic text-[38px] md:text-[52px] text-brand-earth leading-[1.15]">Not just a home.<br />A living ecosystem.</h2>
          <p className="reveal mt-8 text-[15px] leading-[1.9] text-brand-text max-w-[680px] mx-auto font-light">Shubham Consulting and Construction is redefining luxury through sustainability. We design and build high-end spaces that are fully self-sustainable, eco-conscious, and deeply connected to nature — without compromising on elegance. Every space is thoughtfully curated to create harmony between architecture, wellness, and the environment.</p>
        </div>
      </section>

      <section className="relative w-full h-[380px] md:h-[560px] overflow-hidden" ref={bleedSec}>
        <img ref={bleedRef} src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920" alt="Atmospheric Shubham project landscape" className="w-full h-full object-cover will-change-transform" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:px-12 bg-gradient-to-t from-[#1F1F1F]/70 to-transparent">
          <h2 className="text-[30px] md:text-[42px] text-white">Crafting Future-Ready Residences</h2>
        </div>
      </section>

      <section className="bg-brand-bg px-6 md:px-12 lg:px-20 py-[80px] md:py-[100px]">
        <h2 className="reveal text-[36px] md:text-[52px] text-brand-earth max-w-[780px] mb-8 md:mb-12 leading-[1.15]">Our Philosophy: Zero Harm. Maximum Harmony.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[60px]">
          <p className="reveal text-[14px] leading-[1.9] text-brand-text font-light">At Shubham, we believe your home should heal you, not harm the planet. Our construction methodology is built on a foundation of 0% hazardous chemicals, using breathable natural materials that support long-term human health. We combine traditional wisdom with modern engineering to create structures that are as durable as they are beautiful.</p>
          <p className="reveal text-[14px] leading-[1.9] text-brand-text font-light">What sets us apart is our commitment to integrated self-sustainable systems. From solar energy and rainwater harvesting to bio-gas plants and passive cooling design, every decision is guided by long-term efficiency, comfort, and environmental stewardship. This is conscious living, elevated.</p>
        </div>
      </section>

      <section className="bg-brand-bg px-6 md:px-12 lg:px-20 pb-[80px] md:pb-[100px] grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {[
          { img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600", tag: "Solar", h: "Solar Energy Systems", b: "Harnessing the sun to power your modern lifestyle with zero emissions." },
          { img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600", tag: "Water", h: "Rainwater Harvesting", b: "Integrated collection systems designed to secure your water future naturally." },
          { img: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600", tag: "Cooling", h: "Passive Cooling", b: "Architectural design that maintains comfort without high energy consumption." },
          { img: "https://images.unsplash.com/photo-1574482620826-7f5f77f48d75?w=600", tag: "Waste", h: "Bio-Gas & Bio-Septic", b: "Closing the loop with integrated waste management and renewable energy." },
        ].map((v) => (
          <article key={v.h} className="group reveal">
            <div className="relative overflow-hidden aspect-[3/4]">
              <img src={v.img} alt={v.h} className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.06]" />
              <span className="absolute bottom-4 left-4 bg-brand-bg/92 text-brand-earth font-sans text-[10px] uppercase tracking-[0.14em] px-3 py-1.5 rounded-[2px]">{v.tag}</span>
            </div>
            <div className="pt-5">
              <h3 className="text-[24px] text-brand-earth leading-tight">{v.h}</h3>
              <p className="text-[13px] text-brand-text leading-[1.75] mt-2.5 font-light">{v.b}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-brand-bg pt-20 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-0">
        <div className="p-12 md:p-16 lg:p-20">
          <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-brand-earth-light">Materials of Wisdom</span>
          <h2 className="text-[36px] md:text-[48px] text-brand-earth mt-3 mb-16">Traditional Materials. Modern Engineering.</h2>
          {[
            { h: "Rammed Earth & Mud Blocks", b: "Breathable, thermal-efficient walls that provide natural insulation and a unique organic aesthetic." },
            { h: "Natural COB & Stone", b: "Utilizing foundation stones and natural COB for structural integrity that honours building heritage." },
            { h: "Artisanal Finishes", b: "Lime plasters, traditional textures, and Madras terrace roofing for timeless elegance and health." },
          ].map((s) => (
            <div key={s.h} className="pt-7 border-t border-brand-earth/20 max-w-[380px] mb-[60px] last:mb-0 reveal">
              <h3 className="text-[26px] text-brand-earth leading-tight">{s.h}</h3>
              <p className="text-[14px] text-brand-text leading-[1.75] mt-2.5 font-light">{s.b}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-row lg:flex-col overflow-hidden">
          {[
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900",
            "https://images.unsplash.com/photo-1505409859467-3a796fd5798e?w=900",
          ].map((src) => (
            <div key={src} className="flex-1 overflow-hidden group">
              <img src={src} alt="Shubham project" className="w-full h-[240px] md:h-[300px] lg:h-[360px] object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.04]" />
            </div>
          ))}
        </div>
      </section>

      <section className="relative w-full h-[280px] md:h-[320px] overflow-hidden" ref={quoteSec}>
        <img ref={quoteRef} src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920" alt="Mountain landscape" className="w-full h-full object-cover will-change-transform" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F1F1F]/15 via-[#1F1F1F]/55 to-[#1F1F1F]/65" />
        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 text-right max-w-[560px] z-10">
          <span className="font-serif text-[60px] md:text-[80px] text-white/70 leading-none float-left mr-2 pt-[30px] md:pt-10">"</span>
          <p className="font-serif italic text-[24px] md:text-[34px] text-white leading-[1.45]">Build a home that lives with you, not against nature.</p>
          <p className="text-white mt-5 opacity-80 text-sm font-light">Starting at ₹3,000 to ₹3,500 per sq.ft.*</p>
        </div>
      </section>

      <section className="bg-brand-parchment px-6 md:px-12 lg:px-20 py-[80px] md:py-[120px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20 reveal">
            <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-brand-earth-light">Why Choose Shubham?</span>
            <h2 className="text-[36px] md:text-[52px] text-brand-earth mt-3 leading-tight">Sustainable Luxury. Uncompromised Quality.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {[
              { h: "Lower Maintenance", b: "Built to last with natural materials that age gracefully, reducing long-term upkeep costs." },
              { h: "Healthier Living", b: "Zero hazardous chemicals and breathable walls ensure a living space that actively supports your wellness." },
              { h: "Unique Aesthetics", b: "Artisanal finishes and traditional wisdom meet modern design for a home unlike any other." },
              { h: "Future Ready", b: "A sustainable investment that appreciates in value while fulfilling your environmental responsibility." },
            ].map((item, i) => (
              <div key={item.h} className="relative pt-10 border-t border-brand-earth/15 reveal">
                <span className="absolute top-3 left-0 font-sans text-[10px] text-brand-earth-light tracking-[0.1em]">0{i + 1}</span>
                <h3 className="text-[24px] text-brand-earth mb-4 leading-tight">{item.h}</h3>
                <p className="text-[14px] leading-[1.7] text-brand-text font-light">{item.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[440px] mt-12 md:mt-20">
        <div className="relative overflow-hidden group">
          <img src="https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=900" alt="Shubham project at golden hour" className="w-full h-[280px] md:h-full object-cover transition-transform duration-800 ease-in-out group-hover:scale-[1.04]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/72 via-[#1F1F1F]/10 to-transparent pointer-events-none" />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-center font-serif italic text-[40px] md:text-[48px] text-white">Let's Connect</div>
        </div>
        <div className="bg-brand-parchment p-12 md:p-16 lg:p-[64px_72px] flex flex-col justify-center">
          {[
            { l: "Visit", d: "No:3 Sri Griha House, 8th Avenue\nAshok Nagar, Chennai - 600083" },
            { l: "Write", d: "consultingsubham@gmail.com\nsubhamconsulting@gmail.com" },
            { l: "Call", d: "+91 84385 30234 (WhatsApp)\nMon–Fri · 10:00 AM – 4:00 PM" },
          ].map((c) => (
            <div key={c.l} className="group flex items-center justify-between py-7 border-b border-brand-earth/18 cursor-pointer transition-colors duration-200 gap-6 hover:bg-brand-earth/5">
              <span className="font-serif italic text-[26px] md:text-[32px] text-brand-earth flex-shrink-0">{c.l}</span>
              <span className="flex-grow-0 flex-shrink-0 basis-10 h-[1px] bg-brand-earth/30" />
              <span className="flex-1 text-right text-[13px] text-brand-text leading-[1.6] font-light whitespace-pre-line">{c.d}</span>
              <span className="font-sans text-[18px] text-brand-earth-light transition-transform duration-250 ease-in-out group-hover:translate-x-1">→</span>
            </div>
          ))}
        </div>
      </section>

    </>
  );
}

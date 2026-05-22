import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const theme = {
  bg: '#F7F3EE',
  dark: '#2C1F14',
  earth: '#8B5E3C',
  earthLight: '#C4956A',
  muted: '#9C8B7A',
  text: '#4A3B28',
  parchment: '#EDE3D2',
  white: '#FFFFFF',
};

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export default function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="shubham bg-brand-bg min-h-screen flex flex-col">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full h-20 z-[1000] flex items-center justify-between px-10 transition-all duration-400 ${
          scrolled 
            ? " bg-white backdrop-blur-[14px] shadow-[0_1px_0_rgba(139,94,60,0.1)] text-brand-dark" 
            : " text-white"
        }`}
      >
        <Link to="/" className="flex items-center">
          <img 
            src="/Subam Logo.png" 
            alt="Shubham Logo" 
            className={`h-12 md:h-14 w-auto object-contain transition-all ${!scrolled ? "brightness-0 invert" : ""}`}
          />
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`font-sans text-[12px] uppercase tracking-[0.1em] text-inherit transition-opacity ${
                  location.pathname === item.href ? "opacity-100" : "opacity-70"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className={`w-10 h-10 rounded-full flex flex-col items-center justify-center gap-[3px] transition-colors ${
              scrolled ? "bg-brand-dark/10" : "bg-white/15"
            }`}
          >
            <span className="block w-3.5 h-[1.5px] bg-current" />
            <span className="block w-3.5 h-[1.5px] bg-current" />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 bg-brand-dark z-[2000] flex flex-col items-center justify-center gap-12 transition-opacity duration-400 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-8 right-12 bg-none border-none text-brand-bg text-[24px] cursor-pointer"
        >
          ✕
        </button>
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`font-serif italic text-[52px] text-brand-bg transition-all duration-500 ${
              menuOpen ? "translate-x-0 opacity-100" : "translate-x-[30px] opacity-0"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-brand-dark px-10 md:px-20 py-20 pb-12 text-brand-bg/85">
        <div className="text-center mb-16">
          <h2 className="font-serif text-[36px] md:text-[52px] text-white mb-3">Newsletter</h2>
          <p className="text-[14px] text-white/50 font-light">
            Join our mailing list for updates on sustainable building and new projects.
          </p>
          <div className="flex max-w-[480px] mx-auto mt-8 border border-white/25 rounded-[4px] overflow-hidden">
            <input
              placeholder="Email address"
              className="flex-1 bg-transparent border-none px-5 py-3.5 text-white outline-none font-sans"
            />
            <button className="bg-brand-earth border-none px-5 py-3.5 cursor-pointer text-white transition-colors hover:bg-brand-earth/90">
              Subscribe
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-6 border-t border-white/10 pt-10 mb-8">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} className="text-[12px] uppercase tracking-[0.08em] text-white/50 transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-7 gap-4">
          <div className="flex items-center gap-4">
            <img src="/Subam Logo.png" alt="Shubham" className="h-8 w-auto brightness-0 invert opacity-50" />
            <span className="text-[12px] text-white/30 font-light">
              © {new Date().getFullYear()} Shubham Consulting & Construction. All rights reserved.
            </span>
          </div>
          <span className="font-serif italic text-[14px] text-brand-earth-light/50">
            Sustainable Luxury, Naturally Built.
          </span>
        </div>
      </footer>
    </div>
  );
}

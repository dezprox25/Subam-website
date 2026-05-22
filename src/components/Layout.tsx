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
    <div className="shubham" style={{ background: theme.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* NAVBAR */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: 64,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          color: scrolled ? theme.dark : theme.white,
          background: scrolled ? 'rgba(247,243,238,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(139,94,60,0.1)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <Link to="/" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 26, color: 'inherit' }}>
          Shubham
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div className="hidden md:flex" style={{ gap: 24 }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'inherit',
                  opacity: location.pathname === item.href ? 1 : 0.7,
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: scrolled ? 'rgba(44,31,20,0.08)' : 'rgba(255,255,255,0.15)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
            }}
          >
            <span style={{ display: 'block', width: 14, height: 1.5, background: 'currentColor' }} />
            <span style={{ display: 'block', width: 14, height: 1.5, background: 'currentColor' }} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: theme.dark,
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 48,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          style={{ position: 'absolute', top: 32, right: 48, background: 'none', border: 'none', color: theme.bg, fontSize: 24, cursor: 'pointer' }}
        >
          ✕
        </button>
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontSize: 52,
              color: theme.bg,
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.5s ease',
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* CONTENT */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer style={{ background: theme.dark, padding: '80px 80px 48px', color: 'rgba(247,243,238,0.85)' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 52, color: '#fff', marginBottom: 12 }}>Newsletter</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>
            Join our mailing list for updates on sustainable building and new projects.
          </p>
          <div style={{ display: 'flex', maxWidth: 480, margin: '32px auto 0', border: '1px solid rgba(247,243,238,0.25)', borderRadius: 4, overflow: 'hidden' }}>
            <input
              placeholder="Email address"
              style={{ flex: 1, background: 'transparent', border: 'none', padding: '14px 20px', color: '#fff', outline: 'none' }}
            />
            <button style={{ background: theme.earth, border: 'none', padding: '14px 20px', cursor: 'pointer', color: '#fff' }}>
              Subscribe
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, borderTop: '1px solid rgba(247,243,238,0.1)', paddingTop: 40, marginBottom: 32 }}>
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)' }}>
              {item.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(247,243,238,0.08)', paddingTop: 28 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} Shubham Consulting & Construction. All rights reserved.
          </span>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 14, color: 'rgba(196,149,106,0.5)' }}>
            Sustainable Luxury, Naturally Built.
          </span>
        </div>
      </footer>
    </div>
  );
}

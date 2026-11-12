import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { HOME_PAGE_DATA } from '../../../data/homeData';

/**
 * Sticky Navigation Bar for Ritam Consultancy
 * Matches Figma sticky-navbar reference screenshot
 * 
 * - Sticky at top: 0 with z-index: 1000 across all routes
 * - Clean URLs using React Router: '/', '/explore-colleges', '/blogs', '/about-us'
 * - Resources stays on Home page and scrolls to #resources section
 * - Capsule pill navigation container (#F3F4F6) with active white pill (#FFFFFF, deep green text)
 * - Preserved "Enquire Now ›" modal trigger
 */
export default function Navbar() {
  const { logo } = HOME_PAGE_DATA.navigation;
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Exact 5 Navigation items
  const navLinks = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'colleges', label: 'Explore Colleges', path: '/explore-colleges' },
    { id: 'blogs', label: 'Blogs', path: '/blogs' },
    { id: 'resources', label: 'Resources', path: '#resources', isAnchor: true },
    { id: 'about', label: 'About Us', path: '/about-us' },
  ];

  // Determine active item based on location.pathname
  const getActiveId = () => {
    const current = location.pathname.toLowerCase().trim();
    if (current === '/explore-colleges') return 'colleges';
    if (current === '/blogs') return 'blogs';
    if (current === '/about-us') return 'about';
    return 'home';
  };

  const activeId = getActiveId();

  // Scroll listener for elevation shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Navigation Click
  const handleNavClick = (link, e) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);

    if (link.isAnchor) {
      // Resources: stays on Home page and scrolls to #resources section
      if (location.pathname === '/') {
        const el = document.getElementById('resources');
        if (el) {
          const navHeight = 85;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - navHeight;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      } else {
        // Navigate to Home, then scroll down to resources
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById('resources');
          if (el) {
            const navHeight = 85;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - navHeight;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, 150);
      }
      return;
    }

    // Direct page navigation with clean URL
    navigate(link.path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Immediate popup trigger when user clicks Enquire Now
  const handleEnquireClick = (e) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent('open-talk-to-expert'));
  };

  return (
    <header
      style={{
        ...styles.header,
        boxShadow: scrolled
          ? '0 4px 20px rgba(0, 0, 0, 0.06)'
          : '0 1px 3px rgba(0, 0, 0, 0.03)',
        borderBottom: scrolled ? '1px solid #E5E7EB' : '1px solid #F3F4F6',
        padding: scrolled ? '12px 24px' : '16px 24px',
      }}
      className="ritam-sticky-navbar"
    >
      <style>{`
        .ritam-sticky-navbar {
          position: sticky !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          width: 100% !important;
          z-index: 1000 !important;
          background-color: #FFFFFF !important;
        }
        @media (max-width: 992px) {
          .ritam-sticky-navbar nav[aria-label="Main Navigation"] {
            display: none !important;
          }
          .ritam-sticky-navbar button[aria-label*="Navigation Menu"] {
            display: block !important;
          }
        }
      `}</style>

      <div style={styles.container}>
        {/* 1. Brand Logo */}
        <Link
          to="/"
          onClick={(e) => handleNavClick({ path: '/' }, e)}
          style={styles.logoLink}
          aria-label="Ritam Consultancy Home"
        >
          <img
            src={logo}
            alt="Ritam Consultancy"
            style={styles.logoImage}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              if (e.currentTarget.nextSibling) {
                e.currentTarget.nextSibling.style.display = 'flex';
              }
            }}
          />
          <div style={styles.logoFallback}>
            <span style={styles.logoFallbackMark}>R</span>
            <div style={styles.logoFallbackText}>
              <span style={styles.fallbackTitle}>Ritam</span>
              <span style={styles.fallbackSub}>CONSULTANCY</span>
            </div>
          </div>
        </Link>

        {/* 2. Center Pill-Capsule Navigation Bar */}
        <nav style={styles.pillContainer} aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                href={link.path}
                onClick={(e) => handleNavClick(link, e)}
                style={{
                  ...styles.pillLink,
                  ...(isActive ? styles.pillLinkActive : styles.pillLinkInactive),
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* 3. Right CTA Button: Enquire Now › */}
        <div style={styles.ctaWrapper}>
          <button
            type="button"
            onClick={handleEnquireClick}
            style={styles.ctaButton}
            className="hover-lift"
            aria-label="Enquire now for admission guidance"
          >
            <span>Enquire Now</span>
            <span style={styles.ctaArrow} aria-hidden="true">›</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            style={styles.hamburgerBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            type="button"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* 4. Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div style={styles.mobileDrawer}>
          <div style={styles.mobileLinks}>
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={link.path}
                  onClick={(e) => handleNavClick(link, e)}
                  style={{
                    ...styles.mobileLink,
                    ...(isActive ? styles.mobileLinkActive : {}),
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleEnquireClick}
            style={styles.mobileCtaBtn}
          >
            <span>Enquire Now</span>
            <span>›</span>
          </button>
        </div>
      )}
    </header>
  );
}

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: '#FFFFFF',
    transition: 'all 0.25s ease',
    width: '100%',
    boxSizing: 'border-box',
  },
  container: {
    maxWidth: '1240px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    boxSizing: 'border-box',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  logoImage: {
    height: '46px',
    width: 'auto',
    objectFit: 'contain',
    display: 'block',
  },
  logoFallback: {
    display: 'none',
    alignItems: 'center',
    gap: '10px',
  },
  logoFallbackMark: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: '#044439',
    color: '#FFFFFF',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
  },
  logoFallbackText: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '1.1',
  },
  fallbackTitle: {
    fontWeight: '800',
    fontSize: '19px',
    color: '#044439',
  },
  fallbackSub: {
    fontSize: '9px',
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: '1px',
  },
  // Pill Capsule Nav Container
  pillContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: '9999px',
    padding: '4px 6px',
    gap: '2px',
    boxSizing: 'border-box',
  },
  pillLink: {
    padding: '8px 18px',
    borderRadius: '9999px',
    fontSize: '14.5px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    whiteSpace: 'nowrap',
  },
  pillLinkActive: {
    backgroundColor: '#FFFFFF',
    color: '#044439',
    fontWeight: '700',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  },
  pillLinkInactive: {
    backgroundColor: 'transparent',
    color: '#4B5563',
    fontWeight: '600',
  },
  ctaWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  ctaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#044439',
    color: '#FFFFFF',
    padding: '11px 24px',
    borderRadius: '9999px',
    fontWeight: '700',
    fontSize: '14.5px',
    border: 'none',
    boxShadow: '0 4px 14px rgba(4, 68, 57, 0.22)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  ctaArrow: {
    fontSize: '16px',
    fontWeight: '800',
    lineHeight: 1,
  },
  hamburgerBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    color: '#111827',
    cursor: 'pointer',
    padding: '6px',
  },
  mobileDrawer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E5E7EB',
    padding: '20px 24px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    zIndex: 999,
  },
  mobileLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  mobileLink: {
    padding: '10px 16px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  },
  mobileLinkActive: {
    backgroundColor: '#E8F5F1',
    color: '#044439',
    fontWeight: '700',
  },
  mobileCtaBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: '#044439',
    color: '#FFFFFF',
    padding: '13px 20px',
    borderRadius: '9999px',
    fontWeight: '700',
    fontSize: '15px',
    border: 'none',
    marginTop: '6px',
    cursor: 'pointer',
  },
};

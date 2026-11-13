import React from 'react';
import { HOME_PAGE_DATA } from '../../../../data/homeData';

export default function HeroSection() {
  const { badge, headline, subheadline, bulletBadges, ctaButtons, image } = HOME_PAGE_DATA.hero;

  const handlePrimaryClick = (e) => {
    e.preventDefault();
    const el = document.getElementById('enquiry-form-section');
    if (el) {
      const navHeight = 85;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleTalkToExpertClick = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-talk-to-expert'));
  };

  return (
    <section className="hero-section" style={styles.section}>
      <style>{`
        @media (max-width: 992px) {
          .hero-container {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            align-items: center !important;
          }
          .hero-left-col {
            align-items: center !important;
            text-align: center !important;
            padding-bottom: 20px !important;
          }
          .hero-left-col p {
            margin: 0 auto !important;
          }
          .hero-badges-grid {
            justify-content: center !important;
          }
          .hero-cta-group {
            justify-content: center !important;
          }
          .hero-visual-container {
            max-width: 480px !important;
            margin: 0 auto !important;
          }
        }
        @media (max-width: 640px) {
          .hero-visual-container {
            max-width: 360px !important;
          }
          .hero-bottom-badge {
            padding: 6px 10px !important;
            bottom: 5% !important;
            left: 0% !important;
          }
          .hero-top-badge {
            padding: 6px 10px !important;
            top: 4% !important;
            right: 0% !important;
          }
        }
      `}</style>
      <div style={styles.container} className="hero-container">
        {/* Left Column: Heading, Copy, Badges, CTAs */}
        <div style={styles.leftCol} className="hero-left-col reveal-on-scroll is-visible">
          {/* Top Pill Badge */}
          <div style={styles.topBadge}>
            <span style={styles.badgeIcon}>🎓</span>
            <span style={styles.badgeText}>{badge}</span>
          </div>

          {/* Main Headline with Dribbble Underline */}
          <h1 style={styles.headline} className="nav-text-stretch">
            {headline.prefix}
            <br />
            <span style={styles.curlWrapper}>
              <span style={styles.highlight}>{headline.highlight}</span>
              {/* Dribbble Style Hand-drawn Underline Curve SVG */}
              <svg style={styles.curlSvg} viewBox="0 0 260 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9C60 3 180 3 257 9" stroke="#F96815" strokeWidth="3.2" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p style={styles.subheadline} className="nav-subtext-reveal">{subheadline}</p>

          {/* 4 Feature Badges Grid */}
          <div style={styles.badgesGrid}>
            {bulletBadges.map((b) => (
              <div key={b.id} style={styles.bulletItem} className="hover-lift">
                <div style={styles.bulletCheckIcon}>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                      stroke="#044439"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span style={styles.bulletText}>{b.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Action Buttons */}
          <div style={styles.ctaGroup}>
            <a
              href={ctaButtons.primary.href}
              onClick={handlePrimaryClick}
              style={styles.primaryBtn}
              className="hover-lift"
            >
              <span>{ctaButtons.primary.label}</span>
              <span style={styles.btnArrow}>➔</span>
            </a>
            <a
              href="#talk-to-expert"
              onClick={handleTalkToExpertClick}
              style={styles.secondaryBtn}
              className="hover-lift"
            >
              {ctaButtons.secondary.label}
            </a>
          </div>
        </div>

        {/* Right Column: Hero Visual with Exact Backdrop Shapes, Scaled Cutout & Badges matching Reference Image 1 */}
        <div style={styles.rightCol} className="reveal-on-scroll is-visible delay-1">
          <div style={styles.visualContainer} className="hero-visual-container">
            {/* SVG Reproducing the exact layered shapes from Image 1 reference */}
            <svg
              style={styles.shapesBackdropSvg}
              viewBox="0 0 580 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* 1. Dark Forest Green Arch behind Boy's head & Center (#135B4E) */}
              <path
                d="M 65 140 C 60 50, 135 15, 210 20 C 285 25, 335 60, 345 115 C 355 175, 330 255, 280 285 C 225 315, 145 285, 105 235 C 75 195, 70 165, 65 140 Z"
                fill="#135B4E"
              />

              {/* 2. Vibrant Orange Curved Shape protruding prominently to the left (#FD8340) */}
              <path
                d="M 10 220 C -2 175, 30 145, 80 148 C 130 150, 240 210, 285 205 C 315 200, 325 235, 305 270 C 275 325, 195 375, 135 365 C 80 355, 35 315, 18 265 L 10 220 Z"
                fill="#FD8340"
              />

              {/* 3. Muted Sage Green Shape on the Right (#CBD5C9) */}
              <path
                d="M 330 90 C 410 50, 510 65, 535 125 C 555 175, 545 250, 485 275 C 420 290, 345 245, 325 180 C 315 140, 310 105, 330 90 Z"
                fill="#CBD5C9"
              />

              {/* 4. Soft Warm Sand/Peach Shape on Far Right (#FEECE2) */}
              <path
                d="M 450 115 C 520 95, 570 140, 578 200 C 585 265, 550 335, 495 348 C 450 358, 420 310, 428 245 C 435 185, 415 135, 450 115 Z"
                fill="#FEECE2"
              />
            </svg>

            {/* Top-Right Floating Trophy Card Matching Image 1 Exactly */}
            <div style={styles.floatingBadge} className="hero-top-badge hover-lift">
              <div style={styles.trophyIconBox}>🏆</div>
              <div style={styles.badgeTextGroup}>
                <span style={styles.badgeHeading}>B.Tech Admissions</span>
                <span style={styles.badgeSubtext}>Across India</span>
              </div>
            </div>

            {/* Student Cutout Image Scaled & Positioned per Image 1 */}
            <img
              src={image.src}
              alt={image.alt}
              style={styles.studentsImg}
              className="hero-students-img"
              loading="eager"
            />

            {/* Bottom-Left Restored White Badge Matching Image 1 Exactly */}
            <div style={styles.bottomLeftBadge} className="hero-bottom-badge hover-lift">
              <div style={styles.badgeCheckCircle}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                    stroke="#044439"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div style={styles.bottomBadgeTextCol}>
                <span style={styles.bottomBadgeChoiceOf}>CHOICE OF</span>
                <span style={styles.bottomBadgeNumber}>500+</span>
                <span style={styles.bottomBadgeSubtitle}>Engineering Colleges</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '35px 24px 25px',
    backgroundColor: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    maxWidth: '1240px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'minmax(320px, 1.12fr) minmax(320px, 0.88fr)',
    gap: '36px',
    alignItems: 'flex-end',
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16px',
    paddingBottom: '25px',
  },
  topBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#E8F5F1',
    border: '1px solid #A3D8CD',
    padding: '7px 16px',
    borderRadius: '9999px',
    boxShadow: '0 2px 6px rgba(4, 68, 57, 0.06)',
  },
  badgeIcon: {
    fontSize: '13px',
  },
  badgeText: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#044439',
    letterSpacing: '0.2px',
  },
  headline: {
    fontSize: 'clamp(36px, 4.8vw, 58px)',
    fontWeight: '800',
    lineHeight: '1.15',
    color: '#111827',
    letterSpacing: '-1.6px',
  },
  curlWrapper: {
    position: 'relative',
    display: 'inline-block',
  },
  curlSvg: {
    position: 'absolute',
    bottom: '-10px',
    left: 0,
    width: '100%',
    height: '12px',
    pointerEvents: 'none',
  },
  highlight: {
    color: '#F96815',
  },
  subheadline: {
    fontSize: '16px',
    lineHeight: '1.7',
    color: '#4B5563',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    maxWidth: '530px',
  },
  badgesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(180px, 1fr))',
    gap: '14px 20px',
    margin: '6px 0 10px',
  },
  bulletItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#F9FAFB',
    padding: '8px 14px',
    borderRadius: '12px',
    border: '1px solid #EAECF0',
  },
  bulletCheckIcon: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    backgroundColor: '#E8F5F1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  bulletText: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
  },
  ctaGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    marginTop: '12px',
  },
  primaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#044439',
    color: '#FFFFFF',
    padding: '15px 32px',
    borderRadius: '9999px',
    fontWeight: '700',
    fontSize: '15px',
    textDecoration: 'none',
    boxShadow: '0 10px 24px rgba(4, 68, 57, 0.25)',
    transition: 'all 0.25s ease',
  },
  btnArrow: {
    fontSize: '14px',
    transition: 'transform 0.2s ease',
  },
  secondaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
    border: '1.5px solid #D1D5DB',
    padding: '14px 28px',
    borderRadius: '9999px',
    fontWeight: '700',
    fontSize: '15px',
    textDecoration: 'none',
    transition: 'all 0.25s ease',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
  },
  rightCol: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'relative',
    height: '100%',
    paddingBottom: '20px',
  },
  visualContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '560px',
    aspectRatio: '580 / 520',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: '0 auto',
    lineHeight: 0,
  },
  shapesBackdropSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    pointerEvents: 'none',
  },
  floatingBadge: {
    position: 'absolute',
    top: '5%',
    right: '4%',
    backgroundColor: '#FFFFFF',
    border: '1px solid rgba(234, 236, 240, 0.9)',
    borderRadius: '16px',
    padding: '8px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.08)',
    zIndex: 5,
    animation: 'floatGentle 4.5s ease-in-out infinite',
  },
  trophyIconBox: {
    width: '32px',
    height: '32px',
    borderRadius: '9px',
    backgroundColor: '#FEF3C7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    flexShrink: 0,
  },
  badgeTextGroup: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.2,
  },
  badgeHeading: {
    fontSize: '12px',
    fontWeight: '800',
    color: '#111827',
    letterSpacing: '-0.2px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  badgeSubtext: {
    fontSize: '10px',
    color: '#6B7280',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  studentsImg: {
    position: 'absolute',
    bottom: 0,
    left: '4.8%',
    width: '90.5%',
    height: '97%',
    objectFit: 'contain',
    objectPosition: 'bottom center',
    zIndex: 3,
    display: 'block',
    verticalAlign: 'bottom',
    margin: 0,
    pointerEvents: 'none',
  },
  bottomLeftBadge: {
    position: 'absolute',
    bottom: '7%',
    left: '2%',
    backgroundColor: '#FFFFFF',
    border: '1px solid #F3F4F6',
    borderRadius: '16px',
    padding: '8px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.08)',
    zIndex: 5,
    animation: 'floatGentle 4s ease-in-out 1s infinite',
  },
  badgeCheckCircle: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: '#DBF5EC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  bottomBadgeTextCol: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.15,
  },
  bottomBadgeChoiceOf: {
    fontSize: '8.5px',
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  bottomBadgeNumber: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#111827',
    lineHeight: '1.1',
    letterSpacing: '-0.3px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  bottomBadgeSubtitle: {
    fontSize: '10px',
    fontWeight: '600',
    color: '#4B5563',
    lineHeight: '1.2',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
};

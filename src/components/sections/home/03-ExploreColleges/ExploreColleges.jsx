import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_PAGE_DATA } from '../../../../data/homeData';

export default function ExploreColleges() {
  const { badge, heading, subtext, ctaButton, regions } = HOME_PAGE_DATA.exploreColleges;
  const navigate = useNavigate();

  const wideCard = regions.find((r) => r.featured);
  const gridCards = regions.filter((r) => !r.featured);

  const handleNavigateToExplore = (e) => {
    if (e) e.preventDefault();
    navigate('/explore-colleges');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="explore-colleges-section" className="explore-colleges" style={styles.section}>
      <div style={styles.container}>
        {/* Left Column: Heading, Subtitle, CTA, Campus Sketch */}
        <div style={styles.leftCol} className="reveal-on-scroll is-visible">
          <div style={styles.pillBadge}>
            <span style={styles.pillIcon}>📍</span>
            <span style={styles.pillText}>{badge}</span>
          </div>

          <h2 style={styles.heading}>
            <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>Explore B.Tech Colleges</span>
            <br />
            <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              <span style={styles.highlight}>{heading.highlight}</span>
            </span>
          </h2>

          <p style={styles.subtext}>{subtext}</p>

          <a
            href="/explore-colleges"
            onClick={handleNavigateToExplore}
            style={styles.ctaBtn}
            className="hover-lift"
          >
            <span>{ctaButton.label}</span>
            <span>➔</span>
          </a>

          {/* Architectural College Sketch */}
          <div style={styles.sketchContainer}>
            <svg
              width="240"
              height="80"
              viewBox="0 0 240 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={styles.sketchSvg}
            >
              <path d="M120 10L135 25H105L120 10Z" stroke="#94A3B8" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M100 25C100 20 140 20 140 25V35H100V25Z" stroke="#94A3B8" strokeWidth="1.6" />
              <path d="M60 35H180V42H60V35Z" stroke="#94A3B8" strokeWidth="1.6" />
              <line x1="75" y1="42" x2="75" y2="70" stroke="#94A3B8" strokeWidth="1.6" />
              <line x1="95" y1="42" x2="95" y2="70" stroke="#94A3B8" strokeWidth="1.6" />
              <line x1="115" y1="42" x2="115" y2="70" stroke="#94A3B8" strokeWidth="1.6" />
              <line x1="125" y1="42" x2="125" y2="70" stroke="#94A3B8" strokeWidth="1.6" />
              <line x1="145" y1="42" x2="145" y2="70" stroke="#94A3B8" strokeWidth="1.6" />
              <line x1="165" y1="42" x2="165" y2="70" stroke="#94A3B8" strokeWidth="1.6" />
              <rect x="40" y="70" width="160" height="6" stroke="#94A3B8" strokeWidth="1.6" />
              <line x1="30" y1="76" x2="210" y2="76" stroke="#94A3B8" strokeWidth="1.6" />
            </svg>
          </div>
        </div>

        {/* Right Column: Grand, High-Impact Region Cards matching Figma */}
        <div style={styles.rightGrid} className="reveal-on-scroll is-visible delay-1">
          {/* Top Wide Card: Andhra Pradesh & Telangana */}
          {wideCard && (
            <a
              href="/explore-colleges"
              onClick={handleNavigateToExplore}
              style={styles.regionCardWide}
              className="region-card-hover hover-lift"
              aria-label="Explore Andhra Pradesh & Telangana Engineering Colleges"
            >
              <div style={styles.wideImgWrapper}>
                <img src={wideCard.image} alt={wideCard.name} style={styles.cardImg} />
              </div>
              <div style={styles.cardInfo}>
                <div style={styles.textGroup}>
                  <span style={styles.regionTitleWide}>
                    Andhra Pradesh &amp;<br />Telangana
                  </span>
                </div>
                <div style={styles.arrowCircle}>→</div>
              </div>
            </a>
          )}

          {/* 2x2 Grid for Remaining Regions */}
          <div style={styles.gridCardsLayout}>
            {gridCards.map((region) => (
              <a
                key={region.id}
                href="/explore-colleges"
                onClick={handleNavigateToExplore}
                style={styles.regionCard}
                className="region-card-hover hover-lift"
                aria-label={`Explore ${region.name} Engineering Colleges`}
              >
                <div style={styles.thumbWrapper}>
                  <img src={region.image} alt={region.name} style={styles.cardImg} />
                </div>
                <div style={styles.cardInfo}>
                  <div style={styles.textGroup}>
                    <span style={styles.regionTitle}>{region.name}</span>
                  </div>
                  <div style={styles.arrowCircle}>→</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '90px 24px 100px',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  container: {
    maxWidth: '1240px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'minmax(300px, 0.85fr) minmax(340px, 1.25fr)',
    gap: '56px',
    alignItems: 'center',
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '22px',
  },
  pillBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#E8F5F1',
    border: '1px solid #A3D8CD',
    padding: '6px 16px',
    borderRadius: '9999px',
  },
  pillIcon: {
    fontSize: '13px',
  },
  pillText: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#044439',
  },
  heading: {
    fontSize: 'clamp(28px, 4vw, 42px)',
    fontWeight: '800',
    color: '#111827',
    lineHeight: '1.2',
    letterSpacing: '-0.8px',
  },
  highlight: {
    color: '#F96815',
  },
  subtext: {
    fontSize: '15px',
    color: '#4B5563',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    lineHeight: '1.65',
    maxWidth: '440px',
  },
  ctaBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#044439',
    color: '#FFFFFF',
    padding: '13px 26px',
    borderRadius: '9999px',
    fontWeight: '700',
    fontSize: '14px',
    textDecoration: 'none',
    boxShadow: '0 6px 16px rgba(4, 68, 57, 0.2)',
  },
  sketchContainer: {
    marginTop: '26px',
    opacity: 0.8,
    borderTop: '1px dashed #E5E7EB',
    paddingTop: '24px',
    width: '100%',
  },
  sketchSvg: {
    width: '240px',
    height: 'auto',
  },
  rightGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
  },
  regionCardWide: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    backgroundColor: '#FFFFFF',
    border: '1.5px solid #EAECF0',
    borderRadius: '20px',
    padding: '14px 18px',
    textDecoration: 'none',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    cursor: 'pointer',
  },
  wideImgWrapper: {
    width: '215px',
    height: '115px',
    borderRadius: '16px',
    flexShrink: 0,
    overflow: 'hidden',
  },
  gridCardsLayout: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  regionCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    backgroundColor: '#FFFFFF',
    border: '1.5px solid #EAECF0',
    borderRadius: '18px',
    padding: '12px 16px',
    textDecoration: 'none',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    cursor: 'pointer',
  },
  thumbWrapper: {
    width: '115px',
    height: '78px',
    borderRadius: '12px',
    flexShrink: 0,
    overflow: 'hidden',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  cardInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  textGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  regionTitleWide: {
    fontSize: '17px',
    fontWeight: '800',
    color: '#111827',
    lineHeight: '1.3',
    letterSpacing: '-0.3px',
  },
  regionTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#111827',
    lineHeight: '1.3',
  },
  arrowCircle: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#E8F5F1',
    color: '#044439',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: '800',
    flexShrink: 0,
    border: 'none',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  },
};

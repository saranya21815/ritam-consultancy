import React from 'react';
import exploreHeroImg from '../../../explorer images/image 11 (1).webp';

export default function ExploreCollegesSection() {
  // WhatsApp guidance number exclusively for WhatsApp interactions
  const whatsappNumber = '916305692643';

  // Exactly four regional cards mapped directly to public/assets/images/regions/
  const cards = [
    {
      id: 'aptg',
      state: 'AP & TG',
      cities: 'Visakhapatnam & Other Cities',
      image: '/assets/images/regions/AP.webp',
      fileName: 'AP.webp',
      college: null,
    },
    {
      id: 'karnataka',
      state: 'Karnataka',
      cities: 'Bengaluru & Other Cities',
      image: '/assets/images/regions/Karnataka.webp',
      fileName: 'Karnataka.webp',
      college: null,
    },
    {
      id: 'tamilnadu',
      state: 'Tamil Nadu',
      cities: 'Chennai & Other Cities',
      image: '/assets/images/regions/Tamil Nadu.webp',
      fileName: 'Tamil Nadu.webp',
      college: null,
    },
    {
      id: 'kerala',
      state: 'Kerala',
      cities: 'Kochi & Other Cities',
      image: '/assets/images/regions/Kerala.webp',
      fileName: 'Kerala.webp',
      college: null,
    },
  ];

  // Generates dynamic WhatsApp prefilled URL for each state card
  const getCardWhatsAppUrl = (card) => {
    const message = card.college
      ? `Hii sir! I am interested in ${card.college} in ${card.state}. Please guide me.`
      : `Hii sir! I am interested in ${card.state} colleges. Please guide me.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="explore-colleges" className="explore-colleges-section" style={styles.sectionWrapper}>
      <div id="explore-colleges-section" style={{ position: 'relative', top: '-85px', visibility: 'hidden' }} />

      {/* Embedded CSS matching PDF layout, responsive alignment & zero horizontal scroll */}
      <style>{`
        .explore-hero-banner {
          background-color: #012419 !important;
          background-image: linear-gradient(105deg, #012419 0%, #023A2A 25%, #035B41 55%, #047A59 100%) !important;
          width: 100%;
          overflow: hidden;
          position: relative;
          box-sizing: border-box;
          padding: 0;
        }
        .explore-hero-container {
          max-width: 1360px;
          width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 460px 1fr;
          gap: 20px;
          align-items: flex-end;
          padding: 0 36px;
          position: relative;
          box-sizing: border-box;
          min-height: 480px;
        }
        .explore-hero-text {
          max-width: 460px;
          padding-top: 72px;
          padding-bottom: 64px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          box-sizing: border-box;
          z-index: 2;
        }
        .explore-hero-img-col {
          display: flex;
          justify-content: flex-start !important;
          align-items: flex-end !important;
          min-width: 0;
          line-height: 0;
          height: 100%;
          box-sizing: border-box;
          overflow: visible;
        }
        .explore-hero-img {
          width: auto !important;
          max-width: 950px !important;
          height: 420px !important;
          object-fit: contain !important;
          object-position: left bottom !important;
          display: block;
          vertical-align: bottom;
          margin: 0;
          position: relative !important;
          bottom: 0 !important;
        }
        @media (min-width: 641px) {
          .nowrap-desktop {
            white-space: nowrap !important;
          }
        }
        @media (max-width: 992px) {
          .explore-hero-container {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding: 48px 24px 0 !important;
            min-height: auto !important;
          }
          .explore-hero-text {
            max-width: 100% !important;
            padding: 0 0 16px 0 !important;
            text-align: left !important;
          }
          .explore-hero-img-col {
            width: 100% !important;
            justify-content: center !important;
            align-items: flex-end !important;
            position: relative !important;
            margin-top: 8px !important;
          }
          .explore-hero-img {
            position: relative !important;
            right: auto !important;
            bottom: auto !important;
            width: 100% !important;
            max-width: 600px !important;
            max-height: 340px !important;
            margin: 0 auto !important;
            object-position: center bottom !important;
          }
          .explore-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
          .explore-content-container {
            padding: 50px 36px 65px !important;
          }
          .explore-quote-banner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 24px !important;
            padding: 24px !important;
          }
          .explore-contact-right-col {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 640px) {
          .explore-hero-container {
            padding: 36px 0px 0px 20px !important;
          }
          .explore-content-container {
            padding: 40px 20px 50px !important;
          }
          .explore-hero-img {
            max-height: 250px !important;
          }
          .explore-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>

      {/* 1. Full-Width Deep Forest Green Hero Banner matching PDF */}
      <div style={styles.heroBanner} className="explore-hero-banner">
        <div style={styles.heroContainer} className="explore-hero-container">
          <div style={styles.heroTextCol} className="explore-hero-text reveal-on-scroll is-visible">
            <div style={styles.pillBadge}>
              <span style={styles.pillDot}>•</span>
              <span>Explore Colleges</span>
            </div>

            <h2 style={styles.heroHeading} className="nav-text-stretch">
              Explore Engineering <br />
              <span className="nowrap-desktop">
                Colleges <span style={styles.orangeHighlight}>Across India</span>
              </span>
            </h2>

            <p style={styles.heroSubtitle} className="nav-subtext-reveal">
              Discover opportunities, admission routes, fee insights and find the
              right college that fits your budget and career goals.
            </p>
          </div>

          <div style={styles.heroImgCol} className="explore-hero-img-col reveal-on-scroll is-visible delay-1">
            <img
              src={exploreHeroImg}
              alt="Explore Engineering Colleges Across India"
              style={styles.heroImg}
              className="explore-hero-img"
              onError={(e) => {
                e.currentTarget.src = '/assets/images/explorer/explore-hero.png';
              }}
            />
          </div>
        </div>
      </div>

      {/* 2. Explore by State Section */}
      <div style={styles.contentContainer} className="explore-content-container">
        <div style={styles.statesHeader}>
          <h3 style={styles.statesTitle}>
            Explore by <span style={styles.orangeHighlight}>State</span>
          </h3>
          <p style={styles.statesSubtitle}>
            Discover engineering opportunities, admission processes, and key insights across major states in India.
          </p>
        </div>

        {/* 3. Exactly Four State Cards with Dynamic WhatsApp Routing */}
        <div style={styles.cardsGrid} className="explore-cards-grid">
          {cards.map((card) => {
            const waUrl = getCardWhatsAppUrl(card);
            return (
              <a
                key={card.id}
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.portraitCard}
                className="hover-lift"
                aria-label={`Chat on WhatsApp about ${card.state} colleges - ${card.cities}`}
              >
                <img
                  src={encodeURI(card.image)}
                  alt={`${card.state} Engineering Colleges`}
                  style={styles.portraitCardImg}
                  onError={(e) => {
                    if (!e.currentTarget.dataset.retried) {
                      e.currentTarget.dataset.retried = 'true';
                      e.currentTarget.src = card.image;
                    }
                  }}
                />
                <div style={styles.gradientOverlay} />

                <div style={styles.cardBottomContent}>
                  <div style={styles.cardTextGroup}>
                    <h4 style={styles.cardStateTitle}>{card.state}</h4>
                    <p style={styles.cardCitiesSubtitle}>{card.cities}</p>
                  </div>

                  <div
                    style={styles.whiteArrowCircle}
                    aria-label={`Connect on WhatsApp for ${card.state} guidance`}
                  >
                    →
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* 4. Call Us Quote Banner matching PDF */}
        <div style={styles.quoteBanner} className="explore-quote-banner">
          <div style={styles.quoteLeftCol}>
            <div style={styles.verticalBar} />
            <div style={styles.quoteTextWrap}>
              <span style={styles.orangeQuote}>“</span>
              <div style={styles.quoteLines}>
                <span style={styles.quoteLineDark}>Because It's Your Future,</span>
                <span style={styles.quoteLineOrange}>
                  Feel Free to Call Us. <span style={styles.orangeQuote}>”</span>
                </span>
              </div>
            </div>
          </div>

          <div style={styles.contactRightCol} className="explore-contact-right-col">
            {/* Call Us Item (Phone: +91 98765 43210) */}
            <div style={styles.contactItemRow}>
              <div style={styles.contactCircleIcon}>📞</div>
              <div style={styles.contactDetailGroup}>
                <span style={styles.contactSmallLabel}>Call Us</span>
                <a href="tel:+919876543210" style={styles.contactBigValue}>
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* Email Us Item */}
            <div style={styles.contactItemRow}>
              <div style={styles.contactCircleIcon}>✉️</div>
              <div style={styles.contactDetailGroup}>
                <span style={styles.contactSmallLabel}>Email Us</span>
                <a href="mailto:admissions@ritamconsultancy.com" style={styles.contactEmailLink}>
                  admissions@ritamconsultancy.com
                </a>
                <a href="mailto:ritamconsultancy77@gmail.com" style={styles.contactEmailLink}>
                  ritamconsultancy77@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  sectionWrapper: {
    backgroundColor: '#FFFFFF',
    position: 'relative',
    overflow: 'clip',
    width: '100%',
  },
  heroBanner: {
    backgroundColor: '#012419',
    backgroundImage: 'linear-gradient(105deg, #012419 0%, #023A2A 25%, #035B41 55%, #047A59 100%)',
    width: '100%',
    padding: 0,
    overflow: 'hidden',
    boxSizing: 'border-box',
    position: 'relative',
    minHeight: '480px',
  },
  heroContainer: {
    maxWidth: '1360px',
    width: '100%',
    margin: '0 auto',
    boxSizing: 'border-box',
    position: 'relative',
    padding: '0 36px',
    display: 'grid',
    gridTemplateColumns: '460px 1fr',
    gap: '20px',
    alignItems: 'flex-end',
    minHeight: '480px',
  },
  heroTextCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '72px',
    paddingBottom: '64px',
    maxWidth: '460px',
    width: '100%',
    minWidth: 0,
    boxSizing: 'border-box',
    zIndex: 2,
  },
  pillBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    padding: '6px 14px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: '0.6px',
    marginBottom: '20px',
  },
  pillDot: {
    color: '#A3D8CD',
    fontSize: '14px',
  },
  heroHeading: {
    fontSize: 'clamp(28px, 3.2vw, 42px)',
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: '1.25',
    letterSpacing: '-0.5px',
    margin: '0 0 18px',
    overflowWrap: 'break-word',
    wordBreak: 'normal',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  orangeHighlight: {
    color: '#F96815',
  },
  heroSubtitle: {
    fontSize: '15px',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: '#E2ECE9',
    lineHeight: '1.65',
    maxWidth: '480px',
    margin: 0,
  },
  heroImgCol: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    minWidth: 0,
    lineHeight: 0,
    height: '100%',
    boxSizing: 'border-box',
  },
  heroImg: {
    width: 'auto',
    maxWidth: '950px',
    height: '420px',
    objectFit: 'contain',
    objectPosition: 'left bottom',
    display: 'block',
    verticalAlign: 'bottom',
    margin: 0,
  },
  contentContainer: {
    maxWidth: '1240px',
    width: '100%',
    margin: '0 auto',
    padding: '70px 36px 85px',
    boxSizing: 'border-box',
  },
  statesHeader: {
    marginBottom: '32px',
  },
  statesTitle: {
    fontSize: 'clamp(28px, 3.4vw, 38px)',
    fontWeight: '800',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: '#111827',
    letterSpacing: '-0.8px',
    margin: '0 0 8px',
  },
  statesSubtitle: {
    fontSize: '15px',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: '#4B5563',
    lineHeight: '1.35',
    margin: 0,
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
    marginBottom: '70px',
  },
  portraitCard: {
    position: 'relative',
    height: '350px',
    borderRadius: '20px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    textDecoration: 'none',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  portraitCardImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.4) 45%, rgba(0, 0, 0, 0.05) 100%)',
    zIndex: 1,
  },
  cardBottomContent: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: '20px 18px',
    width: '100%',
  },
  cardTextGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  cardStateTitle: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#FFFFFF',
    margin: 0,
    letterSpacing: '-0.2px',
  },
  cardCitiesSubtitle: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#E5E7EB',
    margin: 0,
  },
  whiteArrowCircle: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    color: '#111827',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: '800',
    flexShrink: 0,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.2s ease, background-color 0.2s ease, color 0.2s ease',
  },
  quoteBanner: {
    backgroundColor: '#FFFFFF',
    border: '1.5px solid #EAECF0',
    borderRadius: '20px',
    padding: '32px 36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '28px',
    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.04)',
  },
  quoteLeftCol: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  verticalBar: {
    width: '3.5px',
    height: '48px',
    backgroundColor: '#044439',
    borderRadius: '9999px',
  },
  quoteTextWrap: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '6px',
  },
  orangeQuote: {
    color: '#F96815',
    fontSize: '24px',
    fontWeight: '800',
    lineHeight: 1,
  },
  quoteLines: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  quoteLineDark: {
    fontSize: 'clamp(18px, 2.2vw, 22px)',
    fontWeight: '700',
    color: '#111827',
  },
  quoteLineOrange: {
    fontSize: 'clamp(18px, 2.2vw, 22px)',
    fontWeight: '800',
    color: '#F96815',
  },
  contactRightCol: {
    display: 'flex',
    alignItems: 'center',
    gap: '36px',
    flexWrap: 'wrap',
  },
  contactItemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  contactCircleIcon: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: '#E8F5F1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    border: '1px solid #A3D8CD',
  },
  contactDetailGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  contactSmallLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: '0.4px',
  },
  contactBigValue: {
    fontSize: '17px',
    fontWeight: '500',
    color: '#111827',
    textDecoration: 'none',
  },
  contactEmailLink: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#111827',
    textDecoration: 'none',
  },
};

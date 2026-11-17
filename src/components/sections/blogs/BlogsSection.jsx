import React from 'react';
import { Link } from 'react-router-dom';
import blogHeroImg from '../../../blog images/image 16.webp';
import { BLOG_ARTICLES } from '../../../data/blogArticlesData';

export default function BlogsSection() {
  const articles = BLOG_ARTICLES;

  return (
    <section id="blogs" className="blogs-section" style={styles.sectionWrapper}>
      {/* Embedded CSS matching PDF layout, responsive alignment & zero horizontal scroll */}
      <style>{`
        .blogs-hero-banner {
          background-color: #012419 !important;
          background-image: linear-gradient(105deg, #012419 0%, #023A2A 25%, #035B41 55%, #047A59 100%) !important;
          width: 100%;
          overflow: hidden;
          position: relative;
          box-sizing: border-box;
          padding: 0;
        }
        .blogs-hero-container {
          max-width: 1240px;
          width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(320px, 490px) 1fr;
          gap: 36px;
          align-items: flex-end;
          padding: 0 36px;
          position: relative;
          box-sizing: border-box;
          min-height: 480px;
        }
        .blogs-hero-text {
          max-width: 480px;
          padding-top: 72px;
          padding-bottom: 64px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          box-sizing: border-box;
          z-index: 2;
        }
        .blogs-hero-img-col {
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          min-width: 0;
          line-height: 0;
          height: 100%;
          box-sizing: border-box;
        }
        .blogs-hero-img {
          width: 100%;
          height: auto;
          max-height: 420px;
          object-fit: contain;
          object-position: right bottom;
          display: block;
          vertical-align: bottom;
          margin: 0;
        }
        @media (min-width: 641px) {
          .nowrap-desktop {
            white-space: nowrap !important;
          }
        }
        @media (max-width: 992px) {
          .blogs-hero-container {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding: 48px 36px 0 !important;
            min-height: auto !important;
          }
          .blogs-hero-text {
            max-width: 100% !important;
            padding: 0 0 16px 0 !important;
            text-align: left !important;
          }
          .blogs-hero-img-col {
            width: 100% !important;
            justify-content: center !important;
            align-items: flex-end !important;
          }
          .blogs-hero-img {
            max-width: 540px !important;
            max-height: 280px !important;
            margin: 0 auto !important;
            object-position: center bottom !important;
          }
          .blogs-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
          .blogs-content-container {
            padding: 50px 36px 65px !important;
          }
        }
        @media (max-width: 640px) {
          .blogs-hero-container {
            padding: 36px 20px 0 !important;
          }
          .blogs-content-container {
            padding: 40px 20px 50px !important;
          }
          .blogs-hero-img {
            max-height: 210px !important;
          }
          .blogs-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>

      {/* 1. Full-Width Deep Forest Green Hero Banner matching PDF */}
      <div style={styles.heroBanner} className="blogs-hero-banner">
        <div style={styles.heroContainer} className="blogs-hero-container">
          <div style={styles.heroTextCol} className="blogs-hero-text reveal-on-scroll is-visible">
            <div style={styles.pillBadge}>
              <span style={styles.pillDot}>•</span>
              <span>KNOWLEDGE HUB</span>
            </div>

            <h2 style={styles.heroHeading} className="nav-text-stretch">
              Expert Guides for Your <br />
              <span className="nowrap-desktop">
                <span style={styles.orangeHighlight}>Engineering Journey</span>
              </span>
            </h2>

            <p style={styles.heroSubtitle} className="nav-subtext-reveal">
              Practical tips, career insights and important information to help you make the
              right decisions about B.Tech.
            </p>
          </div>

          <div style={styles.heroImgCol} className="blogs-hero-img-col reveal-on-scroll is-visible delay-1">
            <img
              src={blogHeroImg}
              alt="Ritam Knowledge Hub - Engineering Guides"
              style={styles.heroImg}
              className="blogs-hero-img"
              onError={(e) => {
                e.currentTarget.src = '/assets/images/blogs/blogs-hero.png';
              }}
            />
          </div>
        </div>
      </div>

      {/* 2. Blog Cards Container matching PDF */}
      <div style={styles.contentContainer} className="blogs-content-container">
        <div style={styles.cardsGrid} className="blogs-cards-grid">
          {articles.map((article) => (
            <article key={article.id} style={styles.card} className="hover-lift">
              {/* Image with Category Pill Overlay on Top-Left matching PDF */}
              <div style={styles.cardImgWrapper}>
                <img
                  src={article.image}
                  alt={article.title}
                  style={styles.cardImg}
                  onError={(e) => {
                    e.currentTarget.src = article.fallbackImg;
                  }}
                />
                <span style={styles.categoryPillOverlay}>{article.category}</span>
              </div>

              <div style={styles.cardBody}>
                {/* Meta with Calendar and Clock Icons matching PDF */}
                <div style={styles.cardMetaRow}>
                  <div style={styles.metaItem}>
                    <span style={styles.metaIcon}>📅</span>
                    <span>{article.date}</span>
                  </div>
                  <span style={styles.metaPipe}>|</span>
                  <div style={styles.metaItem}>
                    <span style={styles.metaIcon}>⏱️</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 style={styles.cardTitle}>
                  <Link to={`/blogs/${article.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {article.title}
                  </Link>
                </h3>

                <p style={styles.cardExcerpt}>{article.excerpt}</p>

                <div style={styles.cardFooter}>
                  <Link
                    to={`/blogs/${article.slug}`}
                    style={styles.readArticleBtn}
                  >
                    <span>Read Article</span>
                    <span style={styles.diagonalArrow}>↗</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  sectionWrapper: {
    backgroundColor: '#FFFFFF',
    position: 'relative',
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
    maxWidth: '1240px',
    width: '100%',
    margin: '0 auto',
    boxSizing: 'border-box',
    position: 'relative',
    padding: '0 36px',
    display: 'grid',
    gridTemplateColumns: 'minmax(320px, 560px) 1fr',
    gap: '36px',
    alignItems: 'flex-end',
    minHeight: '480px',
  },
  heroTextCol: {
    maxWidth: '560px',
    width: '100%',
    paddingTop: '72px',
    paddingBottom: '64px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
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
    fontSize: 'clamp(32px, 3.8vw, 48px)',
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: '1.2',
    letterSpacing: '-0.8px',
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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    minWidth: 0,
    lineHeight: 0,
    height: '100%',
    boxSizing: 'border-box',
  },
  heroImg: {
    width: '100%',
    height: 'auto',
    maxHeight: '420px',
    objectFit: 'contain',
    objectPosition: 'right bottom',
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
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '28px',
  },
  card: {
    backgroundColor: '#FFFFFF',
    border: '1.5px solid #EAECF0',
    borderRadius: '20px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.04)',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  cardImgWrapper: {
    position: 'relative',
    width: '100%',
    height: '210px',
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  categoryPillOverlay: {
    position: 'absolute',
    top: '14px',
    left: '14px',
    backgroundColor: '#FFFFFF',
    color: '#111827',
    fontSize: '12px',
    fontWeight: '700',
    padding: '6px 14px',
    borderRadius: '9999px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.12)',
    letterSpacing: '0.2px',
  },
  categoryPillModal: {
    backgroundColor: '#044439',
    color: '#FFFFFF',
    fontSize: '11px',
    fontWeight: '700',
    padding: '4px 12px',
    borderRadius: '9999px',
  },
  cardBody: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  cardMetaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: '14px',
  },
  metaItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  },
  metaIcon: {
    fontSize: '13px',
  },
  metaPipe: {
    color: '#D1D5DB',
    fontSize: '12px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#111827',
    lineHeight: '1.38',
    letterSpacing: '-0.3px',
    margin: '0 0 12px',
    minHeight: '50px',
  },
  cardExcerpt: {
    fontSize: '14px',
    color: '#4B5563',
    fontWeight: '500',
    lineHeight: '1.6',
    margin: '0 0 20px',
    flex: 1,
  },
  cardFooter: {
    paddingTop: '16px',
    borderTop: '1px solid #F1F3F5',
  },
  readArticleBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'none',
    border: 'none',
    padding: 0,
    fontSize: '14px',
    fontWeight: '700',
    color: '#044439',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },
  diagonalArrow: {
    fontSize: '16px',
    fontWeight: '700',
  },
  // Modal styles
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '20px',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '24px',
    maxWidth: '720px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 24px 60px rgba(0, 0, 0, 0.25)',
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 28px',
    borderBottom: '1px solid #EAECF0',
  },
  modalMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#6B7280',
    padding: '4px 8px',
  },
  modalContent: {
    padding: '28px',
  },
  modalImg: {
    width: '100%',
    height: '240px',
    objectFit: 'cover',
    borderRadius: '16px',
    marginBottom: '20px',
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#111827',
    lineHeight: '1.3',
    marginBottom: '16px',
  },
  modalBodyText: {
    fontSize: '15px',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: '#4B5563',
    lineHeight: '1.7',
    whiteSpace: 'pre-line',
    marginBottom: '28px',
  },
  modalParagraph: {
    fontSize: '15px',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: '#4B5563',
    lineHeight: '1.7',
    marginBottom: '14px',
  },
  modalCtaBox: {
    backgroundColor: '#E8F5F1',
    border: '1.5px solid #A3D8CD',
    borderRadius: '16px',
    padding: '20px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px',
  },
  modalCtaText: {
    maxWidth: '380px',
  },
  modalCtaBtn: {
    backgroundColor: '#044439',
    color: '#FFFFFF',
    padding: '10px 20px',
    borderRadius: '9999px',
    fontWeight: '700',
    fontSize: '13px',
    border: 'none',
    cursor: 'pointer',
  },
};

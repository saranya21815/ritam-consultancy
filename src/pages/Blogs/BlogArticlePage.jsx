import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { BLOG_ARTICLES } from '../../data/blogArticlesData';

/**
 * BlogArticlePage - Individual Blog Article View
 * Standardized to match Ritam Consultancy website design system (blogs.pdf):
 * - Shared sticky Navbar with active "Blogs" pill
 * - Standard 1240px container width matching Blogs and main website pages
 * - Deep Forest Green Hero banner with breadcrumbs, category badge, and meta
 * - 2-Column responsive layout with sticky counseling sidebar & Table of Contents
 * - Matching Related Guides & Insights section with identical card styling
 * - Seamless integration with global Talk to Expert modal and WhatsApp float
 */
export default function BlogArticlePage() {
  const { slug } = useParams();
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  // Get other related articles (excluding the active one)
  const relatedArticles = BLOG_ARTICLES.filter((a) => a.slug !== slug);

  // Update dynamic SEO Metadata
  useEffect(() => {
    if (article) {
      document.title = article.seoTitle;

      const setMeta = (selector, attr, attrVal, content) => {
        let el = document.querySelector(selector);
        if (!el) {
          el = document.createElement('meta');
          el.setAttribute(attr, attrVal);
          document.head.appendChild(el);
        }
        el.setAttribute('content', content);
      };

      setMeta('meta[name="description"]', 'name', 'description', article.metaDescription);
      setMeta('meta[name="keywords"]', 'name', 'keywords', `${article.category}, engineering admissions, B.Tech guidance, Ritam Consultancy, ${article.title}`);
      setMeta('meta[name="author"]', 'name', 'author', 'Ritam Consultancy');
      setMeta('meta[name="robots"]', 'name', 'robots', 'index, follow');

      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = article.canonicalUrl;

      // Open Graph
      setMeta('meta[property="og:title"]', 'property', 'og:title', article.seoTitle);
      setMeta('meta[property="og:description"]', 'property', 'og:description', article.metaDescription);
      setMeta('meta[property="og:url"]', 'property', 'og:url', article.canonicalUrl);
      setMeta('meta[property="og:type"]', 'property', 'og:type', 'article');
      setMeta('meta[property="og:image"]', 'property', 'og:image', `https://www.ritamconsultancy.com${article.image}`);

      // Twitter Card
      setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
      setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', article.seoTitle);
      setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', article.metaDescription);
      setMeta('meta[name="twitter:url"]', 'name', 'twitter:url', article.canonicalUrl);
      setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', `https://www.ritamconsultancy.com${article.image}`);

      // JSON-LD Structured Data Schema
      let schemaScript = document.getElementById('ritam-page-schema');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'ritam-page-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.metaDescription,
        image: `https://www.ritamconsultancy.com${article.image}`,
        datePublished: '2026-01-15T00:00:00+05:30',
        author: {
          '@type': 'Organization',
          name: 'Ritam Consultancy',
          url: 'https://www.ritamconsultancy.com',
        },
        publisher: {
          '@type': 'EducationalOrganization',
          name: 'Ritam Consultancy',
          url: 'https://www.ritamconsultancy.com',
          logo: 'https://www.ritamconsultancy.com/assets/images/logo/ritam-logo.webp',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': article.canonicalUrl,
        },
      });
    }

    // Scroll to top on slug change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article, slug]);

  if (!article) {
    return <Navigate to="/blogs" replace />;
  }

  const handleTalkToExpert = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-talk-to-expert'));
  };

  return (
    <div className="ritam-blog-article-page" style={styles.pageWrapper}>
      {/* Responsive & hover styles */}
      <style>{`
        .article-hero-banner {
          background-color: #012419 !important;
          background-image: linear-gradient(105deg, #012419 0%, #023A2A 25%, #035B41 55%, #047A59 100%) !important;
          width: 100%;
          overflow: hidden;
          box-sizing: border-box;
          padding: 48px 0 54px;
        }
        .article-hero-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 36px;
          box-sizing: border-box;
        }
        .article-breadcrumbs {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13.5px;
          font-weight: 600;
          color: #A3D8CD;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .article-breadcrumb-link {
          color: #A3D8CD;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .article-breadcrumb-link:hover {
          color: #F96815;
          text-decoration: underline;
        }
        .article-breadcrumb-sep {
          color: rgba(163, 216, 205, 0.5);
        }
        .article-breadcrumb-current {
          color: #FFFFFF;
          font-weight: 700;
        }
        .article-main-grid {
          max-width: 1240px;
          margin: 0 auto;
          padding: 60px 36px 80px;
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 48px;
          box-sizing: border-box;
        }
        .article-content-col {
          min-width: 0;
        }
        .article-featured-img {
          width: 100%;
          max-height: 440px;
          object-fit: cover;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(4, 68, 57, 0.08);
          margin-bottom: 36px;
          display: block;
        }
        .article-sidebar-col {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .article-sticky-sidebar {
          position: sticky;
          top: 110px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .article-sidebar-card {
          background: #FFFFFF;
          border: 1.5px solid #EAECF0;
          border-radius: 18px;
          padding: 24px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
        }
        .article-toc-link {
          display: block;
          color: #4B5563;
          font-size: 14px;
          line-height: 1.5;
          text-decoration: none;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        .article-toc-link:hover {
          background-color: #E8F5F1;
          color: #044439;
          font-weight: 600;
        }
        .related-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }
        @media (max-width: 1024px) {
          .article-main-grid {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 40px 24px 60px;
          }
          .article-sticky-sidebar {
            position: static;
          }
          .related-cards-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .article-hero-banner {
            padding: 32px 0 40px;
          }
          .article-hero-container {
            padding: 0 20px;
          }
          .article-main-grid {
            padding: 32px 18px 50px;
          }
          .article-featured-img {
            max-height: 260px;
            border-radius: 14px;
            margin-bottom: 24px;
          }
        }
      `}</style>

      {/* 1. Deep Forest Green Hero Banner matching Blogs & Website Theme */}
      <section className="article-hero-banner">
        <div className="article-hero-container">
          {/* Breadcrumb Navigation */}
          <nav className="article-breadcrumbs" aria-label="Breadcrumbs">
            <Link to="/" className="article-breadcrumb-link">
              Home
            </Link>
            <span className="article-breadcrumb-sep">&gt;</span>
            <Link to="/blogs" className="article-breadcrumb-link">
              Blogs
            </Link>
            <span className="article-breadcrumb-sep">&gt;</span>
            <span className="article-breadcrumb-current">{article.breadcrumbLabel}</span>
          </nav>

          {/* Pill Badge */}
          <div style={styles.pillBadge}>
            <span style={styles.pillDot}>•</span>
            <span>{article.category.toUpperCase()}</span>
          </div>

          {/* Headline */}
          <h1 style={styles.heroTitle}>{article.title}</h1>

          {/* Lead Excerpt */}
          <p style={styles.heroLead}>{article.excerpt}</p>

          {/* Meta Bar */}
          <div style={styles.metaRow}>
            <span style={styles.metaItem}>📅 {article.date}</span>
            <span style={styles.metaDivider}>•</span>
            <span style={styles.metaItem}>⏱️ {article.readTime}</span>
            <span style={styles.metaDivider}>•</span>
            <span style={styles.metaItem}>🎓 Ritam Consultancy Advisory Team</span>
          </div>
        </div>
      </section>

      {/* 2. Main Content Grid (Article Body + Sticky Counseling Sidebar) */}
      <div className="article-main-grid">
        {/* Left Column: Full Article Content */}
        <main className="article-content-col">
          {/* Featured Image */}
          <img
            src={article.image}
            alt={article.title}
            className="article-featured-img"
            onError={(e) => {
              e.currentTarget.src = article.fallbackImg;
            }}
          />

          {/* Article Key Takeaways Box */}
          <div style={styles.keyTakeawaysBox}>
            <div style={styles.keyTakeawaysHeader}>
              <span style={{ fontSize: '18px' }}>💡</span>
              <strong style={{ color: '#044439', fontSize: '15px' }}>Key Takeaway</strong>
            </div>
            <p style={styles.keyTakeawaysText}>
              Engineering college selection shapes your next 4 years and 40 years of your career.
              Focus on NBA/NAAC autonomy, median core placements, transparent fee structures, and
              practical lab exposure rather than high off-campus promotional claims.
            </p>
          </div>

          {/* Section Blocks */}
          <div style={styles.contentBody}>
            {article.contentSections.map((sec, idx) => (
              <section key={idx} id={`section-${idx + 1}`} style={styles.sectionBlock}>
                <h2 style={styles.sectionHeading}>{sec.heading}</h2>
                <p style={styles.sectionParagraph}>{sec.body}</p>
              </section>
            ))}
          </div>

          {/* End-of-article Guidance Card */}
          <div style={styles.guidanceCtaBox}>
            <div style={styles.ctaTextGroup}>
              <h3 style={styles.ctaTitle}>Confused About Which College or Branch Suits You?</h3>
              <p style={styles.ctaDesc}>
                Speak directly with our senior educational counselors for personalized, unbiased guidance.
                0% commission, 100% verified student outcomes.
              </p>
            </div>
            <button
              type="button"
              onClick={handleTalkToExpert}
              style={styles.ctaBtn}
              className="hover-lift"
            >
              Talk to Our Expert
            </button>
          </div>
        </main>

        {/* Right Column: Sticky Sidebar */}
        <aside className="article-sidebar-col">
          <div className="article-sticky-sidebar">
            {/* Free Counseling Card */}
            <div className="article-sidebar-card" style={styles.counselingCard}>
              <div style={styles.sidebarBadge}>FREE COUNSELING</div>
              <h3 style={styles.sidebarTitle}>Get Personalized College Guidance</h3>
              <p style={styles.sidebarSubtitle}>
                Tell us your rank, preferred state, and budget. Our experts will curate the best college options for you.
              </p>
              <ul style={styles.featuresList}>
                <li style={styles.featureItem}>
                  <span style={styles.checkIcon}>✓</span>
                  <span>1-on-1 Personalized Session</span>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.checkIcon}>✓</span>
                  <span>Verified Placement Insights</span>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.checkIcon}>✓</span>
                  <span>100% Free &amp; Zero Commission</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={handleTalkToExpert}
                style={styles.sidebarBtn}
                className="hover-lift"
              >
                <span>Talk to an Expert</span>
                <span>→</span>
              </button>
            </div>

            {/* In This Article / Table of Contents */}
            <div className="article-sidebar-card">
              <h4 style={styles.tocTitle}>In This Guide</h4>
              <nav style={styles.tocNav}>
                {article.contentSections.map((sec, idx) => (
                  <a
                    key={idx}
                    href={`#section-${idx + 1}`}
                    className="article-toc-link"
                  >
                    {sec.heading}
                  </a>
                ))}
              </nav>
            </div>

            {/* Free Resources Shortcut */}
            <div className="article-sidebar-card" style={styles.resourceCard}>
              <h4 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: '700', color: '#044439' }}>
                📁 Free Downloadable Resources
              </h4>
              <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#6B7280', lineHeight: '1.5' }}>
                Download free B.Tech cutoff guides, fee concession checklists, and branch comparison sheets.
              </p>
              <Link to="/#resources" style={styles.resourcesLink}>
                View Free Resources →
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* 3. Related Articles Section matching Blogs Grid */}
      <section style={styles.relatedSection}>
        <div style={styles.relatedContainer}>
          <div style={styles.relatedHeader}>
            <div style={styles.relatedBadge}>
              <span style={{ color: '#044439' }}>•</span>
              <span>MORE GUIDES</span>
            </div>
            <h2 style={styles.relatedTitle}>
              Related <span style={{ color: '#F96815' }}>Articles &amp; Insights</span>
            </h2>
            <p style={styles.relatedSubtitle}>
              Explore our complete collection of curated guides for engineering aspirants and parents.
            </p>
          </div>

          <div className="related-cards-grid">
            {relatedArticles.slice(0, 2).map((rel) => (
              <article key={rel.id} style={styles.card} className="hover-lift">
                {/* Image with Category Pill Overlay matching Blogs page */}
                <div style={styles.cardImgWrapper}>
                  <img
                    src={rel.image}
                    alt={rel.title}
                    style={styles.cardImg}
                    onError={(e) => {
                      e.currentTarget.src = rel.fallbackImg;
                    }}
                  />
                  <span style={styles.categoryPillOverlay}>{rel.category}</span>
                </div>

                <div style={styles.cardBody}>
                  {/* Meta Row */}
                  <div style={styles.cardMetaRow}>
                    <div style={styles.metaItemSmall}>
                      <span>📅</span>
                      <span>{rel.date}</span>
                    </div>
                    <span style={styles.metaPipe}>|</span>
                    <div style={styles.metaItemSmall}>
                      <span>⏱️</span>
                      <span>{rel.readTime}</span>
                    </div>
                  </div>

                  <h3 style={styles.cardTitle}>
                    <Link
                      to={`/blogs/${rel.slug}`}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {rel.title}
                    </Link>
                  </h3>

                  <p style={styles.cardExcerpt}>{rel.excerpt}</p>

                  <div style={styles.cardFooter}>
                    <Link to={`/blogs/${rel.slug}`} style={styles.readArticleBtn}>
                      <span>Read Article</span>
                      <span style={{ fontSize: '16px' }}>↗</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={styles.viewAllWrap}>
            <Link to="/blogs" style={styles.viewAllBtn} className="hover-lift">
              View All Blog Articles →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  pageWrapper: {
    backgroundColor: '#FFFFFF',
    minHeight: '80vh',
    width: '100%',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
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
    marginBottom: '16px',
  },
  pillDot: {
    color: '#A3D8CD',
    fontSize: '14px',
  },
  heroTitle: {
    fontSize: 'clamp(28px, 3.6vw, 42px)',
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: '1.25',
    letterSpacing: '-0.8px',
    margin: '0 0 16px 0',
    maxWidth: '960px',
  },
  heroLead: {
    fontSize: '16.5px',
    lineHeight: '1.65',
    color: '#E2ECE9',
    fontWeight: '500',
    maxWidth: '820px',
    margin: '0 0 22px 0',
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '13.5px',
    color: '#A3D8CD',
    fontWeight: '500',
    flexWrap: 'wrap',
  },
  metaItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },
  metaDivider: {
    color: 'rgba(163, 216, 205, 0.4)',
  },
  keyTakeawaysBox: {
    backgroundColor: '#F4F8F7',
    border: '1.5px solid #A3D8CD',
    borderRadius: '16px',
    padding: '20px 24px',
    marginBottom: '36px',
  },
  keyTakeawaysHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  },
  keyTakeawaysText: {
    fontSize: '15px',
    lineHeight: '1.65',
    color: '#374151',
    margin: 0,
  },
  contentBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
  },
  sectionBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    scrollMarginTop: '110px',
  },
  sectionHeading: {
    fontSize: 'clamp(20px, 2.2vw, 24px)',
    fontWeight: '700',
    color: '#044439',
    letterSpacing: '-0.3px',
    margin: 0,
    lineHeight: '1.3',
  },
  sectionParagraph: {
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#374151',
    fontWeight: '400',
    margin: 0,
  },
  guidanceCtaBox: {
    marginTop: '56px',
    padding: '36px 36px',
    backgroundColor: '#0C483D',
    backgroundImage: 'linear-gradient(105deg, #012419 0%, #0C483D 60%, #0E4D41 100%)',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
    flexWrap: 'wrap',
    boxShadow: '0 12px 30px rgba(4, 68, 57, 0.16)',
  },
  ctaTextGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    maxWidth: '520px',
  },
  ctaTitle: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#FFFFFF',
    margin: 0,
  },
  ctaDesc: {
    fontSize: '14.5px',
    color: '#E2ECE9',
    margin: 0,
    lineHeight: '1.5',
  },
  ctaBtn: {
    backgroundColor: '#F96815',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '12px',
    padding: '13px 26px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(249, 104, 21, 0.35)',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease',
  },
  counselingCard: {
    backgroundColor: '#012419',
    backgroundImage: 'linear-gradient(145deg, #012419 0%, #044439 100%)',
    color: '#FFFFFF',
    border: 'none',
  },
  sidebarBadge: {
    display: 'inline-block',
    backgroundColor: 'rgba(249, 104, 21, 0.2)',
    color: '#F96815',
    border: '1px solid rgba(249, 104, 21, 0.4)',
    fontSize: '11px',
    fontWeight: '800',
    padding: '4px 10px',
    borderRadius: '9999px',
    letterSpacing: '0.5px',
    marginBottom: '12px',
  },
  sidebarTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#FFFFFF',
    margin: '0 0 8px 0',
    lineHeight: '1.3',
  },
  sidebarSubtitle: {
    fontSize: '13.5px',
    color: '#E2ECE9',
    lineHeight: '1.5',
    margin: '0 0 16px 0',
  },
  featuresList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 20px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '13px',
    color: '#E2ECE9',
  },
  checkIcon: {
    color: '#10B981',
    fontWeight: '800',
    fontSize: '14px',
  },
  sidebarBtn: {
    width: '100%',
    backgroundColor: '#F96815',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '10px',
    padding: '12px 18px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: '0 4px 12px rgba(249, 104, 21, 0.3)',
  },
  tocTitle: {
    margin: '0 0 14px 0',
    fontSize: '15px',
    fontWeight: '700',
    color: '#044439',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  tocNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  resourceCard: {
    backgroundColor: '#F4F8F7',
    border: '1.5px solid #A3D8CD',
  },
  resourcesLink: {
    display: 'inline-block',
    fontSize: '13.5px',
    fontWeight: '700',
    color: '#044439',
    textDecoration: 'none',
  },
  relatedSection: {
    backgroundColor: '#F9FBFA',
    borderTop: '1px solid #EAECF0',
    padding: '70px 0 85px',
  },
  relatedContainer: {
    maxWidth: '1240px',
    margin: '0 auto',
    padding: '0 36px',
    boxSizing: 'border-box',
  },
  relatedHeader: {
    textAlign: 'center',
    maxWidth: '680px',
    margin: '0 auto 48px',
  },
  relatedBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#E8F5F1',
    border: '1px solid #A3D8CD',
    padding: '5px 14px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: '800',
    color: '#044439',
    letterSpacing: '0.6px',
    marginBottom: '14px',
  },
  relatedTitle: {
    fontSize: 'clamp(26px, 3.2vw, 36px)',
    fontWeight: '800',
    color: '#044439',
    letterSpacing: '-0.5px',
    margin: '0 0 12px',
  },
  relatedSubtitle: {
    fontSize: '15px',
    color: '#4B5563',
    lineHeight: '1.6',
    margin: 0,
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
    fontSize: '11px',
    fontWeight: '800',
    padding: '5px 12px',
    borderRadius: '9999px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    letterSpacing: '0.3px',
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
    gap: '12px',
    marginBottom: '12px',
    fontSize: '12.5px',
    color: '#6B7280',
    fontWeight: '500',
  },
  metaItemSmall: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  metaPipe: {
    color: '#D1D5DB',
  },
  cardTitle: {
    fontSize: '17px',
    fontWeight: '700',
    lineHeight: '1.4',
    margin: '0 0 10px',
    color: '#111827',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  cardExcerpt: {
    fontSize: '13.5px',
    lineHeight: '1.6',
    color: '#4B5563',
    margin: '0 0 20px',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    flex: 1,
  },
  cardFooter: {
    paddingTop: '16px',
    borderTop: '1px solid #F3F4F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  readArticleBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    color: '#044439',
    fontSize: '13.5px',
    fontWeight: '700',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  viewAllWrap: {
    textAlign: 'center',
    marginTop: '44px',
  },
  viewAllBtn: {
    display: 'inline-block',
    backgroundColor: '#FFFFFF',
    border: '1.5px solid #044439',
    color: '#044439',
    padding: '12px 28px',
    borderRadius: '12px',
    fontSize: '14.5px',
    fontWeight: '700',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  },
};

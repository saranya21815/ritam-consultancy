import React, { useState } from 'react';
import blogHeroImg from '../../../blog images/image 16.png';
import blogImg1 from '../../../blog images/image 13.jpg';
import blogImg2 from '../../../blog images/image 14.jpg';
import blogImg3 from '../../../blog images/image 15.jpg';

export default function BlogsSection() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 'guide-1',
      category: 'College Guide',
      date: 'Jan 20, 2026',
      readTime: '8 min read',
      image: blogImg1,
      fallbackImg: '/assets/images/blogs/blog-1.jpg',
      title: 'How to Choose the Right Engineering College After Intermediate: A Complete Guide',
      excerpt:
        'A step-by-step guide to selecting the right engineering college based on academics, placements, facilities and your career goals.',
      fullContent: `Choosing the right engineering college after intermediate (10+2) is one of the most important decisions for students and parents.

1. Accreditation & Recognition: Check NBA and NAAC grades (preferably A+ or A++). Autonomous institutions often have more updated curricula.
2. Verified Placement Records: Look at the median salary rather than just highest packages. Verify which core engineering vs. IT companies recruit regularly.
3. Faculty Qualifications & Labs: Experienced PhD professors and modern laboratory equipment ensure strong practical foundational engineering.
4. Total Cost of Education: Factor in tuition fees, examination fees, hostel, mess, and transportation costs without hidden surprises.
5. Campus Culture & Safety: Prioritize colleges with active anti-ragging committees, mentorship programs, and strong alumni networks.

Ritam Consultancy provides unbiased, data-backed guidance to compare college options tailored to your rank and budget.`,
    },
    {
      id: 'guide-2',
      category: 'Career & Branches',
      date: 'Jan 18, 2027',
      readTime: '9 min read',
      image: blogImg2,
      fallbackImg: '/assets/images/blogs/blog-2.jpg',
      title: 'Which B.Tech Branch Should You Choose? Courses, Career Opportunities & Future Scope',
      excerpt:
        'Explore popular B.Tech branches, their course highlights, career opportunities, and future scope to find the best fit for your interests and goals.',
      fullContent: `Engineering offers diverse specializations. Here is how to choose the right branch based on your aptitude and market trends:

- Computer Science & Engineering (CSE) / IT: High demand in software, cloud computing, AI/ML, and cybersecurity. Excellent for problem solvers and coders.
- Electronics & Communication (ECE): Versatile foundation spanning hardware systems, embedded engineering, VLSI design, telecom, and IoT.
- Electrical & Electronics (EEE): Core power systems, electric vehicles (EV), renewable green energy, and industrial automation.
- Mechanical & Civil Engineering: Essential nation-building domains with sustained opportunities in manufacturing, aerospace, robotics, and smart infrastructure.

Always prioritize personal curiosity and natural strengths over temporary hype. Our counselors help align your interests with long-term career growth.`,
    },
    {
      id: 'guide-3',
      category: 'Student Checklist',
      date: 'Jan 15, 2026',
      readTime: '7 min read',
      image: blogImg3,
      fallbackImg: '/assets/images/blogs/blog-3.jpg',
      title: '10 Things Every Student Must Check Before Joining an Engineering College',
      excerpt:
        'A practical checklist covering key factors like accreditation, placements, fees, hostel, infrastructure and more, to make a well-informed decision.',
      fullContent: `Before locking your choice in counseling or taking admission, run through this 10-point checklist:

1. Government Approval: AICTE recognition and UGC status.
2. Verified Cutoff Trends: Previous year opening and closing ranks for your category.
3. Genuine Placement Percentage: Number of eligible students placed in core vs bulk IT companies.
4. Transparent Fee Structure: Written breakdown of tuition, library, lab, uniform, and hostel deposits.
5. Hostel & Food Hygiene: On-campus vs off-campus hostels, Wi-Fi reliability, and mess hygiene.
6. Industry Internships: Active MoUs with reputed technology firms and research labs.
7. Location & Accessibility: Distance from home, proximity to IT corridors, and connectivity.
8. Coding Culture & Hackathons: Active student clubs (IEEE, ACM, robotics, coding communities).
9. Student Diversity & Safe Campus: Strict anti-ragging measures and supportive student communities.
10. Unbiased Third-Party Opinion: Speak to current students or verified counselors rather than promotional agents.

Need help evaluating specific colleges? Talk to Ritam Consultancy for genuine insights with zero commission.`,
    },
  ];

  const handleOpenArticle = (art, e) => {
    e.preventDefault();
    setSelectedArticle(art);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  const scrollToEnquiry = () => {
    setSelectedArticle(null);
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

  return (
    <section id="blogs" className="blogs-section" style={styles.sectionWrapper}>
      {/* Embedded CSS matching PDF layout, responsive alignment & zero horizontal scroll */}
      <style>{`
        .blogs-hero-banner {
          background-color: #044439;
          background-image: linear-gradient(101deg, #022A1F 0%, #047857 100%);
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
        @media (max-width: 992px) {
          .blogs-hero-container {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
            padding: 48px 36px 0 !important;
            min-height: auto !important;
          }
          .blogs-hero-text {
            max-width: 100% !important;
            padding: 0 0 24px 0 !important;
            text-align: left !important;
          }
          .blogs-hero-img-col {
            width: 100% !important;
            justify-content: center !important;
            align-items: flex-end !important;
          }
          .blogs-hero-img {
            max-width: 580px !important;
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
          <div style={styles.heroTextCol} className="blogs-hero-text">
            <div style={styles.pillBadge}>
              <span style={styles.pillDot}>•</span>
              <span>KNOWLEDGE HUB</span>
            </div>

            <h2 style={styles.heroHeading} className="nav-text-stretch">
              Expert Guides for Your <br />
              <span style={styles.orangeHighlight}>Engineering Journey</span>
            </h2>

            <p style={styles.heroSubtitle} className="nav-subtext-reveal">
              Practical tips, career insights and important information to help you make the
              right decisions about B.Tech.
            </p>
          </div>

          <div style={styles.heroImgCol} className="blogs-hero-img-col">
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

                <h3 style={styles.cardTitle}>{article.title}</h3>

                <p style={styles.cardExcerpt}>{article.excerpt}</p>

                <div style={styles.cardFooter}>
                  <button
                    type="button"
                    onClick={(e) => handleOpenArticle(article, e)}
                    style={styles.readArticleBtn}
                  >
                    <span>Read Article</span>
                    <span style={styles.diagonalArrow}>↗</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* In-Page Article Modal Reader (Zero External Pages / Tabs) */}
      {selectedArticle && (
        <div style={styles.modalBackdrop} onClick={handleCloseArticle} role="dialog" aria-modal="true">
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.modalMeta}>
                <span style={styles.categoryPillModal}>{selectedArticle.category}</span>
                <span style={{ fontSize: '13px', color: '#6B7280' }}>
                  {selectedArticle.date} • {selectedArticle.readTime}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCloseArticle}
                style={styles.closeBtn}
                aria-label="Close article"
              >
                ✕
              </button>
            </div>

            <div style={styles.modalContent}>
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                style={styles.modalImg}
                onError={(e) => {
                  e.currentTarget.src = selectedArticle.fallbackImg;
                }}
              />
              <h2 style={styles.modalTitle}>{selectedArticle.title}</h2>
              <div style={styles.modalBodyText}>
                {selectedArticle.fullContent.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} style={styles.modalParagraph}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div style={styles.modalCtaBox}>
                <div style={styles.modalCtaText}>
                  <strong>Need customized advice for your rank and budget?</strong>
                  <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#4B5563' }}>
                    Connect with our education counselors for personalized guidance.
                  </p>
                </div>
                <button type="button" onClick={scrollToEnquiry} style={styles.modalCtaBtn}>
                  Request College Suggestions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

const styles = {
  sectionWrapper: {
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  heroBanner: {
    backgroundColor: '#044439',
    backgroundImage: 'linear-gradient(101deg, #022A1F 0%, #047857 100%)',
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
    gridTemplateColumns: 'minmax(320px, 490px) 1fr',
    gap: '36px',
    alignItems: 'flex-end',
    minHeight: '480px',
  },
  heroTextCol: {
    maxWidth: '480px',
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
    color: '#D1E5DF',
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

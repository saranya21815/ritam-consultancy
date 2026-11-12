import React from 'react';
import GuidanceProcess from '../home/05-GuidanceProcess/GuidanceProcess';
import ZeroCommission from '../home/04-ZeroCommission/ZeroCommission';

export default function ResourcesSection() {
  const resourceHighlights = [
    {
      id: 'res-cutoffs',
      icon: '📊',
      title: 'State & National Cutoff Matrix',
      description: 'Opening and closing ranks across KCET, COMEDK, AP/TS EAPCET, and JEE Main.',
      badge: 'Updated for 2026',
    },
    {
      id: 'res-fees',
      icon: '💰',
      title: 'Transparent College Fee Analyzer',
      description: 'Accurate breakdown of tuition, development charges, hostel, and mess deposits without hidden charges.',
      badge: 'Zero Hidden Fees',
    },
    {
      id: 'res-checklist',
      icon: '📋',
      title: 'Parent & Student College Checklist',
      description: 'Evaluation criteria covering NAAC/NBA status, autonomous affiliation, faculty ratios, and campus security.',
      badge: 'Essential Guide',
    },
    {
      id: 'res-branches',
      icon: '🎯',
      title: 'Branch vs. College Feasibility Tool',
      description: 'Discover whether CSE, ECE, AI/DS, or core branches fit best for your calculated percentile and rank.',
      badge: 'Career Planning',
    },
  ];

  const scrollToEnquiry = (e) => {
    e.preventDefault();
    const el = document.getElementById('enquiry-form-section');
    if (el) {
      const navHeight = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="resources" className="resources-section-container" style={styles.section}>
      {/* 1. Zero Commission Commitment Banner */}
      <ZeroCommission />

      {/* 2. Structured Guidance Process Roadmap for Parents & Students */}
      <GuidanceProcess />

      {/* 3. Comprehensive Counseling Resources & Decision Tools */}
      <div style={styles.toolsContainer}>
        <div style={styles.header}>
          <div style={styles.pillBadge}>
            <span style={styles.pillDot} />
            <span>ADMISSION RESOURCES</span>
          </div>
          <h3 style={styles.title}>
            Comprehensive Toolkit for <span style={{ color: '#F96815' }}>Informed Decisions</span>
          </h3>
          <p style={styles.subtitle}>
            Verified checklists, cutoff trends, and fee transparency guides created by Ritam's counseling team.
          </p>
        </div>

        <div style={styles.grid}>
          {resourceHighlights.map((res) => (
            <div key={res.id} style={styles.card} className="hover-lift">
              <div style={styles.cardHeader}>
                <div style={styles.iconBox}>{res.icon}</div>
                <span style={styles.badge}>{res.badge}</span>
              </div>
              <h4 style={styles.cardTitle}>{res.title}</h4>
              <p style={styles.cardDesc}>{res.description}</p>
              <a href="#enquiry-form-section" onClick={scrollToEnquiry} style={styles.link}>
                <span>Access with Counselor</span>
                <span>➔</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #EAECF0',
    position: 'relative',
  },
  toolsContainer: {
    maxWidth: '1240px',
    margin: '0 auto',
    padding: '40px 24px 90px',
  },
  header: {
    textAlign: 'center',
    maxWidth: '680px',
    margin: '0 auto 40px',
  },
  pillBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#E8F5F1',
    border: '1px solid #A3D8CD',
    padding: '6px 16px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: '700',
    color: '#044439',
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
    marginBottom: '16px',
  },
  pillDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: '#044439',
  },
  title: {
    fontSize: 'clamp(26px, 3.2vw, 36px)',
    fontWeight: '800',
    color: '#111827',
    letterSpacing: '-0.8px',
    margin: '0 0 12px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#4B5563',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    lineHeight: '1.6',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '24px',
  },
  card: {
    backgroundColor: '#F8FAFA',
    border: '1.5px solid #EAECF0',
    borderRadius: '20px',
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '18px',
  },
  iconBox: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #EAECF0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
  },
  badge: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#044439',
    backgroundColor: '#E8F5F1',
    padding: '4px 10px',
    borderRadius: '9999px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#111827',
    margin: '0 0 10px',
    lineHeight: '1.35',
  },
  cardDesc: {
    fontSize: '14px',
    color: '#4B5563',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    lineHeight: '1.6',
    margin: '0 0 20px',
    flex: 1,
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    fontWeight: '700',
    color: '#044439',
    textDecoration: 'none',
    marginTop: 'auto',
  },
};


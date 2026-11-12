import React from 'react';
import { SERVICES_PAGE_DATA } from '../../data/servicesData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import Button from '../../components/common/Button/Button';

export default function ServicesPage({ onNavigate }) {
  useScrollReveal();
  const { hero, services } = SERVICES_PAGE_DATA;

  return (
    <div className="services-page" style={styles.wrapper}>
      {/* 1. Hero Header */}
      <section style={styles.heroSection}>
        <div style={styles.container}>
          <div style={styles.pillBadge} className="reveal-on-scroll">
            <span style={{ fontSize: '13px' }}>🛠️</span>
            <span>{hero.badge}</span>
          </div>

          <h1 style={styles.heroHeading} className="reveal-on-scroll delay-1">
            {hero.heading.prefix}
            <span style={{ color: '#F96815' }}>{hero.heading.highlight}</span>
          </h1>

          <p style={styles.heroSubtext} className="reveal-on-scroll delay-2">
            {hero.subtext}
          </p>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section style={styles.servicesSection}>
        <div style={styles.container}>
          <div style={styles.grid}>
            {services.map((svc, idx) => (
              <div key={svc.id} style={styles.serviceCard} className={`hover-lift reveal-on-scroll delay-${(idx % 3) + 1}`}>
                <div style={styles.iconCircle}>{svc.icon}</div>
                <h2 style={styles.serviceTitle}>{svc.title}</h2>
                <p style={styles.serviceDesc}>{svc.description}</p>
                <div style={styles.benefitsList}>
                  {svc.benefits.map((b) => (
                    <div key={b} style={styles.benefitRow}>
                      <span style={styles.checkMark}>✓</span>
                      <span style={styles.benefitText}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Bottom CTA Banner */}
      <section style={styles.ctaSection}>
        <div style={styles.container}>
          <div style={styles.ctaBox} className="reveal-on-scroll">
            <div>
              <h2 style={styles.ctaTitle}>Need Guidance for Admissions 2026/2027?</h2>
              <p style={styles.ctaSub}>
                Every service at Ritam Consultancy is completely free for students and parents. No hidden charges, no surprises.
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate ? onNavigate('/#enquiry-form-section') : window.location.href = '/#enquiry-form-section'}
            >
              Get Free College Recommendations
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: '#FFFFFF',
  },
  heroSection: {
    padding: '75px 24px 65px',
    background: 'linear-gradient(180deg, #F8FAFA 0%, #FFFFFF 100%)',
    borderBottom: '1px solid #EAECF0',
    textAlign: 'center',
  },
  container: {
    maxWidth: '1240px',
    margin: '0 auto',
  },
  pillBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#E8F5F1',
    border: '1px solid #A3D8CD',
    padding: '6px 16px',
    borderRadius: '9999px',
    fontSize: '13px',
    fontWeight: '700',
    color: '#044439',
    marginBottom: '18px',
  },
  heroHeading: {
    fontSize: 'clamp(32px, 4.5vw, 50px)',
    fontWeight: '800',
    color: '#111827',
    lineHeight: '1.2',
    letterSpacing: '-1px',
    maxWidth: '820px',
    margin: '0 auto 20px',
  },
  heroSubtext: {
    fontSize: '16px',
    color: '#4B5563',
    lineHeight: '1.7',
    maxWidth: '680px',
    margin: '0 auto',
  },
  servicesSection: {
    padding: '80px 24px 90px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '30px',
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    border: '1.5px solid #EAECF0',
    borderRadius: '22px',
    padding: '36px 30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    boxShadow: '0 4px 16px rgba(4, 68, 57, 0.04)',
  },
  iconCircle: {
    width: '52px',
    height: '52px',
    borderRadius: '14px',
    backgroundColor: '#E8F5F1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    marginBottom: '4px',
  },
  serviceTitle: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#111827',
    lineHeight: '1.3',
  },
  serviceDesc: {
    fontSize: '14px',
    color: '#4B5563',
    lineHeight: '1.65',
    marginBottom: '10px',
  },
  benefitsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    borderTop: '1px solid #F3F4F6',
    paddingTop: '16px',
    marginTop: 'auto',
  },
  benefitRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
  },
  checkMark: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: '#E8F5F1',
    color: '#044439',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '800',
    flexShrink: 0,
    marginTop: '2px',
  },
  benefitText: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
    lineHeight: '1.45',
  },
  ctaSection: {
    padding: '0 24px 80px',
  },
  ctaBox: {
    backgroundColor: '#FAF8F5',
    border: '1.5px solid #ECD7C6',
    borderRadius: '24px',
    padding: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '24px',
  },
  ctaTitle: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#111827',
    marginBottom: '8px',
  },
  ctaSub: {
    fontSize: '15px',
    color: '#4B5563',
    maxWidth: '560px',
    margin: 0,
  },
};


import React from 'react';
import { HOME_PAGE_DATA } from '../../../../data/homeData';

export default function AboutUs() {
  const { badge, heading, subtext, cards } = HOME_PAGE_DATA.aboutUs;

  return (
    <section id="about-us" className="about-section" style={styles.section}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header} className="reveal-on-scroll is-visible">
          <div style={styles.pillBadge}>
            <span style={styles.pillIcon}>🏢</span>
            <span style={styles.pillText}>{badge}</span>
          </div>

          <h2 style={styles.heading}>
            {heading.prefix}
            <span style={styles.highlight}>{heading.highlight}</span>
          </h2>

          <p style={styles.subtext}>{subtext}</p>
        </div>

        {/* 3 Contact Cards Grid */}
        <div style={styles.grid}>
          {/* Card 1: Office Address */}
          <div style={styles.card} className="hover-lift reveal-on-scroll is-visible delay-1">
            <div style={{ ...styles.iconBox, backgroundColor: '#E8F5F1', color: '#044439' }}>📍</div>
            <div style={styles.cardContent}>
              <span style={styles.badgeLabel}>Our Office</span>
              <h3 style={styles.cardTitle}>Office Headquarters</h3>
              <p style={styles.address}>
                137/B, Opp. to Sri Amogha Junior College,<br />
                BK Guda, Balkampet,<br />
                Hyderabad, Telangana – 500038
              </p>
              <a
                href="https://maps.app.goo.gl/z2KDhjNfTMerpFaj9"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.directionsBtn}
              >
                <span>🗺️</span>
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Card 2: Phone */}
          <div style={styles.card} className="hover-lift reveal-on-scroll is-visible delay-2">
            <div style={{ ...styles.iconBox, backgroundColor: '#E6F8F3', color: '#044439' }}>📞</div>
            <div style={styles.cardContent}>
              <span style={styles.badgeLabel}>Call Us</span>
              <h3 style={styles.cardTitle}>Phone Number</h3>
              <p style={styles.desc}>Mon – Sat: 9:00 AM – 7:00 PM</p>
              <a href="tel:+91 630 569 2643" style={styles.actionLink}>
                +91 98765 43210
              </a>
              <span style={styles.subAvailability}>Available for calls &amp; WhatsApp</span>
            </div>
          </div>

          {/* Card 3: Emails */}
          <div style={styles.card} className="hover-lift reveal-on-scroll is-visible delay-3">
            <div style={{ ...styles.iconBox, backgroundColor: '#FEF0E6', color: '#F96815' }}>✉️</div>
            <div style={styles.cardContent}>
              <span style={styles.badgeLabel}>Email Us</span>
              <h3 style={styles.cardTitle}>Email Addresses</h3>
              <div style={styles.emailsList}>
                <div style={styles.emailRow}>
                  <span style={styles.emailTag}>General Enquiries</span>
                  <a href="mailto:ritamconsultancy77@gmail.com" style={styles.emailLink}>
                    <span>✉️</span>
                    <span>ritamconsultancy77@gmail.com</span>
                  </a>
                </div>
                <div style={styles.emailRow}>
                  <span style={styles.emailTag}>Admissions</span>
                  <a href="mailto:admissions@ritamconsultancy.com" style={styles.emailLink}>
                    <span>✉️</span>
                    <span>admissions@ritamconsultancy.com</span>
                  </a>
                </div>
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
    padding: '95px 24px',
    backgroundColor: '#FFFFFF',
    borderTop: '1.5px solid #EAECF0',
  },
  container: {
    maxWidth: '1240px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    maxWidth: '680px',
    margin: '0 auto 48px',
  },
  pillBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#E8F5F1',
    color: '#044439',
    padding: '6px 16px',
    borderRadius: '9999px',
    fontSize: '13px',
    fontWeight: '700',
    marginBottom: '16px',
  },
  pillIcon: {
    fontSize: '14px',
  },
  pillText: {
    letterSpacing: '0.02em',
  },
  heading: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#111827',
    lineHeight: '1.25',
    marginBottom: '14px',
    letterSpacing: '-0.02em',
  },
  highlight: {
    color: '#F96815',
  },
  subtext: {
    fontSize: '16px',
    color: '#4B5563',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    lineHeight: '1.6',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '28px',
    marginTop: '24px',
  },
  card: {
    backgroundColor: '#FFFFFF',
    border: '1.5px solid #EAECF0',
    borderRadius: '22px',
    padding: '34px 28px',
    boxShadow: '0 10px 30px rgba(4, 68, 57, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  iconBox: {
    width: '52px',
    height: '52px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    flexShrink: 0,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: 1,
  },
  badgeLabel: {
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#F96815',
  },
  cardTitle: {
    fontSize: '19px',
    fontWeight: '800',
    color: '#111827',
    lineHeight: '1.3',
    margin: 0,
  },
  address: {
    fontSize: '14px',
    color: '#4B5563',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    lineHeight: '1.6',
    margin: 0,
  },
  desc: {
    fontSize: '13px',
    color: '#4B5563',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    lineHeight: '1.5',
    margin: 0,
  },
  directionsBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#044439',
    color: '#FFFFFF',
    padding: '11px 22px',
    borderRadius: '9999px',
    fontSize: '13px',
    fontWeight: '700',
    marginTop: 'auto',
    width: 'fit-content',
    boxShadow: '0 4px 14px rgba(4, 68, 57, 0.2)',
    textDecoration: 'none',
  },
  actionLink: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#044439',
    textDecoration: 'none',
  },
  subAvailability: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#059669',
  },
  emailsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  emailRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  emailTag: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  emailLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    fontWeight: '700',
    color: '#044439',
    textDecoration: 'none',
    wordBreak: 'break-all',
  },
};

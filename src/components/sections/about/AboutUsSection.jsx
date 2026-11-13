import React from 'react';
import aboutHeroImg from '../../../abouts us images/image 13.png';

export default function AboutUsSection() {
  const googleMapsUrl = 'https://maps.app.goo.gl/z2KDhjNfTMerpFaj9';
  const officeAddress =
    '137/B, Opp. to Sri Amogha Junior College, BK Guda, Balkampet, Hyderabad, Telangana 500038';

  return (
    <section id="about-us" className="about-us-section" style={styles.section}>
      <div style={styles.container}>
        {/* 1. Header / Hero Row */}
        <div style={styles.heroRow}>
          <div style={styles.heroTextCol}>
            <div style={styles.pillBadge}>
              <span>ABOUT US</span>
            </div>

            <h2 style={styles.heroHeading} className="nav-text-stretch">
              About Ritam <br />
              <span style={styles.orangeHighlight}>Consultancy</span>
            </h2>

            {/* Decorative short bar under heading matching PDF */}
            <div style={styles.accentBar} />

            <p style={styles.description} className="nav-subtext-reveal">
              We are an educational consultancy <strong>established in 2020</strong>, guiding
              students for engineering (B.Tech) admissions across India.
            </p>

            <p style={styles.description}>
              Over the past <strong>6 years</strong>, Ritam Consultancy has successfully made{' '}
              <strong style={styles.orangeText}>thousands of students happier</strong> by helping
              them secure admissions in their favorite colleges.
            </p>

            {/* Stat Cards with Icon on Left matching PDF */}
            <div style={styles.statsRow}>
              <div style={styles.statCard}>
                <div style={styles.statIconBox}>📅</div>
                <div style={styles.statTextBox}>
                  <span style={styles.statLabel}>Established in</span>
                  <span style={styles.statValue}>2020</span>
                </div>
              </div>

              <div style={styles.statCard}>
                <div style={styles.statIconBox}>🎓</div>
                <div style={styles.statTextBox}>
                  <span style={styles.statLabel}>Happy Students</span>
                  <span style={styles.statValue}>1,000+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: 3D Illustration inside Soft Curved Mint Shape matching PDF */}
          <div style={styles.heroImgCol}>
            <div style={styles.curvedBackdrop}>
              <img
                src={aboutHeroImg}
                alt="About Ritam Consultancy Education Counseling"
                style={styles.heroImg}
                onError={(e) => {
                  e.currentTarget.src = '/assets/images/about/about-hero.png';
                }}
              />
            </div>
          </div>
        </div>

        {/* 2. Get in Touch Section (Map on Left, Contact on Right matching PDF) */}
        <div style={styles.touchSection}>
          <div style={styles.touchGrid}>
            {/* Left: Google Map Card with Top Overlay Badge matching PDF */}
            <div style={styles.mapCard}>
              <div style={styles.mapBadgeOverlay}>
                <div style={styles.mapBrandTitle}>Ritam Consultancy</div>
                <div style={styles.ratingBadge}>
                  <span style={styles.ratingScore}>4.8</span>
                  <span style={styles.stars}>★★★★★</span>
                  <span style={styles.reviewCount}>(120)</span>
                </div>
                <p style={styles.mapOverlayAddress}>{officeAddress}</p>
                <div style={styles.mapLinksRow}>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.getDirectionsBtn}
                  >
                    <span>Get Directions</span>
                    <span>↗</span>
                  </a>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.viewLargerMapLink}
                  >
                    View larger map
                  </a>
                </div>
              </div>

              {/* Embedded Interactive Map */}
              <iframe
                title="Ritam Consultancy Hyderabad Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.4025176162234!2d78.44567297597148!3d17.44043910129064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90bf9e359993%3A0xb35a519ee787752b!2sBalkampet%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="380"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Right: Get in Touch & Helplines matching PDF */}
            <div style={styles.touchRightCol}>
              <div style={styles.touchHeader}>
                <h3 style={styles.touchTitle}>
                  Get in <span style={styles.orangeHighlight}>Touch</span>
                </h3>
                <p style={styles.touchSubtitle}>
                  Have questions? We're here to help you with college admissions and guidance.
                </p>
              </div>

              <div style={styles.contactItemsGroup}>
                {/* Call Us */}
                <div style={styles.contactRowItem}>
                  <div style={styles.contactCircleIcon}>📞</div>
                  <div style={styles.contactDetails}>
                    <span style={styles.contactLabel}>Call Us</span>
                    <a href="tel:+91 630 569 2643" style={styles.contactValueBig}>
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* Email Us */}
                <div style={styles.contactRowItem}>
                  <div style={styles.contactCircleIcon}>✉️</div>
                  <div style={styles.contactDetails}>
                    <span style={styles.contactLabel}>Email Us</span>
                    <a href="mailto:admissions@ritamconsultancy.com" style={styles.contactEmail}>
                      admissions@ritamconsultancy.com
                    </a>
                    <a href="mailto:ritamconsultancy77@gmail.com" style={styles.contactEmail}>
                      ritamconsultancy77@gmail.com
                    </a>
                  </div>
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
    padding: '90px 24px 85px',
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #EAECF0',
    position: 'relative',
  },
  container: {
    maxWidth: '1240px',
    margin: '0 auto',
  },
  heroRow: {
    display: 'grid',
    gridTemplateColumns: 'minmax(320px, 1.1fr) minmax(320px, 0.9fr)',
    gap: '48px',
    alignItems: 'center',
    marginBottom: '80px',
  },
  heroTextCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  pillBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#E8F5F1',
    border: '1px solid #A3D8CD',
    padding: '6px 14px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: '800',
    color: '#044439',
    letterSpacing: '0.8px',
    marginBottom: '20px',
  },
  heroHeading: {
    fontSize: 'clamp(34px, 4.4vw, 52px)',
    fontWeight: '800',
    color: '#044439',
    lineHeight: '1.16',
    letterSpacing: '-1.2px',
    margin: '0 0 14px',
  },
  orangeHighlight: {
    color: '#F96815',
  },
  accentBar: {
    width: '46px',
    height: '4px',
    backgroundColor: '#044439',
    borderRadius: '9999px',
    marginBottom: '24px',
  },
  description: {
    fontSize: '15.5px',
    color: '#4B5563',
    fontWeight: '500',
    lineHeight: '1.7',
    maxWidth: '540px',
    margin: '0 0 16px',
  },
  orangeText: {
    color: '#F96815',
  },
  statsRow: {
    display: 'flex',
    gap: '18px',
    marginTop: '20px',
    flexWrap: 'wrap',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    border: '1.5px solid #EAECF0',
    borderRadius: '16px',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
  },
  statIconBox: {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    backgroundColor: '#E8F5F1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    border: '1px solid #A3D8CD',
  },
  statTextBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  statLabel: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#6B7280',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#111827',
    letterSpacing: '-0.3px',
  },
  heroImgCol: {
    display: 'flex',
    justifyContent: 'center',
  },
  curvedBackdrop: {
    backgroundColor: '#EDF7F4',
    borderRadius: '40% 60% 65% 35% / 45% 50% 50% 55%',
    padding: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '480px',
  },
  heroImg: {
    width: '100%',
    height: 'auto',
    maxHeight: '360px',
    objectFit: 'contain',
    display: 'block',
  },
  touchSection: {
    paddingTop: '20px',
  },
  touchGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(320px, 1.15fr) minmax(320px, 0.85fr)',
    gap: '48px',
    alignItems: 'center',
  },
  mapCard: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    border: '1.5px solid #EAECF0',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
  },
  mapBadgeOverlay: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    right: '16px',
    maxWidth: '340px',
    backgroundColor: '#FFFFFF',
    borderRadius: '14px',
    padding: '14px 16px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
    zIndex: 5,
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  mapBrandTitle: {
    fontSize: '14px',
    fontWeight: '800',
    color: '#111827',
  },
  ratingBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
  },
  ratingScore: {
    fontWeight: '700',
    color: '#111827',
  },
  stars: {
    color: '#F59E0B',
    fontSize: '11px',
    letterSpacing: '1px',
  },
  reviewCount: {
    color: '#6B7280',
    fontSize: '11px',
  },
  mapOverlayAddress: {
    fontSize: '11px',
    color: '#4B5563',
    lineHeight: '1.4',
    margin: '3px 0 4px',
  },
  mapLinksRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '2px',
  },
  getDirectionsBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    fontWeight: '700',
    color: '#FFFFFF',
    backgroundColor: '#044439',
    padding: '4px 10px',
    borderRadius: '6px',
    textDecoration: 'none',
    transition: 'background-color 0.2s',
  },
  viewLargerMapLink: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#2563EB',
    textDecoration: 'none',
  },
  touchRightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
  },
  touchHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  touchTitle: {
    fontSize: 'clamp(28px, 3.4vw, 38px)',
    fontWeight: '800',
    color: '#111827',
    letterSpacing: '-0.8px',
    margin: 0,
  },
  touchSubtitle: {
    fontSize: '15px',
    color: '#4B5563',
    fontWeight: '500',
    lineHeight: '1.6',
    margin: 0,
  },
  contactItemsGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  contactRowItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
  },
  contactCircleIcon: {
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    backgroundColor: '#E8F5F1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    border: '1px solid #A3D8CD',
    flexShrink: 0,
    marginTop: '2px',
  },
  contactDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  contactLabel: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  },
  contactAddressLink: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#111827',
    textDecoration: 'none',
    lineHeight: '1.5',
    maxWidth: '360px',
  },
  contactDirectionsAction: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#044439',
    textDecoration: 'none',
    marginTop: '2px',
  },
  contactValueBig: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
    textDecoration: 'none',
    letterSpacing: '-0.3px',
  },
  contactEmail: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#111827',
    textDecoration: 'none',
  },
};

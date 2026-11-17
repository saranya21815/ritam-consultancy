import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HOME_PAGE_DATA } from '../../../data/homeData';

export default function Footer() {
  const { logo, copyright } = HOME_PAGE_DATA.footer;
  const [legalModal, setLegalModal] = useState(null); // 'privacy' | 'terms' | null
  const navigate = useNavigate();

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && legalModal) {
        setLegalModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [legalModal]);

  const handleNav = (path, e) => {
    if (e) e.preventDefault();
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTarget = (targetId, e) => {
    if (e) e.preventDefault();
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = 85;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleOpenPrivacy = (e) => {
    e.preventDefault();
    setLegalModal('privacy');
  };

  const handleOpenTerms = (e) => {
    e.preventDefault();
    setLegalModal('terms');
  };

  const handleCloseModal = () => {
    setLegalModal(null);
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Top Info Bar matching all three supplied PDFs */}
        <div style={styles.topBar}>
          {/* Brand Logo & Tagline */}
          <div style={styles.brandGroup}>
            <Link
              to="/"
              onClick={(e) => handleNav('/', e)}
              style={styles.logoLink}
              aria-label="Ritam Consultancy Home"
            >
              <img
                src={logo}
                alt="Ritam Consultancy"
                style={styles.logoImage}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextSibling) {
                    e.currentTarget.nextSibling.style.display = 'inline-block';
                  }
                }}
              />
              <span style={styles.fallbackTitle}>Ritam Consultancy</span>
            </Link>
            <div style={styles.tagline}>
              <span>Trusted guidance for</span>
              <span style={styles.taglineBold}>B.Tech admissions across India.</span>
            </div>
          </div>

          {/* Contact Details with Outline Icons matching PDFs */}
          <div style={styles.contactGroup}>
            <a href="tel:+919876543210" style={styles.contactItem} aria-label="Call Ritam Consultancy">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+91 98765 43210</span>
            </a>

            <a href="mailto:admissions@ritamconsultancy.com" style={styles.contactItem} aria-label="Email Ritam Consultancy">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>admissions@ritamconsultancy.com</span>
            </a>

            <div style={styles.contactItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <span>Hyderabad, India</span>
            </div>

            {/* Social Media Clickable Links */}
            <div style={styles.socialGroup}>
              <a
                href="https://www.facebook.com/share/1DtHmHKGLW/"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialIconBtn}
                aria-label="Follow Ritam Consultancy on Facebook"
                className="hover-lift"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/ritam_consultancy/"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialIconBtn}
                aria-label="Follow Ritam Consultancy on Instagram"
                className="hover-lift"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@ritamconsultancy"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialIconBtn}
                aria-label="Subscribe to Ritam Consultancy on YouTube"
                className="hover-lift"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Subtle Horizontal Divider Line */}
        <div style={styles.divider} />

        {/* Bottom Bar: Copyright & Legal Policy Links matching PDFs */}
        <div style={styles.bottomBar}>
          <p style={styles.copyrightText}>{copyright}</p>

          <div style={styles.legalLinksGroup}>
            <button
              type="button"
              onClick={handleOpenPrivacy}
              style={styles.legalBtn}
              aria-label="Read Privacy Policy"
            >
              Privacy Policy
            </button>
            <span style={styles.pipe} aria-hidden="true">|</span>
            <button
              type="button"
              onClick={handleOpenTerms}
              style={styles.legalBtn}
              aria-label="Read Terms & Conditions"
            >
              Terms &amp; Conditions
            </button>
            <span style={styles.pipe} aria-hidden="true">|</span>
            <a
              href="#about-us"
              onClick={(e) => scrollToTarget('about-us', e)}
              style={styles.legalLink}
              aria-label="Scroll to Contact Us section"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* In-Page Accessible Legal Modal Dialog (No separate tabs or page reloads) */}
      {legalModal && (
        <div
          style={styles.modalBackdrop}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
        >
          <div style={styles.modalCard} className="hover-lift">
            <div style={styles.modalHeader}>
              <div style={styles.modalTitleGroup}>
                <span style={styles.modalBadge}>LEGAL INFORMATION</span>
                <h3 id="legal-modal-title" style={styles.modalTitle}>
                  {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                style={styles.closeBtn}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div style={styles.modalBody}>
              {legalModal === 'privacy' ? (
                <div style={styles.legalContent}>
                  <p>
                    At <strong>Ritam Consultancy</strong>, we value the trust students and parents place in our educational guidance. This Privacy Policy outlines our commitment to safeguarding your personal information.
                  </p>
                  <h4>1. Information We Collect</h4>
                  <p>
                    When you request college recommendations or consult an expert via our forms, we collect your name, student/parent mobile numbers, intermediate stream, preferred state, and annual tuition budget range.
                  </p>
                  <h4>2. Use of Information</h4>
                  <p>
                    Your information is strictly utilized to analyze academic preferences, suggest suitable engineering colleges, and provide personalized counseling on fees, cutoffs, and admission procedures.
                  </p>
                  <h4>3. Zero Commission & Data Confidentiality</h4>
                  <p>
                    We uphold a strict <strong>Zero Commission</strong> policy. We <strong>never sell, lease, or share</strong> student or parent contact details with commercial telemarketers or unauthorized third parties.
                  </p>
                  <h4>4. Communication Channels</h4>
                  <p>
                    Authorized counselors communicate solely regarding verified B.Tech admission updates, eligibility criteria, and college options via phone calls or verified WhatsApp messages.
                  </p>
                  <h4>5. Contact Us Regarding Privacy</h4>
                  <p>
                    For inquiries regarding your personal information, contact us at <a href="mailto:admissions@ritamconsultancy.com" style={{ color: '#044439', fontWeight: 700 }}>admissions@ritamconsultancy.com</a> or call <a href="tel:+919876543210" style={{ color: '#044439', fontWeight: 700 }}>+91 98765 43210</a>.
                  </p>
                </div>
              ) : (
                <div style={styles.legalContent}>
                  <p>
                    Welcome to <strong>Ritam Consultancy</strong>. By utilizing our website and educational counseling services, you agree to the following terms and guidelines.
                  </p>
                  <h4>1. Nature of Advisory Services</h4>
                  <p>
                    Ritam Consultancy is an independent educational consultancy guiding students for engineering (B.Tech) admissions across India. Our suggestions, cutoff trends, and placement metrics are compiled for counseling and informational guidance.
                  </p>
                  <h4>2. Official Admissions & Seat Allotment</h4>
                  <p>
                    Final admissions, fee confirmations, and seat allotments are governed solely by respective university statutes, autonomous board regulations, and official state counseling bodies (e.g. KCET, COMEDK, EAPCET, JEE).
                  </p>
                  <h4>3. Zero Commission Commitment</h4>
                  <p>
                    We do not charge any commission or hidden service fees from students or parents for our primary guidance and counseling support.
                  </p>
                  <h4>4. Student & Parent Responsibility</h4>
                  <p>
                    Students and parents are advised to review official university prospectuses, verify original documentation, and confirm eligibility prerequisites prior to finalizing college choices.
                  </p>
                  <h4>5. Contact & Support</h4>
                  <p>
                    For questions or support, visit our office at 137/B, BK Guda, Balkampet, Hyderabad, Telangana 500038, or email <a href="mailto:admissions@ritamconsultancy.com" style={{ color: '#044439', fontWeight: 700 }}>admissions@ritamconsultancy.com</a>.
                  </p>
                </div>
              )}
            </div>

            <div style={styles.modalFooter}>
              <button
                type="button"
                onClick={handleCloseModal}
                style={styles.modalCloseActionBtn}
              >
                Close &amp; Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #EAECF0',
    padding: '45px 24px 28px',
  },
  container: {
    maxWidth: '1240px',
    margin: '0 auto',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '24px',
    paddingBottom: '24px',
  },
  brandGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '22px',
    flexWrap: 'wrap',
  },
  logoLink: {
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  logoImage: {
    height: '46px',
    width: 'auto',
    objectFit: 'contain',
  },
  fallbackTitle: {
    display: 'none',
    fontSize: '18px',
    fontWeight: '800',
    color: '#044439',
  },
  tagline: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '13px',
    color: '#4B5563',
    lineHeight: '1.4',
    borderLeft: '1.5px solid #E5E7EB',
    paddingLeft: '16px',
  },
  taglineBold: {
    fontWeight: '700',
    color: '#044439',
  },
  contactGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '28px',
    flexWrap: 'wrap',
  },
  socialGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  socialIconBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#F3F4F6',
    color: '#044439',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    border: '1px solid #E5E7EB',
  },
  contactItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#111827',
    textDecoration: 'none',
  },
  divider: {
    height: '1px',
    backgroundColor: '#EAECF0',
    margin: '12px 0 20px',
  },
  bottomBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  copyrightText: {
    fontSize: '13px',
    color: '#6B7280',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    margin: 0,
  },
  legalLinksGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    flexWrap: 'wrap',
  },
  legalLink: {
    fontSize: '13px',
    color: '#6B7280',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
  },
  legalBtn: {
    fontSize: '13px',
    color: '#6B7280',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'color 0.2s ease',
  },
  pipe: {
    color: '#D1D5DB',
    fontSize: '12px',
  },
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
    zIndex: 999999,
    padding: '20px',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '20px',
    maxWidth: '680px',
    width: '100%',
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 24px 50px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
  },
  modalHeader: {
    padding: '24px 28px 18px',
    borderBottom: '1px solid #EAECF0',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  modalTitleGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  modalBadge: {
    fontSize: '11px',
    fontWeight: '800',
    color: '#044439',
    letterSpacing: '0.8px',
  },
  modalTitle: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#111827',
    margin: 0,
    letterSpacing: '-0.4px',
  },
  closeBtn: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#F3F4F6',
    border: 'none',
    color: '#6B7280',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    padding: '24px 28px',
    overflowY: 'auto',
    fontSize: '14px',
    color: '#4B5563',
    lineHeight: '1.65',
  },
  legalContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  modalFooter: {
    padding: '16px 28px',
    borderTop: '1px solid #EAECF0',
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: '#F9FAFB',
  },
  modalCloseActionBtn: {
    backgroundColor: '#044439',
    color: '#FFFFFF',
    padding: '10px 20px',
    borderRadius: '9999px',
    fontWeight: '700',
    fontSize: '13px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
};

import React, { useState } from 'react';
import { CONTACT_PAGE_DATA } from '../../data/contactData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import ContactForm from '../../components/forms/ContactForm/ContactForm';

export default function ContactUsPage() {
  useScrollReveal();
  const { hero, channels, faq } = CONTACT_PAGE_DATA;
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="contact-us-page" style={styles.wrapper}>
      {/* 1. Hero Header */}
      <section style={styles.heroSection}>
        <div style={styles.container}>
          <div style={styles.pillBadge} className="reveal-on-scroll">
            <span style={{ fontSize: '13px' }}>📞</span>
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

      {/* 2. Channels & Contact Form Grid */}
      <section style={styles.mainSection}>
        <div style={styles.container}>
          <div style={styles.twoColsLayout}>
            {/* Left Column: Direct Info Cards */}
            <div style={styles.leftCol}>
              <h2 style={styles.sectionHeading}>Reach Us Directly</h2>
              <div style={styles.channelsList}>
                {channels.map((ch, idx) => (
                  <div key={ch.id} style={styles.channelCard} className={`hover-lift reveal-on-scroll delay-${idx + 1}`}>
                    <div style={styles.channelIcon}>{ch.icon}</div>
                    <div style={styles.channelContent}>
                      <span style={styles.channelLabel}>{ch.label}</span>
                      <h3 style={styles.channelTitle}>{ch.title}</h3>
                      <p style={styles.channelValue}>{ch.value}</p>
                      {ch.subtext && <span style={styles.channelSubtext}>{ch.subtext}</span>}
                      {ch.additional && (
                        <div style={styles.additionalEmails}>
                          {ch.additional.map((item) => (
                            <a key={item.email} href={`mailto:${item.email}`} style={styles.extraEmailLink}>
                              <span>✉️ {item.label}:</span> <strong>{item.email}</strong>
                            </a>
                          ))}
                        </div>
                      )}
                      <a
                        href={ch.actionHref}
                        target={ch.target || '_self'}
                        rel={ch.target ? 'noopener noreferrer' : undefined}
                        style={styles.actionBtn}
                        className="hover-lift"
                      >
                        <span>{ch.actionText}</span>
                        <span>➔</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Contact Message Form */}
            <div style={styles.rightCol} className="reveal-on-scroll delay-1">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Frequently Asked Questions */}
      <section style={styles.faqSection}>
        <div style={styles.container}>
          <div style={styles.faqHeader} className="reveal-on-scroll">
            <span style={styles.pillBadge}>Frequently Asked Questions</span>
            <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#111827', margin: '8px 0' }}>
              Common Queries About Admission Guidance
            </h2>
          </div>

          <div style={styles.faqList}>
            {faq.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.q} style={styles.faqItem} className="reveal-on-scroll">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    style={styles.faqQuestionBtn}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <span style={styles.faqToggleIcon}>{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div style={styles.faqAnswer}>
                      <p style={{ margin: 0 }}>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
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
    padding: '75px 24px 60px',
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
  mainSection: {
    padding: '80px 24px 90px',
  },
  twoColsLayout: {
    display: 'grid',
    gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 1.1fr)',
    gap: '48px',
    alignItems: 'start',
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  sectionHeading: {
    fontSize: '26px',
    fontWeight: '800',
    color: '#111827',
  },
  channelsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  channelCard: {
    backgroundColor: '#FFFFFF',
    border: '1.5px solid #EAECF0',
    borderRadius: '20px',
    padding: '28px 24px',
    display: 'flex',
    gap: '18px',
    boxShadow: '0 4px 14px rgba(4, 68, 57, 0.04)',
  },
  channelIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    backgroundColor: '#E8F5F1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    flexShrink: 0,
  },
  channelContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
  },
  channelLabel: {
    fontSize: '11px',
    fontWeight: '800',
    textTransform: 'uppercase',
    color: '#F96815',
    letterSpacing: '0.06em',
  },
  channelTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#111827',
  },
  channelValue: {
    fontSize: '14px',
    color: '#4B5563',
    lineHeight: '1.55',
    margin: 0,
  },
  channelSubtext: {
    fontSize: '12px',
    color: '#059669',
    fontWeight: '600',
  },
  additionalEmails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginTop: '6px',
  },
  extraEmailLink: {
    fontSize: '13px',
    color: '#044439',
    textDecoration: 'none',
  },
  actionBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#044439',
    color: '#FFFFFF',
    padding: '9px 18px',
    borderRadius: '9999px',
    fontSize: '13px',
    fontWeight: '700',
    textDecoration: 'none',
    width: 'fit-content',
    marginTop: '8px',
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  faqSection: {
    padding: '70px 24px 90px',
    backgroundColor: '#F8FAFA',
    borderTop: '1px solid #E5ECE9',
  },
  faqHeader: {
    textAlign: 'center',
    maxWidth: '680px',
    margin: '0 auto 40px',
  },
  faqList: {
    maxWidth: '780px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    border: '1.5px solid #EAECF0',
    borderRadius: '16px',
    overflow: 'hidden',
  },
  faqQuestionBtn: {
    width: '100%',
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '700',
    color: '#111827',
    textAlign: 'left',
  },
  faqToggleIcon: {
    fontSize: '22px',
    color: '#044439',
    fontWeight: '800',
  },
  faqAnswer: {
    padding: '0 24px 20px',
    fontSize: '14px',
    color: '#4B5563',
    lineHeight: '1.65',
    borderTop: '1px solid #F3F4F6',
    paddingTop: '16px',
  },
};


import React from 'react';
import { WhatsAppIcon } from '../../../assets/icons/Icons';
import { getWhatsAppUri } from '../../../utils/formatting';

export default function WhatsAppFloat({
  phone = '6305692643',
  message = 'Hi Ritam Consultancy, I would like guidance for B.Tech Admissions.',
}) {
  const whatsappUrl = getWhatsAppUri(phone, message);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-btn hover-lift"
      aria-label="Chat with Ritam Counselor on WhatsApp"
      style={styles.container}
    >
      <div style={styles.iconCircle}>
        <WhatsAppIcon size={26} color="#FFFFFF" />
      </div>
      <div style={styles.textCol}>
        <div style={styles.topRow}>
          <span style={styles.onlineDot} aria-hidden="true" />
          <span style={styles.title}>Counselors Active</span>
        </div>
        <span style={styles.subtitle}>Chat on WhatsApp</span>
      </div>
    </a>
  );
}

const styles = {
  container: {
    position: 'fixed',
    bottom: '28px',
    right: '28px',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#FFFFFF',
    padding: '8px 20px 8px 8px',
    borderRadius: '9999px',
    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.16)',
    border: '1.5px solid rgba(37, 211, 102, 0.45)',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  iconCircle: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#25D366',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    animation: 'pulseGlow 2.5s infinite',
    flexShrink: 0,
  },
  textCol: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.25,
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  onlineDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#10B981',
    display: 'inline-block',
  },
  title: {
    fontSize: '13px',
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: '12px',
    color: '#059669',
    fontWeight: '700',
  },
};


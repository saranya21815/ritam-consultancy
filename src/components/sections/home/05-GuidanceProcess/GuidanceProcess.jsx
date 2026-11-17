import React from 'react';
import { HOME_PAGE_DATA } from '../../../../data/homeData';

export default function GuidanceProcess() {
  const { badge, heading, subtext, image, steps, ctaButton } = HOME_PAGE_DATA.guidanceProcess;

  const handleTalkToCounsellor = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-talk-to-expert'));
  };

  return (
    <section id="guidance-section" className="guidance-process-section" style={styles.section}>
      <div style={styles.container}>
        {/* Left Column: Heading, Subtext, Photo with Floating Tags */}
        <div style={styles.leftCol} className="reveal-on-scroll is-visible">
          <div style={styles.pillBadge}>
            <span style={styles.pillDot}>•</span>
            <span style={styles.pillText}>{badge}</span>
          </div>

          <h2 style={styles.heading}>
            Because Your
            <br />
            <span style={styles.highlight}>Future Matters</span> to Us
          </h2>

          <p style={styles.subtext}>{subtext}</p>

          {/* Photo Card with Floating Tags */}
          <div style={styles.photoCard}>
            <img src={image.src} alt={image.alt} style={styles.counselingImg} />
            {/* Overlaid Badges */}
            <div style={styles.photoTagsGroup}>
              <div style={styles.photoTag}>
                <span style={styles.tagDot}>•</span>
                <span>{image.tags[0]}</span>
              </div>
              <div style={styles.photoTag}>
                <span style={styles.tagDot}>•</span>
                <span>{image.tags[1]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 4-Step Process Timeline with Connected Track */}
        <div style={styles.rightCol} className="reveal-on-scroll is-visible delay-1">
          <div style={styles.timelineList}>
            {/* Continuous vertical timeline connector line */}
            <div style={styles.timelineTrackLine} aria-hidden="true" />

            {steps.map((st) => (
              <div key={st.number} style={styles.timelineRow} className="timeline-row">
                {/* Step Number Circle */}
                <div style={styles.stepNumCircle}>
                  <span>{st.number}</span>
                </div>

                {/* Step Card Box */}
                <div style={styles.stepCard} className="hover-lift">
                  <h3 style={styles.stepTitle}>{st.title}</h3>
                  <p style={styles.stepDesc}>{st.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action CTA */}
          <div style={styles.bottomCtaWrapper}>
            <a
              href="#talk-to-expert"
              onClick={handleTalkToCounsellor}
              style={styles.counsellorBtn}
              className="hover-lift"
            >
              <span>{ctaButton.label}</span>
              <span>➔</span>
            </a>
            <span style={styles.counsellorSubtext}>{ctaButton.subtext}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '80px 24px',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  container: {
    maxWidth: '1240px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'minmax(320px, 480px) 1fr',
    gap: '56px',
    alignItems: 'flex-start',
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16px',
  },
  pillBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#E8F5F1',
    border: '1px solid #A3D8CD',
    padding: '6px 16px',
    borderRadius: '9999px',
    marginBottom: '4px',
  },
  pillDot: {
    color: '#044439',
    fontSize: '14px',
    fontWeight: '800',
    lineHeight: 1,
  },
  pillText: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#044439',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  heading: {
    fontSize: 'clamp(32px, 3.8vw, 44px)',
    fontWeight: '800',
    color: '#111827',
    lineHeight: '1.2',
    letterSpacing: '-0.8px',
    margin: '0 0 4px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  highlight: {
    color: '#F96815',
  },
  subtext: {
    fontSize: '15px',
    color: '#4B5563',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    lineHeight: '1.65',
    maxWidth: '460px',
    margin: '0 0 12px',
  },
  photoCard: {
    position: 'relative',
    width: '100%',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 12px 32px rgba(4, 68, 57, 0.08)',
    border: '1px solid #EAECF0',
  },
  counselingImg: {
    width: '100%',
    height: '310px',
    objectFit: 'cover',
    display: 'block',
  },
  photoTagsGroup: {
    position: 'absolute',
    bottom: '16px',
    left: '16px',
    right: '16px',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  photoTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    padding: '7px 16px',
    borderRadius: '9999px',
    fontSize: '12.5px',
    fontWeight: '700',
    color: '#044439',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(163, 216, 205, 0.4)',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  tagDot: {
    color: '#F96815',
    fontWeight: '800',
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    position: 'relative',
  },
  timelineList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    position: 'relative',
  },
  timelineTrackLine: {
    position: 'absolute',
    left: '21px',
    top: '24px',
    bottom: '24px',
    width: '2px',
    backgroundColor: '#E2ECE9',
    zIndex: 1,
  },
  timelineRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    position: 'relative',
    zIndex: 2,
  },
  stepNumCircle: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    border: '2px solid #044439',
    color: '#044439',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '15px',
    flexShrink: 0,
    boxShadow: '0 2px 8px rgba(4, 68, 57, 0.08)',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    zIndex: 2,
  },
  stepCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #EAECF0',
    borderRadius: '16px',
    padding: '18px 24px',
    flex: 1,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
    transition: 'all 0.25s ease',
  },
  stepTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 6px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  stepDesc: {
    fontSize: '13.5px',
    color: '#4B5563',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    lineHeight: '1.55',
    margin: 0,
  },
  bottomCtaWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    flexWrap: 'wrap',
    paddingLeft: '4px',
    marginTop: '4px',
  },
  counsellorBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#044439',
    color: '#FFFFFF',
    padding: '13px 28px',
    borderRadius: '9999px',
    fontWeight: '700',
    fontSize: '14.5px',
    textDecoration: 'none',
    boxShadow: '0 6px 16px rgba(4, 68, 57, 0.2)',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    transition: 'all 0.2s ease',
  },
  counsellorSubtext: {
    fontSize: '13.5px',
    color: '#6B7280',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
};

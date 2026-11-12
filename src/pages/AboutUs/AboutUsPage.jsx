import React from 'react';
import AboutUsSection from '../../components/sections/about/AboutUsSection';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * About Us Page
 * Matches about us.pdf - 1,000+ Students, 2020, Interactive Map & Helpline
 */
export default function AboutUsPage({ onNavigate }) {
  useScrollReveal();

  return (
    <div className="ritam-about-us-page" id="about-us-page">
      <AboutUsSection onNavigate={onNavigate} />
    </div>
  );
}

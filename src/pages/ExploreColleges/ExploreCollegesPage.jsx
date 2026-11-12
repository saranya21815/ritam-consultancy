import React from 'react';
import ExploreCollegesSection from '../../components/sections/explore/ExploreCollegesSection';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * Explore Colleges Page
 * Matches explore colleges.pdf - Exactly 4 Regional Cards + Dynamic WhatsApp Integration
 */
export default function ExploreCollegesPage({ onNavigate }) {
  useScrollReveal();

  return (
    <div className="ritam-explore-colleges-page" id="explore-colleges-page">
      <ExploreCollegesSection onNavigate={onNavigate} />
    </div>
  );
}


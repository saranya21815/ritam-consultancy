import React from 'react';
import ResourcesSection from '../../components/sections/resources/ResourcesSection';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * Resources Page
 * Matches Resources Design - Toolkit, Cutoff Matrix, Fee Analyzer, Checklist
 */
export default function ResourcesPage({ onNavigate }) {
  useScrollReveal();

  return (
    <div className="ritam-resources-page" id="resources-page">
      <ResourcesSection onNavigate={onNavigate} />
    </div>
  );
}


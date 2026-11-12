import React from 'react';
import HeroSection from '../../components/sections/home/01-Hero/HeroSection';
import WhyChooseUs from '../../components/sections/home/02-WhyChooseUs/WhyChooseUs';
import ExploreColleges from '../../components/sections/home/03-ExploreColleges/ExploreColleges';
import ZeroCommission from '../../components/sections/home/04-ZeroCommission/ZeroCommission';
import GuidanceProcess from '../../components/sections/home/05-GuidanceProcess/GuidanceProcess';
import HomeEnquiry from '../../components/sections/home/06-HomeEnquiry/HomeEnquiry';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * Ritam Consultancy - Home Page
 * Single Source of Truth: home.pdf / home.jpg Figma Design
 */
export default function HomePage({ onNavigate }) {
  useScrollReveal();

  return (
    <div className="ritam-home-page" id="home">
      {/* 1. Hero Section (Headline, 4 Feature Pills, Dual CTAs, Rating & Students Image) */}
      <HeroSection onNavigate={onNavigate} />

      {/* 2. Why Choose Us Section (4 Value Cards + 500+ Engineering Colleges Badge) */}
      <WhyChooseUs />

      {/* 3. Explore B.Tech Colleges Across India (5 Regional Cards matching home.pdf) */}
      <ExploreColleges onNavigate={onNavigate} />

      {/* 4. Zero Commission, Always (3D Shield + 3 Trust Badges) */}
      <ZeroCommission />

      {/* 5. Guidance for Parents & Students / Resources Anchor (Counseling Photo + 4 Step Process) */}
      <div id="resources">
        <GuidanceProcess onNavigate={onNavigate} />
      </div>

      {/* 6. Request College Recommendations / Find the Right B.Tech College (Working JS1 Form) */}
      <HomeEnquiry />
    </div>
  );
}

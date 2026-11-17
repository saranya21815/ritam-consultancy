import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/common/Navbar/Navbar';
import Footer from './components/common/Footer/Footer';
import WhatsAppFloat from './components/common/WhatsAppFloat/WhatsAppFloat';
import TalkToExpertModal from './components/common/TalkToExpertModal/TalkToExpertModal';
import AppRouter from './routes/AppRouter';
import { updateSectionMetadata } from './utils/sectionMetadata';

/**
 * Main Application Component for Ritam Consultancy
 * 
 * Clean, SEO-Friendly React Router BrowserRouter Navigation:
 * - '/'                -> Home Page (including Resources section anchor)
 * - '/explore-colleges'-> Explore Colleges Page
 * - '/blogs'           -> Blogs Page
 * - '/about-us'        -> About Us Page
 * 
 * Features:
 * - Truly Sticky Navigation Bar at top: 0
 * - Shared Common Footer
 * - Automatic 15-second Talk to Expert Popup (and immediate click triggers)
 * - Global WhatsApp guidance floating CTA
 */
export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expertModalOpen, setExpertModalOpen] = useState(false);
  const timerRef = useRef(null);

  // Synchronize route and section metadata on route change
  useEffect(() => {
    const path = location.pathname || '/';
    const cleanKey = path.replace(/^\//, '').toLowerCase().trim();
    const validSections = ['home', 'explore-colleges', 'blogs', 'resources', 'about-us'];
    const matched = validSections.find((s) => s === cleanKey);
    if (matched) {
      updateSectionMetadata(matched);
    } else if (cleanKey === '' || cleanKey === '/') {
      updateSectionMetadata('home');
    }
    // Inner blog articles manage their own dedicated article-level metadata in BlogArticlePage.jsx

    // Scroll to top on page change unless navigating to a hash anchor like #resources
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const anchorId = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) {
          const navHeight = 85;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - navHeight;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.pathname, location.hash]);

  // Automatic 15-second popup trigger & global click listener
  useEffect(() => {
    const hasAlreadySubmitted =
      typeof window !== 'undefined' &&
      sessionStorage.getItem('talkToExpertSubmitted') === 'true';

    // 1. Automatic 15-second popup trigger:
    if (!hasAlreadySubmitted) {
      timerRef.current = setTimeout(() => {
        const submittedNow =
          typeof window !== 'undefined' &&
          sessionStorage.getItem('talkToExpertSubmitted') === 'true';

        if (!submittedNow) {
          setExpertModalOpen(true);
        }
      }, 15000);
    }

    // 2. Global listener for immediate click-to-open events (Enquire Now / Talk to Expert)
    const handleOpenModal = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setExpertModalOpen(true);
    };

    window.addEventListener('open-talk-to-expert', handleOpenModal);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      window.removeEventListener('open-talk-to-expert', handleOpenModal);
    };
  }, []);

  const handleCloseModal = () => {
    setExpertModalOpen(false);
  };

  return (
    <div className="ritam-app-wrapper">
      {/* 1. Shared Sticky Navigation Bar */}
      <Navbar />

      {/* 2. Independent Page View via AppRouter */}
      <main id="main-content" style={{ minHeight: '80vh' }}>
        <AppRouter />
      </main>

      {/* 3. Floating WhatsApp Consultation CTA */}
      <WhatsAppFloat />

      {/* 4. Global Common Footer */}
      <Footer />

      {/* 5. Single Global Talk to Expert Popup Instance */}
      <TalkToExpertModal isOpen={expertModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

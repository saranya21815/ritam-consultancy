import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import ExploreCollegesPage from '../pages/ExploreColleges/ExploreCollegesPage';
import BlogsPage from '../pages/Blogs/BlogsPage';
import AboutUsPage from '../pages/AboutUs/AboutUsPage';

/**
 * Clean URL Routing Architecture for Ritam Consultancy
 * 
 * Routes:
 * - '/'                -> Home Page (including Resources section anchor)
 * - '/explore-colleges'-> Explore Colleges Page
 * - '/blogs'           -> Blogs Page
 * - '/about-us'        -> About Us Page
 * - '/resources'       -> Redirects cleanly to '/' (Resources is kept as a Home section)
 * - '*'                -> Redirects cleanly to '/'
 */
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore-colleges" element={<ExploreCollegesPage />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/resources" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

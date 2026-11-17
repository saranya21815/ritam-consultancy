import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import ExploreCollegesPage from '../pages/ExploreColleges/ExploreCollegesPage';
import BlogsPage from '../pages/Blogs/BlogsPage';
import BlogArticlePage from '../pages/Blogs/BlogArticlePage';
import ResourcesPage from '../pages/Resources/ResourcesPage';
import AboutUsPage from '../pages/AboutUs/AboutUsPage';

/**
 * Clean URL Routing Architecture for Ritam Consultancy
 * 
 * Routes:
 * - '/'                      -> Home Page
 * - '/explore-colleges'      -> Explore Colleges Page
 * - '/blogs'                 -> Blogs Listing Page
 * - '/blogs/college-guide'   -> College Guide Article Page
 * - '/blogs/career-branches' -> Career & Branches Article Page
 * - '/blogs/student-checklist'-> Student Checklist Article Page
 * - '/blogs/:slug'           -> Dynamic Blog Article Route
 * - '/resources'             -> Resources Page (from reosucespage.pdf)
 * - '/about-us'              -> About Us Page
 * - '*'                      -> Redirects cleanly to '/'
 */
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore-colleges" element={<ExploreCollegesPage />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/blogs/:slug" element={<BlogArticlePage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

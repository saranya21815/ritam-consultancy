import React from 'react';
import BlogsSection from '../../components/sections/blogs/BlogsSection';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * Blogs Page
 * Matches blogs.pdf - 3 Engineering Admission Guides & Filters
 */
export default function BlogsPage({ onNavigate }) {
  useScrollReveal();

  return (
    <div className="ritam-blogs-page" id="blogs-page">
      <BlogsSection onNavigate={onNavigate} />
    </div>
  );
}

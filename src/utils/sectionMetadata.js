/**
 * Section-Specific SEO and Social Metadata Definitions
 * 
 * Provides descriptive titles and meta descriptions for all sections
 * of Ritam Consultancy's single-page website.
 */

export const SECTION_METADATA = {
  home: {
    id: 'home',
    title: 'Ritam Consultancy — Trusted Guidance for B.Tech Admissions | All India Engineering Admissions',
    description:
      'Ethical, student-first higher education consultancy specializing in B.Tech engineering admissions across India. Compare top colleges, verified cutoffs, and transparent fees with 100% Zero Commission.',
    hash: '#home',
  },
  'explore-colleges': {
    id: 'explore-colleges',
    title: 'Explore Engineering Colleges Across India | Ritam Consultancy',
    description:
      'Discover top engineering (B.Tech) colleges across Karnataka, Tamil Nadu, Andhra Pradesh, Telangana, Kerala, and North India. Compare admission routes, fee insights, and placement records.',
    hash: '#explore-colleges',
  },
  blogs: {
    id: 'blogs',
    title: 'Engineering Admissions Guides & Insights | Ritam Consultancy Blogs',
    description:
      'Read expert guides on choosing the right engineering college, B.Tech branch selection, cutoff trends, and essential student checklists after intermediate.',
    hash: '#blogs',
  },
  resources: {
    id: 'resources',
    title: 'B.Tech Admission Resources & Guidance Roadmap | Ritam Consultancy',
    description:
      'Access comprehensive B.Tech admission resources, cutoff matrices, fee transparency tools, and step-by-step guidance roadmaps for students and parents.',
    hash: '#resources',
  },
  'about-us': {
    id: 'about-us',
    title: 'About Ritam Consultancy — Educational Consultancy Established 2020 | Hyderabad',
    description:
      'Learn about Ritam Consultancy, founded in 2020 in Hyderabad. Guiding thousands of happy students for engineering admissions with 100% transparent and zero-commission counseling.',
    hash: '#about-us',
  },
};

/**
 * Dynamically updates document title and in-DOM meta tags for the active section.
 * @param {string} sectionKey - 'home' | 'explore-colleges' | 'blogs' | 'resources' | 'about-us'
 */
export function updateSectionMetadata(sectionKey) {
  if (typeof document === 'undefined') return;
  const meta = SECTION_METADATA[sectionKey] || SECTION_METADATA.home;

  // 1. Update Document Title
  document.title = meta.title;

  // 2. Update Standard Meta Description
  const descEl = document.querySelector('meta[name="description"]');
  if (descEl) {
    descEl.setAttribute('content', meta.description);
  }

  // 3. Update Open Graph Meta Tags in DOM
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', meta.title);
  }
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', meta.description);
  }

  // 4. Update Twitter Card Meta Tags in DOM
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) {
    twTitle.setAttribute('content', meta.title);
  }
  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) {
    twDesc.setAttribute('content', meta.description);
  }
}


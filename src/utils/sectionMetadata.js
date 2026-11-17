/**
 * Comprehensive SEO, Open Graph, Twitter Card & Schema Metadata Engine
 * Ritam Consultancy — Production Domain: https://www.ritamconsultancy.com
 */

export const BASE_URL = 'https://www.ritamconsultancy.com';

export const SECTION_METADATA = {
  home: {
    id: 'home',
    title: 'Ritam Consultancy — Trusted Guidance for B.Tech Admissions | All India Engineering Admissions',
    description:
      'Ethical, student-first higher education consultancy specializing in B.Tech engineering admissions across India. Compare top colleges, verified cutoffs, and transparent fees with 100% Zero Commission.',
    keywords:
      'B.Tech admissions, engineering colleges India, KCET, COMEDK, EAPCET, JEE Main, college counseling, management quota, fee structure, Ritam Consultancy, engineering admissions 2026',
    canonical: `${BASE_URL}/`,
    ogImage: `${BASE_URL}/assets/images/og-preview.png`,
    ogType: 'website',
  },
  'explore-colleges': {
    id: 'explore-colleges',
    title: 'Explore Engineering Colleges Across India | Ritam Consultancy',
    description:
      'Discover top engineering (B.Tech) colleges across Karnataka, Tamil Nadu, Andhra Pradesh, Telangana, Kerala, and North India. Compare admission routes, fee insights, and placement records.',
    keywords:
      'engineering colleges in Karnataka, B.Tech colleges in Tamil Nadu, Telangana engineering colleges, Andhra Pradesh engineering admissions, private engineering universities India, college comparison, Ritam Consultancy',
    canonical: `${BASE_URL}/explore-colleges`,
    ogImage: `${BASE_URL}/assets/images/explorer/explore-hero.webp`,
    ogType: 'website',
  },
  blogs: {
    id: 'blogs',
    title: 'Engineering Admissions Guides & Insights | Ritam Consultancy Blogs',
    description:
      'Read expert guides on choosing the right engineering college, B.Tech branch selection, cutoff trends, and essential student checklists after intermediate.',
    keywords:
      'B.Tech admission guides, engineering entrance insights, college selection advice, branch comparison, intermediate marks guidance, student checklist, Ritam Consultancy',
    canonical: `${BASE_URL}/blogs`,
    ogImage: `${BASE_URL}/assets/images/blogs/blogs-hero.webp`,
    ogType: 'blog',
  },
  resources: {
    id: 'resources',
    title: 'Free B.Tech Admission Guides, Checklists & Downloadable PDFs | Ritam Consultancy',
    description:
      'Download free, expert-curated B.Tech engineering guides: Intermediate Marks Fee Concessions, Branch Selection Roadmap, Deemed vs Private Universities, and Admission Mistakes Checklist.',
    keywords:
      'B.Tech admission resources, free engineering guides, download admission checklist, intermediate marks scholarships, btech branch comparison pdf, deemed vs private universities guide, Ritam Consultancy',
    canonical: `${BASE_URL}/resources`,
    ogImage: `${BASE_URL}/assets/images/resources/resources-hero.webp`,
    ogType: 'website',
  },
  'about-us': {
    id: 'about-us',
    title: 'About Ritam Consultancy — Educational Consultancy Established 2020 | Hyderabad',
    description:
      'Learn about Ritam Consultancy, established in 2020 in Hyderabad. Guiding thousands of students for engineering (B.Tech) admissions across India with 100% transparent, student-first counseling.',
    keywords:
      'about Ritam Consultancy, education consultancy Hyderabad, B.Tech admissions counselor, trusted admission guidance, engineering career guidance India, zero commission education consultancy',
    canonical: `${BASE_URL}/about-us`,
    ogImage: `${BASE_URL}/assets/images/about/about-hero-fresh.webp`,
    ogType: 'website',
  },
};

/**
 * Helper to update or create a <meta> tag by name or property
 */
function setMetaTag(selector, attribute, attrValue, content) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Helper to update or create a <link> tag
 */
function setLinkTag(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Dynamically updates document title, in-DOM meta tags, and structured JSON-LD schema.
 * @param {string} sectionKey - 'home' | 'explore-colleges' | 'blogs' | 'resources' | 'about-us'
 */
export function updateSectionMetadata(sectionKey) {
  if (typeof document === 'undefined') return;
  const meta = SECTION_METADATA[sectionKey] || SECTION_METADATA.home;

  // 1. Document Title
  document.title = meta.title;

  // 2. Standard Meta Tags
  setMetaTag('meta[name="description"]', 'name', 'description', meta.description);
  setMetaTag('meta[name="keywords"]', 'name', 'keywords', meta.keywords);
  setMetaTag('meta[name="author"]', 'name', 'author', 'Ritam Consultancy');
  setMetaTag('meta[name="robots"]', 'name', 'robots', 'index, follow');

  // 3. Canonical Link
  setLinkTag('canonical', meta.canonical);

  // 4. Open Graph Meta Tags
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', meta.title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', meta.description);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', meta.canonical);
  setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Ritam Consultancy');
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', meta.ogType || 'website');
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', meta.ogImage);
  setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'en_IN');

  // 5. Twitter Card Meta Tags
  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
  setMetaTag('meta[name="twitter:url"]', 'name', 'twitter:url', meta.canonical);
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', meta.ogImage);

  // 6. Inject or Update Page-Specific JSON-LD Schema
  let schemaScript = document.getElementById('ritam-page-schema');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'ritam-page-schema';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': sectionKey === 'about-us' ? 'AboutPage' : sectionKey === 'resources' ? 'CollectionPage' : 'WebPage',
    name: meta.title,
    description: meta.description,
    url: meta.canonical,
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Ritam Consultancy',
      url: BASE_URL,
      logo: `${BASE_URL}/assets/images/logo/ritam-logo.webp`,
    },
  };

  schemaScript.textContent = JSON.stringify(pageSchema);
}

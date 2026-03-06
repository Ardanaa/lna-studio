// Shared scroll utilities
// Used by: Footer.jsx, SectionDots.jsx, Header.jsx

/**
 * Smoothly scroll to an element by its ID.
 * @param {string} id - The DOM element ID
 */
export const scrollToElement = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

/**
 * Smoothly scroll to the top of the page.
 */
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Navigation section definitions for section dots and nav menu.
 */
export const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'studio', label: 'Studio' },
  { id: 'projects', label: 'Archive' },
  { id: 'contact', label: 'Inquiry' },
];

/**
 * Ritam Consultancy - Formatting & Utility Helpers
 */

/**
 * Formats a phone number for display (e.g. "+91 98115 43210")
 * @param {string} phone 
 * @returns {string}
 */
export function formatPhoneNumber(phone) {
  if (!phone) return '';
  const digits = String(phone).replace(/\D/g, '');
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return phone;
}

/**
 * Strips whitespace, dashes, and parentheses to generate a clean tel: URI
 * @param {string} phone 
 * @returns {string}
 */
export function getTelUri(phone) {
  if (!phone) return '';
  const clean = String(phone).replace(/[^\d+]/g, '');
  return clean.startsWith('+') ? `tel:${clean}` : `tel:+91${clean}`;
}

/**
 * Creates a prefilled WhatsApp chat link
 * @param {string} phone 
 * @param {string} message 
 * @returns {string}
 */
export function getWhatsAppUri(phone, message) {
  const digits = String(phone).replace(/\D/g, '');
  const encodedMsg = encodeURIComponent(message || 'Hi Ritam Consultancy, I would like guidance for B.Tech Admissions.');
  return `https://wa.me/${digits.startsWith('91') ? digits : '91' + digits}?text=${encodedMsg}`;
}

/**
 * Formats a date string to Indian locale
 * @param {string|Date} date 
 * @returns {string}
 */
export function formatDate(date) {
  try {
    const d = new Date(date);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return String(date);
  }
}


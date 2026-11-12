/**
 * Ritam Consultancy - Form Validations Module
 * 
 * Strict validation rules:
 * - Name: alphabets and spaces only (2-60 chars), rejects numbers & special characters
 * - Phone: exactly 10 digits starting with 6-9, strips country code / leading zeros
 * - Email: RFC-compliant standard format
 * - Required: ensures non-empty selection or trimmed value
 */

// Only letters (uppercase and lowercase) and single spaces between words
export const NAME_REGEX = /^[A-Za-z]+([ A-Za-z]+)*$/;

// Standard 10-digit Indian mobile number starting with 6, 7, 8, or 9
export const PHONE_REGEX = /^[6-9]\d{9}$/;

// Standard email format
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

/**
 * Strips non-digit characters and removes +91 or 0 prefix if present
 * @param {string} val 
 * @returns {string} 10-digit string or raw digits
 */
export function sanitizePhoneDigits(val) {
  if (!val) return '';
  let digits = String(val).replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

/**
 * Validates a full name (alphabets and spaces only, no numbers allowed)
 * @param {string} name 
 * @param {string} fieldLabel 
 * @returns {string|null} Error message or null if valid
 */
export function validateFullName(name, fieldLabel = 'Student name') {
  const trimmed = (name || '').trim();
  if (!trimmed) {
    return `${fieldLabel} is required`;
  }
  if (trimmed.length < 2) {
    return `${fieldLabel} must be at least 2 characters`;
  }
  if (trimmed.length > 60) {
    return `${fieldLabel} must not exceed 60 characters`;
  }
  if (/\d/.test(trimmed)) {
    return `${fieldLabel} must not contain numbers`;
  }
  if (!NAME_REGEX.test(trimmed)) {
    return `${fieldLabel} can only contain letters and spaces`;
  }
  return null;
}

/**
 * Validates a 10-digit mobile phone number
 * @param {string} phone 
 * @param {string} fieldLabel 
 * @returns {string|null} Error message or null if valid
 */
export function validatePhone(phone, fieldLabel = 'Phone number') {
  const cleaned = sanitizePhoneDigits(phone);
  if (!cleaned) {
    return `${fieldLabel} is required`;
  }
  if (cleaned.length !== 10) {
    return `${fieldLabel} must be exactly 10 digits`;
  }
  if (!PHONE_REGEX.test(cleaned)) {
    return `${fieldLabel} must start with 6, 7, 8, or 9`;
  }
  return null;
}

/**
 * Validates an email address
 * @param {string} email 
 * @param {boolean} required 
 * @returns {string|null} Error message or null if valid
 */
export function validateEmail(email, required = true) {
  const trimmed = (email || '').trim();
  if (!trimmed) {
    return required ? 'Email address is required' : null;
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return 'Please enter a valid email address (e.g. name@example.com)';
  }
  return null;
}

/**
 * Validates that a required select option or text field is chosen
 * @param {string} value 
 * @param {string} fieldLabel 
 * @returns {string|null} Error message or null if valid
 */
export function validateRequired(value, fieldLabel) {
  if (!value || !String(value).trim()) {
    return `Please select a ${fieldLabel.toLowerCase()}`;
  }
  return null;
}

/**
 * Validates the primary B.Tech enquiry form
 * @param {object} formData 
 * @returns {object} errors map
 */
export function validateEnquiryForm(formData) {
  const errors = {};

  const nameError = validateFullName(formData.studentName, 'Student name');
  if (nameError) errors.studentName = nameError;

  const parentPhoneError = validatePhone(formData.parentPhone, "Parent's phone number");
  if (parentPhoneError) errors.parentPhone = parentPhoneError;

  const studentPhoneError = validatePhone(formData.studentPhone, "Student's phone number");
  if (studentPhoneError) errors.studentPhone = studentPhoneError;

  const stateError = validateRequired(formData.preferredState, 'Preferred State');
  if (stateError) errors.preferredState = stateError;

  const budgetError = validateRequired(formData.budget, 'Annual Tuition Budget');
  if (budgetError) errors.budget = budgetError;

  return errors;
}

/**
 * Validates the Contact Us form
 * @param {object} formData 
 * @returns {object} errors map
 */
export function validateContactForm(formData) {
  const errors = {};

  const nameError = validateFullName(formData.name, 'Full name');
  if (nameError) errors.name = nameError;

  const phoneError = validatePhone(formData.phone, 'Phone number');
  if (phoneError) errors.phone = phoneError;

  const emailError = validateEmail(formData.email, true);
  if (emailError) errors.email = emailError;

  const messageTrimmed = (formData.message || '').trim();
  if (!messageTrimmed) {
    errors.message = 'Please enter your message or query';
  } else if (messageTrimmed.length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }

  return errors;
}


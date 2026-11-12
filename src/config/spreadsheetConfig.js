/**
 * Ritam Consultancy - Spreadsheet Integration Configuration
 * Adheres to Section 8 of the PRD
 * 
 * Keep this configurable so that once the Google Sheet / Excel webhook is provided,
 * you only need to update the endpoint or mapping below without changing the UI form.
 */

export const SPREADSHEET_CONFIG = {
  // Google Apps Script Web App URL for Ritam Consultancy enquiry form
  ENDPOINT_URL:
    (typeof process !== 'undefined' && process.env?.VITE_SPREADSHEET_API_URL) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SPREADSHEET_API_URL) ||
    "https://script.google.com/macros/s/AKfycbxPc5lPSx070YF328C250PezTaW7UOd33ttB_v1qmrgDWY1_JygfRtfeRralCc2Gvfw/exec",
  
  // Field mappings to the 5 spreadsheet columns in exact order
  COLUMN_MAPPING: {
    studentName: "Student Name (Full)",
    studentPhone: "Student's Phone Number",
    parentPhone: "Parent's Phone Number",
    preferredState: "Preferred State for B.Tech",
    budget: "Your Budget (Annual Tuition Fee)",
  },

  // Configuration options
  SUBMISSION_TIMEOUT_MS: 15000,
  RETRY_ATTEMPTS: 2,
};


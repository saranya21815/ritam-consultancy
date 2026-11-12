/**
 * Ritam Consultancy - Spreadsheet Integration Service
 * Adheres to Section 7 & 8 of the PRD
 */

import { SPREADSHEET_CONFIG } from '../config/spreadsheetConfig.js';

export async function submitEnquiryToSpreadsheet(formData) {
  const { ENDPOINT_URL, COLUMN_MAPPING } = SPREADSHEET_CONFIG;

  if (!ENDPOINT_URL) {
    return {
      success: false,
      error: "Spreadsheet endpoint URL is not configured.",
    };
  }

  const studentName = formData.studentName?.trim() || "";
  const studentPhone = formData.studentPhone?.trim() || "";
  const parentPhone = formData.parentPhone?.trim() || "";
  const studentEmail = formData.studentEmail?.trim() || "";
  const preferredState = formData.preferredState || "";
  const budget = formData.budget || "";

  // Prepare URL-encoded form data (CORS simple request, no preflight OPTIONS needed)
  const params = new URLSearchParams();

  // Column 1: Student Name
  params.append("name", studentName);
  params.append("studentName", studentName);
  params.append("Student Name (Full)", studentName);
  params.append(COLUMN_MAPPING.studentName, studentName);

  // Column 2: Student's Phone Number
  params.append("phone", studentPhone);
  params.append("studentPhone", studentPhone);
  params.append("student", studentPhone);
  params.append("Student's Phone Number", studentPhone);
  params.append(COLUMN_MAPPING.studentPhone, studentPhone);

  // Column 3: Parent's Phone Number (also maps to email if Apps Script reads col3 as email)
  params.append("parentPhone", parentPhone);
  params.append("parent", parentPhone);
  params.append("parent_phone", parentPhone);
  params.append("Parent's Phone Number", parentPhone);
  params.append("Parent Phone Number", parentPhone);
  params.append("email", parentPhone); // in case Apps Script maps 3rd column via 'email' parameter
  params.append(COLUMN_MAPPING.parentPhone, parentPhone);

  // Column 4: Preferred State for B.Tech
  params.append("state", preferredState);
  params.append("preferredState", preferredState);
  params.append("Preferred State for B.Tech", preferredState);
  params.append(COLUMN_MAPPING.preferredState, preferredState);

  // Column 5: Your Budget (Annual Tuition Fee)
  params.append("budget", budget);
  params.append("Your Budget (Annual Tuition Fee)", budget);
  params.append(COLUMN_MAPPING.budget, budget);

  params.append("submittedAt", new Date().toISOString());

  try {
    const response = await fetch(ENDPOINT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const responseText = await response.text();
    const isSuccess = responseText.toLowerCase().includes("success");

    if (!isSuccess && responseText.toLowerCase().includes("error")) {
      throw new Error(responseText.trim());
    }

    return {
      success: true,
      data: responseText,
      message: "Thank you! Your enquiry has been received. Our admission expert will get in touch with you shortly.",
    };
  } catch (error) {
    console.error("[Spreadsheet Submission Error]:", error);
    return {
      success: false,
      error: error.message || "Failed to submit enquiry. Please try again or call our support line.",
    };
  }
}

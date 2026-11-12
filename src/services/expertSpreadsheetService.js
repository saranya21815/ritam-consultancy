/**
 * Ritam Consultancy - Talk to Expert (JS2) Spreadsheet Integration Service
 * 
 * Exclusively connects the "Talk to Expert" popup to the Sheet 2 Google Apps Script endpoint:
 * https://script.google.com/macros/s/AKfycbzzPGkG8KsiwaVEd36_CGtSzur1a9OuLAc850tMgX3GRVFaZ3AqZlxi1Tbz2eQw0MP2/exec
 * 
 * Column Mapping in Sheet 2:
 * - Column A: Student Name / Your Name
 * - Column B: Phone Number / Mobile Number
 * - Column C: Intermediate Group (MPC, BiPC, Other)
 * - Column D: Preferred Location (Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Kerala, Other)
 * 
 * Completely decoupled from JS1 (Sheet 1) to ensure zero interference.
 */

export const EXPERT_ENDPOINT_URL =
  'https://script.google.com/macros/s/AKfycbzzPGkG8KsiwaVEd36_CGtSzur1a9OuLAc850tMgX3GRVFaZ3AqZlxi1Tbz2eQw0MP2/exec';

/**
 * Submit Talk to Expert Lead to Sheet 2
 * @param {Object} data - { yourName, mobileNumber, intermediateGroup, preferredLocation }
 * @returns {Promise<{ success: boolean, message?: string, error?: string }>}
 */
export async function submitTalkToExpertLead(data) {
  const yourName = data.yourName?.trim() || '';
  const mobileNumber = data.mobileNumber?.trim() || '';
  const intermediateGroup = data.intermediateGroup?.trim() || '';
  const preferredLocation = data.preferredLocation?.trim() || '';

  // Google Apps Script JS2 endpoint requires a JSON payload parsed via JSON.parse(e.postData.contents).
  // Using text/plain avoids CORS preflight OPTIONS blocking in browsers while delivering valid JSON.
  const payload = {
    // Column A: Student Name / Your Name
    name: yourName,
    yourName: yourName,
    studentName: yourName,
    'Student Name': yourName,
    'Your Name': yourName,

    // Column B: Phone Number / Mobile Number
    phone: mobileNumber,
    mobileNumber: mobileNumber,
    phoneNumber: mobileNumber,
    'Mobile Number': mobileNumber,
    'Phone Number': mobileNumber,

    // Column C: Intermediate Group
    intermediateGroup: intermediateGroup,
    group: intermediateGroup,
    'Intermediate Group': intermediateGroup,

    // Column D: Preferred Location
    preferredLocation: preferredLocation,
    location: preferredLocation,
    preferredState: preferredLocation,
    state: preferredLocation,
    'Preferred Location': preferredLocation,

    timestamp: new Date().toISOString(),
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(EXPERT_ENDPOINT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const responseText = await response.text();
    let resultJson = null;
    try {
      resultJson = JSON.parse(responseText);
    } catch {
      // not JSON string
    }

    const isSuccess =
      (resultJson && resultJson.status === 'success') ||
      responseText.toLowerCase().includes('success');

    if (!isSuccess && responseText.toLowerCase().includes('error')) {
      throw new Error(resultJson?.message || responseText);
    }

    return {
      success: true,
      message: 'Thank you! Our admission expert will get in touch with you shortly.',
    };
  } catch (err) {
    console.error('[TalkToExpert Submission Error]:', err);
    if (err.name === 'AbortError') {
      return {
        success: false,
        error: 'Submission timed out. Please check your internet connection or call our helpline.',
      };
    }
    return {
      success: false,
      error: err.message || 'Failed to submit details. Please try again or call our helpline.',
    };
  }
}


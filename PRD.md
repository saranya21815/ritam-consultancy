# Product Requirements Document (PRD)

## Project: Ritam Consultancy — Official Web Platform
**Document Version:** 2.0.0  
**Status:** Approved & Implemented  
**Domain:** Higher Education & B.Tech Admissions Consulting (All India)  
**Primary Brand Colors:** Deep Forest Green (`#044439`), Vibrant Accent Orange (`#F96815`), White (`#FFFFFF`)  
**Typography:** Plus Jakarta Sans (Google Fonts)

---

## 1. Executive Summary & Vision
Ritam Consultancy is an ethical, student-first higher education consultancy headquartered in Hyderabad, Telangana, specializing in B.Tech engineering admissions across India. 

The web platform serves as the digital front door for students and parents seeking verified information regarding engineering colleges, rank cutoffs (JEE Main, KCET, COMEDK, AP/TS EAPCET), actual tuition and hostel fees, median placement statistics, and transparent counseling with **100% Zero Commission** from families.

---

## 2. Core Stakeholders & Target Audience
- **B.Tech Aspirants (12th Grade / Intermediate / Droppers):** Seeking guidance on rank vs. branch feasibility, college comparisons, and choice filling strategies.
- **Parents & Guardians:** Concerned about true total cost of education (tuition, hidden fees, hostel), campus safety, anti-ragging policies, food quality, and placement credibility.
- **Admissions & Counseling Team:** Requiring high-quality, pre-validated lead capture connected to CRM/Google Sheets with real-time notifications.

---

## 3. Technology Stack & Architecture
- **Framework & Runtime:** React 18 (SPA)
- **Build Tooling & Dev Server:** Vite 6
- **Routing Engine:** Modular Zero-Dependency Client Router (`AppRouter.jsx`) supporting browser history, hash routes, and section anchors
- **Styling & Design System:** Pure CSS3 Design Tokens, Modular CSS (`brand.css`, `buttons.css`), accessible keyboard navigation
- **Typography:** Plus Jakarta Sans (300, 400, 500, 600, 700, 800)
- **Integration & Data Dispatch:** Google Apps Script Web App / REST API integration with URL-encoded parameters and error-handling fallbacks
- **Validation Engine:** Strict pure-JS validation layer (`formValidations.js`) with input sanitization

---

## 4. Information Architecture & Navigation

### 4.1 Header Navigation
- **Brand Logo:** Sized prominently (60px height) linking back to `/`.
- **Capsule Pill Navigation:**
  - `Home` (`/`)
  - `Explore Colleges` (`/#explore-colleges-section`)
  - `Services` (`/services`)
  - `Blogs` (`/blogs`)
  - `About Us` (`/about`)
  - `Contact Us` (`/contact`)
- **Primary CTA:** "Enquire Now" button anchoring directly to `#enquiry-form-section`.
- **Mobile Responsive Drawer:** Clean slide-down drawer with accessible hamburger toggle button (`aria-expanded`).

### 4.2 Page Breakdown
1. **Home Page (`/`):**
   - **01. Hero Section:** Dribbble-style curl underline, value bullet badges, dual CTAs, layered SVG backdrop shapes, 4.9/5 student rating badge, and official student imagery.
   - **02. Why Choose Us:** 4 feature cards highlighting personalized recommendations, transparent fees, end-to-end support, and student-first counseling.
   - **03. Explore Colleges by Region:** Visual showcase of engineering colleges across AP & Telangana (wide feature card), Karnataka/Bengaluru, Tamil Nadu, Kerala, and North India.
   - **04. Zero Commission Guarantee:** 3D trust shield badge reinforcing that all consultation is completely free for students.
   - **05. Guidance for Parents & Students:** 4-step structured roadmap (Share Details -> Suggestions -> Compare & Shortlist -> Admission Support) with counseling photography.
   - **06. Single Enquiry Form:** Central admission lead capture with live validation.
   - **07. Office Headquarters & Contact:** Physical office address, phone numbers, and official emails.
2. **About Us Page (`/about`):**
   - Company story, mission & vision, 4 core ethical principles, leadership bios, and office location card.
3. **Services Page (`/services`):**
   - 6 specialized services: B.Tech College Guidance, Seat Matrix & Cutoff Analysis, Tuition Fee & Scholarship Guidance, Management & Institutional Admission Support, Document Preparation, and Parent Consultation.
4. **Blogs & Resources Page (`/blogs`):**
   - Real-time categorized guides (College Reviews, Cutoffs & Counseling, Placements & Salaries, Branch Selection) with interactive category filters and search bar.
5. **Contact Us Page (`/contact`):**
   - Physical address with Google Maps directions, phone helplines, official emails, interactive Contact Message Form, and expandable FAQ accordions.

---

## 5. Form Validation & Data Integrity Rules

All input fields across the website enforce strict client-side validation before submission:

| Field Name | Type | Sanitization & Validation Rules | Error Messaging |
| :--- | :--- | :--- | :--- |
| **Student / Full Name** | Text | Alphabets and spaces only (`[A-Za-z\s]`). Numbers and special symbols are strictly blocked. Min 2 chars, max 60 chars. | `"Student name is required"` / `"Student name must not contain numbers"` / `"Student name can only contain letters and spaces"` |
| **Phone Numbers** | Tel | Strips all non-digit characters (`\D`). Automatically strips `+91` or leading `0`. Enforces exactly 10 digits starting with `6`, `7`, `8`, or `9`. | `"Phone number is required"` / `"Phone number must be exactly 10 digits"` / `"Phone number must start with 6, 7, 8, or 9"` |
| **Email Address** | Email | Standard RFC-compliant regex validation (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`). Required on Contact Form. | `"Email address is required"` / `"Please enter a valid email address (e.g. name@example.com)"` |
| **Preferred State** | Select | Mandatory selection from verified states list. | `"Please select a preferred state"` |
| **Budget Range** | Select | Mandatory selection from annual tuition fee brackets. | `"Please select your annual tuition fee budget"` |
| **Message** | Textarea | Mandatory on contact form; minimum 10 characters. | `"Please enter your message or query"` / `"Message must be at least 10 characters long"` |

### Form State Handling
- **Default State:** Clean borders, placeholder text, accessible labels and icon indicators.
- **Touched / Invalid State:** Red highlight border (`#EF4444`), descriptive inline error messages with `role="alert"`.
- **Loading State:** Submit button disabled, animated spinner visible, button text updated (e.g. `"Submitting Enquiry..."`).
- **Success State:** Green success notification banner (`#ECFDF5`), automatic form field reset.
- **Failure State:** Red alert banner explaining failure with encouragement to call direct helpline.

---

## 6. Button Interactive States Matrix
Every button in the platform adheres to standard interactive states:
- **Default:** Crisp typography, brand colors, soft elevation shadow.
- **Hover:** Slight vertical lift (`transform: translateY(-2px)`), deeper shadow, color brightening.
- **Active:** Depressed feedback (`transform: translateY(1px) scale(0.98)`).
- **Focus / Focus-visible:** Accessible 2.5px solid focus ring with 3px offset.
- **Disabled:** `opacity: 0.6`, `cursor: not-allowed`, pointer events disabled.
- **Loading:** Embedded SVG spinner, user interaction disabled.

---

## 7. Spreadsheets & Webhook Integration
- **Endpoint:** Configurable in `src/config/spreadsheetConfig.js` (Google Apps Script Web App).
- **Payload:** Dispatches URL-encoded form data (`application/x-www-form-urlencoded`) matching the 5 required spreadsheet columns:
  1. `studentName` (Student Name Full)
  2. `studentPhone` (Student's Phone Number)
  3. `parentPhone` (Parent's Phone Number)
  4. `preferredState` (Preferred State for B.Tech)
  5. `budget` (Annual Tuition Fee)
  6. `submittedAt` (ISO Timestamp)
- **CORS Handling:** Simple POST request avoiding unnecessary preflight delays.


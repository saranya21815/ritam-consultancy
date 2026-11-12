# Ritam Consultancy — Official Web Platform

Modern, responsive, high-performance web platform for **Ritam Consultancy**, India's trusted educational consultancy specializing in B.Tech engineering admissions across India.

---

## 🚀 Key Highlights & Architectural Features

- **⚡ Modern React + Vite Architecture:** Built on React 18 and Vite 6 for lightning-fast Hot Module Replacement (HMR) and optimized Rollup production builds.
- **🧭 Multi-Page & In-Page Anchor Routing:** Seamless client-side router supporting both direct path navigation (`/`, `/about`, `/services`, `/blogs`, `/contact`), hash routes, and smooth scrolling to section anchors (`#enquiry-form-section`, `#explore-colleges-section`, etc.).
- **📋 Bulletproof Form Validation:** Centralized validation engine (`src/validations/formValidations.js`) enforcing:
  - **Names:** Alphabetic characters and spaces only (numbers and symbols strictly blocked).
  - **Phones:** 10 numeric digits starting with 6, 7, 8, or 9 (non-numeric characters stripped).
  - **Emails:** Standard RFC-compliant email address validation.
  - **Mandatory Fields:** Real-time feedback, inline errors, loading spinners, disabled states, and success banners.
- **🎨 Design System & Accessible UI:** Brand-consistent tokens (`#044439` deep forest green, `#F96815` vibrant orange), Plus Jakarta Sans typography, and full 6-state button matrix (default, hover, active, focus-visible, disabled, loading).
- **📊 Lead Capture Spreadsheet Integration:** Live integration service (`src/services/spreadsheetService.js`) formatting data into 5 Google Sheets / Excel columns with automated timestamping.
- **💬 Floating WhatsApp Widget:** Bottom-right pulsing consultation button with online status indicator and pre-filled message.

---

## 📁 Project Directory Structure

```text
ritam-consultancy-main/
├── public/
│   ├── assets/
│   │   └── images/
│   │       ├── guidance/          # Counseling session photography
│   │       ├── hero/              # Hero student cutout
│   │       ├── logo/              # Official Ritam Consultancy logo
│   │       ├── regions/           # AP, Karnataka, Tamil Nadu, Kerala, North India
│   │       └── trust/             # Zero commission shield badge
│   ├── favicon.svg                # Vector emblem favicon
│   └── site.webmanifest           # Progressive web app manifest
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   │   └── Icons.jsx          # Reusable SVG icon components
│   │   └── styles/
│   │       ├── brand.css          # Design tokens, variables & animations
│   │       └── buttons.css        # Interactive 6-state button system
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/            # Reusable button component
│   │   │   ├── Footer/            # Global brand footer
│   │   │   ├── Navbar/            # Responsive sticky header & mobile drawer
│   │   │   └── WhatsAppFloat/     # Floating WhatsApp quick-action
│   │   ├── forms/
│   │   │   ├── ContactForm/       # Contact Us page direct message form
│   │   │   └── EnquiryForm/       # B.Tech admission recommendation form
│   │   └── sections/
│   │       └── home/              # Modular Home page sections (01 to 07)
│   ├── config/
│   │   └── spreadsheetConfig.js   # Webhook URL and column mapping
│   ├── data/
│   │   ├── aboutData.js           # About page statistics, mission & values
│   │   ├── blogsData.js           # Admission guides & category data
│   │   ├── contactData.js         # Phone, email, headquarters info & FAQs
│   │   ├── homeData.js            # Home page copy, badges, regions
│   │   └── servicesData.js        # Detailed counseling services
│   ├── hooks/
│   │   └── useScrollReveal.js     # Viewport intersection observer hook
│   ├── pages/
│   │   ├── AboutUs/               # About Us page
│   │   ├── Blogs/                 # Blogs and educational guides page
│   │   ├── ContactUs/             # Contact Us & FAQs page
│   │   ├── Home/                  # Complete Landing Home page
│   │   └── Services/              # Services breakdown page
│   ├── routes/
│   │   └── AppRouter.jsx          # Zero-dependency client-side router
│   ├── services/
│   │   └── spreadsheetService.js  # Google Apps Script data dispatcher
│   ├── utils/
│   │   └── formatting.js          # Phone, date, and link utilities
│   ├── validations/
│   │   └── formValidations.js     # Strict input sanitizers & validators
│   ├── App.jsx                    # Root application shell
│   └── main.jsx                   # Vite React DOM entry point
├── index.html                     # HTML5 entry with #root and module script
├── package.json                   # Project scripts and dependencies
├── vite.config.js                 # Vite server & react plugin configuration
├── PRD.md                         # Detailed Product Requirements Document
└── README.md                      # Project setup & architecture documentation
```

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 18](https://react.dev/) |
| **Build Tool & Server** | [Vite 6](https://vite.dev/) |
| **Compiler Plugin** | [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) |
| **Typography** | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) |
| **Styling** | Native CSS3 with CSS Custom Properties |
| **Integrations** | Fetch API + Google Apps Script Web App |

---

## 💻 Installation & Development

### 1. Prerequisites
Ensure you have **Node.js 18.0.0 or higher** and **npm** installed on your system.

To check your current versions:
```bash
node -v
npm -v
```

### 2. Open the Project Root
Ensure your terminal is located directly in the project directory:
```bash
cd ritam-consultancy-main
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Development Server
```bash
npm run dev
```

The Vite dev server will start instantly and provide a local URL:
```text
  VITE v6.4.5  ready in 180 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```
Open **`http://localhost:5173/`** in your browser.

### 5. Build for Production
To create an optimized production build in the `dist/` directory:
```bash
npm run build
```

### 6. Preview Production Build
To test the built production bundle locally:
```bash
npm run preview
```

---

## 🔧 Why `npm run dev` Was Failing & How It Was Resolved

Before this architectural overhaul, running `npm run dev` failed to load the React application due to the following critical issues:

1. **Missing Module Entry Point in `index.html`:**  
   `index.html` was originally a 2333-line legacy static HTML file containing hardcoded inline styles and HTML markup without `<div id="root"></div>` or `<script type="module" src="/src/main.jsx"></script>`. Vite had no module entry point to bundle React.
2. **Invalid `public/` Prefix in Asset Links:**  
   `index.html` referenced assets as `href="public/favicon.ico"` and `src="public/assets/images/logo/ritam-logo.webp"`. In Vite, files located inside the `/public` folder must be served from the root path (`/favicon.svg`, `/assets/images/...`). The `public/` prefix caused Vite dev server 404s and Rollup build resolution crashes.
3. **Missing React Application Shell (`App.jsx`):**  
   The project lacked a top-level `App.jsx` shell and multi-page routing structure, causing fragmented component mounting.
4. **Native Node Binary Dependencies in Frontend `package.json`:**  
   `package.json` had native C++ packages (`sharp`, `png-to-ico`) declared inside runtime `"dependencies"`, which caused installation conflicts on certain OS environments.

### The Resolution:
- Rewrote `index.html` into a clean, modern HTML5 template featuring `<div id="root"></div>` and `<script type="module" src="/src/main.jsx"></script>`.
- Corrected all asset paths to root-relative paths (`/assets/images/...`, `/favicon.svg`).
- Created `src/App.jsx` and `src/routes/AppRouter.jsx` to establish seamless multi-page routing.
- Organized pages (`Home`, `AboutUs`, `Services`, `Blogs`, `ContactUs`) into dedicated modular directories.
- Cleaned up `package.json` dependencies and verified Vite configuration.

---

## 📝 Form Validation Summary

| Field | Validation Rule |
| :--- | :--- |
| **Student Name** | Only alphabets and spaces (`[A-Za-z\s]`), 2–60 characters. Numbers and special characters are rejected in real-time. |
| **Parent Phone** | Strictly 10 digits starting with 6, 7, 8, or 9. Country codes (+91) and leading zeros are automatically stripped. |
| **Student Phone** | Strictly 10 digits starting with 6, 7, 8, or 9. |
| **Preferred State** | Mandatory dropdown selection from state list. |
| **Annual Budget** | Mandatory dropdown selection from fee ranges. |
| **Email Address** | Standard RFC-compliant email address format. |

---

## 🏢 Office Location & Contact
- **Headquarters:** 137/B, Opp. to Sri Amogha Junior College, BK Guda, Balkampet, Hyderabad, Telangana – 500038
- **Helpline:** +91 98115 43210 (Mon – Sat: 9:00 AM – 7:00 PM)
- **Email:** `ritamconsultancy77@gmail.com` | `admissions@ritamconsultancy.com`
- **Google Maps:** [https://maps.app.goo.gl/z2KDhjNfTMerpFaj9](https://maps.app.goo.gl/z2KDhjNfTMerpFaj9)

---

## 📄 License
© 2026 Ritam Consultancy. All rights reserved.


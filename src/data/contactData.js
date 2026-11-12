/**
 * Ritam Consultancy - Contact Information Data
 */

export const CONTACT_PAGE_DATA = {
  hero: {
    badge: "Contact Ritam Consultancy",
    heading: {
      prefix: "Get in Touch With Our ",
      highlight: "Admission Counseling Team",
    },
    subtext:
      "Have questions about engineering admissions, seat matrices, or fee structures? Visit our Hyderabad headquarters, call our support helpline, or leave a message below.",
  },
  channels: [
    {
      id: "headquarters",
      title: "Office Headquarters",
      label: "Visit Our Office",
      icon: "📍",
      value: "137/B, Opp. to Sri Amogha Junior College, BK Guda, Balkampet, Hyderabad, Telangana – 500038",
      actionText: "Get Google Maps Directions",
      actionHref: "https://maps.app.goo.gl/z2KDhjNfTMerpFaj9",
      target: "_blank",
    },
    {
      id: "phone",
      title: "Direct Phone Helpline",
      label: "Call or WhatsApp",
      icon: "📞",
      value: "+91 98765 43210",
      subtext: "Monday to Saturday: 9:00 AM – 7:00 PM IST",
      actionText: "Call Now",
      actionHref: "tel:+91 630 569 2643",
    },
    {
      id: "email",
      title: "Official Email Support",
      label: "Email Us Directly",
      icon: "✉️",
      value: "ritamconsultancy77@gmail.com",
      additional: [
        { label: "Admissions Desk", email: "admissions@ritamconsultancy.com" },
        { label: "General Support", email: "support@ritamconsultancy.com" },
      ],
      actionText: "Send Email",
      actionHref: "mailto:ritamconsultancy77@gmail.com",
    },
  ],
  faq: [
    {
      q: "Are Ritam Consultancy guidance services completely free?",
      a: "Yes! We operate on a strict 100% Zero Commission policy for students and parents. We never charge any consultation, processing, or registration fee.",
    },
    {
      q: "Can you help students from outside Telangana and Andhra Pradesh?",
      a: "Absolutely. We guide students nationwide for admissions into top engineering colleges in Karnataka, Tamil Nadu, Maharashtra, Delhi NCR, and beyond.",
    },
    {
      q: "How soon will a counselor contact me after submitting the enquiry form?",
      a: "Our admission counselors typically review your preferences and get in touch via call or WhatsApp within 2 to 4 business hours.",
    },
  ],
};


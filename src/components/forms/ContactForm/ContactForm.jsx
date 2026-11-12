import React, { useState, useRef } from 'react';
import {
  validateContactForm,
  validateFullName,
  validatePhone,
  validateEmail,
  sanitizePhoneDigits,
} from '../../../validations/formValidations';
import Button from '../../common/Button/Button';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    coursePreference: 'B.Tech Admissions',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isSubmittingRef = useRef(false);

  // Alphabet only name sanitizer
  const handleNameChange = (e) => {
    const val = e.target.value.replace(/[^A-Za-z\s]/g, '');
    setFormData((prev) => ({ ...prev, name: val }));
    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
  };

  // Digits only phone sanitizer
  const handlePhoneChange = (e) => {
    const digits = sanitizePhoneDigits(e.target.value);
    setFormData((prev) => ({ ...prev, phone: digits }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
  };

  const handleInputChange = (field) => (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleBlur = (field) => () => {
    let err = null;
    if (field === 'name') err = validateFullName(formData.name, 'Full name');
    else if (field === 'phone') err = validatePhone(formData.phone, 'Phone number');
    else if (field === 'email') err = validateEmail(formData.email, true);

    if (err) setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || isSubmittingRef.current) return;

    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setErrorMessage('');
    setSubmitSuccess(false);

    try {
      // Simulate / POST submission to contact endpoint or spreadsheet
      await new Promise((resolve) => setTimeout(resolve, 800));

      setSubmitSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        coursePreference: 'B.Tech Admissions',
        message: '',
      });
      setErrors({});
    } catch (err) {
      setErrorMessage('Unable to send message. Please contact us via phone or WhatsApp directly.');
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Send Us a Direct Message</h3>
      <p style={styles.subtitle}>
        Fill in your query and our counselors will get in touch with detailed advice within 2-4 hours.
      </p>

      {submitSuccess && (
        <div style={styles.successBanner} role="alert">
          <div style={styles.successIcon}>✓</div>
          <div>
            <strong>Message Sent Successfully!</strong>
            <p style={{ margin: 0, fontSize: '13px' }}>
              Thank you for contacting Ritam Consultancy. We will reach out shortly.
            </p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div style={styles.errorBanner} role="alert">
          <span>⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        {/* Name (Alphabet only) */}
        <div style={styles.fieldGroup}>
          <label htmlFor="contactName" style={styles.label}>
            Your Full Name <span style={styles.required}>*</span>
          </label>
          <input
            id="contactName"
            type="text"
            value={formData.name}
            onChange={handleNameChange}
            onBlur={handleBlur('name')}
            placeholder="Enter your full name"
            style={{
              ...styles.input,
              borderColor: errors.name ? '#EF4444' : '#D1D5DB',
            }}
          />
          {errors.name && <span style={styles.errorText}>{errors.name}</span>}
        </div>

        {/* Phone & Email Grid */}
        <div style={styles.twoCols}>
          <div style={{ ...styles.fieldGroup, flex: 1 }}>
            <label htmlFor="contactPhone" style={styles.label}>
              Phone Number <span style={styles.required}>*</span>
            </label>
            <input
              id="contactPhone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={formData.phone}
              onChange={handlePhoneChange}
              onBlur={handleBlur('phone')}
              placeholder="10-digit mobile number"
              style={{
                ...styles.input,
                borderColor: errors.phone ? '#EF4444' : '#D1D5DB',
              }}
            />
            {errors.phone && <span style={styles.errorText}>{errors.phone}</span>}
          </div>

          <div style={{ ...styles.fieldGroup, flex: 1 }}>
            <label htmlFor="contactEmail" style={styles.label}>
              Email Address <span style={styles.required}>*</span>
            </label>
            <input
              id="contactEmail"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              onBlur={handleBlur('email')}
              placeholder="e.g. name@example.com"
              style={{
                ...styles.input,
                borderColor: errors.email ? '#EF4444' : '#D1D5DB',
              }}
            />
            {errors.email && <span style={styles.errorText}>{errors.email}</span>}
          </div>
        </div>

        {/* Preference */}
        <div style={styles.fieldGroup}>
          <label htmlFor="coursePreference" style={styles.label}>
            Counseling Topic / Preference
          </label>
          <select
            id="coursePreference"
            value={formData.coursePreference}
            onChange={handleInputChange('coursePreference')}
            style={styles.select}
          >
            <option value="B.Tech Admissions">B.Tech Admissions Guidance</option>
            <option value="Cutoff & Rank Analysis">Cutoff &amp; Rank Analysis</option>
            <option value="Fee & Scholarship Inquiry">Fee &amp; Scholarship Inquiry</option>
            <option value="Branch Selection (CSE/AI/ECE)">Branch Selection (CSE / AI / ECE)</option>
            <option value="General Consultation">General Consultation</option>
          </select>
        </div>

        {/* Message */}
        <div style={styles.fieldGroup}>
          <label htmlFor="contactMessage" style={styles.label}>
            Your Query / Question <span style={styles.required}>*</span>
          </label>
          <textarea
            id="contactMessage"
            rows={4}
            value={formData.message}
            onChange={handleInputChange('message')}
            placeholder="Tell us about your entrance exam rank, preferred locations, budget, or any specific colleges you are targeting..."
            style={{
              ...styles.textarea,
              borderColor: errors.message ? '#EF4444' : '#D1D5DB',
            }}
          />
          {errors.message && <span style={styles.errorText}>{errors.message}</span>}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          loadingText="Sending Message..."
          icon={<span style={{ fontSize: '15px' }}>➔</span>}
          iconPosition="right"
          ariaLabel="Send contact message"
        >
          Send Message
        </Button>
      </form>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#FFFFFF',
    border: '1.5px solid #EAECF0',
    borderRadius: '22px',
    padding: '36px',
    boxShadow: '0 12px 30px rgba(4, 68, 57, 0.06)',
  },
  title: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#111827',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#6B7280',
    marginBottom: '24px',
    lineHeight: '1.5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  twoCols: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#374151',
  },
  required: {
    color: '#EF4444',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '12px',
    border: '1.5px solid #D1D5DB',
    fontSize: '14px',
    color: '#111827',
    backgroundColor: '#FCFCFD',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  select: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '12px',
    border: '1.5px solid #D1D5DB',
    fontSize: '14px',
    color: '#111827',
    backgroundColor: '#FCFCFD',
    outline: 'none',
    cursor: 'pointer',
  },
  textarea: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '12px',
    border: '1.5px solid #D1D5DB',
    fontSize: '14px',
    color: '#111827',
    backgroundColor: '#FCFCFD',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical',
    transition: 'border-color 0.2s',
  },
  errorText: {
    fontSize: '12px',
    color: '#EF4444',
    fontWeight: '600',
  },
  successBanner: {
    backgroundColor: '#ECFDF5',
    border: '1px solid #A7F3D0',
    borderRadius: '12px',
    padding: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '18px',
    color: '#065F46',
  },
  successIcon: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#10B981',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '13px',
    flexShrink: 0,
  },
  errorBanner: {
    backgroundColor: '#FEF2F2',
    border: '1px solid #FECACA',
    borderRadius: '12px',
    padding: '12px 14px',
    color: '#991B1B',
    fontSize: '13px',
    marginBottom: '18px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
};


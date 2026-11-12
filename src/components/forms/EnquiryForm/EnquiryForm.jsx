import React, { useState, useRef } from 'react';
import { HOME_PAGE_DATA } from '../../../data/homeData';
import { submitEnquiryToSpreadsheet } from '../../../services/spreadsheetService';
import Button from '../../common/Button/Button';

export default function EnquiryForm() {
  const { form } = HOME_PAGE_DATA.enquirySection;

  // Exactly 6 mandatory State options matching Phase 3 requirements
  const stateOptions = [
    'Andhra Pradesh',
    'Telangana',
    'Kerala',
    'Karnataka',
    'Tamil Nadu',
    'North States',
  ];

  // Budget options from homeData
  const budgetOptions = form.fields.budget.options;

  const [formData, setFormData] = useState({
    studentName: '',
    parentPhone: '',
    studentPhone: '',
    preferredState: '',
    budget: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isSubmittingRef = useRef(false);

  // Field validation rules
  const validateField = (fieldName, value) => {
    const val = (value || '').trim();
    if (fieldName === 'studentName') {
      if (!val) return 'Student name is required';
      if (!/^[A-Za-z\s]+$/.test(val)) return 'Name can only contain letters and spaces';
      if (val.length < 2) return 'Student name must be at least 2 characters';
      return '';
    }
    if (fieldName === 'parentPhone') {
      if (!val) return "Parent's phone number is required";
      if (!/^\d{10}$/.test(val)) return 'Phone number must be exactly 10 digits';
      return '';
    }
    if (fieldName === 'studentPhone') {
      if (!val) return "Student's phone number is required";
      if (!/^\d{10}$/.test(val)) return 'Phone number must be exactly 10 digits';
      return '';
    }
    if (fieldName === 'preferredState') {
      if (!val) return 'Please select a preferred state';
      if (!stateOptions.includes(val)) return 'Please select a valid state from the list';
      return '';
    }
    if (fieldName === 'budget') {
      if (!val) return 'Please select your annual tuition budget';
      if (!budgetOptions.includes(val)) return 'Please select a valid budget range';
      return '';
    }
    return '';
  };

  // Student Name input handler: sanitizes and validates letters and spaces only
  const handleNameChange = (e) => {
    const rawVal = e.target.value;
    const sanitizedVal = rawVal.replace(/[^A-Za-z\s]/g, '');
    setFormData((prev) => ({ ...prev, studentName: sanitizedVal }));

    if (touched.studentName) {
      const err = validateField('studentName', sanitizedVal);
      setErrors((prev) => ({ ...prev, studentName: err }));
    }
    if (errorMessage) setErrorMessage('');
  };

  // Phone input handler: strictly numeric digits, max 10, immediate "Type only numbers" feedback
  const handlePhoneChange = (fieldName) => (e) => {
    const rawVal = e.target.value;
    const hasNonNumeric = /[^\d]/.test(rawVal);
    const digitsOnly = rawVal.replace(/\D/g, '').slice(0, 10);

    setFormData((prev) => ({ ...prev, [fieldName]: digitsOnly }));
    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    if (hasNonNumeric) {
      // Immediately display red error below field if user typed or pasted letters/non-numbers
      setErrors((prev) => ({ ...prev, [fieldName]: 'Type only numbers' }));
    } else {
      if (!digitsOnly) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]:
            fieldName === 'parentPhone'
              ? "Parent's phone number is required"
              : "Student's phone number is required",
        }));
      } else if (digitsOnly.length < 10) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: 'Phone number must be exactly 10 digits',
        }));
      } else {
        // Exactly 10 digits entered: clear error immediately
        setErrors((prev) => ({ ...prev, [fieldName]: '' }));
      }
    }

    if (errorMessage) setErrorMessage('');
  };

  // Select dropdown handler
  const handleSelectChange = (fieldName) => (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    const err = validateField(fieldName, value);
    setErrors((prev) => ({ ...prev, [fieldName]: err }));
    if (errorMessage) setErrorMessage('');
  };

  // Real-time blur validation
  const handleBlur = (fieldName) => () => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    const err = validateField(fieldName, formData[fieldName]);
    setErrors((prev) => ({ ...prev, [fieldName]: err }));
  };

  // Live validation checks to control button disabled/enabled state
  const isStudentNameValid =
    formData.studentName.trim().length >= 2 &&
    /^[A-Za-z\s]+$/.test(formData.studentName.trim());
  const isParentPhoneValid = /^\d{10}$/.test(formData.parentPhone);
  const isStudentPhoneValid = /^\d{10}$/.test(formData.studentPhone);
  const isStateValid = Boolean(
    formData.preferredState && stateOptions.includes(formData.preferredState)
  );
  const isBudgetValid = Boolean(
    formData.budget && budgetOptions.includes(formData.budget)
  );

  const hasNoErrors =
    !errors.studentName &&
    !errors.parentPhone &&
    !errors.studentPhone &&
    !errors.preferredState &&
    !errors.budget;

  const isFormValid =
    isStudentNameValid &&
    isParentPhoneValid &&
    isStudentPhoneValid &&
    isStateValid &&
    isBudgetValid &&
    hasNoErrors;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || isSubmittingRef.current) return;

    // Validate all fields
    const nameErr = validateField('studentName', formData.studentName);
    const parentPhoneErr = validateField('parentPhone', formData.parentPhone);
    const studentPhoneErr = validateField('studentPhone', formData.studentPhone);
    const stateErr = validateField('preferredState', formData.preferredState);
    const budgetErr = validateField('budget', formData.budget);

    const newErrors = {
      studentName: nameErr,
      parentPhone: parentPhoneErr,
      studentPhone: studentPhoneErr,
      preferredState: stateErr,
      budget: budgetErr,
    };

    setErrors(newErrors);
    setTouched({
      studentName: true,
      parentPhone: true,
      studentPhone: true,
      preferredState: true,
      budget: true,
    });

    if (nameErr || parentPhoneErr || studentPhoneErr || stateErr || budgetErr) {
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setErrorMessage('');
    setSubmitSuccess(false);

    try {
      // Connects to JS1 endpoint via spreadsheetService
      const result = await submitEnquiryToSpreadsheet(formData);

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          studentName: '',
          parentPhone: '',
          studentPhone: '',
          preferredState: '',
          budget: '',
        });
        setErrors({});
        setTouched({});
      } else {
        setErrorMessage(result.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      setErrorMessage('A network error occurred. Please try again or call our direct helpline.');
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div id="enquiry-form-section" style={styles.cardContainer} className="hover-lift">
      {/* Form Header */}
      <div style={styles.formHeader}>
        <div style={styles.formIconBadge}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#044439" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <div>
          <h3 style={styles.cardTitle}>{form.cardTitle}</h3>
          <p style={styles.cardSubtitle}>{form.cardSubtitle}</p>
        </div>
      </div>

      {/* Success Notification Banner */}
      {submitSuccess && (
        <div style={styles.successBanner} role="alert">
          <div style={styles.successIcon}>✓</div>
          <div>
            <strong style={styles.successTitle}>Request Submitted Successfully!</strong>
            <p style={styles.successText}>Our expert counseling team will review your preferences and get in touch with you shortly.</p>
          </div>
        </div>
      )}

      {/* Error Notification Banner */}
      {errorMessage && (
        <div style={styles.errorBanner} role="alert">
          <span style={{ fontSize: '16px' }}>⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        {/* Student Name (Alphabets only) */}
        <div style={styles.formGroup}>
          <label htmlFor="studentName" style={styles.label}>
            {form.fields.studentName.label} <span style={styles.requiredAsterisk}>*</span>
          </label>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon} aria-hidden="true">👤</span>
            <input
              id="studentName"
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleNameChange}
              onBlur={handleBlur('studentName')}
              placeholder={form.fields.studentName.placeholder}
              aria-required="true"
              aria-invalid={Boolean(touched.studentName && errors.studentName)}
              style={{
                ...styles.input,
                borderColor: touched.studentName && errors.studentName ? '#EF4444' : '#D1D5DB',
              }}
              disabled={isSubmitting}
            />
          </div>
          {touched.studentName && errors.studentName && (
            <span style={styles.errorText} role="alert">
              {errors.studentName}
            </span>
          )}
        </div>

        {/* Parent & Student Phone (Numeric digits only, max 10) */}
        <div style={styles.twoColRow}>
          <div style={{ ...styles.formGroup, flex: 1 }}>
            <label htmlFor="parentPhone" style={styles.label}>
              {form.fields.parentPhone.label} <span style={styles.requiredAsterisk}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon} aria-hidden="true">📞</span>
              <input
                id="parentPhone"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handlePhoneChange('parentPhone')}
                onBlur={handleBlur('parentPhone')}
                placeholder={form.fields.parentPhone.placeholder}
                aria-required="true"
                aria-invalid={Boolean(touched.parentPhone && errors.parentPhone)}
                style={{
                  ...styles.input,
                  borderColor: touched.parentPhone && errors.parentPhone ? '#EF4444' : '#D1D5DB',
                }}
                disabled={isSubmitting}
              />
            </div>
            {touched.parentPhone && errors.parentPhone && (
              <span style={styles.errorText} role="alert">
                {errors.parentPhone}
              </span>
            )}
          </div>

          <div style={{ ...styles.formGroup, flex: 1 }}>
            <label htmlFor="studentPhone" style={styles.label}>
              {form.fields.studentPhone.label} <span style={styles.requiredAsterisk}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon} aria-hidden="true">📱</span>
              <input
                id="studentPhone"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                name="studentPhone"
                value={formData.studentPhone}
                onChange={handlePhoneChange('studentPhone')}
                onBlur={handleBlur('studentPhone')}
                placeholder={form.fields.studentPhone.placeholder}
                aria-required="true"
                aria-invalid={Boolean(touched.studentPhone && errors.studentPhone)}
                style={{
                  ...styles.input,
                  borderColor: touched.studentPhone && errors.studentPhone ? '#EF4444' : '#D1D5DB',
                }}
                disabled={isSubmitting}
              />
            </div>
            {touched.studentPhone && errors.studentPhone && (
              <span style={styles.errorText} role="alert">
                {errors.studentPhone}
              </span>
            )}
          </div>
        </div>

        {/* Preferred State: Exactly 6 options (Andhra Pradesh, Telangana, Kerala, Karnataka, Tamil Nadu, North States) */}
        <div style={styles.formGroup}>
          <label htmlFor="preferredState" style={styles.label}>
            {form.fields.preferredState.label} <span style={styles.requiredAsterisk}>*</span>
          </label>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon} aria-hidden="true">📍</span>
            <select
              id="preferredState"
              name="preferredState"
              value={formData.preferredState}
              onChange={handleSelectChange('preferredState')}
              onBlur={handleBlur('preferredState')}
              aria-required="true"
              aria-invalid={Boolean(touched.preferredState && errors.preferredState)}
              style={{
                ...styles.input,
                ...styles.select,
                borderColor: touched.preferredState && errors.preferredState ? '#EF4444' : '#D1D5DB',
              }}
              disabled={isSubmitting}
            >
              <option value="">{form.fields.preferredState.placeholder}</option>
              {stateOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          {touched.preferredState && errors.preferredState && (
            <span style={styles.errorText} role="alert">
              {errors.preferredState}
            </span>
          )}
        </div>

        {/* Budget */}
        <div style={styles.formGroup}>
          <label htmlFor="budget" style={styles.label}>
            {form.fields.budget.label} <span style={styles.requiredAsterisk}>*</span>
          </label>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon} aria-hidden="true">₹</span>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleSelectChange('budget')}
              onBlur={handleBlur('budget')}
              aria-required="true"
              aria-invalid={Boolean(touched.budget && errors.budget)}
              style={{
                ...styles.input,
                ...styles.select,
                borderColor: touched.budget && errors.budget ? '#EF4444' : '#D1D5DB',
              }}
              disabled={isSubmitting}
            >
              <option value="">{form.fields.budget.placeholder}</option>
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          {touched.budget && errors.budget && (
            <span style={styles.errorText} role="alert">
              {errors.budget}
            </span>
          )}
        </div>

        {/* Submit Button: Disabled until all fields are complete and valid */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={!isFormValid || isSubmitting}
          isLoading={isSubmitting}
          loadingText="Submitting Enquiry..."
          icon={<span style={{ fontSize: '15px' }}>➔</span>}
          iconPosition="right"
          ariaLabel="Submit college enquiry form"
          style={!isFormValid || isSubmitting ? styles.submitBtnDisabled : styles.submitBtnEnabled}
        >
          {form.submitButton}
        </Button>

        {/* Security Privacy Note */}
        <div style={styles.privacyNote}>
          <span style={{ fontSize: '13px' }}>🔒</span>
          <span>{form.privacyNotice}</span>
        </div>
      </form>
    </div>
  );
}

const styles = {
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: '24px',
    padding: '36px',
    boxShadow: '0 20px 40px -15px rgba(4, 68, 57, 0.12)',
    border: '1px solid #EAECF0',
    maxWidth: '520px',
    width: '100%',
  },
  formHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '14px',
    marginBottom: '24px',
  },
  formIconBadge: {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    backgroundColor: '#E8F5F1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#111827',
    marginBottom: '4px',
  },
  cardSubtitle: {
    fontSize: '13px',
    color: '#6B7280',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    lineHeight: '1.4',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  twoColRow: {
    display: 'flex',
    gap: '14px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
  },
  requiredAsterisk: {
    color: '#EF4444',
    fontWeight: '700',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    color: '#6B7280',
    fontSize: '14px',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '11px 14px 11px 40px',
    borderRadius: '12px',
    border: '1.5px solid #D1D5DB',
    fontSize: '14px',
    color: '#111827',
    backgroundColor: '#FCFCFD',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  select: {
    appearance: 'none',
    cursor: 'pointer',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B7280' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center',
  },
  errorText: {
    fontSize: '12px',
    color: '#EF4444',
    marginTop: '2px',
    fontWeight: '600',
  },
  submitBtnEnabled: {
    backgroundColor: '#044439',
    color: '#FFFFFF',
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(4, 68, 57, 0.25)',
    transition: 'all 0.25s ease',
  },
  submitBtnDisabled: {
    backgroundColor: '#9CA3AF',
    color: '#F3F4F6',
    cursor: 'not-allowed',
    opacity: 0.65,
    boxShadow: 'none',
    transition: 'all 0.25s ease',
  },
  privacyNote: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontSize: '12px',
    color: '#6B7280',
    textAlign: 'center',
    marginTop: '4px',
  },
  successBanner: {
    backgroundColor: '#ECFDF5',
    border: '1px solid #A7F3D0',
    borderRadius: '12px',
    padding: '14px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '16px',
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
  successTitle: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '700',
    marginBottom: '2px',
  },
  successText: {
    fontSize: '12px',
    lineHeight: '1.4',
  },
  errorBanner: {
    backgroundColor: '#FEF2F2',
    border: '1px solid #FECACA',
    borderRadius: '12px',
    padding: '12px 14px',
    color: '#991B1B',
    fontSize: '13px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
};

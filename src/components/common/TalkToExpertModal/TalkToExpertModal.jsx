import React, { useState, useEffect, useRef } from 'react';
import counselorImg from '../../../talk to expert/image 17.png';
import { submitTalkToExpertLead } from '../../../services/expertSpreadsheetService';

export default function TalkToExpertModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    yourName: '',
    mobileNumber: '',
    intermediateGroup: '',
    preferredLocation: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isSubmittingRef = useRef(false);

  // Group options strictly: MPC, BiPC, Other
  const groupOptions = ['MPC', 'BiPC', 'Other'];

  // Location options strictly: Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Kerala, North States
  const locationOptions = [
    'Andhra Pradesh',
    'Telangana',
    'Karnataka',
    'Tamil Nadu',
    'Kerala',
    'North States',
  ];

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setSubmitSuccess(false);
      setErrorMessage('');
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  // Pure validation functions
  const validateField = (fieldName, value) => {
    const val = (value || '').trim();
    if (fieldName === 'yourName') {
      if (!val) return 'Please enter your name';
      if (!/^[A-Za-z\s]+$/.test(val)) return 'Name can only contain letters and spaces';
      if (val.length < 2) return 'Name must be at least 2 characters';
      return '';
    }
    if (fieldName === 'mobileNumber') {
      if (!val) return 'Please enter your mobile number';
      if (!/^\d{10}$/.test(val)) return 'Mobile number must be exactly 10 digits';
      return '';
    }
    if (fieldName === 'intermediateGroup') {
      if (!val) return 'Please select your intermediate group';
      if (!groupOptions.includes(val)) return 'Please select a valid intermediate group';
      return '';
    }
    if (fieldName === 'preferredLocation') {
      if (!val) return 'Please select your preferred location';
      if (!locationOptions.includes(val)) return 'Please select a valid location';
      return '';
    }
    return '';
  };

  // Real-time Name handler (auto-sanitizes non-letter characters)
  const handleNameChange = (e) => {
    const raw = e.target.value;
    const sanitized = raw.replace(/[^A-Za-z\s]/g, '');
    setFormData((prev) => ({ ...prev, yourName: sanitized }));

    if (touched.yourName) {
      const err = validateField('yourName', sanitized);
      setErrors((prev) => ({ ...prev, yourName: err }));
    }
    if (errorMessage) setErrorMessage('');
  };

  // Real-time Phone handler (digits only, max 10, immediate "Type only numbers" feedback)
  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    const hasNonNumeric = /[^\d]/.test(raw);
    const digitsOnly = raw.replace(/\D/g, '').slice(0, 10);

    setFormData((prev) => ({ ...prev, mobileNumber: digitsOnly }));
    setTouched((prev) => ({ ...prev, mobileNumber: true }));

    if (hasNonNumeric) {
      // Immediately display red error below field if non-numeric typed
      setErrors((prev) => ({ ...prev, mobileNumber: 'Type only numbers' }));
    } else {
      if (!digitsOnly) {
        setErrors((prev) => ({ ...prev, mobileNumber: 'Please enter your mobile number' }));
      } else if (digitsOnly.length < 10) {
        setErrors((prev) => ({ ...prev, mobileNumber: 'Mobile number must be exactly 10 digits' }));
      } else {
        setErrors((prev) => ({ ...prev, mobileNumber: '' }));
      }
    }

    if (errorMessage) setErrorMessage('');
  };

  // Select dropdown handler
  const handleSelectChange = (fieldName) => (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    // Immediately validate upon selection
    const err = validateField(fieldName, value);
    setErrors((prev) => ({ ...prev, [fieldName]: err }));
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    if (errorMessage) setErrorMessage('');
  };

  // Blur validation
  const handleBlur = (fieldName) => () => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    const err = validateField(fieldName, formData[fieldName]);
    setErrors((prev) => ({ ...prev, [fieldName]: err }));
  };

  // Check if entire form is valid
  const isNameValid = !validateField('yourName', formData.yourName);
  const isPhoneValid = !validateField('mobileNumber', formData.mobileNumber);
  const isGroupValid = !validateField('intermediateGroup', formData.intermediateGroup);
  const isLocationValid = !validateField('preferredLocation', formData.preferredLocation);

  const isFormValid = isNameValid && isPhoneValid && isGroupValid && isLocationValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || isSubmittingRef.current) return;

    // Mark all touched and validate
    const nameErr = validateField('yourName', formData.yourName);
    const phoneErr = validateField('mobileNumber', formData.mobileNumber);
    const groupErr = validateField('intermediateGroup', formData.intermediateGroup);
    const locErr = validateField('preferredLocation', formData.preferredLocation);

    const newErrors = {
      yourName: nameErr,
      mobileNumber: phoneErr,
      intermediateGroup: groupErr,
      preferredLocation: locErr,
    };

    setErrors(newErrors);
    setTouched({
      yourName: true,
      mobileNumber: true,
      intermediateGroup: true,
      preferredLocation: true,
    });

    if (nameErr || phoneErr || groupErr || locErr) {
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setErrorMessage('');
    setSubmitSuccess(false);

    try {
      const result = await submitTalkToExpertLead(formData);

      if (result.success) {
        // Record successful submission in current session so 15s timer never re-opens
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('talkToExpertSubmitted', 'true');
        }

        setSubmitSuccess(true);
        setFormData({
          yourName: '',
          mobileNumber: '',
          intermediateGroup: '',
          preferredLocation: '',
        });
        setErrors({});
        setTouched({});

        // Auto-close modal smoothly after 3 seconds
        setTimeout(() => {
          onClose();
        }, 3200);
      } else {
        setErrorMessage(result.error || 'Failed to submit details. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Network error occurred. Please try again or call our direct helpline.');
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="talk-expert-heading"
    >
      <div style={styles.dialogCard} className="hover-lift">
        {/* Left Column: Forest Green with Title & Counselor Graphic matching PDF */}
        <div style={styles.leftCol}>
          <div style={styles.leftHeader}>
            <h3 style={styles.leftTitle}>
              Talk to Our <br />
              <span style={styles.orangeHighlight}>Expert – Free</span>
            </h3>
            <p style={styles.leftSubtitle}>
              Get personalized guidance for B.Tech admission, college selection, fees, and more.
            </p>
          </div>

          <div style={styles.counselorImgWrap}>
            <img
              src={counselorImg}
              alt="Talk to Ritam Admission Expert"
              style={styles.counselorImg}
              onError={(e) => {
                e.currentTarget.src = '/assets/images/expert/expert-counselor.png';
              }}
            />
          </div>
        </div>

        {/* Right Column: White with 4 Form Fields matching PDF */}
        <div style={styles.rightCol}>
          {/* Close button top right */}
          <button
            type="button"
            onClick={onClose}
            style={styles.closeBtn}
            aria-label="Close popup"
            disabled={isSubmitting}
          >
            ✕
          </button>

          <div style={styles.rightHeader}>
            <h2 id="talk-expert-heading" style={styles.rightTitle}>
              Get Expert Guidance
            </h2>
            <p style={styles.rightSubtitle}>
              Fill in your details and our admission expert will get in touch with you shortly.
            </p>
          </div>

          {/* Success Notification */}
          {submitSuccess && (
            <div style={styles.successBox} role="alert">
              <span style={styles.successIcon}>✓</span>
              <div>
                <strong style={styles.successHeading}>Request Received!</strong>
                <p style={styles.successText}>
                  Our senior admission expert will call you shortly on your mobile number.
                </p>
              </div>
            </div>
          )}

          {/* Error Notification */}
          {errorMessage && (
            <div style={styles.errorBox} role="alert">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form} noValidate>
            {/* Field 1: Your Name */}
            <div style={styles.fieldGroup}>
              <div
                style={{
                  ...styles.inputContainer,
                  borderColor: touched.yourName && errors.yourName ? '#EF4444' : '#D1D5DB',
                }}
              >
                <span style={styles.fieldIcon} aria-hidden="true">👤</span>
                <input
                  type="text"
                  name="yourName"
                  value={formData.yourName}
                  onChange={handleNameChange}
                  onBlur={handleBlur('yourName')}
                  placeholder="Your Name"
                  aria-label="Your Name"
                  aria-required="true"
                  aria-invalid={Boolean(touched.yourName && errors.yourName)}
                  style={styles.textInput}
                  disabled={isSubmitting}
                />
              </div>
              {touched.yourName && errors.yourName && (
                <span style={styles.fieldError} role="alert">
                  {errors.yourName}
                </span>
              )}
            </div>

            {/* Field 2: Mobile Number */}
            <div style={styles.fieldGroup}>
              <div
                style={{
                  ...styles.inputContainer,
                  borderColor: touched.mobileNumber && errors.mobileNumber ? '#EF4444' : '#D1D5DB',
                }}
              >
                <span style={styles.fieldIcon} aria-hidden="true">📞</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handlePhoneChange}
                  onBlur={handleBlur('mobileNumber')}
                  placeholder="Mobile Number"
                  aria-label="Mobile Number"
                  aria-required="true"
                  aria-invalid={Boolean(touched.mobileNumber && errors.mobileNumber)}
                  style={styles.textInput}
                  disabled={isSubmitting}
                />
              </div>
              {touched.mobileNumber && errors.mobileNumber && (
                <span style={styles.fieldError} role="alert">
                  {errors.mobileNumber}
                </span>
              )}
            </div>

            {/* Field 3: Intermediate Group (MPC, BiPC, Other) */}
            <div style={styles.fieldGroup}>
              <div
                style={{
                  ...styles.inputContainer,
                  borderColor: touched.intermediateGroup && errors.intermediateGroup ? '#EF4444' : '#D1D5DB',
                }}
              >
                <span style={styles.fieldIcon} aria-hidden="true">🎓</span>
                <select
                  name="intermediateGroup"
                  value={formData.intermediateGroup}
                  onChange={handleSelectChange('intermediateGroup')}
                  onBlur={handleBlur('intermediateGroup')}
                  aria-label="Intermediate Group"
                  aria-required="true"
                  aria-invalid={Boolean(touched.intermediateGroup && errors.intermediateGroup)}
                  style={styles.selectInput}
                  disabled={isSubmitting}
                >
                  <option value="" disabled>
                    Select Intermediate Group
                  </option>
                  {groupOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <span style={styles.selectDropdownArrow} aria-hidden="true">⌄</span>
              </div>
              {touched.intermediateGroup && errors.intermediateGroup && (
                <span style={styles.fieldError} role="alert">
                  {errors.intermediateGroup}
                </span>
              )}
            </div>

            {/* Field 4: Preferred Location (Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Kerala, North States) */}
            <div style={styles.fieldGroup}>
              <div
                style={{
                  ...styles.inputContainer,
                  borderColor: touched.preferredLocation && errors.preferredLocation ? '#EF4444' : '#D1D5DB',
                }}
              >
                <span style={styles.fieldIcon} aria-hidden="true">📍</span>
                <select
                  name="preferredLocation"
                  value={formData.preferredLocation}
                  onChange={handleSelectChange('preferredLocation')}
                  onBlur={handleBlur('preferredLocation')}
                  aria-label="Preferred Location"
                  aria-required="true"
                  aria-invalid={Boolean(touched.preferredLocation && errors.preferredLocation)}
                  style={styles.selectInput}
                  disabled={isSubmitting}
                >
                  <option value="" disabled>
                    Select Preferred Location
                  </option>
                  {locationOptions.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <span style={styles.selectDropdownArrow} aria-hidden="true">⌄</span>
              </div>
              {touched.preferredLocation && errors.preferredLocation && (
                <span style={styles.fieldError} role="alert">
                  {errors.preferredLocation}
                </span>
              )}
            </div>

            {/* Submit Button: Talk to an Expert – Free */}
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              style={{
                ...styles.submitBtn,
                ...(!isFormValid || isSubmitting ? styles.submitBtnDisabled : styles.submitBtnEnabled),
              }}
              aria-label="Submit request to talk to an admission expert free"
            >
              {isSubmitting ? (
                <>
                  <span style={styles.spinner} aria-hidden="true" />
                  <span>Connecting with Expert...</span>
                </>
              ) : (
                <>
                  <span style={styles.btnSendIcon} aria-hidden="true">➤</span>
                  <span>Talk to an Expert – Free</span>
                </>
              )}
            </button>

            {/* Privacy Notice */}
            <div style={styles.privacyNote}>
              <span style={{ fontSize: '12px' }}>🔒</span>
              <span>Your information is safe and will be used only for admission guidance.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99999,
    padding: '20px',
    animation: 'fadeIn 0.25s ease-out',
  },
  dialogCard: {
    display: 'grid',
    gridTemplateColumns: 'minmax(280px, 0.85fr) minmax(320px, 1.15fr)',
    maxWidth: '820px',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.35)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    maxHeight: '92vh',
    animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  leftCol: {
    backgroundColor: '#0C483D',
    padding: '40px 32px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden',
  },
  leftHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    zIndex: 2,
  },
  leftTitle: {
    fontSize: 'clamp(24px, 2.8vw, 32px)',
    fontWeight: '800',
    lineHeight: '1.2',
    letterSpacing: '-0.5px',
    margin: 0,
  },
  orangeHighlight: {
    color: '#F96815',
  },
  leftSubtitle: {
    fontSize: '14px',
    color: '#D1E5DF',
    lineHeight: '1.55',
    margin: 0,
  },
  counselorImgWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: '16px',
    zIndex: 2,
  },
  counselorImg: {
    width: '100%',
    maxWidth: '260px',
    height: 'auto',
    display: 'block',
    objectFit: 'contain',
  },
  rightCol: {
    backgroundColor: '#FFFFFF',
    padding: '36px 36px 32px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflowY: 'auto',
  },
  closeBtn: {
    position: 'absolute',
    top: '18px',
    right: '18px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#F3F4F6',
    border: 'none',
    color: '#6B7280',
    fontSize: '14px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s, color 0.2s',
    zIndex: 10,
  },
  rightHeader: {
    marginBottom: '20px',
    paddingRight: '24px',
  },
  rightTitle: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#111827',
    margin: '0 0 6px',
    letterSpacing: '-0.4px',
  },
  rightSubtitle: {
    fontSize: '13px',
    color: '#6B7280',
    lineHeight: '1.45',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  inputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    border: '1.5px solid #D1D5DB',
    borderRadius: '12px',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  fieldIcon: {
    position: 'absolute',
    left: '14px',
    fontSize: '15px',
    color: '#6B7280',
    pointerEvents: 'none',
  },
  textInput: {
    width: '100%',
    padding: '12px 14px 12px 42px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#111827',
    backgroundColor: 'transparent',
    outline: 'none',
    fontWeight: '500',
  },
  selectInput: {
    width: '100%',
    padding: '12px 36px 12px 42px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#111827',
    backgroundColor: 'transparent',
    outline: 'none',
    fontWeight: '500',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    cursor: 'pointer',
  },
  selectDropdownArrow: {
    position: 'absolute',
    right: '14px',
    fontSize: '18px',
    color: '#6B7280',
    pointerEvents: 'none',
    lineHeight: 1,
  },
  fieldError: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#EF4444',
    paddingLeft: '4px',
  },
  submitBtn: {
    width: '100%',
    padding: '13px 20px',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '700',
    color: '#FFFFFF',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '6px',
    transition: 'all 0.25s ease',
  },
  submitBtnEnabled: {
    backgroundColor: '#F96815',
    boxShadow: '0 6px 18px rgba(249, 104, 21, 0.35)',
    cursor: 'pointer',
  },
  submitBtnDisabled: {
    backgroundColor: '#FCA574',
    opacity: 0.6,
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  btnSendIcon: {
    fontSize: '14px',
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255, 255, 255, 0.4)',
    borderTopColor: '#FFFFFF',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin 0.8s linear infinite',
  },
  privacyNote: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontSize: '11px',
    color: '#6B7280',
    textAlign: 'center',
    marginTop: '4px',
  },
  successBox: {
    backgroundColor: '#ECFDF5',
    border: '1px solid #A7F3D0',
    borderRadius: '12px',
    padding: '12px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#065F46',
    marginBottom: '14px',
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
  successHeading: {
    fontSize: '13px',
    display: 'block',
  },
  successText: {
    fontSize: '12px',
    margin: '2px 0 0',
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    border: '1px solid #FECACA',
    borderRadius: '12px',
    padding: '10px 14px',
    color: '#991B1B',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '14px',
  },
};

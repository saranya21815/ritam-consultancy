import React from 'react';
import { SpinnerIcon } from '../../../assets/icons/Icons';

/**
 * Reusable Accessible Button Component
 * Supports variants: primary, secondary, outline, accent, whatsapp
 * Supports states: default, hover, active, focus, disabled, loading
 */
export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  loadingText,
  disabled = false,
  icon,
  iconPosition = 'left',
  onClick,
  href,
  className = '',
  style = {},
  ariaLabel,
  ...rest
}) {
  const isButtonDisabled = disabled || isLoading;
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-full' : '',
    isLoading ? 'is-loading' : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {isLoading ? (
        <>
          <SpinnerIcon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
          <span>{loadingText || children}</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="btn-icon-left">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="btn-icon-right">{icon}</span>}
        </>
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <a
        href={href}
        className={classes}
        style={style}
        onClick={onClick}
        aria-label={ariaLabel}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      style={style}
      disabled={isButtonDisabled}
      aria-disabled={isButtonDisabled}
      aria-busy={isLoading}
      aria-label={ariaLabel}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
}


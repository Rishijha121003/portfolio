'use client';

import type { FormEvent } from 'react';
import { useId, useRef, useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { ContactChannelIcon } from '@/components/ui/PortfolioIcons';
import { CONTACT_PAGE_DATA } from '@/data/portfolio';
import styles from './ContactChannels.module.css';

interface ContactChannelsProps {
  embedded?: boolean;
}

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormField = keyof FormValues;
type FormErrors = Partial<Record<FormField, string>>;
type SubmitStatus = 'idle' | 'submitting' | 'ready' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const INITIAL_VALUES: FormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

function validateField(field: FormField, value: string): string | undefined {
  const trimmed = value.trim();
  switch (field) {
    case 'name':
      return trimmed ? undefined : 'Please enter your name.';
    case 'email':
      if (!trimmed) return 'Please enter your email address.';
      return EMAIL_PATTERN.test(trimmed)
        ? undefined
        : 'Please enter a valid email address.';
    case 'subject':
      return trimmed ? undefined : 'Please enter a subject.';
    case 'message':
      if (!trimmed) return 'Please write a short message.';
      return trimmed.length >= 10
        ? undefined
        : 'Please enter at least 10 characters.';
  }
}

function validateAll(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  (Object.keys(values) as FormField[]).forEach((field) => {
    const err = validateField(field, values[field]);
    if (err) errors[field] = err;
  });
  return errors;
}

function buildMailtoHref(recipient: string, values: FormValues): string {
  const subject = encodeURIComponent(values.subject.trim());
  const body = encodeURIComponent(
    `Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\n${values.message.trim()}`
  );
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}

/**
 * Shared Contact experience pairing verified channels with a validated mailto-composer form.
 */
export function ContactChannels({ embedded = false }: ContactChannelsProps) {
  const {
    eyebrow,
    pathLabel,
    headingAccent,
    intro,
    availabilityNote,
    verificationNotice,
    recipientEmail,
    backdropImage,
    channels,
  } = CONTACT_PAGE_DATA;

  const baseId = useId();
  const HeadingTag = embedded ? 'h2' : 'h1';
  const SectionHeadingTag = embedded ? 'h3' : 'h2';

  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FormField, boolean>>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [preparedMailto, setPreparedMailto] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const fieldRefs = useRef<Partial<Record<FormField, HTMLInputElement | HTMLTextAreaElement | null>>>({});

  const handleFieldChange = (field: FormField, nextValue: string) => {
    setValues((prev) => ({ ...prev, [field]: nextValue }));
    if (status !== 'idle' && status !== 'submitting') {
      setStatus('idle');
    }
    if (touched[field] || errors[field]) {
      const nextErr = validateField(field, nextValue);
      setErrors((prev) => {
        const updated = { ...prev };
        if (nextErr) updated[field] = nextErr;
        else delete updated[field];
        return updated;
      });
    }
  };

  const handleFieldBlur = (field: FormField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const nextErr = validateField(field, values[field]);
    setErrors((prev) => {
      const updated = { ...prev };
      if (nextErr) updated[field] = nextErr;
      else delete updated[field];
      return updated;
    });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(recipientEmail);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateAll(values);
    setTouched({ name: true, email: true, subject: true, message: true });
    setErrors(validationErrors);

    const firstInvalid = (['name', 'email', 'subject', 'message'] as FormField[]).find(
      (field) => Boolean(validationErrors[field])
    );

    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setStatus('submitting');
    const href = buildMailtoHref(recipientEmail, values);

    window.setTimeout(() => {
      try {
        setPreparedMailto(href);
        setStatus('ready');
        window.location.href = href;
      } catch {
        setStatus('error');
      }
    }, 150);
  };

  const nameId = `${baseId}-name`;
  const emailId = `${baseId}-email`;
  const subjectId = `${baseId}-subject`;
  const messageId = `${baseId}-message`;

  const inner = (
    <>
      <section className={styles.heroBanner} aria-labelledby="contact-heading">
        <Image
          src={backdropImage.src}
          alt={backdropImage.alt}
          fill
          sizes="(max-width: 767px) 100vw, 900px"
          className={styles.bgImage}
        />
        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.bannerContent}>
          <div className={styles.bannerTopRow}>
            <span className={styles.eyebrowRow}>
              <span>{eyebrow}</span>
              <span className={styles.pathSeparator} aria-hidden="true">
                ·
              </span>
              <span>{pathLabel}</span>
            </span>

            <span className={styles.availabilityPill}>
              <span className={styles.linuxDot} aria-hidden="true" />
              <span>{availabilityNote}</span>
            </span>
          </div>

          <HeadingTag id="contact-heading" className={styles.heading}>
            {headingAccent}
          </HeadingTag>

          <p className={styles.introCopy}>{intro}</p>
        </div>
      </section>

      <div className={styles.splitGrid}>
        {/* Left Column: Verified Contact Information */}
        <section
          className={styles.channelsColumn}
          aria-labelledby={`${baseId}-channels-heading`}
        >
          <div className={styles.columnHeader}>
            <SectionHeadingTag
              id={`${baseId}-channels-heading`}
              className={styles.columnTitle}
            >
              Direct Channels
            </SectionHeadingTag>
            <p className={styles.columnSub}>
              Reach out directly via email or verified profiles.
            </p>
          </div>

          <ul className={styles.channelList} aria-label="Verified contact channels">
            {channels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  target={channel.external ? '_blank' : undefined}
                  rel={channel.external ? 'noopener noreferrer' : undefined}
                  className={styles.channelLink}
                >
                  <span className={styles.channelLeft}>
                    <span className={styles.channelIconBox}>
                      <ContactChannelIcon icon={channel.icon} />
                    </span>
                    <span className={styles.channelTextWrap}>
                      <span className={styles.channelLabel}>{channel.label}</span>
                      <span className={styles.channelValue}>{channel.statusLabel}</span>
                    </span>
                  </span>

                  <span className={styles.channelArrow} aria-hidden="true">
                    {channel.external ? '↗' : '→'}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.quickToolsRow}>
            <button
              type="button"
              className={styles.copyEmailBtn}
              onClick={handleCopyEmail}
            >
              {copiedEmail
                ? `Copied ${recipientEmail}`
                : `Copy Email · ${recipientEmail}`}
            </button>
          </div>

          <p className={styles.deliveryFootnote}>{verificationNotice}</p>
        </section>

        {/* Right Column: Contact Form with Honest Mailto Composer */}
        <section
          className={styles.formColumn}
          aria-labelledby={`${baseId}-form-heading`}
        >
          <div className={styles.columnHeader}>
            <SectionHeadingTag
              id={`${baseId}-form-heading`}
              className={styles.columnTitle}
            >
              Send a Message
            </SectionHeadingTag>
            <p className={styles.columnSub}>
              Fields marked with <span aria-hidden="true">*</span> are required.
            </p>
          </div>

          <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
            <div className={styles.fieldRowTwo}>
              <div className={styles.fieldGroup}>
                <label htmlFor={nameId} className={styles.fieldLabel}>
                  <span>Name</span>
                  <span className={styles.requiredStar} aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id={nameId}
                  ref={(el) => {
                    fieldRefs.current.name = el;
                  }}
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  value={values.name}
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${nameId}-error` : undefined}
                  className={
                    errors.name
                      ? `${styles.inputControl} ${styles.inputError}`
                      : styles.inputControl
                  }
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  onBlur={() => handleFieldBlur('name')}
                />
                {errors.name ? (
                  <p id={`${nameId}-error`} className={styles.errorText} role="alert">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor={emailId} className={styles.fieldLabel}>
                  <span>Email</span>
                  <span className={styles.requiredStar} aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id={emailId}
                  ref={(el) => {
                    fieldRefs.current.email = el;
                  }}
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={values.email}
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${emailId}-error` : undefined}
                  className={
                    errors.email
                      ? `${styles.inputControl} ${styles.inputError}`
                      : styles.inputControl
                  }
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  onBlur={() => handleFieldBlur('email')}
                />
                {errors.email ? (
                  <p id={`${emailId}-error`} className={styles.errorText} role="alert">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor={subjectId} className={styles.fieldLabel}>
                <span>Subject</span>
                <span className={styles.requiredStar} aria-hidden="true">
                  *
                </span>
              </label>
              <input
                id={subjectId}
                ref={(el) => {
                  fieldRefs.current.subject = el;
                }}
                type="text"
                name="subject"
                placeholder="Project idea, collaboration, or question"
                value={values.subject}
                required
                aria-required="true"
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? `${subjectId}-error` : undefined}
                className={
                  errors.subject
                    ? `${styles.inputControl} ${styles.inputError}`
                    : styles.inputControl
                }
                onChange={(e) => handleFieldChange('subject', e.target.value)}
                onBlur={() => handleFieldBlur('subject')}
              />
              {errors.subject ? (
                <p id={`${subjectId}-error`} className={styles.errorText} role="alert">
                  {errors.subject}
                </p>
              ) : null}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor={messageId} className={styles.fieldLabel}>
                <span>Message</span>
                <span className={styles.requiredStar} aria-hidden="true">
                  *
                </span>
              </label>
              <textarea
                id={messageId}
                ref={(el) => {
                  fieldRefs.current.message = el;
                }}
                name="message"
                rows={4}
                placeholder="Share a brief note about what you'd like to discuss..."
                value={values.message}
                required
                aria-required="true"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? `${messageId}-error` : undefined}
                className={
                  errors.message
                    ? `${styles.textareaControl} ${styles.inputError}`
                    : styles.textareaControl
                }
                onChange={(e) => handleFieldChange('message', e.target.value)}
                onBlur={() => handleFieldBlur('message')}
              />
              {errors.message ? (
                <p id={`${messageId}-error`} className={styles.errorText} role="alert">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <div className={styles.formFooter}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'submitting'}
              >
                <span>
                  {status === 'submitting' ? 'Preparing Email Draft...' : 'Send Message'}
                </span>
                <span aria-hidden="true">→</span>
              </button>
            </div>

            {status === 'ready' && preparedMailto ? (
              <div
                className={styles.statusBannerReady}
                role="status"
                aria-live="polite"
              >
                <p className={styles.statusTitle}>Email Draft Ready</p>
                <p className={styles.statusDesc}>
                  Direct server delivery is not configured on this static build. Your
                  message has been formatted for your email client ({recipientEmail}).
                </p>
                <div className={styles.statusActions}>
                  <a href={preparedMailto} className={styles.statusActionLink}>
                    <span>Open Email App</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                  <button
                    type="button"
                    className={styles.statusResetBtn}
                    onClick={() => {
                      setValues(INITIAL_VALUES);
                      setErrors({});
                      setTouched({});
                      setPreparedMailto(null);
                      setStatus('idle');
                    }}
                  >
                    Clear Form
                  </button>
                </div>
              </div>
            ) : null}

            {status === 'error' ? (
              <div className={styles.statusBannerError} role="alert">
                Unable to launch your email client automatically. Please email{' '}
                <a href={`mailto:${recipientEmail}`} className={styles.inlineMailLink}>
                  {recipientEmail}
                </a>{' '}
                directly.
              </div>
            ) : null}
          </form>
        </section>
      </div>
    </>
  );

  if (embedded) {
    return <div className={styles.embeddedWrap}>{inner}</div>;
  }

  return (
    <div className={styles.pageWrap}>
      <Container>
        <div className={styles.embeddedWrap} style={{ padding: 0 }}>
          {inner}
        </div>
      </Container>
    </div>
  );
}

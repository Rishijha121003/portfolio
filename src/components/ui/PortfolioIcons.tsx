import type {
  ContactChannelIconKey,
  PillarIconKey,
  TechIconKey,
} from '@/types/portfolio';
import styles from './PortfolioIcons.module.css';

/**
 * Monochrome currentColor technology icons adapting cleanly to any surface state.
 */
export function TechStackIcon({ icon }: { icon: TechIconKey }) {
  switch (icon) {
    case 'django':
      return <span className={styles.badge} aria-hidden="true">dj</span>;
    case 'typescript':
      return <span className={styles.badge} aria-hidden="true">TS</span>;
    case 'linux':
      return <span className={styles.badge} aria-hidden="true">&gt;_</span>;
    case 'python':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M11.91 2C6.84 2 7.16 4.19 7.16 4.19l.01 2.27h4.84v.69H5.16S2 6.8 2 11.93c0 5.14 2.76 4.95 2.76 4.95h1.64v-2.32s-.09-2.76 2.71-2.76h4.67v-.71H7.13s-1.89.09-1.89-1.82c0-1.92 1.68-1.89 1.68-1.89h8.31s2.61.02 2.61-2.52c0-2.55-2.61-2.86-2.61-2.86H11.91Zm-1.37 1.48a.78.78 0 1 1 0 1.56.78.78 0 0 1 0-1.56Z"
            fill="currentColor"
          />
          <path
            d="M12.09 22c5.07 0 4.75-2.19 4.75-2.19l-.01-2.27h-4.84v-.69h6.85s3.16.35 3.16-4.78c0-5.14-2.76-4.95-2.76-4.95h-1.64v2.32s.09 2.76-2.71 2.76h-4.67v.71h6.65s1.89-.09 1.89 1.82c0 1.92-1.68 1.89-1.68 1.89H8.76s-2.61-.02-2.61 2.52c0 2.55 2.61 2.86 2.61 2.86h3.33Zm1.37-1.48a.78.78 0 1 1 0-1.56.78.78 0 0 1 0 1.56Z"
            fill="currentColor"
            opacity="0.6"
          />
        </svg>
      );
    case 'fastapi':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M13 6.5 8.5 13h3.25l-.75 4.5 4.5-6.5h-3.25L13 6.5Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'flask':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9 3h6M10 3v4.5L5.2 16.8A2.2 2.2 0 0 0 7.15 20h9.7a2.2 2.2 0 0 0 1.95-3.2L14 7.5V3"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 15h9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.65"
          />
        </svg>
      );
    case 'postgresql':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <ellipse cx="12" cy="6" rx="7.5" ry="3" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M4.5 6v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M4.5 12v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6"
            stroke="currentColor"
            strokeWidth="1.75"
            opacity="0.65"
          />
        </svg>
      );
    case 'react':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <ellipse cx="12" cy="12" rx="9" ry="3.75" stroke="currentColor" strokeWidth="1.5" />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.75"
            stroke="currentColor"
            strokeWidth="1.5"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.75"
            stroke="currentColor"
            strokeWidth="1.5"
            transform="rotate(120 12 12)"
          />
          <circle cx="12" cy="12" r="1.6" fill="currentColor" />
        </svg>
      );
    case 'nodejs':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2.5 20.5 7.4v9.2L12 21.5l-8.5-4.9V7.4L12 2.5Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 14.5V9.5l5 5V9.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.75"
          />
        </svg>
      );
    case 'docker':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="9" width="3" height="3" stroke="currentColor" strokeWidth="1.5" opacity="0.75" />
          <rect x="8" y="9" width="3" height="3" stroke="currentColor" strokeWidth="1.5" opacity="0.75" />
          <rect x="12" y="9" width="3" height="3" stroke="currentColor" strokeWidth="1.5" opacity="0.75" />
          <rect x="8" y="5" width="3" height="3" stroke="currentColor" strokeWidth="1.5" opacity="0.75" />
          <rect x="12" y="5" width="3" height="3" stroke="currentColor" strokeWidth="1.5" opacity="0.75" />
          <path
            d="M2.5 13.5h17.8c-.4 3.4-3.1 6-7.6 6H9.5c-4.2 0-7-2.4-7-6Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

/**
 * Monochrome pillar icons inheriting foreground color.
 */
export function PillarIcon({ icon }: { icon: PillarIconKey }) {
  switch (icon) {
    case 'build':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'learn':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case 'ship':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      );
  }
}

/**
 * Monochrome directory and social icons inheriting foreground color.
 */
export function ContactChannelIcon({ icon }: { icon: ContactChannelIconKey }) {
  switch (icon) {
    case 'github':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
          />
        </svg>
      );
    case 'linkedin':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5ZM8 19H5V8h3v11ZM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764ZM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19Z" />
        </svg>
      );
    case 'x':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
        </svg>
      );
    case 'email':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    case 'resume':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
  }
}

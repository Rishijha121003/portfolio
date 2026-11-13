import type { ReactNode } from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Centered responsive blueprint container with consistent horizontal gutters.
 */
export function Container({ children, className }: ContainerProps) {
  const combinedClassName = className
    ? `${styles.container} ${className}`
    : styles.container;

  return <div className={combinedClassName}>{children}</div>;
}


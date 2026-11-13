import { ContactChannels } from '@/components/portfolio/ContactChannels';

/**
 * Window adapter reusing the shared Contact view without duplication.
 */
export function ContactAppView() {
  return <ContactChannels embedded />;
}

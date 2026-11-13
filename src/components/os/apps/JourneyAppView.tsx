import { JourneyLedger } from '@/components/portfolio/JourneyLedger';

/**
 * Window adapter reusing the shared Journey ledger view without duplication.
 */
export function JourneyAppView() {
  return <JourneyLedger embedded />;
}

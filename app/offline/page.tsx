import { Metadata } from 'next';
import { OfflineClient } from './OfflineClient';

export const metadata: Metadata = {
  title: 'Offline - EMI Calcora',
  description: 'You are currently offline. Access cached calculators and guides.',
  robots: 'noindex',
};

export default function OfflinePage() {
  return <OfflineClient />;
}

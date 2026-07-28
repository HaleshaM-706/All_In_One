import { useContext } from 'react';
import { AnalyticsContext } from './AnalyticsContext';

export function useAnalytics() {
  return useContext(AnalyticsContext);
}

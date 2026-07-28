import { useEffect, useMemo } from 'react';
import { AnalyticsContext } from './AnalyticsContext';
import { initializeAnalytics } from './events';
import { useFeatureFlags } from '../hooks/useFeatureFlags';

export function AnalyticsProvider({ children }) {
  const { ANALYTICS_ENABLED } = useFeatureFlags();

  useEffect(() => {
    if (!ANALYTICS_ENABLED) return;
    initializeAnalytics();
  }, [ANALYTICS_ENABLED]);

  const value = useMemo(() => ({ enabled: ANALYTICS_ENABLED }), [ANALYTICS_ENABLED]);

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
}

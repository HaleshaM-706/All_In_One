import { createContext, useMemo } from 'react';
import { useFeatureFlags } from '../hooks/useFeatureFlags';

export const AdProviderContext = createContext(null);

export function AdProvider({ children }) {
  const { ADS_ENABLED } = useFeatureFlags();

  const value = useMemo(() => ({
    enabled: ADS_ENABLED,
    provider: 'google',
  }), [ADS_ENABLED]);

  return <AdProviderContext.Provider value={value}>{children}</AdProviderContext.Provider>;
}

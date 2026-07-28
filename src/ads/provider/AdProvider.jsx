import { useMemo } from 'react';
import { GoogleAdsProvider } from './GoogleAdsProvider';
import { createProvider } from './ProviderFactory';
import { useFeatureFlags } from '../../hooks/useFeatureFlags';

export function AdProvider({ children }) {
  const { ADS_ENABLED } = useFeatureFlags();
  const providerName = import.meta.env.VITE_AD_PROVIDER || 'google';
  const ProviderComponent = useMemo(() => createProvider(providerName), [providerName]);

  if (!ADS_ENABLED) return children;

  return <ProviderComponent>{children}</ProviderComponent>;
}

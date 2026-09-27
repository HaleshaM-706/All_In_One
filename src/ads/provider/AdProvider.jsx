import { useMemo } from 'react';
import { createProvider } from './ProviderFactory';
import { useFeatureFlags } from '../../hooks/useFeatureFlags';

export function AdProvider({ children, enabled = true }) {
  const { ADS_ENABLED } = useFeatureFlags();
  const providerName = import.meta.env.VITE_AD_PROVIDER || 'google';
  const ProviderComponent = useMemo(() => createProvider(providerName), [providerName]);

  if (!ADS_ENABLED || !enabled) return children;

  return <ProviderComponent>{children}</ProviderComponent>;
}

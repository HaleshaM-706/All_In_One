import { useEffect, useMemo, useState } from 'react';
import { AdContext } from './AdContext';
import { loadGoogleAdsSdk } from '../sdk/googleAdsSdk';
import { useFeatureFlags } from '../../hooks/useFeatureFlags';

export function GoogleAdsProvider({ children }) {
  const { ADS_ENABLED } = useFeatureFlags();
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    if (!ADS_ENABLED) {
      return undefined;
    }

    loadGoogleAdsSdk()
      .then(() => {
        if (!cancelled) {
          setSdkLoaded(true);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || 'Unable to load ads SDK.');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [ADS_ENABLED]);

  const value = useMemo(() => ({
    enabled: ADS_ENABLED,
    sdkLoaded,
    error,
    provider: 'google',
  }), [ADS_ENABLED, sdkLoaded, error]);

  return <AdContext.Provider value={value}>{children}</AdContext.Provider>;
}

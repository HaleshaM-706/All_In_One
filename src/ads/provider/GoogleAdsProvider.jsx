import { useEffect, useMemo, useState } from 'react';
import { AdContext } from './AdContext';
import { loadGoogleAdsSdk } from '../sdk/googleAdsSdk';
import { useFeatureFlags } from '../../hooks/useFeatureFlags';

export function GoogleAdsProvider({ children, enabled = true }) {
  const { ADS_ENABLED } = useFeatureFlags();
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [error, setError] = useState(null);
  const isAdEnabled = ADS_ENABLED && enabled;

  useEffect(() => {
    let cancelled = false;

    if (!isAdEnabled) {
      setSdkLoaded(false);
      setError(null);
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
  }, [isAdEnabled]);

  const value = useMemo(() => ({
    enabled: isAdEnabled,
    sdkLoaded,
    error,
    provider: 'google',
  }), [isAdEnabled, sdkLoaded, error]);

  return <AdContext.Provider value={value}>{children}</AdContext.Provider>;
}

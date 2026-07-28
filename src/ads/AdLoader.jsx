import { lazy, Suspense } from 'react';
import { useFeatureFlags } from '../hooks/useFeatureFlags';

const LazyAd = lazy(() => import('./ResponsiveAd').then((module) => ({ default: module.ResponsiveAd })));

export function AdLoader() {
  const { ADS_ENABLED } = useFeatureFlags();

  if (!ADS_ENABLED) return null;

  return (
    <Suspense fallback={<div className="ad-skeleton" aria-label="Loading advertisement" />}> 
      <LazyAd />
    </Suspense>
  );
}

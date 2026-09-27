import { useFeatureFlags } from '../hooks/useFeatureFlags';
import { GoogleAd } from './components/GoogleAd';

export function ResponsiveAd() {
  const { ADS_ENABLED } = useFeatureFlags();

  if (!ADS_ENABLED) return null;

  return (
    <GoogleAd
      slotId={import.meta.env.VITE_GOOGLE_INLINE_SLOT || '6102952450'}
      className="ad-responsive"
      style={{ minHeight: 120 }}
    />
  );
}

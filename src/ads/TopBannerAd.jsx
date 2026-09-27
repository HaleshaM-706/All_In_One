import { useFeatureFlags } from '../hooks/useFeatureFlags';
import { GoogleAd } from './components/GoogleAd';

export function TopBannerAd() {
  const { ADS_ENABLED } = useFeatureFlags();

  if (!ADS_ENABLED) return null;

  return (
    <GoogleAd
      slotId={import.meta.env.VITE_GOOGLE_TOP_BANNER_SLOT || '4278468968'}
      className="ad-banner"
      style={{ minHeight: 90 }}
    />
  );
}

import { useFeatureFlags } from '../hooks/useFeatureFlags';
import { GoogleAd } from './components/GoogleAd';

export function FooterAd() {
  const { ADS_ENABLED } = useFeatureFlags();

  if (!ADS_ENABLED) return null;

  return (
    <GoogleAd
      slotId={import.meta.env.VITE_GOOGLE_FOOTER_SLOT || '4278468968'}
      className="ad-footer"
      style={{ minHeight: 90 }}
    />
  );
}

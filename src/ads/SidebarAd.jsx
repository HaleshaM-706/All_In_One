import { useFeatureFlags } from '../hooks/useFeatureFlags';
import { GoogleAd } from './components/GoogleAd';

export function SidebarAd() {
  const { ADS_ENABLED } = useFeatureFlags();

  if (!ADS_ENABLED) return null;

  return (
    <GoogleAd
      slotId={import.meta.env.VITE_GOOGLE_SIDEBAR_SLOT || '6102952450'}
      className="ad-sidebar"
      style={{ minHeight: 600 }}
    />
  );
}

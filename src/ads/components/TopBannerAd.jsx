import { memo } from 'react';
import { GoogleAd } from './GoogleAd';

export const TopBannerAd = memo(function TopBannerAd() {
  return <GoogleAd slotId={import.meta.env.VITE_GOOGLE_TOP_BANNER_SLOT || '0000000000'} className="ad-banner" style={{ minHeight: 90 }} />;
});

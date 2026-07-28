import { memo } from 'react';
import { GoogleAd } from './GoogleAd';

export const FooterAd = memo(function FooterAd() {
  return <GoogleAd slotId={import.meta.env.VITE_GOOGLE_FOOTER_SLOT || '0000000000'} className="ad-footer" style={{ minHeight: 90 }} />;
});

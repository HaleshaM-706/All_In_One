import { memo } from 'react';
import { GoogleAd } from './GoogleAd';

export const SidebarAd = memo(function SidebarAd() {
  return <GoogleAd slotId={import.meta.env.VITE_GOOGLE_SIDEBAR_SLOT || '0000000000'} className="ad-sidebar" style={{ minHeight: 600 }} />;
});

import { memo } from 'react';
import { GoogleAd } from './GoogleAd';

export const InlineAd = memo(function InlineAd() {
  return <GoogleAd slotId={import.meta.env.VITE_GOOGLE_INLINE_SLOT || '0000000000'} className="ad-inline" style={{ minHeight: 120 }} />;
});

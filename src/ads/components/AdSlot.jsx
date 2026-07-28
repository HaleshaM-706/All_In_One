import { memo, useMemo } from 'react';
import { useFeatureFlags } from '../../hooks/useFeatureFlags';
import { trackAdLoaded, trackAdClicked } from '../../analytics/events';
import { useAds } from '../hooks/useAds';

export const AdSlot = memo(function AdSlot({ slotId, className = '', format = 'auto', responsive = true, style = {} }) {
  const { ADS_ENABLED, PREMIUM_ENABLED } = useFeatureFlags();
  const { enabled, sdkLoaded } = useAds();

  const shouldRender = useMemo(() => ADS_ENABLED && !PREMIUM_ENABLED && enabled && sdkLoaded, [ADS_ENABLED, PREMIUM_ENABLED, enabled, sdkLoaded]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div className={`ad-slot ${className}`.trim()} style={{ minHeight: 90, ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: 90 }}
        data-ad-client={import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT || ''}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
        onLoad={() => trackAdLoaded()}
        onClick={() => trackAdClicked()}
      />
    </div>
  );
});

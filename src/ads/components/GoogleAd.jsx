import { memo, useEffect, useRef } from 'react';
import { useAds } from '../hooks/useAds';
import { trackAdLoaded, trackAdClicked } from '../../analytics/events';

export const GoogleAd = memo(function GoogleAd({ slotId, className = '', style = {} }) {
  const { sdkLoaded } = useAds();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!sdkLoaded || !containerRef.current) return;

    const ins = containerRef.current.querySelector('ins');
    if (!ins) return;

    if (window.adsbygoogle && window.adsbygoogle.push) {
      window.adsbygoogle.push({});
      trackAdLoaded();
    }
  }, [sdkLoaded]);

  if (!sdkLoaded) {
    return <div className={`ad-slot ad-skeleton ${className}`.trim()} style={style} aria-label="Loading advertisement" />;
  }

  return (
    <div ref={containerRef} className={`ad-slot ${className}`.trim()} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: 90 }}
        data-ad-client={import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT || ''}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
        onClick={() => trackAdClicked()}
      />
    </div>
  );
});

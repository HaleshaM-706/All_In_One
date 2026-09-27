import { memo, useEffect, useRef } from 'react';
import { useAds } from '../hooks/useAds';
import { trackAdLoaded, trackAdClicked } from '../../analytics/events';

export const GoogleAd = memo(function GoogleAd({ slotId, className = '', style = {} }) {
  const { sdkLoaded } = useAds();
  const containerRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!sdkLoaded || !containerRef.current || initializedRef.current) return;

    const ins = containerRef.current.querySelector('ins');
    if (!ins) return;

    initializedRef.current = true;

    const timer = window.setTimeout(() => {
      if (window.adsbygoogle?.push) {
        window.adsbygoogle.push({});
        trackAdLoaded();
      }
    }, 120);

    return () => window.clearTimeout(timer);
  }, [sdkLoaded, slotId]);

  if (!sdkLoaded) {
    return <div className={`ad-slot ad-skeleton ${className}`.trim()} style={style} aria-label="Loading advertisement" />;
  }

//   console.log('Rendering GoogleAd with ins:', ins);
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

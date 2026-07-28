import { useFeatureFlags } from '../hooks/useFeatureFlags';
import { trackAdClicked } from '../analytics/events';

export function FooterAd() {
  const { ADS_ENABLED } = useFeatureFlags();

  if (!ADS_ENABLED) return null;

  return (
    <aside className="ad-slot ad-footer" role="complementary" onClick={trackAdClicked}>
      <span className="ad-label">Sponsored</span>
      <p>Footer ad placeholder</p>
    </aside>
  );
}

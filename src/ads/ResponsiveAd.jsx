import { useFeatureFlags } from '../hooks/useFeatureFlags';
import { trackAdClicked } from '../analytics/events';

export function ResponsiveAd() {
  const { ADS_ENABLED } = useFeatureFlags();

  if (!ADS_ENABLED) return null;

  return (
    <aside className="ad-slot ad-responsive" role="complementary" onClick={trackAdClicked}>
      <span className="ad-label">Sponsored</span>
      <p>Responsive ad placeholder</p>
    </aside>
  );
}

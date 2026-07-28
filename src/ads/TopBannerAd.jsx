import { useFeatureFlags } from '../hooks/useFeatureFlags';
import { trackAdClicked } from '../analytics/events';

export function TopBannerAd() {
  const { ADS_ENABLED } = useFeatureFlags();

  if (!ADS_ENABLED) return null;

  return (
    <aside className="ad-slot ad-banner" role="complementary" onClick={trackAdClicked}>
      <span className="ad-label">Sponsored</span>
      <p>Ad placeholder • future provider integration ready</p>
    </aside>
  );
}

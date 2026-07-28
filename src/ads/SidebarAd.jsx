import { useFeatureFlags } from '../hooks/useFeatureFlags';
import { trackAdClicked } from '../analytics/events';

export function SidebarAd() {
  const { ADS_ENABLED } = useFeatureFlags();

  if (!ADS_ENABLED) return null;

  return (
    <aside className="ad-slot ad-sidebar" role="complementary" onClick={trackAdClicked}>
      <span className="ad-label">Sponsored</span>
      <p>Sidebar ad placeholder</p>
    </aside>
  );
}

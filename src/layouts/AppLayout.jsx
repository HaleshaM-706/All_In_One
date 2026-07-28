import { TopBannerAd } from '../ads/TopBannerAd';
import { FooterAd } from '../ads/FooterAd';
import { AdLoader } from '../ads/AdLoader';
import { PremiumBadge } from '../premium/PremiumBadge';
import { useFeatureFlags } from '../hooks/useFeatureFlags';

export function AppLayout({ children }) {
  const { ADS_ENABLED } = useFeatureFlags();

  return (
    <div className="app-layout">
      {ADS_ENABLED && <TopBannerAd />}
      <div className="app-layout__content">{children}</div>
      <div className="app-layout__ads">
        <AdLoader />
        <FooterAd />
      </div>
      <div className="app-layout__badge"><PremiumBadge /></div>
    </div>
  );
}

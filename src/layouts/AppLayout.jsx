import { FooterAd } from '../ads/FooterAd';
import { PremiumBadge } from '../premium/PremiumBadge';
import { useFeatureFlags } from '../hooks/useFeatureFlags';

export function AppLayout({ children, showAds = false }) {
  const { ADS_ENABLED } = useFeatureFlags();
  const shouldRenderAds = ADS_ENABLED && showAds && typeof window !== 'undefined' && window.location.pathname !== '/';

  return (
    <div className="app-layout">
      <div className="app-layout__content">{children}</div>

      <footer className="page-footer">
        <div className="page-footer__content">
          <p className="page-footer__eyebrow">About this tool</p>
          <h3>Convert your images into a clean PDF in seconds.</h3>
          <p>
            Upload JPG, PNG, or other supported images, arrange them in the order you want,
            adjust the layout settings, and download a polished PDF directly from your browser.
          </p>
        </div>

        {shouldRenderAds && (
          <div className="page-footer__ad">
            <FooterAd />
          </div>
        )}
      </footer>

      <div className="app-layout__badge"><PremiumBadge /></div>
    </div>
  );
}

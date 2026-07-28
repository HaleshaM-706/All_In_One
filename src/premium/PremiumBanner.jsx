import { useFeatureFlags } from '../hooks/useFeatureFlags';

export function PremiumBanner({ onUpgrade }) {
  const { PREMIUM_ENABLED } = useFeatureFlags();

  if (!PREMIUM_ENABLED) return null;

  return (
    <div className="premium-banner" role="status">
      <span>Premium</span>
      <strong>Unlock unlimited conversions, compression, and password protection.</strong>
      <button type="button" className="primary-button" onClick={onUpgrade}>Upgrade</button>
    </div>
  );
}

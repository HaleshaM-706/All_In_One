import { useFeatureFlags } from '../hooks/useFeatureFlags';

export function PremiumBadge() {
  const { PREMIUM_ENABLED } = useFeatureFlags();

  if (!PREMIUM_ENABLED) return null;

  return <span className="premium-badge">Premium</span>;
}

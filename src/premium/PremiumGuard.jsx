import { useFeatureFlags } from '../hooks/useFeatureFlags';
import { trackUpgradeClick } from '../analytics/events';

export function PremiumGuard({ enabled, children, onUpgrade }) {
  const { PREMIUM_ENABLED } = useFeatureFlags();

  if (!enabled || !PREMIUM_ENABLED) {
    return (
      <button
        type="button"
        className="ghost-button"
        onClick={() => {
          trackUpgradeClick();
          onUpgrade?.();
        }}
      >
        Unlock Premium
      </button>
    );
  }

  return children;
}

import { createContext, useMemo, useState } from 'react';
import { useFeatureFlags } from '../hooks/useFeatureFlags';

export const PremiumContext = createContext(null);

export function PremiumProvider({ children }) {
  const { PREMIUM_ENABLED } = useFeatureFlags();
  const [isPremium, setIsPremium] = useState(PREMIUM_ENABLED);

  const value = useMemo(() => ({
    isPremium,
    setIsPremium,
    premiumEnabled: PREMIUM_ENABLED,
  }), [isPremium, PREMIUM_ENABLED]);

  return <PremiumContext.Provider value={value}>{children}</PremiumContext.Provider>;
}

import { useFeatureFlags } from '../hooks/useFeatureFlags';

export function PremiumFeatures() {
  const { PREMIUM_ENABLED } = useFeatureFlags();

  if (!PREMIUM_ENABLED) return null;

  return (
    <ul className="premium-list">
      <li>Remove Ads</li>
      <li>Unlimited Images</li>
      <li>Password Protected PDF</li>
      <li>Compress PDF</li>
      <li>OCR</li>
      <li>Cloud Sync</li>
      <li>Watermark Removal</li>
      <li>Priority Processing</li>
    </ul>
  );
}

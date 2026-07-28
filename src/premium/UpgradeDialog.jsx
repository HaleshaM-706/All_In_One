import { useFeatureFlags } from '../hooks/useFeatureFlags';

export function UpgradeDialog({ open, onClose }) {
  const { PREMIUM_ENABLED } = useFeatureFlags();

  if (!open || !PREMIUM_ENABLED) return null;

  return (
    <div className="dialog-backdrop" role="dialog" aria-modal="true">
      <div className="dialog-card">
        <h3>Go Premium</h3>
        <p>Remove ads, unlock advanced PDF tools, and access future AI-powered features.</p>
        <div className="dialog-actions">
          <button type="button" className="primary-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

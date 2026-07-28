export function initializeAnalytics() {
  if (typeof window === 'undefined') return;
  window.__analytics_initialized__ = true;
}

export function trackUpload() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('analytics:upload'));
}

export function trackGeneratePdf() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('analytics:generate-pdf'));
}

export function trackDownload() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('analytics:download'));
}

export function trackAdLoaded() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('analytics:ad-loaded'));
}

export function trackAdClicked() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('analytics:ad-clicked'));
}

export function trackUpgradeClick() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('analytics:upgrade-click'));
}

export function trackPurchase() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('analytics:purchase'));
}

export function trackFeatureUsage(feature) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('analytics:feature-usage', { detail: { feature } }));
}

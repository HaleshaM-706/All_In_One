let sdkPromise = null;

export function loadGoogleAdsSdk() {
  if (sdkPromise) {
    return sdkPromise;
  }

  sdkPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Ads SDK can only run in the browser.'));
      return;
    }

    if (window.adsbygoogle) {
      resolve();
      return;
    }

    const existingScript = document.querySelector('script[src*="googlesyndication.com"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Google Ads SDK failed to load.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT || ''}`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Google Ads SDK failed to load.'));
    document.head.appendChild(script);
  });

  return sdkPromise;
}

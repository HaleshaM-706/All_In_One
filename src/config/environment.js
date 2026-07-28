export const environment = {
  adProvider: import.meta.env.VITE_AD_PROVIDER || 'google',
  googleAdsenseClient: import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT || '',
  googleTopBannerSlot: import.meta.env.VITE_GOOGLE_TOP_BANNER_SLOT || '0000000000',
  googleInlineSlot: import.meta.env.VITE_GOOGLE_INLINE_SLOT || '0000000000',
  googleSidebarSlot: import.meta.env.VITE_GOOGLE_SIDEBAR_SLOT || '0000000000',
  googleFooterSlot: import.meta.env.VITE_GOOGLE_FOOTER_SLOT || '0000000000',
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
};

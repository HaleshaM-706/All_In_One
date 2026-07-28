import { GoogleAdsProvider } from './GoogleAdsProvider';

export function createProvider(providerName = 'google') {
  switch (providerName) {
    case 'google':
      return GoogleAdsProvider;
    default:
      return GoogleAdsProvider;
  }
}

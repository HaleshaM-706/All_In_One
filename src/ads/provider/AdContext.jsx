import { createContext } from 'react';

export const AdContext = createContext({
  enabled: false,
  sdkLoaded: false,
  error: null,
  provider: 'google',
});

import { useContext } from 'react';
import { AdContext } from '../provider/AdContext';

export function useAds() {
  return useContext(AdContext);
}

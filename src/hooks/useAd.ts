// hooks/useAd.ts
import { useInterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import { useEffect } from 'react';

export function useAd() {
    const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-7985985128504090/3969648400';
    const ad = useInterstitialAd(adUnitId);

    useEffect(() => {
        ad.load(); // Load on mount
    }, [ad.load]); // ✅ Proper dep!

    useEffect(() => {
        if (ad.isClosed) {
            ad.load(); // Reload after close
        }
    }, [ad.isClosed]);

    return ad;
}

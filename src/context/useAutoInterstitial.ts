// hooks/useAutoInterstitial.ts - USE THIS VERSION
import { useInterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import { useEffect, useRef } from 'react';

let globalAdInstance: any = null; // Single ad instance across app

export function useAutoInterstitial(screenName?: string, adScreens: string[] = ['Signs', 'QuizResult']) {
    const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-7985985128504090/3969648400';
    const screenRef = useRef(screenName);
    const hasShownRef = useRef(false);

    // Only create ad on first call
    if (!globalAdInstance) {
        globalAdInstance = useInterstitialAd(adUnitId);
    }

    const { isLoaded, isClosed, load, show } = globalAdInstance;

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        if (isClosed) {
            hasShownRef.current = false; // Reset for next screen
            load();
        }
    }, [isClosed]);

    useEffect(() => {
        screenRef.current = screenName;

        if (screenName && adScreens.includes(screenName) && isLoaded && !hasShownRef.current) {
            hasShownRef.current = true;
            const timer = setTimeout(() => {
                show();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [screenName, isLoaded]); // Removed problematic deps

    return { isLoaded };
}

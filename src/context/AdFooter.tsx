// AdFooter.tsx - Drop-in replacement
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, Animated, LayoutAnimation } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

interface AdFooterProps {
    adLoaded: boolean;
    setAdLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdFooter: React.FC<AdFooterProps> = React.memo(({ adLoaded, setAdLoaded }) => {
    const [internalLoaded, setInternalLoaded] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const maxAttempts = 3;
    const retryTimeoutRef = useRef<any>(null);


    // Cleanup retry timer
    useEffect(() => () => {
        if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    }, []);

    const handleAdLoaded = useCallback(() => {
        console.log('✅ Ad LOADED');
        setInternalLoaded(true);
        setAdLoaded(true);
        setAttempts(0);
    }, [setAdLoaded]);

    const handleAdFailed = useCallback((error: any) => {
        console.error('❌ Ad failed:', error);
        setInternalLoaded(false);

        if (attempts < maxAttempts) {
            const delay = 2000 * (attempts + 1); // Progressive backoff
            retryTimeoutRef.current = setTimeout(() => {
                console.log(`🔄 Retrying ad load (attempt ${attempts + 2}/${maxAttempts})`);
                setAttempts(a => a + 1);
            }, delay);
        } else {
            setAdLoaded(false);
        }
    }, [attempts, maxAttempts, setAdLoaded]);

    // Sync with parent state
    useEffect(() => {
        setInternalLoaded(adLoaded);
    }, [adLoaded]);

    // Smooth height animation
    const heightAnim = useRef(new Animated.Value(adLoaded || internalLoaded ? 60 : 0)).current;

    useEffect(() => {
        Animated.timing(heightAnim, {
            toValue: (adLoaded || internalLoaded) ? 60 : 0,
            duration: 250,
            useNativeDriver: false,
        }).start();
    }, [adLoaded, internalLoaded, heightAnim]);

    const unitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-7985985128504090/3972164821';

    return (
        <Animated.View
            style={[
                styles.adsContainer,
                { height: heightAnim, overflow: 'hidden' }
            ]}
        >
            <BannerAd
                unitId={unitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                onAdLoaded={handleAdLoaded}
                onAdFailedToLoad={handleAdFailed}
                onAdOpened={handleAdLoaded}
                onAdClosed={() => setInternalLoaded(true)}
            />
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    adsContainer: {
        zIndex: 99,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
});

export default AdFooter;

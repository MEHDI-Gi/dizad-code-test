// AdFooter.js (NEW FILE in same folder as your screen)
import React, { useRef, useState, useContext, useEffect, SetStateAction, Dispatch } from 'react';

import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'; // Your AdMob import

interface AdFooterProps {
    adLoaded: boolean;
    setAdLoaded: Dispatch<SetStateAction<boolean>>;
}

const AdFooter = React.memo(({ adLoaded, setAdLoaded }: AdFooterProps) => {

    return adLoaded ? (
        <View style={styles.adsContainer}>
            <BannerAd
                unitId="ca-app-pub-7985985128504090/3972164821"
                size={BannerAdSize.ADAPTIVE_BANNER}
                onAdFailedToLoad={error => {
                    console.error('Ad failed to load:', error);
                    setAdLoaded(false);
                }}
                onAdLoaded={() => {
                    console.log('Banner Ad loaded successfully');
                    setAdLoaded(true);
                }}
            />
        </View>
    ) : null;
});
const styles = StyleSheet.create({

    adsContainer: {
        zIndex: 99,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default AdFooter; // EXPORT IT

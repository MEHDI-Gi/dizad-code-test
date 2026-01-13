// AdFooter.js (NEW FILE in same folder as your screen)
import React, { useRef, useState, useContext, useEffect } from 'react';

import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'; // Your AdMob import
import { DataContext } from './contextData';

const AdFooter = React.memo(({ adLoaded, setAdLoaded }) => {
    const {
        vipPlansCard, setVipPlansCard,
        heartsCard, setHeartsCard,
        setHelpPoint,
        colors,
        dataLevelIndex, setDataLevelIndex,
        updateQuestIndex, updateAnswerStats,
        questIndices, answerStats,
        percentage,
        currentQuestionsIndex, currentLevelIndex,
        livesHeart, setLivesHeart, livesHeartEnd,
        timeLeft, setUserVip, vipCard, setVipCard,
    } = useContext(DataContext);
    return !vipCard && adLoaded ? (
        <View style={styles.adsContainer}>
            <BannerAd
                unitId="ca-app-pub-7985985128504090/8850361800"
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

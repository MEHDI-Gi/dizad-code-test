import {
    BackHandler,
    Text,
    View,
    StyleSheet,
    Image,
    StatusBar,
    ActivityIndicator,
    Pressable,
    Vibration
} from 'react-native';
import React, { useRef, useState, useContext, useEffect } from 'react';
import {
    RewardedAd,
    RewardedAdEventType,
    TestIds,
    AdEventType,
} from 'react-native-google-mobile-ads';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Foundation, MaterialCommunityIcons, Entypo, FontAwesome6 } from '@expo/vector-icons';
import { DataContext } from '../../context/contextData';

import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    withSpring
} from 'react-native-reanimated';
const rewardedAd = RewardedAd.createForAdRequest(TestIds.REWARDED);

export default function StatisticsCard(props) {
    const {
        heartsCard, setHeartsCard,
        statisticsCard, setStatisticsCard,
        setHelpPoint,
        helpPoint,
        quizData,
        answersRef,
        globTrueAns, setGlobTrueAns,
        globFalseAns,
        setGlobFalseAns,
        colors,
        dataLevelIndex, setDataLevelIndex,
        updateQuestIndex, updateAnswerStats,
        questIndices, answerStats,
        percentage,
        currentQuestionsIndex, currentLevelIndex,
        livesHeart, setLivesHeart, livesHeartEnd,
        timer, setTimer, resetTimer,
        levelEndState, setlevelEndState,
        timeEndState, setTimeEndState,
        timerTimeout,
        exitBtn, setExitBtn,
        setHandleTimerBackground, vibrate, sound, playSound,
        isGradient, setSnackbarState, setSnackOptions,
        timeLeft
    } = useContext(DataContext);


    const statisticAnimeW = useSharedValue(0); // start closed (down)
    const statisticAnimeH = useSharedValue(0); // start closed (down)

    const timeOutConfig = {
        duration: 300,
        easing: Easing.out(Easing.exp),
    };

    const statisticAnimeStyle = useAnimatedStyle(() => ({
        width: withTiming(statisticAnimeW.value, timeOutConfig),
        height: withTiming(statisticAnimeH.value, timeOutConfig)
    }));

    useEffect(() => {
        if (statisticsCard) {
            // Open: animate to position 0 (up)
            statisticAnimeW.value = 250;
            statisticAnimeH.value = 400;
        } else {
            // Close: animate back down to 400
            statisticAnimeW.value = 0;
            statisticAnimeH.value = 0;
        }
    }, [statisticsCard]);
    return (
        <View style={
            [
                ,
                {
                    width: "100%", height: "100%",
                    top: 0,
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    zIndex: 99,
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                }
            ]} >
            <Pressable style={
                {
                    width: "100%", height: "100%",


                }
            }
                onPress={() => {
                    statisticAnimeW.value = 0;
                    statisticAnimeH.value = 0;
                    const timeout = setTimeout(() => {
                    }, 930);
                    setStatisticsCard(false)

                    return () => clearTimeout(timeout);
                }

                }>

            </Pressable>
            <Animated.View style={[statisticAnimeStyle, {
                backgroundColor: colors.secondary,
                position: 'absolute',
                zIndex: 99999,
                borderRadius: 10,
                alignContent: 'center',
                justifyContent: 'space-between',
                elevation: 5
            }]}>
            </Animated.View>

        </View>
    )
}

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
import { DataContext } from '../context/contextData';
import VipPlansCard from './VipPlansCard';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    withSpring
} from 'react-native-reanimated';
const rewardedAd = RewardedAd.createForAdRequest(TestIds.REWARDED);

export default function HeartsCard(props) {
    const {
        heartsCard, setHeartsCard,
        setHelpPoint,
        colors,
        dataLevelIndex, setDataLevelIndex,
        updateQuestIndex, updateAnswerStats,
        questIndices, answerStats,
        percentage,
        currentQuestionsIndex, currentLevelIndex,
        livesHeart, setLivesHeart, livesHeartEnd,
        timeLeft, setUserPlan, setVipPlansCard, vipPlansCard
    } = useContext(DataContext);
    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    // Use test ad unit ID during development
    const adUnitId = __DEV__
        ? TestIds.REWARDED
        : 'ca-app-pub-7985985128504090/7958461588';

    // Create the rewarded ad instance
    const rewarded = RewardedAd.createForAdRequest(adUnitId, {
        keywords: ['fashion', 'clothing'], // optional targeting
    });

    const [loaded, setLoaded] = useState(false);
    const [reward, setReward] = useState(null);


    useEffect(() => {
        // Correct event types usage here:
        const loadedListener = rewardedAd.addAdEventListener(
            RewardedAdEventType.LOADED,
            () => {
                setLoaded(true);
                console.log('Rewarded ad loaded');
            }
        );

        const earnedRewardListener = rewardedAd.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            (reward) => {
                setReward(reward);
                console.log('User earned reward of ', reward);
                setLivesHeart((prev) => prev + 1);
            }
        );

        const errorListener = rewardedAd.addAdEventListener(
            AdEventType.ERROR,
            (error) => {
                console.error('Rewarded ad error:', error);
                setLoaded(false);
            }
        );

        const closedListener = rewardedAd.addAdEventListener(
            AdEventType.CLOSED, // <-- Use AdEventType.CLOSED here (NOT RewardedAdEventType.CLOSED)
            () => {
                console.log('Rewarded ad closed, loading new ad');
                setLoaded(false);
                rewardedAd.load();
            }
        );

        // Load the first ad
        rewardedAd.load();

        // Clean up listeners on unmount
        return () => {
            loadedListener();
            earnedRewardListener();
            errorListener();
            closedListener();
        };
    }, []);
    const showAd = () => {
        if (loaded) {
            rewardedAd.show();
            setLoaded(false);
        } else {
            console.log('Reward Ad not loaded yet');
        }
    };

    const [backEffect, setBackEffect] = useState(false)

    const heartCardAnim = useSharedValue(400); // start closed (down)

    const timeOutConfig = {
        duration: 300,
        easing: Easing.out(Easing.exp),
    };

    const heartCardAnimStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: withTiming(heartCardAnim.value, timeOutConfig) }],
    }));

    useEffect(() => {
        if (heartsCard) {
            setBackEffect(true)
            // Open: animate to position 0 (up)
            heartCardAnim.value = 0;
        } else {

            // Close: animate back down to 400
            heartCardAnim.value = 400;
        }
    }, [heartsCard]);
    return (
        <View style={[

            {
                width: '100%', height: '100%',
                top: 0,
                position: 'absolute',
                zIndex: 99999,
                alignContent: 'center',
                justifyContent: 'center',
            }
        ]}>
            <Pressable style={{
                flex: 1,
                backgroundColor: !backEffect ? 'transparent' : '#0000002f',

            }}
                onPress={() => {
                    heartCardAnim.value = 400;
                    setBackEffect(false)
                    const timeout = setTimeout(() => {
                        setHeartsCard(false)
                    }, 330);

                    return () => clearTimeout(timeout);
                }
                }>
            </Pressable>

            {vipPlansCard && <VipPlansCard />}

            <Animated.View style={[heartCardAnimStyle, {
                width: '100%', height: '45%',
                bottom: 0,
                backgroundColor: colors.secondary,
                position: 'absolute',
                zIndex: 99999,
                borderTopEndRadius: 10,
                borderTopStartRadius: 10,
                alignContent: 'center',
                justifyContent: 'space-between',
                elevation: 5
            }]}>
                <View style={{
                    width: '100%',
                    height: 50,
                    alignItems: 'center',
                    justifyContent: "space-between",
                    flexDirection: 'row'
                }}>
                    <View style={{
                        width: "33%",
                        flexDirection: 'row',
                        paddingHorizontal: 10,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}>
                        <Text style={{ color: "white", fontWeight: '800' }}>{timeLeft !== 0 ? formatTime(timeLeft) : 'Full'}</Text>
                    </View>
                    <View style={{
                        height: 50,
                        width: "33%",
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: "center"
                    }}>
                        {Array.from({ length: livesHeart }).map((_, index) => (
                            <MaterialCommunityIcons
                                key={index}
                                name="heart"
                                color="#922c2c"
                                size={18}
                            />
                        ))}

                    </View>
                    <View style={{
                        width: "33%",

                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        flexDirection: 'row'
                    }}>

                        <Pressable
                            android_ripple={{ color: colors.primary, borderless: false }}
                            onPress={() => {
                                setHeartsCard(false)

                                setBackEffect(false)
                            }}
                            style={{
                                width: 50,
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <MaterialCommunityIcons
                                name='close'
                                color={'lightgray'}
                                size={20}
                            />
                        </Pressable>
                    </View>
                </View>
                <View style={{
                    width: '100%',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: "space-evenly",
                    flexDirection: 'row',
                    overflow: 'hidden'
                }}>
                    <View style={{
                        flexDirection: 'column',
                        width: '35%',
                        alignItems: 'center',
                        justifyContent: "space-between",
                        borderColor: 'gray',
                        borderWidth: 1,
                        height: '90%',
                        borderRadius: 8,
                        paddingVertical: 10,
                        opacity: livesHeart === 5 ? 0.4 : 1,
                    }}>
                        <View style={{
                            width: '90%',
                            height: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{ color: "white", fontWeight: '800' }}>Watch Ad</Text>
                        </View>
                        <View style={{
                            width: '90%',
                            alignItems: 'center',
                            justifyContent: 'center',

                        }}>
                            <MaterialCommunityIcons
                                name="heart"
                                color="darkred"
                                size={90}
                                style={{
                                    position: 'absolute',
                                }}
                            />
                            <MaterialCommunityIcons
                                name='plus'
                                size={35}
                                color={'lightgray'}
                            />
                        </View>
                        <Pressable
                            android_ripple={{ color: colors.secondary, borderless: false }}
                            disabled={livesHeart === 5}
                            onPress={showAd}
                            style={{
                                backgroundColor: 'lightgray',
                                width: '90%',
                                height: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 8,
                            }}
                        >
                            <Text style={{ fontWeight: '700' }}>REFILL</Text>
                        </Pressable>

                    </View>
                    <View style={{
                        flexDirection: 'column',
                        width: '35%',
                        alignItems: 'center',
                        justifyContent: "space-between",
                        borderColor: '#704BBF',
                        borderWidth: 1,
                        height: '90%',
                        borderRadius: 8,
                        paddingVertical: 10
                    }}>
                        <View style={{
                            width: '90%',
                            height: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{ color: "white", fontWeight: '800' }}>Unlimated</Text>
                        </View>
                        <View style={{
                            width: '90%',
                            alignItems: 'center',
                            justifyContent: 'center',

                        }}>
                            <MaterialCommunityIcons
                                name="heart"
                                color="#704BBF"
                                size={90}
                                style={{
                                    position: 'absolute',
                                }}
                            />
                            <MaterialCommunityIcons
                                name='infinity'
                                size={35}
                                color={'lightgray'}
                            />
                        </View>
                        <Pressable
                            android_ripple={{ color: colors.secondary, borderless: false }}
                            onPress={() => { setVipPlansCard(true) }}
                            style={{
                                backgroundColor: '#704BBF',
                                width: '90%',
                                height: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 8,
                            }}
                        >
                            <Text style={{ fontWeight: '700', color: 'white' }}>BUY</Text>
                        </Pressable>

                    </View>
                </View>
                <View style={{
                    height: 25,
                    alignItems: 'center',
                    justifyContent: "center"
                }}>

                </View>
            </Animated.View>

        </View>
    )
}

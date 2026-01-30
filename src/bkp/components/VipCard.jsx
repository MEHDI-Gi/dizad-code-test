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
import { MaterialIcons, Foundation, Ionicons, MaterialCommunityIcons, Entypo, FontAwesome6 } from '@expo/vector-icons';
import { DataContext } from '../context/contextData';

import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    withSpring
} from 'react-native-reanimated';

import VipMonthly from '../context/VipMonthly';

export default function VipCard(props) {
    const {
        vipPlansCard, setVipPlansCard,
        heartsCard, setHeartsCard,
        setHelpPoint,
        colors, userPlan,
        dataLevelIndex, setDataLevelIndex,
        updateQuestIndex, updateAnswerStats,
        questIndices, answerStats,
        percentage,
        currentQuestionsIndex, currentLevelIndex,
        livesHeart, setLivesHeart, livesHeartEnd,
        timeLeft, setUserPlan, vipCard, setVipCard,
    } = useContext(DataContext);

    const [backEffect, setBackEffect] = useState(false)

    const heartCardAnim = useSharedValue(1000); // start closed (down)

    const timeOutConfig = {
        duration: 300,
        easing: Easing.out(Easing.exp),
    };

    const heartCardAnimStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: withTiming(heartCardAnim.value, timeOutConfig) }],
    }));

    useEffect(() => {
        if (vipCard) {
            setBackEffect(true)
            // Open: animate to position 0 (up)
            heartCardAnim.value = 0;
        } else {

            // Close: animate back down to 400
            heartCardAnim.value = 1000;
        }
    }, [vipCard]);

    const vipItems = [
        { label: 'Unlimited Hearts' },
        { label: 'Unlock all Theams' },
        { label: 'Get 50 Help Points every 24h' },
        { label: 'Unlock all Quiz Categories' },
        { label: 'No Ads' },
    ]


    return (
        <View style={[{
            width: '100%', height: '100%',
            top: 0,
            position: 'absolute',
            zIndex: 99999,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
        }]}>
            <Pressable
                style={{
                    width: '100%', height: '100%',
                    top: 0,
                    position: 'absolute',
                    backgroundColor: !backEffect ? 'transparent' : '#0000002f',
                }}
                onPress={() => {
                    heartCardAnim.value = 1000;
                    setBackEffect(false)
                    const timeout = setTimeout(() => {
                        setVipCard(false)
                    }, 330);

                    return () => clearTimeout(timeout);
                }} />
            <Animated.View style={[heartCardAnimStyle, {
                width: '95%',
                backgroundColor: colors.secondary,
                zIndex: 99999,
                borderRadius: 10,
                alignContent: 'center',
                alignItems: 'center',
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
                        width: 50,
                        flexDirection: 'row',
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Ionicons
                            size={15}
                            name='diamond-sharp'
                            color={'#dba400'}
                        />
                    </View>
                    <View style={{
                        height: 50,
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: "center"
                    }}>

                        <Text style={{ color: "white", fontWeight: '800' }}>VIP member</Text>


                    </View>
                    <View style={{
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row'
                    }}>

                        <Pressable
                            android_ripple={{ color: colors.primary, borderless: false }}
                            onPress={() => {
                                setVipCard(false)

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
                    alignItems: 'center',
                    justifyContent: "flex-start",
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}>
                    {vipItems.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    flexDirection: 'row',
                                    width: '85%',
                                    alignItems: 'center',
                                    justifyContent: "flex-start",
                                    borderColor: 'gray',
                                    borderWidth: 0,
                                    height: 35,
                                    borderRadius: 8,
                                    marginVertical: 2,
                                }}>
                                {true &&
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={{
                                            position: "absolute",
                                            bottom: 0,
                                            width: '100%',
                                            height: '100%',
                                            opacity: 0.7
                                        }}
                                        colors={['#dba400b6', '#dba40053', '#dba4002a', '#dba40016', 'rgba(0, 0, 0, 0)']}
                                    />}
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 40,
                                    height: 40
                                }}>
                                    <MaterialCommunityIcons
                                        name="check"
                                        color="#ffffffff"
                                        size={16}

                                    />
                                </View>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{ color: "white", fontWeight: '600' }}>{item.label}</Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
                <View style={{
                    height: 50,
                    alignItems: 'center',
                    justifyContent: "center",
                    flexDirection: 'row'
                }}>
                    <Text style={{ color: "lightgray", fontWeight: '600' }}>VIP Membership TimeLeft: </Text>
                    <Text style={{ color: "white", fontWeight: '700' }}>
                        {userPlan === 'monthly' ? '30day' : 'lifeTime' ? 'LifeTime' : 'undefind'}
                    </Text>
                </View>
                <Pressable
                    style={{ paddingVertical: 6 }}
                    onPress={() => setUserPlan(false)}
                >
                    <Text style={{ color: "lightgray", fontWeight: '600' }}>Reset</Text>

                </Pressable>
            </Animated.View>

        </View>
    )
}

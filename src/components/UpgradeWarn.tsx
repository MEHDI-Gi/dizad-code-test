import {
    BackHandler,
    Text,
    View,
    StyleSheet,
    Image,
    StatusBar,
    ActivityIndicator,
    Pressable,
    Vibration,
    Modal,
    Linking
} from 'react-native';
import React, { useRef, useState, useContext, useEffect } from 'react';
import {
    RewardedAd,
    RewardedAdEventType,
    TestIds,
    AdEventType,
} from 'react-native-google-mobile-ads';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { DataContext } from '../context/contextData';
import { useColors } from '../hooks/useColors';
import { useVip } from '../hooks/useVip';
import { useSize } from '../hooks/useSize';
import { useAd } from '../hooks/useAd';
import Dots from './elements/Dots';
const rewardedAd = RewardedAd.createForAdRequest(TestIds.REWARDED);

export default function UpgradeWarn() {
    const { userPlan, setUserPlan } = useVip()
    const {
        upgradeWarn, setUpgradeWarn,
        setUpgradeCard
    } = useContext(DataContext);
    const colors = useColors();
    const { screen,
        widthScale,
        heightScale,
        sizeScale,
    } = useSize();


    // const [activePlan, setActivePlan] = useState(null);

    // const handleSubscribe = async () => {
    //     // No parentheses after auth!
    //     const currentUser = auth.currentUser;

    //     if (!activePlan || !currentUser) {
    //         console.log("Cannot subscribe: No plan selected or user not found");
    //         return;
    //     }

    //     try {
    //         // 1. Write to Firebase (The Master Truth)
    //         // Note: Using your 'database' export from config
    //         await update(ref(database, `users/${currentUser.uid}`), {
    //             UserPlan: activePlan
    //         });

    //         // 2. Update local state
    //         setUserPlan(activePlan);

    //         // 3. Close the card
    //         setVipCard(true);
    //         setUpgradeCard(false);

    //         console.log("✅ Firebase updated with plan:", activePlan);
    //     } catch (error) {
    //         console.error("❌ Firebase update failed:", error);
    //     }
    // };

    // const plansListPress = (item: { label: any; price?: string; planType: any; }) => {
    //     setActivePlan(item.label === item.planType ? null : item.planType);

    //     // Toggle or switch
    // };
    // const plansList = [
    //     { label: 'Lifetime Purchase plan', price: '500 da', period: 'lifetime' }
    // ]

    const vipItems = [
        { label: 'Unlimited Hearts' },
        { label: 'Unlock Tests' },
        { label: 'Infinite Bookmarks' },
        { label: 'Unlock Priority' },
        { label: 'No Ads' },
    ]
    const ad = useAd();

    const [adsLoading, setAdsLoading] = useState(false);

    const watchAd = () => {
        setAdsLoading(true)
        const timer = setTimeout(() => {
            ad.isLoaded && ad.show();
        }, 500);
        setAdsLoading(false);

        return () => clearTimeout(timer);
    };

    return (
        <Modal
            visible={upgradeWarn}
            onRequestClose={() => setUpgradeWarn(false)}
            transparent
            animationType="slide"
        >
            <View style={{
                width: "100%", height: "100%",
                top: 0,
                backgroundColor: 'transparent',
                position: 'absolute',
                zIndex: 9999999,
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
            }} >
                <Pressable
                    style={{
                        position: 'absolute',
                        zIndex: 0,
                        width: "100%", height: "100%",
                        backgroundColor: '#0000002f',
                    }}
                    onPress={() => { setUpgradeWarn(false) }} />

                <View style={[{

                    backgroundColor: colors.secondary,
                    zIndex: 9,
                    borderRadius: 10,
                    width: '90%',
                    alignContent: 'center',
                    justifyContent: 'flex-start',
                    elevation: 5,
                }]}>

                    <View style={{
                        width: '100%',
                        height: heightScale(40),
                        justifyContent: "space-between",
                        flexDirection: 'row'
                    }}>
                        <Dots />
                        <View style={{
                            width: widthScale(50),
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            flexDirection: 'row'
                        }}>

                            <Pressable
                                android_ripple={{ color: colors.primary, borderless: false, foreground: true }}
                                onPress={() => {
                                    setUpgradeWarn(false)
                                }}
                                style={{
                                    width: widthScale(50),
                                    height: heightScale(50),
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <MaterialCommunityIcons
                                    name='close'
                                    color={'lightgray'}
                                    size={sizeScale(20)}
                                />
                            </Pressable>
                        </View>
                    </View>

                    <View style={{
                        width: '100%',
                        paddingHorizontal: sizeScale(50),
                        paddingVertical: sizeScale(10),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            color: colors.text.primary,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            lineHeight: sizeScale(25),
                            fontSize: sizeScale(16)
                        }}>UPGRADE to Premium to unlock all levels and features</Text>
                    </View>

                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: sizeScale(20),
                        rowGap: sizeScale(20),
                    }}>
                        <Pressable
                            android_ripple={{ color: colors.secondary, borderless: false, foreground: true }}
                            onPress={watchAd}
                            style={[{
                                backgroundColor: 'orange',
                                width: '60%',
                                flexDirection: "row",
                                height: heightScale(40),
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 8,
                            }]}
                        >
                            {adsLoading ? <Text style={{ fontSize: sizeScale(15), fontWeight: 'bold', color: 'black' }}>
                                WATCH Ad</Text> : <ActivityIndicator size={20} color={'black'} />}
                        </Pressable>
                        <Pressable
                            android_ripple={{ color: colors.secondary, borderless: false, foreground: true }}
                            onPress={() => { setUpgradeWarn(false); setUpgradeCard(true) }}
                            style={[{
                                flexDirection: "row",
                                alignItems: 'center',
                                justifyContent: 'center',
                            }]}
                        >
                            <Text style={{ fontSize: sizeScale(14), fontWeight: 'bold', color: colors.text.secondary }}>
                                Get Premium VIP</Text>
                        </Pressable>
                    </View>
                </View>

            </View>
        </Modal>
    )
}

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
    Modal
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

import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    withSpring
} from 'react-native-reanimated';
import { useColors } from '../hooks/useColors';
import { useVip } from '../hooks/useVip';
import { auth, database } from '../context/firebaseConfig';
import { ref, update } from '@react-native-firebase/database';
const rewardedAd = RewardedAd.createForAdRequest(TestIds.REWARDED);

export default function VipPlansCard() {
    const { userPlan, setUserPlan } = useVip()
    const {
        heartsCard, setHeartsCard, setVipCard,
        vipPlansCard, setVipPlansCard,
        setHelpPoint,
        helpPoint,
        quizData,
        answersRef,
        globTrueAns, setGlobTrueAns,
        globFalseAns,
        setGlobFalseAns,
    } = useContext(DataContext);
    const colors = useColors();



    const [activePlan, setActivePlan] = useState(null);

    const handleSubscribe = async () => {
        // No parentheses after auth!
        const currentUser = auth.currentUser;

        if (!activePlan || !currentUser) {
            console.log("Cannot subscribe: No plan selected or user not found");
            return;
        }

        try {
            // 1. Write to Firebase (The Master Truth)
            // Note: Using your 'database' export from config
            await update(ref(database, `users/${currentUser.uid}`), {
                UserPlan: activePlan
            });

            // 2. Update local state
            setUserPlan(activePlan);

            // 3. Close the card
            setVipCard(true);
            setVipPlansCard(false);

            console.log("✅ Firebase updated with plan:", activePlan);
        } catch (error) {
            console.error("❌ Firebase update failed:", error);
        }
    };

    const plansListPress = (item: { label: any; price?: string; planType: any; }) => {
        setActivePlan(item.label === item.planType ? null : item.planType);

        // Toggle or switch
    };
    const plansList = [
        { label: 'Monthly plan', price: '0.99$', planType: 'monthly', period: 'month' },
        { label: 'Yearly plan', price: '10.00$', planType: 'yearly', period: 'year' },
        { label: 'Lifetime plan', price: '20.00$', planType: 'lifetime', period: 'lifetime' }
    ]

    const vipItems = [
        { label: 'Unlimited Hearts' },
        { label: 'Unlock all Theams' },
        { label: 'Get Daily Help Points' },
        { label: 'Unlock all Quiz Categories' },
        { label: 'No Ads' },
    ]

    return (
        <Modal
            visible={vipPlansCard}
            onRequestClose={() => setVipPlansCard(false)}
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
                alignItems: 'center',
            }} >
                <Pressable style={
                    {
                        width: "100%", height: "100%",
                        backgroundColor: '#0000002f',

                    }
                }
                    onPress={() => {
                        setVipPlansCard(false)
                    }

                    }>

                </Pressable>
                <View style={[{
                    backgroundColor: colors.secondary,
                    position: 'absolute',
                    bottom: 0,
                    zIndex: 99999,
                    borderTopEndRadius: 10,
                    borderTopStartRadius: 10,
                    width: '100%', height: '60%',
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
                            width: 50,
                            flexDirection: 'row',
                            paddingHorizontal: 10,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }}>
                            <Ionicons
                                size={15}
                                name='diamond-sharp'
                                color={'#30e3cbff'}
                            />
                        </View>
                        <View style={{
                            height: 50,
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: "center"
                        }}>

                            <Text style={{
                                color: 'lightgray',
                                fontSize: 16
                            }}>Upgrade to Premium</Text>

                        </View>
                        <View style={{
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            flexDirection: 'row'
                        }}>

                            <Pressable
                                android_ripple={{ color: colors.primary, borderless: false }}
                                onPress={() => {
                                    setVipPlansCard(false)

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
                        justifyContent: 'center'
                    }}>
                        {vipItems.map((item, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        flexDirection: 'row',
                                        width: '90%',
                                        alignItems: 'center',
                                        justifyContent: "flex-start",
                                        borderColor: 'gray',
                                        borderWidth: 0,
                                        height: 30,
                                        borderRadius: 8,
                                    }}>
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 40,
                                        height: 40
                                    }}>
                                        <MaterialCommunityIcons
                                            name="check-circle"
                                            color="orange"
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
                        width: '100%',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {plansList.map((item, index) => {
                            return (
                                <Pressable
                                    key={index}
                                    android_ripple={{ color: colors.secondary, borderless: false }}
                                    onPress={() => plansListPress(item)}
                                    style={{
                                        backgroundColor: colors.primary,
                                        borderColor: activePlan === item.planType ? 'orange' : 'transparent',
                                        borderWidth: 1,
                                        marginVertical: 5,
                                        width: '90%',
                                        height: 50,
                                        paddingHorizontal: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        borderRadius: 8,
                                    }}
                                >
                                    {activePlan === item.planType &&
                                        <MaterialCommunityIcons
                                            name="check-circle"
                                            color={colors.primary}
                                            size={16}
                                            style={{
                                                backgroundColor: 'orange',
                                                borderRadius: 50,
                                                position: "absolute",
                                                right: -5,
                                                top: -5
                                            }}
                                        />}
                                    <View style={{
                                        height: 30,
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={{ fontWeight: '700', color: colors.text.primary }}>{item.label}</Text>
                                    </View>
                                    <View style={{
                                        height: 30,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={{ fontWeight: '700', color: colors.text.primary }}>{item.price}</Text>
                                        <Text style={{ fontWeight: '600', color: colors.text.primary }}> / </Text>
                                        <Text style={{ fontWeight: '600', color: colors.text.primary }}>{item.period}</Text>
                                    </View>
                                </Pressable>
                            )
                        })}
                    </View>
                    <View style={{
                        width: '100%',
                        paddingBottom: 15,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Pressable
                            android_ripple={{ color: colors.secondary, borderless: false }}
                            onPress={handleSubscribe}
                            disabled={!activePlan}
                            style={[{
                                backgroundColor: 'orange',
                                width: '90%',
                                height: 45,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 8,
                            }, !activePlan && { opacity: 0.7 }]}
                        >
                            <Text style={{ fontWeight: '700' }}>Subscribe</Text>
                        </Pressable>
                    </View>
                </View>

            </View>
        </Modal>
    )
}

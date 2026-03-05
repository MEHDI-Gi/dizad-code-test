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
import { useSize } from '../hooks/useSize';
const rewardedAd = RewardedAd.createForAdRequest(TestIds.REWARDED);

export default function UpgradeCard() {
    const { userPlan, setUserPlan } = useVip()
    const {
        upgradeCard, setUpgradeCard,
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
        { label: 'Unlimited Hearts' },
        { label: 'Unlock Tests' },
        { label: 'Infinite Bookmarks' },
        { label: 'Unlock Priority' },
        { label: 'No Ads' },
    ]

    return (
        <Modal
            visible={upgradeCard}
            onRequestClose={() => setUpgradeCard(false)}
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
                <Pressable
                    style={{
                        width: "100%", height: "100%",
                        backgroundColor: '#0000002f',
                    }}
                    onPress={() => { setUpgradeCard(false) }} />

                <View style={[{
                    backgroundColor: colors.secondary,
                    position: 'absolute',
                    bottom: 0,
                    zIndex: 99999,
                    borderTopEndRadius: 10,
                    borderTopStartRadius: 10,
                    width: '100%', height: '70%',
                    alignContent: 'center',
                    justifyContent: 'flex-start',
                    elevation: 5,
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
                                    setUpgradeCard(false)

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
                        padding: sizeScale(10),
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image
                            source={require('../assets/tele-qr.jpg')}
                            style={{
                                backgroundColor: colors.primary,
                                marginVertical: 5,
                                width: widthScale(screen.width * 0.45),
                                height: heightScale(screen.width * 0.45),
                                paddingHorizontal: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderRadius: 8,
                            }}
                        />
                    </View>
                    <View style={{
                        width: '100%',
                        paddingHorizontal: sizeScale(20),
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: sizeScale(6),
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}>
                        {vipItems.map((item, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: "flex-start",
                                        borderColor: 'gray',
                                        borderWidth: 0,
                                        height: heightScale(30),
                                        borderRadius: 8,
                                        backgroundColor: colors.primary,

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
                                        paddingHorizontal: 5
                                    }}>
                                        <Text style={{ color: "white", fontWeight: '600' }}>{item.label}</Text>
                                    </View>
                                </View>
                            )
                        })}

                    </View>


                    <View style={{
                        width: '100%',
                        height: 90,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} />
                    
                    <View style={{
                        width: '100%',
                        paddingBottom: sizeScale(30),
                        position: 'absolute',
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        rowGap: sizeScale(20),
                    }}>
                        <Text style={{ fontWeight: '500', color: colors.text.primary }}>Get Lifetime VIP</Text>
                        <Pressable
                            android_ripple={{ color: colors.secondary, borderless: false, foreground: true }}
                            onPress={() => { Linking.openURL('https://t.me/+lXpXxnihJOo4NDJk') }}
                            style={[{
                                backgroundColor: 'orange',
                                width: '85%',
                                flexDirection: "row",
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 8,
                            }]}
                        >
                            <Text style={{ fontSize: sizeScale(17), fontWeight: 'bold', color: 'black' }}>700 da</Text>
                            <Text style={{ fontSize: sizeScale(16), fontWeight: 'bold', color: 'black' }}> | </Text>
                            <Text style={{ fontSize: sizeScale(16), fontWeight: 'bold', color: 'black' }}>Lifetime</Text>

                            {/* <Text style={{ fontWeight: 'bold', color: 'black' }}>CONTACT US</Text> */}
                        </Pressable>
                    </View>
                </View>

            </View>
        </Modal>
    )
}

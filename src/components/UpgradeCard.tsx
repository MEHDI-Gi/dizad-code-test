import {
    Text,
    View,
    Image,
    Pressable,
    Modal,
    Linking
} from 'react-native';
import React, { useRef, useState, useContext, useEffect } from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DataContext } from '../context/contextData';
import { useColors } from '../hooks/useColors';
import { useVip } from '../hooks/useVip';
import { useSize } from '../hooks/useSize';
import Dots from './elements/Dots';

export default function UpgradeCard() {
    const { userPlan, setUserPlan } = useVip()
    const {
        upgradeCard, setUpgradeCard, setUpgradeTutu
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
                justifyContent: 'flex-end',
                alignItems: 'center',
            }} >
                <Pressable
                    style={{
                        position: 'absolute',
                        zIndex: 0,
                        width: "100%", height: "100%",
                        backgroundColor: '#0000002f',
                    }}
                    onPress={() => { setUpgradeCard(false) }} />

                <View style={[{

                    backgroundColor: colors.secondary,
                    zIndex: 9,
                    // borderTopEndRadius: sizeScale(20),
                    // borderTopStartRadius: sizeScale(20),
                    width: '100%',
                    alignContent: 'center',
                    justifyContent: 'flex-start',
                    elevation: 5,
                }]}>

                    <View style={{
                        width: '100%',
                        height: heightScale(50),
                        alignItems: 'center',
                        justifyContent: "space-between",
                        flexDirection: 'row'
                    }}>
                        <Dots />
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '100%',
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: "center"
                        }}>

                            <Text style={{
                                color: colors.text.secondary,
                                fontSize: sizeScale(16),
                                fontWeight: 'bold'
                            }}>UPGRADE to Premium</Text>

                        </View>
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
                                    setUpgradeCard(false)
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
                                    color={colors.text.secondary}
                                    size={sizeScale(20)}
                                />
                            </Pressable>
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        rowGap: sizeScale(15),
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}>
                        <Image
                            source={require('../assets/tele-qr.jpg')}
                            resizeMode='cover'
                            style={{
                                backgroundColor: colors.primary,
                                height: heightScale(screen.width * 0.50),
                                width: widthScale(screen.width * 0.50),
                                borderRadius: 15,
                            }}
                        />
                        <Pressable
                            android_ripple={{ color: colors.text.secondary, borderless: false, foreground: true }}
                            onPress={() => {
                                //npm install @react-native-clipboard/clipboard
                            }}
                            style={{
                                backgroundColor: colors.primary,
                                zIndex: 9,
                                borderRadius: sizeScale(12),
                                paddingVertical: sizeScale(8),
                                paddingHorizontal: sizeScale(8),
                                columnGap: sizeScale(15),
                                flexDirection: 'row',
                                alignContent: 'center',
                                justifyContent: 'space-between',
                                overflow: 'hidden'
                            }}>
                            <View style={{
                                alignContent: 'center',
                                justifyContent: 'center',
                            }}>

                                <Text style={{
                                    color: colors.text.secondary,
                                    fontSize: sizeScale(14),
                                    fontWeight: 'bold'
                                }}>https://t.me/+lXpXxnihJOo4NDJk</Text>
                            </View>
                            <View style={{
                                backgroundColor: colors.secondary,
                                zIndex: 9,
                                borderRadius: sizeScale(10),
                                paddingVertical: sizeScale(8),
                                paddingHorizontal: sizeScale(8),
                                alignContent: 'center',
                                justifyContent: 'center',
                            }}>

                                <MaterialCommunityIcons
                                    name='content-copy'
                                    color={colors.text.primary}
                                    size={sizeScale(20)}
                                />
                            </View>
                        </Pressable>
                    </View>
                    <View style={{
                        width: '100%',
                        paddingVertical: sizeScale(10),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
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
                                            elevation: 2
                                        }}>
                                        <View style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: widthScale(40),
                                            height: heightScale(40)
                                        }}>
                                            <MaterialCommunityIcons
                                                name="check-circle"
                                                color="orange"
                                                size={sizeScale(16)}
                                            />
                                        </View>
                                        <View style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingRight: sizeScale(10)
                                        }}>
                                            <Text style={{ color: colors.text.primary, fontWeight: '600', fontSize: sizeScale(14) }}>{item.label}</Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </View>


                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: sizeScale(20),
                        rowGap: sizeScale(20),
                    }}>
                        <View style={{
                            width: '100%',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            columnGap: sizeScale(10),
                        }}>

                            <Text style={{ fontWeight: '500', color: colors.text.secondary }}>Get Lifetime VIP for Only :</Text>
                            <Text style={{ fontSize: sizeScale(17), fontWeight: 'bold', color: colors.text.primary }}>
                                700 da</Text>
                        </View>
                        <Pressable
                            android_ripple={{ color: colors.secondary, borderless: false, foreground: true }}
                            onPress={() => { Linking.openURL('https://t.me/+lXpXxnihJOo4NDJk') }}
                            style={[{
                                backgroundColor: 'orange',
                                width: '85%',
                                flexDirection: "row",
                                height: heightScale(40),
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 8,
                            }]}
                        >
                            <Text style={{ fontSize: sizeScale(17), fontWeight: 'bold', color: 'black' }}>
                                UPGRADE</Text>
                            {/* <Text style={{ fontWeight: 'bold', color: 'black' }}>CONTACT US</Text> */}
                        </Pressable>

                    </View>
                    <Pressable
                        android_ripple={{ color: colors.secondary, borderless: false, foreground: true }}
                        onPress={() => {
                            setUpgradeTutu(true)

                        }}
                        style={[{
                            paddingVertical: sizeScale(12),
                            flexDirection: "row",
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 8,
                        }]}
                    >
                        <Text style={{ fontSize: sizeScale(13), fontWeight: 'bold', color: colors.text.secondary }}>
                            How to UPGRADE ?</Text>
                        {/* <Text style={{ fontWeight: 'bold', color: 'black' }}>CONTACT US</Text> */}
                    </Pressable>
                </View>

            </View>
        </Modal>
    )
}

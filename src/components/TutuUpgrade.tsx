import {
    Text,
    View,
    Image,
    Pressable,
    Modal,
    Linking,
    ScrollView
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
        upgradeTutu, setUpgradeTutu,
    } = useContext(DataContext);
    const colors = useColors();
    const { screen,
        widthScale,
        heightScale,
        sizeScale,
    } = useSize();
    const img1 = require('../assets/tele-qr.jpg')
    const img2 = require('../assets/555.png')
    const scr1 = require('../assets/555.png')
    const steps = [
        {
            label: 'Step 1',
            scr: scr1,
            img: img1,
            des: [
                'scan the QR Code with your phone',
                'copy and open the link in your browser',
                "if you Already have Telegram installed you can access directly on press UPGRADE Buuton",
            ]
        },
        { label: 'Step 2', img: '', des: ['follow the instructions on the page'] },
        { label: 'Step 3' },
        { label: 'Step 4' },
        { label: 'Step 5' },
    ]

    return (
        <Modal
            visible={upgradeTutu}
            onRequestClose={() => setUpgradeTutu(false)}
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
                <View style={[{
                    backgroundColor: colors.secondary,
                    zIndex: 9,
                    width: '100%',
                    height: '100%',
                    alignContent: 'center',
                    justifyContent: 'flex-start',
                    elevation: 5,
                }]}>
                    <View style={{
                        width: '100%',
                        height: heightScale(50),
                        alignItems: 'center',
                        justifyContent: "space-between",
                        flexDirection: 'row',
                        zIndex: 9,
                        position: 'absolute',
                        top: 0,
                    }}>

                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                top: 0,
                                backgroundColor: colors.secondary,
                                opacity: 0.9,
                            }}
                        />
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
                            }}>UPGRADE Tutorial</Text>
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
                                    setUpgradeTutu(false)
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
                    <ScrollView
                        contentContainerStyle={{
                            paddingVertical: sizeScale(60),
                            rowGap: sizeScale(20),

                        }}>
                        {steps.map((itm: any, idx: any) => {
                            return (
                                <View style={{
                                    width: '100%',
                                    rowGap: sizeScale(10),
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                }}>
                                    <Text style={{
                                        paddingHorizontal: sizeScale(30),
                                        alignSelf: 'flex-start',
                                        color: colors.text.secondary,
                                        fontSize: sizeScale(18),
                                        fontWeight: 'bold'
                                    }}>{itm?.label}</Text>
                                    <View style={{
                                        width: '70%',
                                        rowGap: sizeScale(5),
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                    }}>
                                        <Text style={{
                                            lineHeight: sizeScale(20),
                                            textAlign: 'center',
                                            color: colors.text.secondary,
                                            fontSize: sizeScale(15),
                                            fontWeight: 'bold'
                                        }}>{itm?.des?.[0]}</Text>
                                    </View>

                                    <View style={{
                                        width: '100%',
                                        rowGap: sizeScale(10),
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                    }}>
                                        <Image
                                            source={itm?.img}
                                            resizeMode='cover'
                                            style={{
                                                backgroundColor: colors.primary,
                                                height: heightScale(screen.width * 0.50),
                                                width: widthScale(screen.width * 0.50),
                                                borderRadius: 15,
                                            }}
                                        />
                                        <Text style={{
                                            color: colors.text.secondary,
                                            fontSize: sizeScale(18),
                                            fontWeight: 'bold'
                                        }}>or</Text>
                                        <View style={{
                                            width: '70%',
                                            rowGap: sizeScale(5),
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                        }}>

                                            <Text style={{
                                                lineHeight: sizeScale(20),
                                                textAlign: 'center',
                                                color: colors.text.secondary,
                                                fontSize: sizeScale(15),
                                                fontWeight: 'bold'
                                            }}>{itm?.des?.[1]}</Text>
                                        </View>
                                        {idx === 0 && <Pressable
                                            android_ripple={{ color: colors.text.secondary, borderless: false, foreground: true }}
                                            onPress={() => {
                                            }}
                                            style={{
                                                backgroundColor: colors.primary,
                                                zIndex: 9,
                                                borderRadius: sizeScale(12),
                                                paddingVertical: sizeScale(8),
                                                paddingHorizontal: sizeScale(8),
                                                width: sizeScale(screen.width * 0.75),
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
                                        </Pressable>}
                                        <Image
                                            source={itm?.scr}
                                            resizeMode='cover'
                                            style={{
                                                backgroundColor: colors.primary,
                                                height: heightScale(screen.width * 0.80),
                                                width: widthScale(screen.width * 0.65),
                                                borderRadius: 15,
                                            }}
                                        />
                                        <Text style={{
                                            color: colors.text.secondary,
                                            fontSize: sizeScale(18),
                                            fontWeight: 'bold'
                                        }}>or</Text>
                                        <View style={{
                                            width: '70%',
                                            rowGap: sizeScale(5),
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                        }}>
                                            <Text style={{
                                                lineHeight: sizeScale(20),
                                                textAlign: 'center',
                                                color: colors.text.secondary,
                                                fontSize: sizeScale(15),
                                                fontWeight: 'bold'
                                            }}>{itm?.des?.[2]}</Text>
                                        </View>
                                    </View>

                                </View>
                            )
                        })}
                        <View style={{
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingTop: sizeScale(20),
                            rowGap: sizeScale(10),
                        }}>
                            <Text style={{ fontSize: sizeScale(13), fontWeight: 'bold', color: colors.text.secondary }}>
                                Continue to UPGRADE</Text>
                            <Pressable
                                android_ripple={{ color: colors.secondary, borderless: false, foreground: true }}
                                onPress={() => {
                                    setUpgradeTutu(false)
                                }}
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
                    </ScrollView>

                </View>

            </View>
        </Modal>
    )
}

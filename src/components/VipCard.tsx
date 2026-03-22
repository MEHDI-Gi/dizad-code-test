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
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DataContext } from '../context/contextData';
import { useColors } from '../hooks/useColors';
import { useVip } from '../hooks/useVip';
import { useSize } from '../hooks/useSize';
import Dots from './elements/Dots';




export default function VipCard() {
    const { userPlan, setUserPlan } = useVip()

    const {
        upgradeCard, setUpgradeCard,
        heartsCard, setHeartsCard,
        setHelpPoint,
        dataLevelIndex, setDataLevelIndex,
        updateQuestIndex, updateAnswerStats,
        questIndices, answerStats,
        percentage,
        currentQuestionsIndex, currentLevelIndex,
        livesHeart, setLivesHeart, livesHeartEnd,
        vipCard, setVipCard,
    } = useContext(DataContext);
    const { lessons, screen,
        widthScale,
        heightScale,
        sizeScale,
    } = useSize();
    const colors = useColors();
    const vipItems = [
        { label: 'Unlimited Hearts' },
        { label: 'Unlock all Theams' },
        { label: 'Get 50 Help Points every 24h' },
        { label: 'Unlock all Quiz Categories' },
        { label: 'No Ads' },
    ]


    return (
        <Modal
            visible={vipCard}
            onRequestClose={() => setVipCard(false)}
            transparent
            animationType="slide">
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
                        backgroundColor: '#0000002f',
                    }}
                    onPress={() => {
                        setVipCard(false)
                    }} />
                <View style={[{
                    width: '90%',
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
                        height: 40,
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
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: "center"
                        }}>
                            <Text style={{ color: "white", fontWeight: '800' }}>VIP member</Text>
                        </View>
                        <View style={{
                            width: 50,
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row'
                        }}>

                            <Pressable
                                android_ripple={{ color: colors.primary, borderless: false, foreground: true }}
                                onPress={() => {
                                    setVipCard(false)
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
                        paddingVertical: sizeScale(10),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <View style={{
                            width: '100%',
                            paddingHorizontal: sizeScale(20),
                            paddingVertical: sizeScale(10),
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
                        height: 50,
                        alignItems: 'center',
                        justifyContent: "center",
                        flexDirection: 'row'
                    }}>
                        <Text style={{ color: "lightgray", fontWeight: '600' }}>VIP Membership TimeLeft: </Text>
                        <Text style={{ color: "white", fontWeight: '700' }}>
                            {userPlan === 'monthly' ? '30 day' : userPlan === 'yearly' ? 'LifeTime' : userPlan === 'lifeTime' ? 'LifeTime' : null}
                        </Text>
                    </View>
                </View>

            </View>

        </Modal>
    )
}

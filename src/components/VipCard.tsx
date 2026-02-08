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




export default function VipCard() {
    const { userPlan, setUserPlan } = useVip()

    const {
        vipPlansCard, setVipPlansCard,
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
                            {userPlan === 'monthly' ? '30 day' : userPlan === 'yearly' ? 'LifeTime' : userPlan === 'lifeTime' ? 'LifeTime' : null}
                        </Text>
                    </View>
                </View>

            </View>

        </Modal>
    )
}

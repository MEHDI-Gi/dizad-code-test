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

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useColors } from '../hooks/useColors';


export default function FreeCard() {
    const {
        upgradeCard, setUpgradeCard,
        heartsCard, setHeartsCard,
        setHelpPoint,
        dataLevelIndex, setDataLevelIndex,
        updateQuestIndex, updateAnswerStats,
        questIndices, answerStats,
        percentage,
        currentQuestionsIndex, currentLevelIndex,
        freeCard, setFreeCard
    } = useContext(DataContext);
    const colors = useColors();


    // useEffect(() => {
    //     if (freeCard) {
    //         setBackEffect(true)
    //         // Open: animate to position 0 (up)
    //         heartCardAnim.value = 0;
    //     } else {

    //         // Close: animate back down to 400
    //         heartCardAnim.value = 1000;
    //     }
    // }, [freeCard]);

    const freeItems = [
        { label: 'Unlimited Hearts' },
        { label: 'Unlock all Theams' },
        { label: 'Get 50 Help Points every 24h' },
        { label: 'Unlock all Quiz Categories' },
        { label: 'No Ads' },
    ]


    return (
        <Modal
            visible={freeCard}
            onRequestClose={() => setFreeCard(false)}
            transparent
            animationType="slide"
        >
            <View style={[{
                width: '100%',
                flex: 1,
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
                        setFreeCard(false)
                    }} />
                <View style={[{
                    width: '90%',
                    height: '60%',
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
                                color={colors.text.secondary}
                            />
                        </View>
                        <View style={{
                            height: 50,
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: "center"
                        }}>

                            <Text style={{ color: colors.text.secondary, fontWeight: '800' }}>FREE member</Text>


                        </View>
                        <View style={{
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row'
                        }}>

                            <Pressable
                                android_ripple={{
                                    color: colors.primary,
                                    borderless: false,
                                    foreground: true
                                }}
                                onPress={() => {
                                    setFreeCard(false)
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
                                    color={colors.text.secondary}
                                    size={25}
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
                        {freeItems.map((item, index) => {
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
                                    {false &&
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
                                            colors={
                                                index < 3 ?
                                                    ['#dba400b6', '#dba40053', '#dba4002a', '#dba40016', 'rgba(0, 0, 0, 0)'] :
                                                    ['#db00006d', '#db000041', '#db000029', '#db00001a', 'rgba(0, 0, 0, 0)']
                                            }
                                        />}
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 40,
                                        height: 40
                                    }}>
                                        <FontAwesome6
                                            name={index < 3 ? "check" : "xmark"}
                                            color={colors.text.secondary}
                                            size={16}
                                        />
                                    </View>
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={{ color: colors.text.secondary, fontWeight: '600' }}>{item.label}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                    <View style={{
                        paddingVertical: 15,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: "center",
                        flexDirection: 'row'
                    }}>
                        <Pressable
                            android_ripple={{ color: colors.secondary, foreground: true, borderless: false }}
                            style={{
                                width: '70%',
                                height: 35,
                                borderRadius: 8,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: colors.button.primary
                            }}
                            onPress={() => {
                                setFreeCard(false)
                                setUpgradeCard(true)
                            }}
                        >
                            <Text style={{ color: 'black', fontWeight: '900' }}>CONTACT US</Text>

                        </Pressable>
                    </View>
                </View>

            </View>
        </Modal>
    )
}

import React, { useRef, useState, useContext, useEffect } from 'react';
import { RadioButton, Button, IconButton, Text, } from 'react-native-paper';
import { DataContext } from '../../context/contextData';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Statistics from '../home/Statistics';
import LinearGradient from 'react-native-linear-gradient';
import SnackBar from '../../components/elements/SnackBar';
import Switch from '../../components/elements/Switch';
import { View, Pressable } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';
// import Sound from 'react-native-sound';

export default function Sound() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile', 'RankScreen'>>();

    const {
        colors,
        resetAnswerStats, setVibrate, vibrate, playSound, sound, setSound,
        isGradient, setIsGradient, texts, language, SnackBarTransition,
    } = useContext(DataContext);
    const isFirstRun = useRef(true);
    // useEffect(() => {
    //     if (isFirstRun.current) {
    //         isFirstRun.current = false;  // skip the first run
    //         return;
    //     }
    //     setSnackOptions({ label: sound ? texts.soundEnable : texts.soundDisable, icon: sound ? 'volume-source' : 'volume-variant-off' })
    //     setSnackbarState(true);
    // }, [sound])

    return (
        <View style={{
            flex: 1,
            position: 'relative',
            flexDirection: "column",
            alignItems: 'center',
            backgroundColor: colors.primary
        }}>
            {isGradient &&
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 1
                    }}
                    colors={[colors.primary, colors.gradSec]}
                />}

            <View style={{
                width: "100%",
                alignItems: "center",
                paddingHorizontal: 10,
                justifyContent: "center",
            }}>
                <View style={{
                    flexDirection: language === 'arabic' ? 'row' : 'row-reverse',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: 47,
                    paddingHorizontal: 14,
                    marginVertical: 14,
                }}>
                    <View
                        style={{
                            overflow: 'hidden',
                            width: 26,
                            height: 26,
                            justifyContent: 'center',
                            borderRadius: 50,
                            alignItems: 'center',
                        }}>
                        <Pressable
                            onPress={() => {
                                navigation.navigate('Profile')
                            }}
                            android_ripple={{ color: colors.secondary, borderless: false }}
                            style={[{
                                width: 26,
                                height: 26,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }, language === 'english' ? {
                                transform: [{ rotate: '180deg' }]
                            } : {}]}>
                            <MaterialIcons
                                name='arrow-back-ios'
                                color={colors.secText}
                                size={13}
                            />
                        </Pressable>
                    </View>
                    <Text style={{
                        color: colors.priText,
                        fontFamily: "Cairo_600SemiBold",
                        fontSize: 15,
                    }}>{texts.soundEdt}</Text>
                </View>
                <View style={{
                    width: "97%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: colors.secondary,
                    borderWidth: 2,
                    borderRadius: 10,
                    overflow: 'hidden',
                    marginBottom: 5,
                }}>
                    <Pressable
                        android_ripple={{ color: colors.secondary, borderless: false }}
                        style={{
                            alignItems: "center",
                            width: "100%",
                            height: 47,
                            overflow: 'hidden',
                            justifyContent: "flex-start",
                            flexDirection: language === 'english' ? 'row' : 'row-reverse',
                        }}
                        onPress={() => {
                            setSound((prev: any) => !prev)
                            if (!sound) playSound('settingsButton')
                        }}>
                        <View style={{
                            width: 47,
                            height: 47,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>

                            <MaterialCommunityIcons
                                name={sound ? 'volume-source' : 'volume-variant-off'}
                                color={colors.secText}
                                size={17}
                                style={
                                    { paddingHorizontal: 10, }}
                            />
                        </View>
                        <View
                            style={[{
                                alignItems: "center",
                                flex: 1, height: 47,
                                flexDirection: 'row',
                                justifyContent: language === 'english' ? "flex-start" : "flex-end",

                            }]}
                        >

                            <Text style={{
                                color: colors.priText,
                                fontSize: 15,
                                fontFamily: "Cairo_600SemiBold",
                            }}>{texts.soundEdt}</Text>
                        </View>
                        <View style={{
                            width: 47,
                            height: 47,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Switch
                                width={28}
                                height={16}
                                borderColor={'#274c77'}
                                borderWidth={1}
                                radioFlex={sound ? 'flex-start' : 'flex-end'}
                                radioWidth={10}
                                radioHeight={10}
                                radioColor={sound ? '#274c77' : '#274c7766'}
                                direction={language === 'english' ? 'row-reverse' : 'row'}
                            />
                        </View>

                    </Pressable>
                </View>
            </View >
        </View >
    )
}

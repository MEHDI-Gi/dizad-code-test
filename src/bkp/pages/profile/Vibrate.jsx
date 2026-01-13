import React, { useRef, useState, useContext, useEffect } from 'react';
import { Alert, Portal, Modal, TouchableWithoutFeedback, Keyboard, Pressable, TextInput, BackgroundImage, Dimensions, StatusBar, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, View, Box, VStack, FormControl, Input, Radio, Divider, Checkbox, Card, Appbar, KeyboardAvoidingView, ScrollView, Platform, Vibration } from 'react-native';
import { RadioButton, Button, IconButton, } from 'react-native-paper';
import { DataContext } from '../../context/contextData';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Statistics from '../home/Statistics';
import * as Application from 'expo-application';
import { LinearGradient } from 'expo-linear-gradient';
import SnackBar from '../../components/elements/SnackBar';
import Switch from '../../components/elements/Switch';
// import Sound from 'react-native-sound';
const appVersion = Application.nativeApplicationVersion;

export default function Vibrate() {

    const navigation = useNavigation();

    const {
        colors,
        resetAnswerStats, setVibrate, vibrate, playSound, sound, setSound,
        isGradient, setIsGradient, texts, language,
        snackbarState, setSnackbarState, setSnackOptions
    } = useContext(DataContext);

    const [isVibrateChanged, setVibrateChanged] = useState(false)
    useEffect(() => {
        if (isVibrateChanged) {
            const timer = setTimeout(() => {
                setVibrateChanged(false);
            }, 3000);

            // Cleanup timeout if component unmounts or isSoundChanged changes before timeout
            return () => clearTimeout(timer);
        }
    }, [isVibrateChanged])
    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;  // skip the first run
            return;
        }
        setSnackOptions({ label: vibrate ? texts.vibrateEnable : texts.vibrateDisable, icon: vibrate ? 'vibrate' : 'vibrate-off' })
        setSnackbarState(true);
    }, [vibrate])


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
                position: 'relative',
                paddingHorizontal: 10,
                flexDirection: "column",
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
                <View style={{
                    flexDirection: language === 'english' ? 'row-reverse' : 'row',
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
                    }}>{texts.vibrateEdt}</Text>
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
                            setVibrate(prev => !prev);

                            if (!vibrate) {
                                Vibration.vibrate(200)
                            }
                        }}>
                        <View style={{
                            width: 47,
                            height: 47,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>

                            <MaterialCommunityIcons
                                name={vibrate ? 'vibrate' : 'vibrate-off'}
                                color={colors.secText}
                                size={17}
                                style={
                                    { paddingHorizontal: 10, }}
                            />
                        </View>
                        <View
                            style={[{
                                alignItems: "center",
                                justifyContent: 'center',
                                flex: 1, height: 47,
                                flexDirection: 'row',
                                justifyContent: language === 'english' ? "flex-start" : "flex-end",

                            }]}
                        >
                            <Text style={{
                                color: colors.priText,
                                fontSize: 15,
                                fontFamily: "Cairo_600SemiBold",
                            }}>{texts.vibrateEdt}</Text>
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
                                radioFlex={vibrate ? 'flex-start' : 'flex-end'}
                                radioWidth={10}
                                radioHeight={10}
                                radioColor={vibrate ? '#274c77' : '#274c7766'}
                                direction={language === 'english' ? 'row-reverse' : 'row'}
                            />

                        </View>

                    </Pressable>
                </View>
            </View>
        </View >
    )
}

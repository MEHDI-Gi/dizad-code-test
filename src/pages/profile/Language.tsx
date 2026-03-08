import React, { useRef, useState, useContext, useEffect } from 'react';
import { Alert, ActivityIndicator, Modal, Switch, TouchableWithoutFeedback, Keyboard, Pressable, TextInput, Dimensions, StatusBar, Text, Image, TouchableOpacity, StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform, Vibration } from 'react-native';
import { RadioButton, Button, IconButton, } from 'react-native-paper';
import { DataContext } from '../../context/contextData';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Statistics from '../../components/Statistics';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';

export default function Language() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile', 'RankScreen'>>();

    const {
        colors,
        playSound,
        sound,
        isGradient,
        language,
        setLanguage,
        texts,
        languagesList,
        setSnackbarState,
        setSnackOptions,
        loadingOptions, setLoadingOptions,
        loadScreen, setLoadScreen

    } = useContext(DataContext);


    type LanguageKey = keyof typeof languageMap; // 'arabic' | 'english'

    interface LanguageItem {
        label: string;
        condition: LanguageKey;
        icon: string;
    }

    const languageList: LanguageItem[] = [
        { label: texts.langAr, condition: 'arabic', icon: 'abjad-arabic', },
        { label: texts.langEn, condition: 'english', icon: 'alphabetical-variant', },
    ]
    const languageMap = {
        arabic: { lang: 'arabic', option: languagesList.arabic },
        english: { lang: 'english', option: languagesList.english },
    };
    const languageListPress = (item: LanguageItem) => {
        if (sound) playSound('settingsButton')
        const selected = languageMap[item.condition];
        if (item.condition !== language) {
            if (selected) {
                setLanguage(selected.lang)
            }
            setLoadScreen(true);

        }
    };
    useEffect(() => {
        if (loadScreen) setTimeout(() => {
            setSnackbarState(true)
        }, 3000);
        setLoadingOptions({ icon: language === 'english' ? 'alphabetical-variant' : 'abjad-arabic' })

        setSnackOptions({
            label: texts.languageChanged,
            icon: language === 'english' ? 'alphabetical-variant' : 'abjad-arabic'
        })
    }, [loadScreen])

    return (
        <View
            style={{
                width: "100%",
                backgroundColor: colors.primary,
                flex: 1,
                alignItems: 'center',
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
                            style={{
                                width: 26,
                                height: 26,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <MaterialIcons
                                name='arrow-back-ios'
                                color={colors.secText}
                                size={13}
                                style={[
                                    language === 'english' ? {
                                        transform: [{ rotate: '180deg' }]
                                    } : {}]}
                            />
                        </Pressable>
                    </View>
                    <Text style={{
                        color: colors.priText,
                        fontFamily: "Cairo_600SemiBold",
                        fontSize: 15,
                    }}>{texts.langEdt}</Text>
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
                    {languageList.map((item, index) => (
                        <Pressable
                            android_ripple={{ color: colors.secondary, borderless: false }}
                            key={item.label}
                            style={{
                                alignItems: "center",
                                width: "100%",
                                height: 47,
                                borderBottomColor: colors.secondary,
                                borderBottomWidth: index >= Object.keys(languageList).length - 1 ? 0 : 1,
                                overflow: 'hidden',
                                justifyContent: "flex-start",
                                flexDirection: language === 'english' ? 'row' : 'row-reverse',
                            }}
                            onPress={() => languageListPress(item)}>
                            <View style={{
                                width: 47,
                                height: 47,
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <MaterialCommunityIcons
                                    name={item.icon}
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
                                }}>{item.label}</Text>
                            </View>
                            <View style={{
                                width: 47,
                                height: 47,
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <View
                                    style={{
                                        width: 16,
                                        height: 16,
                                        borderRadius: 50,
                                        borderColor: '#274c77',
                                        borderWidth: 1,
                                        alignItems: "center",
                                        justifyContent: 'center',
                                    }}>
                                    <View
                                        style={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 5,
                                            backgroundColor: item.condition === language ? '#274c77' : 'transparent'
                                        }}
                                    />
                                </View>
                            </View>
                        </Pressable>
                    ))}
                </View>
            </View>
        </View>

    )
}

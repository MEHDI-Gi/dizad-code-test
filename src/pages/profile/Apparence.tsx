import React, { useRef, useState, useContext, useEffect } from 'react';
import { Alert, Modal, TouchableWithoutFeedback, Keyboard, Pressable, TextInput, Dimensions, StatusBar, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform, Vibration } from 'react-native';
import { RadioButton, Button, IconButton, } from 'react-native-paper';
import { DataContext } from '../../context/contextData';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Switch from '../../components/elements/Switch';
import SnackBar from '../../components/elements/SnackBar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';
// import Sound from 'react-native-sound';

export default function Apparence() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile', 'RankScreen'>>();

    const {
        colors,
        THEME_DARK, THEME_LIGHT, THEME_DEFAULT,
        playSound, sound, setSound, setSnackbarState, setSnackOptions, setLoadingOptions, loadScreen,
        isGradient, setIsGradient, texts, language, setLoadScreen,
        apparence, setApparence, setColors, colorsList, currentTheme, setCurrentTheme
    } = useContext(DataContext);


    const [changeTheme, setChangeTheme] = useState(false)
    const apparenceList: ApparenceItem[] = [
        { label: texts.dark, condition: 'dark', icon: 'dark-mode', },
        { label: texts.light, condition: 'light', icon: 'sunny', },
    ]
    const themeMap = {
        dark: { theme: THEME_DARK, colors: colorsList.darkColors },
        light: { theme: THEME_LIGHT, colors: colorsList.lightColors },
    };
    type ThemeKey = keyof typeof themeMap;
    interface ApparenceItem {
        label: string;
        condition: ThemeKey;
        icon: string;
    }
    const apparenceListPress = (item: ApparenceItem) => {
        const selected = themeMap[item.condition];
        if (selected) {
            setColors(selected.colors);
            setCurrentTheme(selected.theme);
        }
        if (sound) playSound('settingsButton')
    };



    useEffect(() => {
        if (loadScreen) setTimeout(() => {
            const themeLabel =
                currentTheme === 'dark'
                    ? texts.dark
                    : currentTheme === 'light'
                        ? texts.light
                        : texts.gradient;
            setSnackOptions({ label: `${texts.themeChanged} ${themeLabel}`, icon: currentTheme === 'dark' ? 'moon-waning-crescent' : 'white-balance-sunny' })
            setSnackbarState(true)
        }, 3000);
    }, [loadScreen])

    return (
        <View
            style={{
                width: "100%",
                backgroundColor: colors.primary,
                flex: 1,
                alignItems: 'center',
            }}>
            
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
                    }}>{texts.apparenceEdt}</Text>
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
                    {apparenceList.map((item, index) => (
                        <Pressable
                            android_ripple={{ color: colors.secondary, borderless: false }}
                            key={item.label}
                            style={{
                                alignItems: "center",
                                width: "100%",
                                height: 47,
                                borderBottomColor: colors.secondary,
                                borderBottomWidth: index >= Object.keys(apparenceList).length - 1 ? 0 : 1,
                                overflow: 'hidden',
                                justifyContent: "space-between",
                                flexDirection: language === 'english' ? 'row' : 'row-reverse',
                            }}
                            onPress={() => apparenceListPress(item)}>
                            <View
                                style={[{
                                    alignItems: "center",
                                    justifyContent: 'center',
                                    width: 47, height: 47
                                }]}
                            >
                                <MaterialIcons
                                    name={item.icon}
                                    color={colors.secText}
                                    size={17}

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
                            <View
                                style={[{
                                    alignItems: "center",
                                    justifyContent: 'center',
                                    width: 47, height: 47
                                }]}
                            >
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
                                            backgroundColor: item.condition === currentTheme ? '#274c77' : 'transparent'
                                        }}
                                    />
                                </View>
                            </View>

                        </Pressable>
                    ))}
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
                        onPress={() => { setIsGradient((prev: any) => !prev) }}>
                        <View style={{
                            width: 47,
                            height: 47,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>

                            <MaterialCommunityIcons
                                name={'gradient-horizontal'}
                                color={colors.secText}
                                size={17}

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
                            }}>{texts.gradient}</Text>
                        </View>
                        <View
                            style={[{
                                alignItems: "center",
                                justifyContent: 'center',
                                width: 47, height: '100%'
                            },]}
                        >
                            <Switch
                                width={28}
                                height={16}
                                borderColor={'#274c77'}
                                borderWidth={1}
                                radioFlex={isGradient ? 'flex-start' : 'flex-end'}
                                radioWidth={10}
                                radioHeight={10}
                                radioColor={isGradient ? '#274c77' : '#274c7766'}
                                direction={language === 'english' ? 'row-reverse' : 'row'}
                            />
                        </View>
                    </Pressable>
                </View>

            </View>
        </View>
    )
}

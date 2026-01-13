import React, { useRef, useState, useContext, useEffect } from 'react';
import { Alert, Portal, Modal, Switch as SwitchPaper, TouchableWithoutFeedback, Keyboard, Pressable, TextInput, BackgroundImage, Dimensions, StatusBar, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, View, Box, VStack, FormControl, Input, Radio, Divider, Checkbox, Card, Appbar, KeyboardAvoidingView, ScrollView, Platform, Vibration } from 'react-native';
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


export default function Report() {
    const navigation = useNavigation();

    const {
        snackbarState, setSnackbarState,
        setSnackOptions,
        globTrueAns,
        globFalseAns,
        dataLevelIndex,
        setUpdateNextLevelState,
        selectedImageUri,
        userName,
        setHelpPoint, setLivesHeart, livesHeartEnd,
        setQuestIndex,
        setGlobTrueAns,
        colors,
        setGlobFalseAns,
        setIsActIndicator,
        setUserName,
        updateQuestIndex,
        toggleTheme, setIsPicAdd,
        THEME_DARK, THEME_LIGHT,
        THEME_DARK_GRADIENT, THEME_LIGHT_GRADIENT,
        resetAnswerStats, setVibrate, vibrate, playSound, sound, setSound,
        isGradient, setIsGradient, texts, language, SnackBarTransition,
        apparence, setApparence, setColors, colorsList, currentTheme, setCurrentTheme
    } = useContext(DataContext);

    const [screenshotsList, setScreenshotsList] = useState([null])
    const [isPickErr, setIsPickErr] = useState(false)
    const [selectedScreenshot, setSlectedScreenshot] = useState(null)
    const [screenshotsListBack, setScreenshotsListBack] = useState([1, 2, 3, 4])
    const [isScreenshotAdd, setScreenshotAdd] = useState(false)
    const scrollViewRef = React.useRef(null);

    const pickImage = async (index) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 7],
            quality: 1,
        });

        if (!result.canceled) {
            const newList = [...screenshotsList];
            newList[index] = result.assets[0].uri; // correct access to URI
            if (index === screenshotsList.length - 1) {
                newList.push(null); // add next empty slot
            }
            setScreenshotsList(newList);
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
            setScreenshotsListBack(prev => {
                if (prev.length === 0) return prev; // nothing to remove
                return prev.slice(0, prev.length - 1); // remove last item
            });
        } else {
            alert('You did not select any image.');
        }
    };
    const removeImage = (index) => {
        const newList = screenshotsList.filter((_, i) => i !== index);
        // Ensure there's always at least one empty slot at the end
        if (newList.length === 0 || newList[newList.length - 1] !== null) {
            newList.push(null);
        }
        setScreenshotsList(newList);
        setScreenshotsListBack(prev => [...prev, prev.length + 1]);
    };
    // const saveImage = async (uri) => {
    //     try {
    //         const filename = uri.split('/').pop();
    //         const newPath = `${FileSystem.documentDirectory}${filename}`;
    //         await FileSystem.copyAsync({
    //             from: uri,
    //             to: newPath,
    //         });
    //         console.log('Image saved successfully!', `Saved at: ${newPath}`);
    //     } catch (error) {
    //         console.error('Error saving image:', error);
    //     }
    // };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

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
                        }}>{texts.reportEdt}</Text>
                    </View>
                </View >
                <View style={{
                    width: "92%",
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: "center",
                    justifyContent: "flex-start",
                    overflow: 'hidden',
                }}>
                    <View style={{
                        width: "100%",
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: colors.secondary,
                        borderRadius: 5,
                        marginVertical: 10,
                        overflow: 'hidden',
                    }}>
                        <TextInput
                            maxLength={30}
                            style={{
                                color: 'lightgray',
                                height: '100%',
                                width: '100%',
                                fontSize: 16,
                                fontFamily: language === 'english' ? 'Ubuntu_500Medium' : 'Cairo_500Medium',
                                paddingHorizontal: 10,
                                writingDirection: language === 'english' ? 'ltr' : 'rtl',
                                textAlign: 'center'
                            }} اا
                            placeholderTextColor={colors.secText}
                            placeholder={texts.email + ' ...'}
                        />
                    </View>

                    <View style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        backgroundColor: colors.secondary,
                        borderRadius: 5,
                        height: '30%',
                        overflow: 'hidden',
                    }}>
                        <TextInput
                            multiline={true}
                            textAlignVertical="top"
                            maxLength={269}
                            style={{
                                color: 'lightgray',
                                width: '100%',
                                height: '100%',
                                padding: 10,
                                fontSize: 14,
                                fontFamily: language === 'english' ? 'Ubuntu_500Medium' : 'Cairo_500Medium',
                                writingDirection: language === 'english' ? 'ltr' : 'rtl',
                                textAlign: language === 'english' ? 'left' : 'right'
                            }} اا
                            placeholderTextColor={colors.secText}
                            placeholder={texts.reportPlh}
                        />
                    </View>
                    <View style={{
                        height: 90,
                        width: "100%",
                        marginVertical: 10,
                        flexDirection: 'row',

                    }}>

                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            style={{}}
                            ref={scrollViewRef}

                            contentContainerStyle={{
                                flexGrow: 1,
                                flexDirection: language === 'english' ? 'row' : 'row-reverse',

                                alignItems: "center",
                                // backgroundColor: colors.secondary,

                            }} >
                            {screenshotsList?.map((item, index) => (
                                <Pressable
                                    android_ripple={{ color: colors.primary, borderless: false }}
                                    key={index}
                                    // disabled={item !== null && index !== screenshotsList.findIndex(i => i === null)}
                                    onPress={() => pickImage(index)}
                                    style={[{
                                        justifyContent: 'center',
                                        alignItems: "center",
                                        borderRadius: 8,
                                        width: 60,
                                        backgroundColor: colors.secondary,
                                        height: '100%',
                                        marginHorizontal: 3,
                                        overflow: 'hidden',
                                        opacity: item === null ? 1 : 0.8,
                                        elevation: 2,
                                    }]}>

                                    {item === null ? (
                                        <MaterialCommunityIcons
                                            name='plus'
                                            size={25}
                                            color={colors.secText}
                                        />
                                    ) : (
                                        <View style={{
                                            justifyContent: 'center',
                                            alignItems: "center", width: '100%', height: '100%'
                                        }}>
                                            <Image style={{ width: '100%', height: '100%' }} source={{ uri: item }} />
                                            <LinearGradient
                                                start={{ x: 0, y: 0.8 }}
                                                end={{ x: 0.2, y: 0 }}
                                                style={{
                                                    position: "absolute",
                                                    bottom: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    opacity: 1,
                                                    justifyContent: 'center',
                                                    alignItems: "center",
                                                }}
                                                // colors={['red','#00000087' ]}
                                                colors={['#000000d9', 'transparent']}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => removeImage(index)}
                                                    style={{
                                                        position: 'absolute',
                                                        bottom: 5,
                                                    }}>
                                                    <MaterialCommunityIcons
                                                        name='close'
                                                        size={18}
                                                        color={'lightgray'}

                                                    />
                                                </TouchableOpacity>
                                            </LinearGradient>
                                        </View>
                                    )}
                                </Pressable>
                            ))}
                            {screenshotsListBack?.map((item, index) => (
                                <Pressable
                                    key={index}
                                    onPress={() => { }}
                                    style={[{
                                        justifyContent: 'center',
                                        alignItems: "center",
                                        borderRadius: 8,
                                        width: 60,
                                        backgroundColor: colors.secondary,
                                        height: '100%',
                                        marginHorizontal: 3,
                                        overflow: 'hidden',
                                        opacity: 0.4,
                                        elevation: 2,

                                    }]}>
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
                                    />
                                </Pressable>
                            ))}

                        </ScrollView>
                    </View>
                    <View style={{
                        height: 100,
                        width: "100%",
                        borderRadius: 5,
                        flexDirection: 'row',
                        alignItems: "center",
                        justifyContent: "flex-end",
                        overflow: 'hidden',
                        marginVertical: 5,
                        paddingHorizontal: 5
                    }}>

                        <Pressable
                            android_ripple={{ color: colors.primary, borderless: false }}

                            style={{
                                height: 35,
                                width: 35,
                                borderRadius: 50,
                                flexDirection: 'row',
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                backgroundColor: colors.secondary, 
                                overflow: 'hidden',
                                marginHorizontal: 5
                            }}
                        >
                            {/* <Text style={{
                                color: colors.priText,
                                fontFamily: "Cairo_600SemiBold",
                                fontSize: 14,
                                fontWeight: 'bold'
                            }}>
                                Reset
                            </Text> */}
                            <MaterialIcons
                                name='refresh'
                                color={colors.priText}
                                size={15}
                            />
                        </Pressable>
                        <Pressable
                            android_ripple={{ color: colors.primary, borderless: false }}

                            style={{
                                height: 35,
                                width: 35,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: '#274c77',
                                overflow: 'hidden',
                                borderRadius: 50,
                                marginHorizontal: 5

                            }}
                        >
                            {/* <Text style={{
                                color: colors.priText,
                                fontFamily: "Cairo_600SemiBold",
                                fontSize: 14,
                                fontWeight: 'bold'
                            }}>
                                Next
                            </Text> */}
                            <MaterialIcons
                                name='arrow-back'
                                color={colors.priText}
                                size={15}
                                style={{
                                    transform: [
                                        { rotate: '180deg', }
                                    ]
                                }}
                            />
                        </Pressable>

                    </View>
                </View>

            </View >
        </TouchableWithoutFeedback >
    )

}

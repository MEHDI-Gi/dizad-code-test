import React, { useRef, useState, useContext, useEffect } from 'react';
import { Alert, Portal, Modal, ActivityIndicator, Switch, TouchableWithoutFeedback, Keyboard, Pressable, TextInput, BackgroundImage, Dimensions, StatusBar, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, View, Box, VStack, FormControl, Input, Radio, Divider, Checkbox, Card, Appbar, KeyboardAvoidingView, ScrollView, Platform, Vibration } from 'react-native';
import { RadioButton, Button, IconButton, } from 'react-native-paper';
import { DataContext } from '../context/contextData';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Application from 'expo-application';
import { LinearGradient } from 'expo-linear-gradient';
import SnackBar from './elements/SnackBar';
import SettingsCard from './SettingsCard';
// import Sound from 'react-native-sound';
const appVersion = Application.nativeApplicationVersion;
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing, runOnJS
} from 'react-native-reanimated';
export default function LoadingScreen(props) {
    const navigation = useNavigation();

    const {
        dataLevelIndex,
        setSnackbarState,
        setUpdateNextLevelState,
        selectedImageUri,
        userName,
        setHelpPoint,
        setLivesHeart,
        setQuestIndex,
        setGlobTrueAns,
        colors,
        isGradient,
        language,
        texts,
        setLoadScreen, loadScreen,
        loadingOptions
    } = useContext(DataContext);

    const LoadScreenTransition = useSharedValue(0);

    useEffect(() => {
        if (loadScreen) {
            LoadScreenTransition.value = 1
            const timer = setTimeout(() => {
                LoadScreenTransition.value = withTiming(0, config, () => {
                    runOnJS(setLoadScreen)(false);
                });
            }, 1000);

            return () => clearTimeout(timer);

        } else {
        }
    }, [loadScreen])


    const config = {
        duration: 800,
        easing: Easing.out(Easing.exp),
    };
    const loadingAnimated = useAnimatedStyle(() => {
        return {
            opacity: withTiming(LoadScreenTransition.value, config)
        }
    });
    if (!loadScreen) return <View style={{ flex: 1, backgroundColor: colors.primary }} />;
    return (
        <View style={[
            {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.primary
            }
        ]}>
            <Animated.View style={[
                loadingAnimated,
                {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.primary
                }
            ]}>
                <StatusBar translucent backgroundColor={colors.primary} />
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
                <MaterialCommunityIcons
                    style={{
                        position: 'absolute',
                        top: '20%',
                        marginHorizontal: 7,
                    }}
                    name={loadingOptions.icon}
                    size={props.mainIconSize}
                    color={props.mainIconColor} />
                <ActivityIndicator size={props.indicatorSize} />
                {/* <SnackBar
                label={props.snackLabel}
                icon={props.snackIcon}
                bottom={'10%'}
                flexRow={language === 'english' ? 'row-reverse' : 'row'}

            /> */}
            </Animated.View>
        </View>

    )
}

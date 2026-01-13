import React, { useRef, useState, useContext, useEffect } from 'react';
import { Alert, Portal, Modal, ActivityIndicator, Switch, TouchableWithoutFeedback, Keyboard, Pressable, TextInput, BackgroundImage, Dimensions, StatusBar, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, View, Box, VStack, FormControl, Input, Radio, Divider, Checkbox, Card, Appbar, KeyboardAvoidingView, ScrollView, Platform, Vibration } from 'react-native';
import { DataContext } from '../context/contextData';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Application from 'expo-application';
const appVersion = Application.nativeApplicationVersion;
import { useGoogleSignIn } from '../context/auth';
export default function CopyrightsFooter() {

    const {
        dataLevelIndex,
        setSnackbarState,
        setUpdateNextLevelState,
        selectedImageUri,
        userName, userImage,
        setHelpPoint,
        setLivesHeart,
        setQuestIndex,
        setGlobTrueAns,
        colors,
        setGlobFalseAns,
        setIsActIndicator,
        setUserName,
        updateQuestIndex,
        setIsPicAdd,
        resetAnswerStats,
        vibrate,
        playSound,
        sound,
        isGradient,
        language,
        texts,
        isAccountDeleted,
        setIsAccountDeleted,
        isDataResetedLabel,
        setIsDataResetedLabel,
        snackVisibility, setSnackVisibility,
        snackInfo, setSnackOptions,
        loadingOptions, setLoadingOptions,
        loadScreen, setLoadScreen,
        setUserXp, userXp, memberSince,
        leaderBoardIcon, setLeaderBoardIcon,
        livesHeart
    } = useContext(DataContext);

    return (
        <View style={{
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between'
        }}>
            <View style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 5,

            }}>
                <MaterialCommunityIcons
                    name='copyright'
                    color={colors.priText}
                    size={13}
                />
                <Text style={{ color: colors.secText, fontFamily: 'monospace', fontWeight: '700', fontSize: 12 }}>
                    2025
                </Text>
            </View>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 5,
            }}>
                <Image
                    source={require('../assets/logo/logo.png')}
                    style={{
                        width: 20,
                        height: 20
                    }}
                />
            </View>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                paddingHorizontal: 5,

            }}>
                <Text style={{ color: colors.secText, fontFamily: 'monospace', fontWeight: '700', fontSize: 12 }}>
                    {appVersion}
                </Text>
            </View>
        </View>

    )
}

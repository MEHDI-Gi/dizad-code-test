import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, ScrollView, } from 'react-native';
import { DataContext } from '../context/contextData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DeviceInfo from 'react-native-device-info';

const appVersion = DeviceInfo.getVersion();
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
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            height: 30,
            overflow: 'hidden',
            position: 'absolute',
            bottom: 0,
            justifyContent: 'space-between',
        }}>
            <View style={{
                position: 'absolute',
                bottom: 0,                 // <- ADD THIS  
                left: 0,                   // <- ADD THIS
                right: 0,
                top: 0,
                backgroundColor: colors.primary,
                opacity: 0.9,
            }} />
            <View style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '15%',
            }}>
                <MaterialCommunityIcons
                    name='copyright'
                    color={colors.text.primary}
                    size={13}
                />
                <Text style={{ color: colors.text.secondary, fontFamily: 'monospace', fontWeight: '700', fontSize: 12 }}>
                    2025
                </Text>
            </View>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
            }}>
                <MaterialCommunityIcons
                    name='highway'
                    size={20}
                    color={colors.text.secondary}
                />
            </View>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                width: '15%',

            }}>
                <Text style={{ color: colors.text.secondary, fontFamily: 'monospace', fontWeight: '700', fontSize: 12 }}>
                    {appVersion}
                </Text>
            </View>
        </View>

    )
}

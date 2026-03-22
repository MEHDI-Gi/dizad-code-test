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
    Modal,
    Linking
} from 'react-native';
import React, { useRef, useState, useContext, useEffect } from 'react';
import {
    RewardedAd,
    RewardedAdEventType,
    TestIds,
    AdEventType,
} from 'react-native-google-mobile-ads';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { DataContext } from '../../context/contextData';
import { useColors } from '../../hooks/useColors';
import { useVip } from '../../hooks/useVip';
import { useSize } from '../../hooks/useSize';
import { useAd } from '../../hooks/useAd';

export default function Dots() {
    const { userPlan, setUserPlan } = useVip()
    const {
        upgradeWarn, setUpgradeWarn,
        setUpgradeCard
    } = useContext(DataContext);
    const colors = useColors();
    const { screen,
        widthScale,
        heightScale,
        sizeScale,
    } = useSize();
    return (
        <View style={{
            height: '100%',
            paddingHorizontal: sizeScale(15),
            columnGap: 5,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
        }}>
            <View style={{
                width: widthScale(8),
                height: heightScale(8),
                borderRadius: 50,
                backgroundColor: 'green',
            }} />
            <View style={{
                width: widthScale(8),
                height: heightScale(8),
                borderRadius: 50,
                backgroundColor: 'orange',
            }} />
            <View style={{
                width: widthScale(8),
                height: heightScale(8),
                borderRadius: 50,
                backgroundColor: 'red',
            }} />
        </View>
    )
}
import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Pressable, Image, StatusBar, DrawerLayoutAndroid } from 'react-native';
import { TextInput, Button, IconButton, MD3Colors, Avatar, Icon, Appbar, } from 'react-native-paper';
import { DataContext } from '../../context/contextData';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    withSpring
} from 'react-native-reanimated';

export default function FreeBadge(props: { backColor: any; elevation: any; }) {
    const {
        userXp,
        quizData,
        colors,
        userName,
        userImage,
        helpPoint,
        isRewardAdd,
        setIsRewardAdd,
        sound,
        playSound,
        isGradient,
        texts,
        userVip,
        setFreeCard
    } = useContext(DataContext);

    return (
        <Pressable
            android_ripple={{ color: colors.primary, borderless: false, foreground: true }}
            style={{
                width: 40,
                height: 28,
                backgroundColor: props.backColor,
                borderRadius: 8,
                overflow: 'hidden',
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "space-evenly",
                elevation: props.elevation
            }}
            onPress={() => setFreeCard(true)}>
            <Text style={{ color: colors.text.primary, fontSize: 12, fontWeight: 'bold', marginHorizontal: 3, }}>
                Free
            </Text>

        </Pressable>
    )
}

import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Pressable, Image, StatusBar, DrawerLayoutAndroid } from 'react-native';
import { TextInput, Button, IconButton, MD3Colors, Avatar, Icon, Appbar, } from 'react-native-paper';
import { DataContext } from '../../context/contextData';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, MaterialIcons, Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    withSpring
} from 'react-native-reanimated';

export default function HeartBadge(props) {
    const {
        userXp,
        setHeartsCard,
        quizData,
        colors,
        userName,
        userImage,
        helpPoint,
        livesHeart,
        isRewardAdd,
        setIsRewardAdd,
        sound,
        playSound,
        isGradient,
        texts,
        userPlan
    } = useContext(DataContext);

    return (
        <Pressable
            android_ripple={{ color: colors.primary, borderless: false }}
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
            onPress={() => setHeartsCard(true)}>
            {isGradient && <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0.5
                }}
                colors={[colors.gradSec, colors.gradPri]}
            />}
            <Text style={{ color: colors.priText, fontSize: 12, fontWeight: 'bold', marginHorizontal: 3, }}>
                {livesHeart}
            </Text>

            <Icon size={14} style={{}} color={'#922c2c'} source="heart-multiple" />
        </Pressable>
    )
}

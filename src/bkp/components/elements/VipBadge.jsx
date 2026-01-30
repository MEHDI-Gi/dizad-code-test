import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Pressable, Image, StatusBar, DrawerLayoutAndroid } from 'react-native';
import { DataContext } from '../../context/contextData';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, MaterialIcons, Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';


export default function VipBadge(props) {
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
        userPlan, vipCard, setVipCard
    } = useContext(DataContext);

    return (
        <Pressable
            android_ripple={{ color: colors.primary, borderless: false }}
            style={{
                width: props.width,
                height: props.height,
                backgroundColor: props.backColor,
                borderRadius: props.radius,
                overflow: 'hidden',
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "space-evenly",
                elevation: props.elevation
            }}
            onPress={() => { setVipCard(true) }}>
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
            {props.title && <Text style={{ color: props.titleColor, fontSize: props.textSize, fontWeight: 'bold', marginHorizontal: 3, }}>
                VIP
            </Text>}
            {props.icon && <Ionicons
                size={props.iconSize}
                name='diamond-sharp'
                color={props.iconColor}
            />}
        </Pressable>
    )
}

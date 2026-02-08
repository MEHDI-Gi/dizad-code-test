import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Pressable, Image, StatusBar, DrawerLayoutAndroid } from 'react-native';
import { DataContext } from '../../context/contextData';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useColors } from '../../hooks/useColors';


export default function VipBadge(props: any) {
    const {
        userXp,
        setHeartsCard,
        quizData,
         vipCard, setVipCard
    } = useContext(DataContext);
    const colors = useColors();

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

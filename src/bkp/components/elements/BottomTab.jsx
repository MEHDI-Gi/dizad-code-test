import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Pressable, Image, StatusBar, DrawerLayoutAndroid } from 'react-native';
import { TextInput, Button, IconButton, MD3Colors, Avatar, Icon, Appbar, } from 'react-native-paper';
import { DataContext } from '../../context/contextData.js';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    withSpring
} from 'react-native-reanimated';

export default function BottomTab() {

    const navigation = useNavigation();
    const route = useRoute();

    const {
        colors,
        isGradient, texts, language
    } = useContext(DataContext);

    const homeCondition = route.name === 'Home'
    const rankCondition = route.name === 'RankScreen'

    const bottomTabItems = [
        { condition: 'home', label: homeCondition ? 'Home' : null, icon: 'home', color: colors.btmTabItmFocus },
        { condition: 'rank', label: rankCondition ? 'Rank' : null, icon: 'leaderboard', color: colors.btmTabItmFocus },

    ]
    const bottomTabItemsPress = (item) => {
        switch (item.condition) {
            case 'home':
                navigation.navigate('Home')
                break;
            case 'rank':
                navigation.navigate('RankScreen')
                break;
        }
    }
    return (
        <View style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            height: "8%",
            elevation: 2,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {false &&
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0.7
                    }}
                    colors={['#000000a8', '#00000066', '#00000000', '#00000000']}
                />}
            <View style={{
                elevation: 4,
                width: '50%',
                borderRadius: 15,
                position: 'absolute',
                height: 35,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 999999,
                overflow: 'hidden',
                borderColor: 'black',
                borderWidth: 0.5

            }}>
                {bottomTabItems?.map((item, index) => {
                    return (
                        <Pressable
                            key={index}
                            android_ripple={{ borderless: false, color: colors.primary }}
                            style={[{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                flex: item.label ? 1.5 : 1,
                                height: '100%',
                                backgroundColor: item.label ? "#dba400" : "#a98003ff",
                                overflow: 'hidden',
                            },]}
                            onPress={() => bottomTabItemsPress(item)}>

                            {isGradient && item.label &&
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        width: '120%',
                                        height: '120%',
                                        opacity: 0.5
                                    }}
                                    colors={[colors.gradSec, colors.gradPri]}
                                />}
                            <View style={[{
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                overflow: 'hidden',

                            },]}>
                                <MaterialIcons
                                    name={item.icon}
                                    size={20}
                                    color={item.label ? 'black' : "#2e2e2eff"}

                                />
                            </View>
                            {item.label && <View style={[{
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                overflow: 'hidden',
                            },]}>

                                <Text style={{ color: item.label ? 'black' : "gray", fontWeight: '700' }}>{item.label}</Text>
                            </View>}
                        </Pressable >

                    )
                })}
                {/* <View style={{ position: 'absolute', backgroundColor: colors.secText, height: '30%', width: 0.5 }}></View> */}
            </View >

        </View >
    );
}

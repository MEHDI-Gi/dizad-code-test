import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Pressable, Image, StatusBar, DrawerLayoutAndroid } from 'react-native';
import { TextInput, Button, IconButton, MD3Colors, Avatar, Icon, Appbar, } from 'react-native-paper';
import { DataContext } from '../../context/contextData.tsx';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { useNavigation, useRoute } from '@react-navigation/native';

import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    withSpring
} from 'react-native-reanimated';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types.ts';
import { useSize } from '../../hooks/useSize.ts';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useColors } from '../../hooks/useColors.ts';

export default function LessonsSubTabs({ state, navigation }: MaterialTopTabBarProps) {

    const { screen,
        widthScale,
        heightScale,
        sizesScale,
    } = useSize()

    const {
        isGradient, texts, language
    } = useContext(DataContext);
    const colors = useColors();
    const route = useRoute();

    function getTabConfig(name: string, isFocused: boolean) {
        switch (name) {
            case 'Signs':
                return { label: isFocused ? 'إشارت' : '', icon: 'trail-sign', set: 'Ionicons' };
            case 'Priority':
                return { label: isFocused ? 'أولوية' : '', icon: 'road-variant', set: 'MaterialCommunityIcons' };
            case 'Questions':
                return { label: isFocused ? 'أسئلة' : '', icon: 'card-text', set: 'MaterialCommunityIcons' };
            default:
                return { label: '', icon: 'circle', set: 'MaterialCommunityIcons' };
        }
    }

    return (
        <View style={{
            position: 'absolute',
            left: 0,                   // <- ADD THIS
            right: 0,
            top: 0,
            zIndex: 1,
            height: heightScale(50),
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <View style={{
                position: 'absolute',
                bottom: 0,                 // <- ADD THIS  
                left: 0,                   // <- ADD THIS
                right: 0,
                top: 0,
                backgroundColor: colors.primary,
                opacity: 0.9
            }} />
            <View style={{
                elevation: 4,
                width: '90%',
                height: heightScale(30),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 999999,
                overflow: 'hidden',
            }}>
                {state.routes.map((route, index) => {
                    const isFocused = state.index === index;
                    const name = route.name;

                    // map route to icon/label
                    const config = getTabConfig(name, isFocused);

                    const onPress = () => {
                        if (!isFocused) {
                            navigation.navigate(route.name);
                        }
                    };
                    return (
                        <Pressable
                            key={route.key}
                            android_ripple={{ borderless: false, foreground: true, color: colors.primary }}
                            style={[{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                flex: config.label ? 1.5 : 1,
                                height: '100%',
                                borderRadius: config.label ? sizesScale(8) : sizesScale(50),
                                backgroundColor: isFocused ? colors.secondary : "transparent",
                                overflow: 'hidden',
                            },]}
                            onPress={onPress}>

                            <View style={[{
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                overflow: 'hidden',

                            },]}>
                                {config.set === 'MaterialCommunityIcons' ?
                                    <MaterialCommunityIcons
                                        name={config.icon}
                                        size={sizesScale(20)}
                                        color={isFocused ? colors.subTab.items.primary : colors.subTab.items.secondary}
                                    /> : config.set === 'Ionicons' ?
                                        <Ionicons
                                            name={config.icon}
                                            size={sizesScale(20)}
                                            color={isFocused ? colors.subTab.items.primary : colors.subTab.items.secondary}
                                        /> :
                                        <Entypo
                                            name={config.icon}
                                            size={sizesScale(20)}
                                            color={isFocused ? colors.subTab.items.primary : colors.subTab.items.secondary}
                                        />
                                }
                            </View>
                            {config.label && <View style={[{
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                overflow: 'hidden',
                            },]}>
                                <Text style={{
                                    color: colors.subTab.items.primary,
                                    fontFamily: 'Cairo-Bold',
                                    fontSize: sizesScale(15)
                                }}>{config.label}</Text>
                            </View>}
                        </Pressable >
                    )
                })}
                {/* <View style={{ position: 'absolute', backgroundColor: colors.secText, height: '30%', width: 0.5 }}></View> */}
            </View >

        </View >
    );
}

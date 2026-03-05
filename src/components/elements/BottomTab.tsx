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
import { useColors } from '../../hooks/useColors.ts';

export default function BottomTab({ state, navigation }: MaterialTopTabBarProps) {

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

    // const profileCondition = route.name === 'Profile'
    // const homeCondition = route.name === 'Home'
    // const lessonsCondition = route.name === 'Signs'
    // const priorityCondition = route.name === 'Priority'
    // const quizCondition = route.name === 'Questions'
    // const testsCondition = route.name === 'Tests'

    // const bottomTabItems = [
    //     { condition: 'profile', label: profileCondition ? 'Profile' : "", icon: 'bookmark', set: 'MaterialCommunityIcons' },
    //     { condition: 'home', label: homeCondition ? 'Home' : "", icon: 'home', set: 'MaterialCommunityIcons' },
    //     { condition: 'signs', label: lessonsCondition ? 'إشارت' : "", icon: 'traffic-light', set: 'MaterialCommunityIcons' },
    //     { condition: 'priority', label: priorityCondition ? 'أولوية' : '', icon: 'road-variant', set: 'MaterialCommunityIcons' },
    //     { condition: 'quest', label: quizCondition ? 'Quest' : '', icon: 'card-text', set: 'MaterialCommunityIcons' },
    //     { condition: 'tests', label: testsCondition ? 'Tests' : '', icon: 'graduation-cap', set: 'Entypo' },
    // ]
    // const bottomTabItemsPress = (item: any) => {
    //     switch (item.condition) {
    //         case 'profile':
    //             navigation.navigate('Profile')
    //             break;
    //         case 'home':
    //             navigation.navigate('Home')
    //             break;
    //         case 'signs':
    //             navigation.navigate('Signs')
    //             break;
    //         case 'priority':
    //             navigation.navigate('Priority')
    //             break;
    //         case 'quest':
    //             navigation.navigate('Questions')
    //             break;
    //         case 'tests':
    //             navigation.navigate('Tests')
    //             break;

    //     }
    // }

    function getTabConfig(name: string, isFocused: boolean, colors: any) {
        switch (name) {
            case 'Bookmarks':
                return { label: isFocused ? 'محفوظة' : '', icon: 'bookmark', set: 'MaterialCommunityIcons' };
            case 'Home':
                return { label: isFocused ? 'رئيسية' : '', icon: 'home', set: 'MaterialCommunityIcons' };
            case 'Lessons':
                return { label: isFocused ? 'تعلم' : '', icon: 'traffic-light', set: 'MaterialCommunityIcons' };
            case 'Exams':
                return { label: isFocused ? 'إمتحان' : '', icon: 'graduation-cap', set: 'Entypo' };
            default:
                return { label: '', icon: 'circle', set: 'MaterialCommunityIcons' };
        }
    }

    return (
        <View style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: heightScale(50),
            elevation: 2,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
                backgroundColor: colors.primary,
                opacity: 0.9
            }} />
            <View style={{
                elevation: 4,
                width: '90%',
                height: heightScale(40),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 999999,
                overflow: 'hidden',
                padding: sizesScale(5),

            }}>
                {state.routes.map((route, index) => {
                    const isFocused = state.index === index;   // <- active tab
                    const name = route.name;                   // 'Home', 'Signs', ...

                    // map route to icon/label
                    const config = getTabConfig(name, isFocused, colors);

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
                                flex: isFocused ? 1.5 : 1,
                                height: '100%',
                                borderRadius: isFocused ? sizesScale(8) : sizesScale(50),
                                backgroundColor: isFocused ? colors.bottomTab.color : "transparent",
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
                                        color={isFocused ? colors.bottomTab.items.primary : colors.bottomTab.items.secondary}
                                    /> :
                                    <Entypo
                                        name={config.icon}
                                        size={sizesScale(20)}
                                        color={isFocused ? colors.bottomTab.items.primary : colors.bottomTab.items.secondary}
                                    />
                                }
                            </View>
                            {isFocused && <View style={[{
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                overflow: 'hidden',
                            },]}>

                                <Text style={
                                    {
                                        color: colors.bottomTab.items.primary,
                                        fontFamily: 'Cairo-Bold',
                                        fontSize: sizesScale(15),
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

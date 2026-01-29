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


import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types.ts';
import { useSize } from '../../context/useSize.ts';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

export default function BookmarksSubTab({ state, navigation }: MaterialTopTabBarProps) {

    const { screen } = useSize()

    const {
        colors,
        isGradient, texts, language
    } = useContext(DataContext);
    const route = useRoute();

    function getTabConfig(name: string, isFocused: boolean, colors: any) {
        switch (name) {
            case 'Bookmarks_Signs':
                return { label: isFocused ? 'إشارت' : '', icon: 'traffic-light', set: 'MaterialCommunityIcons' };
            case 'Bookmarks_Priority':
                return { label: isFocused ? 'أولوية' : '', icon: 'road-variant', set: 'MaterialCommunityIcons' };
            case 'Bookmarks_Questions':
                return { label: isFocused ? 'Quest' : '', icon: 'card-text', set: 'MaterialCommunityIcons' };
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
            height: 50,
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
                width: '90%',
                height: 30,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9,
                overflow: 'hidden',

            }}>
                {state.routes.map((route, index) => {
                    const isFocused = state.index === index;
                    const name = route.name;

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
                            style={[{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                flex: isFocused ? 1.5 : 1,
                                height: '100%',
                                width: "100%",
                                borderRadius: isFocused ? 8 : 50,
                                backgroundColor: isFocused ? colors.secondary : "transparent",
                                overflow: 'hidden',
                            },
                            ]}
                            android_ripple={{ borderless: false, foreground: true, color: colors.primary }}
                            onPress={onPress}
                        >
                            <View style={[{
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                overflow: 'hidden',

                            },]}>
                                {config.set === 'MaterialCommunityIcons' ?
                                    <MaterialCommunityIcons
                                        name={config.icon}
                                        size={20}
                                        color={isFocused ? colors.subTab.items.primary : colors.subTab.items.secondary}
                                    /> :
                                    <Entypo
                                        name={config.icon}
                                        size={20}
                                        color={isFocused ? colors.subTab.items.primary : colors.subTab.items.secondary}
                                    />
                                }
                            </View>
                            {isFocused && <View style={[{
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',

                                overflow: 'hidden',
                            },]}>

                                <Text style={{
                                    color: colors.subTab.items.primary,
                                    fontFamily: 'Cairo',
                                }}>{config.label}</Text>
                            </View>}
                        </Pressable>

                    )
                })}
                {/* <View style={{ position: 'absolute', backgroundColor: colors.secText, height: '30%', width: 0.5 }}></View> */}
            </View >

        </View >
    );
}

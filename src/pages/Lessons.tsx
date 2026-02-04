import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Pressable, Image, StatusBar, ActivityIndicator, DrawerLayoutAndroid, Dimensions } from 'react-native';
import { TextInput, Button, IconButton, MD3Colors, Icon, Appbar } from 'react-native-paper';
import { DataContext } from '../context/contextData.tsx';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import { useSize } from '../hooks/useSize.ts';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BookmarksTab from '../components/elements/BookmarksSubTab.tsx';
const SubTab = createMaterialTopTabNavigator();

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import Signs from './Signs.tsx';
import Questions from './Questions.tsx';
import Priority from './Priority.tsx';
import LessonsSubTabs from '../components/elements/LessonsSubTab.tsx';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
export default function Lessons() {

    const { lessons, screen, bookmarksSizes } = useSize();
    const {
        colors,


        bookmarks,
    } = useContext(DataContext);

    return (
        <View style={{
            backgroundColor: colors.primary,
            flex: 1, width: screen.width,
        }}>
            <SubTab.Navigator
                tabBar={(props) => <LessonsSubTabs {...props} />}
                initialRouteName="Signs"
                tabBarPosition="top"
            >
                <SubTab.Screen name="Signs" component={Signs} />
                <SubTab.Screen name="Questions" component={Questions} />
                <SubTab.Screen name="Priority" component={Priority} />
            </SubTab.Navigator>
        </View >
    );
};


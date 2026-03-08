import React, { useRef, useState, useContext, useEffect, useMemo, useCallback } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Pressable, Image, StatusBar, ActivityIndicator, DrawerLayoutAndroid, Dimensions, FlatList, Modal, ListRenderItemInfo } from 'react-native';
import { DataContext } from '../context/contextData.tsx';
import { useSize } from '../hooks/useSize.ts';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BookmarksTab from '../components/elements/BookmarksSubTab.tsx';
const SubTab = createMaterialTopTabNavigator();

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { useColors } from '../hooks/useColors.ts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useVip } from '../hooks/useVip.ts';
import BookmarkedSigns from './layout/BookmarkedSigns.tsx';
import BookmarkedQuestions from './layout/BookmarkedQuestions.tsx';
import BookmarkedPriority from './layout/BookmarkedPriority.tsx';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const title = "المحفوظات"


export default function Bookmarks() {

    return (
        <SubTab.Navigator
            tabBar={(props) => <BookmarksTab {...props} />}
            initialRouteName="Bookmarks_Signs"
            tabBarPosition="top"
        >
            <SubTab.Screen name="Bookmarks_Signs" >
                {() => <BookmarkedSigns />}

            </SubTab.Screen>
            <SubTab.Screen name="Bookmarks_Questions">
                {() => <BookmarkedQuestions />}
            </SubTab.Screen>
            <SubTab.Screen name="Bookmarks_Priority" >
                {() => <BookmarkedPriority />}

            </SubTab.Screen>
        </SubTab.Navigator>
    );
};





import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Pressable, Image, StatusBar, ActivityIndicator, DrawerLayoutAndroid, Dimensions } from 'react-native';
import { TextInput, Button, IconButton, MD3Colors, Icon, Appbar } from 'react-native-paper';
import { DataContext } from '../context/contextData.tsx';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import { useSize } from '../context/useSize.ts';
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

    const title = "Lessons"


    function LessonsScreens() {

        return (
            <SubTab.Navigator
                tabBar={(props) => <LessonsSubTabs {...props} />}
                initialRouteName="Signs"
                tabBarPosition="top"
            >
                <SubTab.Screen name="Signs" component={Signs} />
                <SubTab.Screen name="Questions" component={Questions} />
                <SubTab.Screen name="Priority" component={Priority} />
            </SubTab.Navigator>
        );
    }

    return (
        <View style={{
            backgroundColor: colors.primary,
            flex: 1, width: screen.width,
        }}>
            <LessonsScreens />
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
    },
    xpArea: {
        flexDirection: "row",
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'flex-start',
        overflow: 'hidden',
    },
    statisticsAreaContainer: {
        width: "100%",
        paddingVertical: 10,
        paddingBottom: 10,
        paddingTop: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    statisticsTitleArea: {
        paddingHorizontal: 15,
        marginBottom: 0,
        backgroundColor: "transparent",
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    statisticsTitle: {
        lineHeight: 35,
        fontFamily: "Cairo_600SemiBold",
        fontSize: 16,
        textAlign: "center"

    },
    statisticsArea: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        width: "100%",
        marginTop: 5,
        height: 100,
        borderRadius: 10
    },
    statisticsItems: {
        backgroundColor: "transparent",
        flexDirection: "column",
        justifyContent: 'space-between',
        borderRadius: 8,
        width: 80,
        height: '100%',
        marginHorizontal: 3,
        alignItems: "center",
        paddingVertical: 10,
    },
    statisticsItemsTitle: {
        fontSize: 12,
        fontFamily: "Cairo_600SemiBold",
        textAlign: "center"
    },
    mainArea: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: "center",
        backgroundColor: "transparent",
        position: 'relative',
        paddingHorizontal: 10,
    },
    levelListItems: {
        flexDirection: 'row-reverse',
        justifyContent: "space-between",
        alignItems: 'center',
        width: '93%',
        borderRadius: 20,
        margin: 7,
        padding: 10,
    },
    startBtnView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 80,
        width: '100%',
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",

    },
    startBtn: {
        textAlign: "center",
        borderRadius: 9,
        width: 120,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
    },
    startBtnText: {
        fontFamily: "Cairo_700Bold",
        textAlign: 'center',
    },
    startButtonArea: {
        width: "100%", alignItems: "center", justifyContent: "center",
    },
    startButton: {
        backgroundColor: "#22799c",
        textAlign: "center",
        borderRadius: 8,
        width: "93%",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15
    },
    startButtonTitle: {
        fontFamily: "Cairo_700Bold",
        color: "black",
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 45,
    },
    section: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 5,
        backgroundColor: "gray",
        width: 300,
        height: 60,
        borderRadius: 0,
        paddingHorizontal: 10,
        elevation: 3,
    },
    statistics: {
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 5,
        width: 60,
        height: 60,
        borderRadius: 0,
    },

});

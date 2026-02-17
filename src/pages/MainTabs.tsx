// navigation/TopTabs.tsx
import React, { useContext, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Home from '../pages/Home';
import BottomTab from '../components/elements/BottomTab';
import Bookmarks from './Bookmarks';
import Exams from './Exams';
import Lessons from './Lessons';
import { NavigatorScreenParams, useNavigation } from '@react-navigation/native';
import { DataContext } from '../context/contextData';
import { useColors } from '../hooks/useColors';
import { ActivityIndicator, View } from 'react-native';




const Tab = createMaterialTopTabNavigator<any>();

export function MainTabs() {
    const navigation = useNavigation<any>();
    const colors = useColors();

    const {
        freeCard,
        vipCard,
        vipPlansCard,
        statisticsCard,
        snackOptions,
        handleLogout,
        user
    } = useContext(DataContext);

    useEffect(() => {
        if (!user) {
            handleLogout(navigation)
        }
    }, []);

    if (!user) {
        return (
            <View style={[{ flex: 1, zIndex: 9, alignItems: "center", justifyContent: 'center', backgroundColor: colors.primary }]}>
                <ActivityIndicator size={30} color={'#1eff00'} />
            </View>
        )
    }

    return (
        <Tab.Navigator
            tabBar={(props) => <BottomTab {...props} />}
            initialRouteName="Home"
            tabBarPosition="bottom"
        >
            <Tab.Screen name="Bookmarks" component={Bookmarks} />
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name='Lessons' component={Lessons} />
            <Tab.Screen name="Exams" component={Exams} />
        </Tab.Navigator>
    );
}

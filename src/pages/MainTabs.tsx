// navigation/TopTabs.tsx
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Home from '../pages/Home';
import BottomTab from '../components/elements/BottomTab';
import Bookmarks from './Bookmarks';
import Exams from './Exams';
import Lessons from './Lessons';
import { NavigatorScreenParams } from '@react-navigation/native';




const Tab = createMaterialTopTabNavigator<any>();

export function MainTabs() {
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

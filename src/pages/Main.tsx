import React, { useState, useEffect, useContext, useRef } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
enableScreens();
const Stack = createNativeStackNavigator();
import mobileAds, { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import AdFooter from '../context/AdFooter.tsx';
import { DataContext } from '../context/contextData';

import Apparence from './profile/Apparence.tsx';
import Vibrate from './profile/Vibrate.tsx';
import Sound from './profile/Sound.tsx';
import Language from './profile/Language.tsx';
import Report from './profile/Report.tsx';
import SnackBar from '../components/elements/SnackBar.tsx';
import VipPlansCard from '../components/VipPlansCard.tsx';


import Home from './Home.tsx';
import Login from './Login';
import Profile from './Profile.tsx';
import QuizScreen from './QuizScreen.tsx';
import VipCard from '../components/VipCard.tsx';
import StatisticsCard from '../components/StatisticsCard.tsx';
import FreeCard from '../components/FreeCard.tsx';
import SignsItems from './SignsItems.tsx';
import TestsScreen from './TestsScreen.tsx';
import Signs from './Signs.tsx';
import Tests from './Exams.tsx';
import Questions from './Questions.tsx';
import Priority from './Priority.tsx';
import { MainTabs } from './MainTabs.tsx';
import SplashScreen from './SplashScreen.tsx';
import { useAd } from '../hooks/useAd.ts';
import { usePeriodicAd } from '../hooks/usePeriodicAd.ts';
import PriorityItems from './PriorityItems.tsx';
import Offline from './Offline.tsx';
export default function Main() {

    const {
        colors,
        freeCard,
        vipCard,
        vipPlansCard,
        statisticsCard,
        snackOptions,

    } = useContext(DataContext);

    const [adLoaded, setAdLoaded] = useState<boolean>(false);
    useEffect(() => {
        mobileAds()
            .initialize()
            .then(adapterStatuses => {
                console.log('AdMob initialized', adapterStatuses);
                setAdLoaded(true);
            });
    }, []);

    usePeriodicAd();
    const [showLoader, setShowLoader] = useState<boolean>(false);
    // useEffect(() => {
    //     if (dataAsync) {
    //         setShowLoader(true);
    //         const timeout = setTimeout(() => setShowLoader(false), 10000); // 10s max
    //         return () => clearTimeout(timeout);
    //     } else {
    //         setShowLoader(false);
    //     }
    // }, [dataAsync]);
    const [splash, setSplash] = useState(true);

    useEffect(() => {
        // Check AsyncStorage/Firebase, then set first screen
        setTimeout(() => setSplash(false), 2000); // Splash duration
    }, []);

    if (splash) return <SplashScreen />;
    // if (true) return <Offline />;

    return (
        <View style={[styles.container, {
            opacity: 1,
            backgroundColor: colors.primary
        }]}>

            {freeCard && <FreeCard />}
            {vipCard && <VipCard />}
            {vipPlansCard && <VipPlansCard />}
            {statisticsCard && <StatisticsCard />}
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        gestureEnabled: true,
                        animation: 'fade',
                        headerStyle: {
                            backgroundColor: colors.primary,
                        },
                        headerTintColor: colors.priText,
                    }}
                >
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
                    <Stack.Screen name="SignsItems" component={SignsItems} options={{ headerShown: false }} />
                    <Stack.Screen name="PriorityItems" component={PriorityItems} options={{ headerShown: false }} />
                    <Stack.Screen name="TestsScreen" component={TestsScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Report" component={Report} options={{ headerShown: false }} />
                    <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                    <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Vibrate" component={Vibrate} options={{ headerShown: false }} />
                    <Stack.Screen name="Sound" component={Sound} options={{ headerShown: false }} />
                    <Stack.Screen name="Apparence" component={Apparence} options={{ headerShown: false }} />
                    <Stack.Screen name="Language" component={Language} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
            {/* <SnackBar
                label={snackOptions.label}
                icon={snackOptions.icon}
                bottom={adLoaded ? '15%' : '10%'}
            /> */}
            {false && <AdFooter adLoaded={adLoaded} setAdLoaded={setAdLoaded} />}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    adsContainer: {
        zIndex: 99,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


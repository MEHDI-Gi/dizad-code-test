import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import { DataContext } from '../context/contextData';
import { LinearGradient } from 'expo-linear-gradient';
import FirstPage from './FirstPage.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import Profile from './Profile.jsx';
import QuizScreen from './QuizScreen.jsx';
import RankScreen from './RankScreen.jsx';
import Apparence from './profile/Apparence.jsx';
import Vibrate from './profile/Vibrate.jsx';
import Sound from './profile/Sound.jsx';
import Language from './profile/Language.jsx';
import Report from './profile/Report.jsx';
import SnackBar from '../components/elements/SnackBar.jsx';
import VipPlansCard from '../components/VipPlansCard.jsx';
import AdFooter from '../context/AdFooter.js';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';

import { useFonts } from 'expo-font';
import {
  SairaCondensed_100Thin,
  SairaCondensed_200ExtraLight,
  SairaCondensed_300Light,
  SairaCondensed_400Regular,
  SairaCondensed_500Medium,
  SairaCondensed_600SemiBold,
  SairaCondensed_700Bold,
  SairaCondensed_800ExtraBold,
  SairaCondensed_900Black
} from '@expo-google-fonts/saira-condensed'
import {
  Cairo_200ExtraLight,
  Cairo_300Light,
  Cairo_400Regular,
  Cairo_500Medium,
  Cairo_600SemiBold,
  Cairo_700Bold,
  Cairo_800ExtraBold,
  Cairo_900Black,
} from '@expo-google-fonts/cairo';
import {
  Ubuntu_300Light,
  Ubuntu_400Regular,
  Ubuntu_500Medium,
  Ubuntu_700Bold,
} from '@expo-google-fonts/ubuntu'
import mobileAds, { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import HeartsCard from '../components/HeartsCard.jsx';
import VipCard from '../components/VipCard.jsx';
import StatisticsCard from '../components/elements/StatisticsCard.jsx';
const Stack = createNativeStackNavigator();
import { useGoogleSignIn } from '../context/auth';

function Main() {
  let [fontsLoaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
    Cairo_200ExtraLight,
    Cairo_300Light,
    Cairo_400Regular,
    Cairo_500Medium,
    Cairo_600SemiBold,
    Cairo_700Bold,
    Cairo_800ExtraBold,
    Cairo_900Black,
    SairaCondensed_100Thin,
    SairaCondensed_200ExtraLight,
    SairaCondensed_300Light,
    SairaCondensed_400Regular,
    SairaCondensed_500Medium,
    SairaCondensed_600SemiBold,
    SairaCondensed_700Bold,
    SairaCondensed_800ExtraBold,
    SairaCondensed_900Black
  });

  const { colors,
    isGradient, texts, snackOptions, setSnackOptions, loadScreen,
    currentTheme, heartsCard, setHeartsCard, vipCard, setVipCard,
    statisticsCard, setStatisticsCard, dataAsync, vipPlansCard
  } = useContext(DataContext);
  const [adLoaded, setAdLoaded] = useState(false);
  const { user, request, promptAsync, logout } = useGoogleSignIn();

  useEffect(() => {
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('AdMob initialized', adapterStatuses);
        setAdLoaded(true);
      });
  }, []);
  if (!fontsLoaded) {
    return (
      <View style={
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.primary
        }
      }>
        <StatusBar translucent backgroundColor={colors.primary} />
        {isGradient &&
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 1
            }}
            colors={[colors.primary, colors.gradSec]}
          />}
        <ActivityIndicator size="large" />
      </View>
    );
  }


  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <NavigationContainer>
        <StatusBar
          barStyle={'light-content'}
          translucent backgroundColor={colors.primary} />
        {/* dataAsync */}
        {false && <View style={
          {
            zIndex: 9999999,
            position: 'absolute',
            top: 20,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }
        }>
          <View style={
            {
              position: 'absolute',
              top: 20,
              width: '60%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.primary
            }
          }>
            <Text>wait data to synce</Text>
            <ActivityIndicator size="large" />
          </View>
        </View>}
        {heartsCard && <HeartsCard />}
        {vipCard && <VipCard />}
        {statisticsCard && <StatisticsCard />}
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.primary,
              elevation: 0,
            },
            headerTintColor: colors.priText,
          }}
        >
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false, }} />
          <Stack.Screen name="Report" component={Report} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false, animation: "slide_from_left" }} />
          <Stack.Screen name="RankScreen" component={RankScreen} options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Vibrate" component={Vibrate} options={{ headerShown: false }} />
          <Stack.Screen name="Sound" component={Sound} options={{ headerShown: false }} />
          <Stack.Screen name="Apparence" component={Apparence} options={{ headerShown: false }} />
          <Stack.Screen name="Language" component={Language} options={{ headerShown: false }} />
          <Stack.Screen name="FirstPage" component={FirstPage} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      <SnackBar
        label={snackOptions.label}
        icon={snackOptions.icon}
        bottom={adLoaded ? '15%' : '10%'}
      />
      <AdFooter adLoaded={adLoaded} setAdLoaded={setAdLoaded} />

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

export default Main;

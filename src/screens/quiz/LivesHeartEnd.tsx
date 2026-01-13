import { BackHandler, AppState, SafeAreaView, ImageBackground, Text, View, StyleSheet, Image, StatusBar, DrawerLayoutAndroid, TouchableOpacity, Alert, ActivityIndicator, Pressable } from 'react-native';
import { DataContext } from '../../context/contextData';
import { TextInput, Button, IconButton, MD3Colors, Icon, Appbar, RadioButton, ProgressBar, Snackbar, Surface, Dialog, Portal, PaperProvider } from 'react-native-paper';
import React, { useRef, useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
  AdEventType,
  RewardedAdReward,
} from 'react-native-google-mobile-ads';

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withRepeat, interpolateColor, useAnimatedProps
} from 'react-native-reanimated';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';

const rewardedAd = RewardedAd.createForAdRequest(TestIds.REWARDED);

export default function LivesHeartEnd() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile', 'RankScreen'>>();

  const {
    colors,
    dataLevelIndex, setDataLevelIndex,
    livesHeart, setLivesHeart, livesHeartEnd,
    isRewardAdd, setIsRewardAdd, MAX_LIVES, timeLeft, timerTimeout,
    sound, playSound
  } = useContext(DataContext);

  // Use test ad unit ID during development
  const adUnitId = __DEV__
    ? TestIds.REWARDED
    : 'ca-app-pub-7985985128504090/7958461588';

  // Create the rewarded ad instance
  const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'], // optional targeting
  });

  const [loaded, setLoaded] = useState<boolean>(false);
  const [reward, setReward] = useState<RewardedAdReward | null>(null);


  useEffect(() => {
    // Correct event types usage here:
    const loadedListener = rewardedAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
        console.log('Rewarded ad loaded');
      }
    );

    const earnedRewardListener = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        setReward(reward);
        console.log('User earned reward of ', reward);
        setLivesHeart((prev: any) => prev + 1); // Add 2 lives as reward
      }
    );

    const errorListener = rewardedAd.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.error('Rewarded ad error:', error);
        setLoaded(false);
      }
    );

    const closedListener = rewardedAd.addAdEventListener(
      AdEventType.CLOSED, // <-- Use AdEventType.CLOSED here (NOT RewardedAdEventType.CLOSED)
      () => {
        console.log('Rewarded ad closed, loading new ad');
        setLoaded(false);
        rewardedAd.load();
      }
    );

    // Load the first ad
    rewardedAd.load();

    // Clean up listeners on unmount
    return () => {
      loadedListener();
      earnedRewardListener();
      errorListener();
      closedListener();
    };
  }, []);
  const showAd = () => {
    if (loaded) {
      rewardedAd.show();
      setLoaded(false);
    } else {
      console.log('Reward Ad not loaded yet');
    }
  };
  function formatTime(ms: any) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  useEffect(() => {
    if (timeLeft === 0) {
      if (sound) {
        playSound('reAddHearts')
      }
    }
  }
    , [timeLeft])

  const heartsMap = [
    'h1', "h2", 'h3', 'h4', 'h5'
  ]

  if (Math.floor(timeLeft / 1000) === 0) {
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
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 80,
      paddingHorizontal: 20,
      backgroundColor: colors.primary
    }}>
      <View style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: colors.primary
      }}>
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{
            zIndex: 99,
            fontSize: 24,
            fontFamily: 'Cairo_700Bold',
            color: '#674d11',
            textAlign: 'center',
          }}>إنتهت عدد المحاولات !</Text>
          {reward && <Text>Reward earned: {reward.amount} {reward.type}</Text>}
        </View>
        <View style={{
          flex: 2,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }}>
          <Text style={{
            zIndex: 99,
            fontSize: 18,
            fontFamily: 'Cairo_600SemiBold',
            color: colors.secText,
            paddingHorizontal: "15%",
            textAlign: 'center',
          }}>يمكنك مشاهدة إعلان للحصول على 2 محاولات</Text>
          {loaded ?
            <TouchableOpacity style={[{
              borderRadius: 8,
              width: 160,
              paddingVertical: 8,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',

            }, { backgroundColor: colors.buttons, }]}
              onPress={showAd}>
              <FontAwesome5 name='ad' size={20} color='white' />
              <View>
                <Text style={{
                  color: '#fff',
                  fontFamily: 'Cairo_700Bold',
                  fontSize: 13,
                }}>مشاهدة إعلان</Text>
              </View>
            </TouchableOpacity> :
            <View style={{
              borderRadius: 8,
              width: '60%',
              paddingVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <ActivityIndicator size="small" />
            </View>
          }
          <Text style={{
            zIndex: 99,
            fontSize: 18,
            fontFamily: 'Cairo_600SemiBold',
            color: colors.secText,
            marginBottom: 30,
            paddingHorizontal: "15%",
            textAlign: 'center',
          }}>أو الإنتضار حتى إعادة الملأ بعد </Text>
          {livesHeart < MAX_LIVES && (
            <Text style={{
              zIndex: 99,
              fontSize: 18,
              fontFamily: 'Cairo_600SemiBold',
              color: colors.secText,
              marginBottom: 30,
              paddingHorizontal: "15%",
              textAlign: 'center',
            }}>{formatTime(timeLeft)}</Text>
          )}

        </View>
        <View style={{
          flex: 1,
          flexDirection: 'row',
        }}>
          {heartsMap.map((item, index) => {
            // const [clr, setClr] = useState('red')
            // const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);
            // const anim = useSharedValue(0);

            // useEffect(() => {
            //   anim.value = withRepeat(
            //     withTiming(1, { duration: 10000 }),
            //     -1, // infinite loop
            //     true // reverse direction for smooth back-and-forth color change
            //   );
            // }, []);
            // const animatedProps = useAnimatedProps(() => {
            //   const color = interpolateColor(
            //     anim.value,
            //     [0, 1],
            //     ['red', 'transparent']
            //   );
            //   return { color };
            // });
            return (
              <AntDesign
                key={index}
                style={{ marginHorizontal: 3 }}
                size={20}
                name={index === 0 ? 'heart' : 'hearto'}
              // animatedProps={animatedProps}
              />
            )
          })}
        </View>

        <View style={{
          width: '100%',
          zIndex: 99,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
          <TouchableOpacity style={[{
            paddingVertical: 7,
            width: '50%',
            flexDirection: 'row',
            borderRadius: 8,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }, { backgroundColor: '#3b455c54', }]}

            onPress={() => navigation.navigate("Home")}>
            <Entypo name='home' size={18} color={'white'} />
            <Text style={{
              color: '#fff',
              fontFamily: 'Cairo_700Bold',
              fontSize: 15,
            }}>الرئيسية</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>

  )
}

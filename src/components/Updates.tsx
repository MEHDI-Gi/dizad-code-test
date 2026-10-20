import {
  BackHandler,
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  ActivityIndicator,
  Pressable,
  Vibration,
  Modal,
  Linking,
} from 'react-native';
import React, { useRef, useState, useContext, useEffect } from 'react';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { DataContext } from '../context/contextData';
import { useColors } from '../hooks/useColors';
import { useVip } from '../hooks/useVip';
import { useSize } from '../hooks/useSize';
import { useAd } from '../hooks/useAd';
import Dots from './elements/Dots';
const rewardedAd = RewardedAd.createForAdRequest(TestIds.REWARDED);

export default function Updates() {
  const { userPlan, setUserPlan } = useVip();
  //   const {  } = useContext(DataContext);
  useContext(DataContext);
  const colors = useColors();
  const { screen, widthScale, heightScale, sizeScale } = useSize();

  const vipItems = [
    { label: 'Unlimited Hearts' },
    { label: 'Unlock Tests' },
    { label: 'Infinite Bookmarks' },
    { label: 'Unlock Priority' },
    { label: 'No Ads' },
  ];
  const ad = useAd();

  const [adsLoading, setAdsLoading] = useState(false);

  const watchAd = () => {
    setAdsLoading(true);
    const timer = setTimeout(() => {
      ad.isLoaded && ad.show();
    }, 500);
    setAdsLoading(false);

    return () => clearTimeout(timer);
  };

  return (
    <View
      style={[
        {
          backgroundColor: colors.secondary,
          flex: 1,
          alignContent: 'center',
          justifyContent: 'space-between',
          elevation: 5,
        },
      ]}
    >
      <View
        style={{
          width: '100%',
          height: heightScale(40),
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <Dots />
      </View>

      <View
        style={{
          width: '100%',
          paddingHorizontal: sizeScale(50),
          paddingVertical: sizeScale(10),
          alignItems: 'center',
          justifyContent: 'center',
          rowGap: sizeScale(20),
        }}
      >
        <Text
          style={{
            color: colors.text.primary,
            textAlign: 'center',
            fontWeight: 'bold',
            lineHeight: sizeScale(25),
            fontSize: sizeScale(18),
          }}
        >
          Update Available
        </Text>
        <Text
          style={{
            color: colors.text.primary,
            textAlign: 'center',
            fontWeight: 'bold',
            lineHeight: sizeScale(25),
            fontSize: sizeScale(16),
          }}
        >
          you have a new update available, please update the app to continue
          using it.
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          paddingHorizontal: sizeScale(50),
          paddingVertical: sizeScale(10),
          alignItems: 'center',
          justifyContent: 'center',
          rowGap: sizeScale(20),
        }}
      >
        <MaterialCommunityIcons
          name="update"
          size={sizeScale(40)}
          color={colors.text.primary}
        />
        <MaterialCommunityIcons
          name="google-play"
          size={sizeScale(40)}
          color={colors.text.primary}
        />
        <MaterialCommunityIcons
          name="up-to-down"
          size={sizeScale(40)}
          color={colors.text.primary}
        />
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: sizeScale(20),
          rowGap: sizeScale(20),
        }}
      >
        <Pressable
          android_ripple={{
            color: colors.secondary,
            borderless: false,
            foreground: true,
          }}
          onPress={() => {}}
          style={[
            {
              backgroundColor: 'orange',
              width: '80%',
              flexDirection: 'row',
              height: heightScale(40),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            },
          ]}
        >
          {true ? (
            <Text
              style={{
                fontSize: sizeScale(15),
                fontWeight: 'bold',
                color: 'black',
              }}
            >
              update
            </Text>
          ) : (
            <ActivityIndicator size={20} color={'black'} />
          )}
        </Pressable>
      </View>
    </View>
  );
}

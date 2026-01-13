import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Pressable, Image, StatusBar, DrawerLayoutAndroid } from 'react-native';
import { TextInput, Button, IconButton, MD3Colors, Avatar, Icon, Appbar, } from 'react-native-paper';
import { DataContext } from '../context/contextData';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, MaterialIcons, Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import LevelsList from './home/LevelsList.jsx';
import CategoriesList from './home/CategoriesList.jsx';
import Statistics from './home/Statistics.jsx';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from '../components/LoadingScreen.jsx';
import { useGoogleSignIn } from '../context/auth';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring
} from 'react-native-reanimated';
import VipBadge from '../components/elements/VipBadge.jsx';
import HeartBadge from '../components/elements/HeartBadge.jsx';

import BottomTab from '../components/elements/BottomTab.jsx';


export default function Home() {
  const navigation = useNavigation();
  const { user, request, promptAsync, logout, initializing } = useGoogleSignIn();
  const {
    userXp,
    setHeartsCard,
    quizData,
    colors,
    userName,
    userImage,
    helpPoint,
    livesHeart,
    isRewardAdd,
    setIsRewardAdd,
    sound,
    playSound,
    isGradient,
    texts, currentTheme, setLoadScreen,
    userVip
  } = useContext(DataContext);

  if (initializing || !quizData) {
    return (
      <View style={[{ flex: 1, alignItems: "center", justifyContent: 'center', backgroundColor: colors.primary }]}>
        <ActivityIndicator size={30} />
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
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
      <View style={[{
        zIndex: 9999,
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
      }]}>
        <View style={[
          {
            paddingHorizontal: 10,
            flexDirection: "row",
            width: "100%",
            height: 50,
            justifyContent: "space-between",
            alignItems: "center",
            elevation: 3

          }]}>
          {false &&
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                position: "absolute",
                bottom: 0,
                right: -20,
                width: '60%',
                height: '100%',
                opacity: 0.5
              }}
              colors={[colors.primary, colors.gradSec]}
            />}
          <View style={
            {
              width: 40,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: 'transparent'
            }
          }>

            <TouchableOpacity onPress={() => {
              if (sound) playSound('settingsButton')
              navigation.navigate('Profile');
            }}>

              {userImage ? <Image style={
                {
                  width: 32,
                  height: 32,
                  borderRadius: 50,
                  elevation: 3,
                  borderColor: 'lightgray',
                  borderWidth: 0
                }}
                source={{ uri: userImage }} /> :
                <MaterialIcons
                  name='person'
                  size={25}
                  color={colors.priText}
                />
              }
            </TouchableOpacity>
          </View>

          <View style={
            {
              backgroundColor: 'transparent',
              alignItems: 'flex-start',
              justifyContent: 'center',
              height: 50,
              paddingHorizontal: 2,
              flex: 1

            }}>
            <View style={
              {
                flexDirection: 'column',
                backgroundColor: 'transparent',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <View style={{
                flexDirection: "row",
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={
                  {
                    fontSize: 16,
                    fontWeight: "700",
                    color: colors.priText,
                  }}>
                  {userName ? userName : 'user'}

                </Text>
              </View>



              <Text style={{ color: colors.secText, fontSize: 11, fontWeight: "600", marginRight: 5 }}>{userXp} XP</Text>

            </View>
          </View>
          {userVip ?
            <VipBadge
              width={28}
              height={28}
              title={false}
              iconSize={15}
              iconColor={"#dba400"}
              radius={8}
              backColor={'transparent'}
              titleColor={colors.priText}
              elevation={0}
              textSize={12}
              icon={true}
            /> :
            <HeartBadge
              backColor={colors.secondary}
              elevation={0}
            />
          }
        </View>
        <Statistics />
      </View>

      <View style={[styles.mainContainer, { backgroundColor: 'transparent' }]}>
        <View style={styles.mainArea}>
          <CategoriesList />
        </View>
      </View>
      {isRewardAdd &&
        <View style={{
          position: 'absolute',
          backgroundColor: '#63606037',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <View style={{
            position: 'absolute',
            width: '80%',
            height: '50%',
            borderRadius: 18,
            alignItems: 'center',
            justifyContent: 'space-between',
            overflow: 'hidden',
          }}>
            <View style={{
              position: 'absolute',
              backgroundColor: colors.primary,
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}></View>
            <View style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 15
            }}>
              <TouchableOpacity onPress={() => { setIsRewardAdd(false) }} style={{ position: 'absolute', left: 0, paddingHorizontal: 15 }}>
                <MaterialCommunityIcons name='close' size={25} color={colors.secText} />
              </TouchableOpacity>
              <Text style={{ color: colors.priText, fontWeight: 'bold', fontSize: 17, }}>Reward</Text>
            </View>

            <View style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 20
            }}>
              <MaterialCommunityIcons name='gift-open' color={colors.priText} size={60} />
              <Text style={{ color: colors.priText, fontFamily: 'Cairo_600SemiBold', fontSize: 15, }}>تهانينا</Text>
            </View>
            <View style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',

            }}>
              <AntDesign name='heart' size={15} color={'red'} style={{ marginHorizontal: 0 }} />
              <Text style={{ marginHorizontal: 5, color: colors.priText, fontSize: 15, fontWeight: 'bold' }}>1</Text>
              <Text style={{ marginHorizontal: 5, color: colors.priText, fontFamily: 'Cairo_700Bold', fontSize: 15, }}>لقد حصلت على</Text>
            </View>
            <View style={{
              padding: 20,
              width: "100%",
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TouchableOpacity style={{
                backgroundColor: 'green',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60%',
                paddingVertical: 3,
                borderRadius: 5,
              }}
                onPress={() => { setIsRewardAdd(false) }}>
                <Text style={{ color: colors.priText, fontWeight: 'bold', fontSize: 17, }}>continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'start',
    position: 'relative',
  },
  header: {

  },
  profilePicArea: {

  },
  profilePicImg: {

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
    alignItems: "center",
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

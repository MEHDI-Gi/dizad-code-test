import React, { useRef, useState, useContext, useEffect } from 'react';
import { Alert, Portal, Modal, ActivityIndicator, Switch, TouchableWithoutFeedback, Keyboard, Pressable, TextInput, BackgroundImage, Dimensions, StatusBar, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, View, Box, VStack, FormControl, Input, Radio, Divider, Checkbox, Card, Appbar, KeyboardAvoidingView, ScrollView, Platform, Vibration } from 'react-native';
import { DataContext } from '../context/contextData';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Statistics from './home/Statistics';
import * as Application from 'expo-application';
import { LinearGradient } from 'expo-linear-gradient';
import SnackBar from '../components/elements/SnackBar';
import SettingsCard from '../components/SettingsCard';
import LoadingScreen from '../components/LoadingScreen';
// import Sound from 'react-native-sound';
const appVersion = Application.nativeApplicationVersion;
import { useGoogleSignIn } from '../context/auth';
import VipBadge from '../components/elements/VipBadge';
import CopyrightsFooter from '../components/CopyrightsFooter';

const Profile = () => {
  const { user, initializing, signIn, logout } = useGoogleSignIn();

  const navigation = useNavigation();

  const {
    userVip,
    dataLevelIndex,
    setSnackbarState,
    setUpdateNextLevelState,
    selectedImageUri,
    userName, userImage,
    setHelpPoint,
    setLivesHeart,
    setQuestIndex,
    setGlobTrueAns,
    colors,
    setGlobFalseAns,
    setIsActIndicator,
    setUserName,
    updateQuestIndex,
    setIsPicAdd,
    resetAnswerStats,
    vibrate,
    playSound,
    sound,
    isGradient,
    language,
    texts,
    isAccountDeleted,
    setIsAccountDeleted,
    isDataResetedLabel,
    setIsDataResetedLabel,
    snackVisibility, setSnackVisibility,
    snackInfo, setSnackOptions,
    loadingOptions, setLoadingOptions,
    loadScreen, setLoadScreen,
    setUserXp, userXp, memberSince,
    leaderBoardIcon, setLeaderBoardIcon,
    livesHeart,
    setUserImage,
    setUserVip,
    setLanguage,
    setVibrate,
    setDataLevelIndex,
    setQuestIndices,
    setAnswerStats,
    setSound,
    unsubscribeQuizListener,
    unsubscribeUsersListener,
    unsubscribeUserListener,
    setFirebaseLoaded,
    setQuizLoaded,
    setUsersLoaded,
    setUserLoaded,
    userLoaded,
    handleLogout,
    isLogout, setIsLogout,
    dataAsync
  } = useContext(DataContext);



  const [isSettingsList, setIsSettingsList] = useState(true)
  const settingsList = [
    { id: 1, label: texts.langEdt, condition: 'language', icon: 'translate', color: 'gray', iconSet: 'MaterialCommunityIcons' },
    { id: 2, label: texts.soundEdt, condition: 'sound', icon: sound ? 'volume-source' : 'volume-variant-off', color: 'gray', iconSet: 'MaterialCommunityIcons' },
    { id: 3, label: texts.vibrateEdt, condition: 'vibrate', icon: vibrate ? 'vibrate' : 'vibrate-off', color: 'gray', iconSet: 'MaterialCommunityIcons' },
    { id: 4, label: texts.apparenceEdt, condition: 'Apparence', icon: 'moon-waning-crescent', color: 'gray', iconSet: 'MaterialCommunityIcons' },
    { id: 5, label: texts.reportEdt, condition: 'report', icon: 'report', color: 'gray', iconSet: 'MaterialIcons' },
  ];
  const DangerSettingsList = [
    { id: 1, label: texts.restEdt, condition: 'reset data', icon: 'refresh', color: '#9f707096' },
    { id: 2, label: texts.deleteEdt, condition: 'delete account', icon: 'delete', color: '#9f707096' },
  ];

  function resetStorage() {
    setUserXp(0)
    setHelpPoint(0)
    setLivesHeart(5)
    setGlobTrueAns(0);
    setGlobFalseAns(0);
    updateQuestIndex("ct1", 1);
    updateQuestIndex("ct2", 1);
    updateQuestIndex("ct3", 1);
    updateQuestIndex("ct4", 1);
    setUpdateNextLevelState(0);
    resetAnswerStats('ct1');
    resetAnswerStats('ct2');
    resetAnswerStats('ct3');
    resetAnswerStats('ct4');
    AsyncStorage.clear();
  }
  const timerRef = useRef(null);

  const clearExistingTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = (callback, delay = 3000) => {
    clearExistingTimer();
    timerRef.current = setTimeout(callback, delay);
  };
  const dangerSettingsListPress = (item) => {
    switch (item.condition) {
      case 'reset data':
        setLoadScreen(true);
        setLoadingOptions({ icon: 'refresh' })
        resetStorage();
        startTimer(() => {
          setSnackbarState(true);
          setSnackOptions({ label: texts.dataReseted, icon: 'refresh' });
        });
        break;

      case 'delete account':
        setLoadScreen(true);
        setLoadingOptions({ icon: 'delete-empty' })
        resetStorage();
        setIsPicAdd(false);
        startTimer(() => {
          navigation.navigate('Login');
          logout();
          setSnackbarState(true);
          setSnackOptions({ label: texts.accountDeleted, icon: 'logout' });
        });
        break;
      default:
        break;
    }
  }
  const settingsListPress = (item) => {
    if (sound) playSound('settingsButton');

    switch (item.condition) {

      case 'language':
        navigation.navigate('Language');
        break;

      case 'Apparence':
        navigation.navigate('Apparence');
        break;

      case 'vibrate':
        if (sound && vibrate) playSound('settingsButton');
        navigation.navigate('Vibrate');
        break;

      case 'sound':
        navigation.navigate('Sound');
        if (!sound) playSound('settingsButton');
        break;

      case 'report':
        navigation.navigate('Report');
        if (sound) playSound('settingsButton');
        break;

      // Add other cases as needed

      default:
        break;
    }
  };


  function logoutFun() {
    setLoadingOptions({ icon: 'logout' })
    setLoadScreen(true)
    startTimer(() => {
      navigation.navigate('Login')
      setSnackbarState(true)
      setSnackOptions({ label: texts.logoutDone, icon: 'logout' })
    });
  }

  useEffect(() => {
    return () => clearExistingTimer();
  }, []);

  const logAllStoredData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const stores = await AsyncStorage.multiGet(keys);

      stores.forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
    } catch (error) {
      console.error('Error fetching all AsyncStorage data:', error);
    }
  };
  if (!isLogout) {
    return (
      <View style={[{ flex: 1, alignItems: "center", justifyContent: 'center', backgroundColor: colors.primary }]}>
        <ActivityIndicator size={30} />
      </View>
    )
  }
  if (loadScreen) {
    return (
      <LoadingScreen
        mainIcon={loadingOptions.icon}
        mainIconSize={45}
        mainIconColor={'gray'}
        indicatorSize={'small'}
      />
    )
  }
  return (
    <View style={[styles.container, { backgroundColor: colors.primary, }]}>
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

      <View style={[styles.header, { justifyContent: 'space-between' }]}>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          height: 50,
          paddingHorizontal: 20,
        }}>
          {userImage ? <Image
            onPress={() => { }}
            style={{
              width: 35,
              height: 35,
              borderRadius: 50,
            }}
            source={{ uri: userImage }} />
            :
            <MaterialIcons
              name='person'
              size={25}
              color={colors.priText}
            />
          }
          <View style={{
            marginLeft: 10,
            height: "100%",
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: "center",
          }}>
            <Text style={{ color: colors.priText, fontSize: 17, fontWeight: '700', alignItems: 'center' }}>{userName ? userName : 'user'} </Text>
            <View style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}>
              <Text style={{ marginRight: 5, color: colors.secText, fontSize: 12, fontWeight: '600' }}>{userXp} XP</Text>
              {userVip && <VipBadge
                width={22}
                height={15}
                title={true}
                iconSize={8}
                iconColor={"#67d6dcff"}
                radius={3}
                backColor={colors.secondary}
                titleColor={colors.priText}
                elevation={2}
                textSize={8}
                icon={false}

              />}
            </View>
          </View>
        </View>

        <View style={{
          flexDirection: 'row',
          flex: 1,
          height: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}>
        </View>
        <Pressable
          android_ripple={{ color: colors.secondary, borderless: true }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 25,
            height: 25,
            borderRadius: 50,
            overflow: 'hidden',
            marginHorizontal: 15,
          }}
          onPress={() => {
            navigation.navigate('Home')
            if (sound) playSound('settingsButton')

          }}>
          <MaterialIcons name='close' color={colors.secText} size={22} />
        </Pressable>
      </View>
      <View style={{
        width: "100%",
        marginBottom: 5,
      }}>
        <Statistics />
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        contentContainerStyle={[{
          flexGrow: 1,
          marginTop: 5,
          alignItems: 'center',
          justifyContent: 'flex-start'
        }]} >
        <View style={{
          width: "100%",
          alignItems: "center",
          paddingHorizontal: 10,
          justifyContent: "center",
        }}>
          <View style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 0,
            borderRadius: 10,
            overflow: 'hidden',
          }}>

            {dataAsync && <View style={
              {
                zIndex: 9999999,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }
            }>
              <View style={
                {
                  width: '60%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.primary
                }
              }>
                <Text style={{
                  marginVertical: 0,
                  flex: 1,
                  textAlign: 'left',
                  color: colors.priText, fontSize: 12, fontWeight: '300', alignItems: 'center'
                }}>your data is uploading to the server</Text>
                <ActivityIndicator size="large" />
              </View>
            </View>}

            {!user && <View style={{
              width: '100%',
              backgroundColor: 'transparent',
              flexDirection: "row",
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 0,
              zIndex: 1,
            }}>
              <Text

                style={{
                  marginVertical: 0,
                  flex: 1,
                  textAlign: 'left',
                  color: colors.priText, fontSize: 12, fontWeight: '300', alignItems: 'center'
                }}>to save your data & progress to cloud you should sign in with Google.</Text>
              <Pressable
                style={[{
                  backgroundColor: colors.secondary,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  borderRadius: 8,
                  overflow: 'hidden',
                  height: 35
                }]}
                android_ripple={{ color: colors.primary, borderless: false }}
                onPress={signIn}
              >
                {isGradient && <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0.5
                  }}
                  colors={["#2e487acc", colors.secondary]}
                />}
                <View style={{
                  width: 35,
                  height: "100%",
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Image
                    source={require('../assets/icons/google.png')}
                    style={{
                      width: 18,
                      height: 18,
                    }}
                  />
                </View>
                <View style={{
                  height: "100%",
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingRight: 10
                }}>
                  <Text style={{
                    color: 'white',
                    fontSize: 15,
                    fontWeight: '600',
                  }}>SignIn</Text>
                </View>
              </Pressable>
            </View>}

            {settingsList.map((item, index) => (
              <SettingsCard
                itemIconSet={item.iconSet}
                key={item.id}
                index={index}
                objectKey={settingsList}
                label={item.label}
                labelColor={colors.priText}
                icon={item.icon}
                color={item.color}
                itemId={item.id}
                press={() => settingsListPress(item)}
              />
            ))}
            {DangerSettingsList.map((item, index) => (
              <SettingsCard
                key={item.id}
                index={index}
                objectKey={DangerSettingsList}
                label={item.label}
                labelColor={'#9f7070'}
                icon={item.icon}
                color={'#9f707096'}
                itemId={item.id}
                press={() => dangerSettingsListPress(item)}
              />
            ))}
            <SettingsCard
              label={texts.logout}
              labelColor={colors.priText}
              objectKey={0}
              icon={'logout'}
              color={colors.secText}
              press={() => handleLogout(navigation)} />



          </View>
        </View>

      </ScrollView>
      <CopyrightsFooter />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSec: {
    width: "100%",
    height: "100%",
    position: 'relative',
    flexDirection: "column",
    alignItems: 'center',
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    width: "100%",
    height: 70,
    backgroundColor: 'transparent'
  },
  profilePicArea: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    height: 55,
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }
})
export default Profile;
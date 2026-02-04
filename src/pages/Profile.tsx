import React, { useRef, useState, useContext, useEffect } from 'react';
import {
  Alert,
  Modal,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  TextInput,
  Dimensions,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Vibration,
} from 'react-native';
import { DataContext } from '../context/contextData';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Switch from '../components/elements/Switch.tsx';
import Statistics from './home/Statistics';
import LinearGradient from 'react-native-linear-gradient';
import SnackBar from '../components/elements/SnackBar';
// import Sound from 'react-native-sound';
import { useGoogleSignIn } from '../context/auth.ts';
import VipBadge from '../components/elements/VipBadge';
import CopyrightsFooter from '../components/CopyrightsFooter';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import FreeBadge from '../components/elements/FreeBadge.tsx';

const Profile = () => {
  const { user, initializing, signIn, logout } = useGoogleSignIn();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    userPlan,
    dataLevelIndex,
    setSnackbarState,
    setUpdateNextLevelState,
    selectedImageUri,
    userName,
    userImage,
    setHelpPoint,
    setLivesHeart,
    setQuestIndex,
    setGlobTrueAns,
    colors,
    setGlobFalseAns,
    setIsActIndicator,
    updateQuestIndex,
    setIsPicAdd,
    resetAnswerStats,
    vibrate,
    playSound,
    sound,
    isGradient,
    language,
    texts,

    snackInfo,
    setSnackOptions,
    loadingOptions,
    setLoadingOptions,
    loadScreen,
    setLoadScreen,
    setUserXp,
    userXp,
    memberSince,
    leaderBoardIcon,
    setLeaderBoardIcon,
    livesHeart,
    setUserImage,
    setUserPlan,
    setLanguage,
    setVibrate,
    resetBookmarks,

    setSound,

    handleLogout,
    isLogout,
    dataAsync,
    THEME_DARK,
    THEME_LIGHT,
    setIsGradient,
    apparence,
    setApparence,
    setColors,
    colorsList,
    currentTheme,
    setCurrentTheme,
  } = useContext(DataContext);

  const [initTheme, setInitTheme] = useState<boolean>(false);

  function SettingsCard(props: any) {
    const switchProps = {
      width: 28,
      height: 16,
      borderColor: colors.text.secondary,
      borderWidth: 1,
      radioWidth: 10,
      radioHeight: 10,
      direction: language === 'english' ? 'row-reverse' : 'row',
    };
    const RightContent = () => {
      if (props.vibre) {
        return (
          <Switch
            {...switchProps}
            radioFlex={vibrate ? 'flex-start' : 'flex-end'}
            radioColor={vibrate ? colors.button.primary : colors.text.secondary}
          />
        );
      }
      if (props.dark) {
        return (
          <Switch
            {...switchProps}
            radioFlex={currentTheme === THEME_DARK ? 'flex-start' : 'flex-end'}
            radioColor={
              currentTheme === THEME_DARK
                ? colors.button.primary
                : colors.text.secondary
            }
          />
        );
      }
      if (props.sound) {
        return (
          <Switch
            {...switchProps}
            radioFlex={sound ? 'flex-start' : 'flex-end'}
            radioColor={sound ? colors.button.primary : colors.text.secondary}
          />
        );
      }
      // return (
      //   <MaterialIcons
      //     name="arrow-back-ios"
      //     color={props.color}
      //     size={10}
      //     style={language === 'english' ? { transform: [{ rotate: '180deg' }] } : {}}
      //   />
      // );
    };
    return (
      <Pressable
        android_ripple={{
          color: colors.primary,
          borderless: false,
          foreground: true,
        }}
        style={{
          alignItems: 'center',
          width: '100%',
          borderBottomColor: colors.secondary,
          borderBottomWidth:
            props.index >= Object.keys(props.objectKey)?.length - 1 ? 0 : 0,
          overflow: 'hidden',
          justifyContent: 'space-between',
          flexDirection: language === 'arabic' ? 'row-reverse' : 'row',
        }}
        onPress={props.press}
      >
        <View
          style={{
            width: 47,
            height: 47,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {props.itemIconSet === 'MaterialCommunityIcons' ? (
            <MaterialCommunityIcons
              name={props.icon}
              color={props.color}
              size={18}
              style={
                props.itemId === 4 && { transform: [{ rotate: '-30deg' }] }
              }
            />
          ) : (
            <MaterialIcons
              name={props.icon}
              color={props.color}
              size={18}
              style={
                props.itemId === 4 && { transform: [{ rotate: '-30deg' }] }
              }
            />
          )}
        </View>
        <View
          style={[
            {
              alignItems: 'center',
              flex: 1,
              height: 47,
              flexDirection: 'row',
              justifyContent:
                language === 'english' ? 'flex-start' : 'flex-end',
            },
          ]}
        >
          <Text
            style={{
              color: props.labelColor,
              fontSize: 15,
              fontFamily: 'Cairo_600SemiBold',
            }}
          >
            {props.label}
          </Text>
        </View>
        <View
          style={[
            {
              width: 47,
              height: 47,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          <RightContent />
        </View>
      </Pressable>
    );
  }
  const settingsList = [
    {
      id: 1,
      label: texts.langEdt,
      condition: 'language',
      icon: 'translate',
      color: 'gray',
      iconSet: 'MaterialCommunityIcons',
    },
    {
      id: 2,
      label: texts.soundEdt,
      condition: 'sound',
      icon: sound ? 'volume-source' : 'volume-variant-off',
      color: 'gray',
      iconSet: 'MaterialCommunityIcons',
    },
    {
      id: 3,
      label: texts.vibrateEdt,
      condition: 'vibrate',
      icon: vibrate ? 'vibrate' : 'vibrate-off',
      color: 'gray',
      iconSet: 'MaterialCommunityIcons',
    },
    {
      id: 4,
      label: 'Dark Mode',
      condition: 'dark',
      icon: 'moon-waning-crescent',
      color: 'gray',
      iconSet: 'MaterialCommunityIcons',
    },
    {
      id: 5,
      label: texts.reportEdt,
      condition: 'report',
      icon: 'report',
      color: 'gray',
      iconSet: 'MaterialIcons',
    },
    {
      id: 6,
      label: 'Contact Us',
      condition: 'contact',
      icon: 'message',
      color: 'gray',
      iconSet: 'MaterialIcons',
    },
  ];
  const DangerSettingsList = [
    {
      id: 1,
      label: texts.restEdt,
      condition: 'reset data',
      icon: 'refresh',
      color: '#9f707096',
    },
    {
      id: 2,
      label: texts.deleteEdt,
      condition: 'delete account',
      icon: 'delete',
      color: '#9f707096',
    },
  ];

  const toggleVibrate = () => setVibrate((prev: boolean) => !prev);

  function resetStorage() {
    setUserXp(0);
    setGlobTrueAns(0);
    setGlobFalseAns(0);
    updateQuestIndex('ct1', 1);
    updateQuestIndex('ct2', 1);
    updateQuestIndex('ct3', 1);
    updateQuestIndex('ct4', 1);
    setUpdateNextLevelState(0);
    resetBookmarks('signs');
    resetBookmarks('questions');
    resetBookmarks('priority');
    AsyncStorage.clear();
  }
  const timerRef = useRef<number | null>(null);

  const clearExistingTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = (
    callback: { (): void; (): void; (): void; (): void },
    delay = 3000,
  ) => {
    clearExistingTimer();
    timerRef.current = setTimeout(callback, delay);
  };
  const dangerSettingsListPress = (item: any) => {
    switch (item.condition) {
      case 'reset data':
        setLoadScreen(true);
        setLoadingOptions({ icon: 'refresh' });
        resetStorage();
        startTimer(() => {
          setSnackbarState(true);
          setSnackOptions({ label: texts.dataReseted, icon: 'refresh' });
        });
        break;

      case 'delete account':
        setLoadScreen(true);
        setLoadingOptions({ icon: 'delete-empty' });
        resetStorage();
        setIsPicAdd(false);
        startTimer(() => {
          logout();
          setSnackbarState(true);
          setSnackOptions({ label: texts.accountDeleted, icon: 'logout' });
          navigation.navigate('Login');
        });
        break;
      default:
        break;
    }
  };

  const settingsListPress = (item: any) => {
    if (sound) playSound('settingsButton');
    switch (item.condition) {
      case 'language':
        logAllStoredData();
        break;
      case 'vibrate':
        // setInitTheme(true);
        setVibrate((prev: boolean) => !prev);
        // if (!vibrate) {
        //   Vibration.vibrate(200)
        // }
        break;
      case 'dark':
        setInitTheme(true);
        const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
        setCurrentTheme(newTheme);
        break;

      case 'sound':
        // setInitTheme(true);
        setSound((prev: any) => !prev);
        break;

      case 'report':
        navigation.navigate('Report');
        break;
      default:
        break;
    }
  };

  const [logoutLoad, setLogoutLoad] = useState<boolean>(false);
  function logoutFun() {
    setLogoutLoad(true);
    startTimer(() => {
      setLogoutLoad(false);
      navigation.navigate('Login');
      setSnackbarState(true);
      setSnackOptions({ label: texts.logoutDone, icon: 'logout' });
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
      <View
        style={[
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary,
          },
        ]}
      >
        <ActivityIndicator size={30} />
      </View>
    );
  }
  if (logoutLoad) {
    return (
      <View
        style={[
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary,
          },
        ]}
      >
        <ActivityIndicator size={30} />
      </View>
    );
  }

  if (initTheme) {
    setTimeout(() => {
      setInitTheme(false);
    }, 500);
    return (
      <View
        style={[
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary,
          },
        ]}
      >
        <ActivityIndicator size={30} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          width: '100%',
          height: 70,
          backgroundColor: 'transparent',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            height: 50,
            gap: 10,
          }}
        >
          <View
            style={{
              width: 35,
              height: 35,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {userImage ? (
              <Image
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 8,
                  borderColor: 'lightgray',
                  borderWidth: 0,
                }}
                source={{ uri: userImage }}
              />
            ) : (
              <MaterialIcons
                name="person"
                size={25}
                color={colors.text.primary}
              />
            )}
          </View>

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >

              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 17,
                  fontWeight: '700',
                  alignItems: 'center',
                }}
              >
                {userName}{' '}
              </Text>
              {userPlan === 'free' ?
                (<FreeBadge
                  width={35}
                  height={15}
                  backColor={colors.secondary}
                  elevation={0} />)
                : userPlan === 'monthly' || userPlan === 'yearly' || userPlan === 'lifetime' ?
                  (<VipBadge
                    width={27}
                    height={15}
                    title={true}
                    iconSize={12}
                    iconColor={'#dba400'}
                    radius={2}
                    backColor={colors.secondary}
                    titleColor={colors.text.primary}
                    elevation={0}
                    textSize={10}
                    icon={false}
                  />) : null}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  marginRight: 5,
                  color: colors.text.secondary,
                  fontSize: 12,
                  fontWeight: '600',
                }}
              >
                {userXp} XP
              </Text>

            </View>
          </View>
        </View>

        <Pressable
          android_ripple={{
            color: colors.primary,
            borderless: true,
            foreground: true,
          }}
          style={{
            backgroundColor: colors.secondary,
            alignItems: 'center',
            justifyContent: 'center',
            width: 30,
            height: 30,
            borderRadius: 8,
            overflow: 'hidden',
          }}
          onPress={() => {
            navigation.navigate('MainTabs', { screen: 'Home' });
            if (sound) playSound('settingsButton');
          }}
        >
          <MaterialIcons name="close" color={colors.text.secondary} size={22} />
        </Pressable>
      </View>

      {!user && (
        <View
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 0,
            zIndex: 1,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              marginVertical: 0,
              flex: 1,
              textAlign: 'left',
              color: colors.text.primary,
              fontSize: 12,
              fontWeight: '300',
              alignItems: 'center',
            }}
          >
            to save your data & progress to cloud you should sign in with
            Google.
          </Text>
          <Pressable
            style={[
              {
                backgroundColor: colors.secondary,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                borderRadius: 8,
                overflow: 'hidden',
                height: 35,
              },
            ]}
            android_ripple={{ color: colors.primary, borderless: false }}
            onPress={signIn}
          >
            {isGradient && (
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0.5,
                }}
                colors={['#2e487acc', colors.secondary]}
              />
            )}
            <View
              style={{
                width: 35,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={require('../assets/icons/google.png')}
                style={{
                  width: 18,
                  height: 18,
                }}
              />
            </View>
            <View
              style={{
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight: 10,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '600',
                }}
              >
                SignIn
              </Text>
            </View>
          </Pressable>
        </View>
      )}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        contentContainerStyle={[
          {
            flexGrow: 1,
            marginTop: 5,
            alignItems: 'center',
            justifyContent: 'flex-start',
          },
        ]}
      >
        {/* <Statistics /> */}

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0,
            borderRadius: 10,
            overflow: 'hidden',
            gap: 5,

          }}
        >
          {settingsList.map((item, index) => (
            <SettingsCard
              itemIconSet={item.iconSet}
              key={item.id}
              index={index}
              objectKey={settingsList}
              label={item.label}
              labelColor={colors.text.primary}
              icon={item.icon}
              color={item.color}
              itemId={item.id}
              press={() => settingsListPress(item)}
              dark={item.condition === 'dark'}
              vibre={item.condition === 'vibrate'}
              sound={item.condition === 'sound'}
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
            labelColor={colors.text.primary}
            objectKey={0}
            icon={'logout'}
            color={colors.text.secondary}
            press={() => {
              if (user) {
                handleLogout(navigation);
              } else {
                logoutFun();
              }
            }}
          />
        </View>
      </ScrollView>
      <CopyrightsFooter />
    </View>
  );
};

export default Profile;

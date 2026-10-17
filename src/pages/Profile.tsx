import React, { useRef, useState, useContext, useEffect } from 'react';
import {
  Modal,
  ActivityIndicator,
  Pressable,
  Text,
  Image,
  View,
  ScrollView,
} from 'react-native';
import { DataContext } from '../context/contextData';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Switch from '../components/elements/Switch.tsx';
import LinearGradient from 'react-native-linear-gradient';
import VipBadge from '../components/elements/VipBadge';
import CopyrightsFooter from '../components/CopyrightsFooter';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import FreeBadge from '../components/elements/FreeBadge.tsx';
import { useColors } from '../hooks/useColors.ts';
import { useTheme } from '../hooks/useTheme.ts';
import { useVip } from '../hooks/useVip.ts';
import { useUserAccuracy } from '../hooks/useUserAccuracy.ts';
import { useTexts } from '../hooks/useTexts.ts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSize } from '../hooks/useSize.ts';
import ContactUs from './profile/ContactUs.tsx';
const Profile = () => {
  const { screen, widthScale, heightScale, sizeScale } = useSize();
  const texts = useTexts();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const colors = useColors();
  const { userVip } = useVip();
  const { currentTheme, setCurrentTheme, THEME_DARK, THEME_LIGHT } = useTheme();
  const { userAccuracy } = useUserAccuracy();
  const {
    user,
    signIn,
    logout,
    setSnackbarState,
    setUpdateNextLevelState,
    userName,
    userImage,
    setGlobTrueAns,
    setGlobFalseAns,
    updateQuestIndex,
    setIsPicAdd,
    vibrate,
    playSound,
    sound,
    isGradient,
    language,
    setSnackOptions,
    setLoadingOptions,
    setLoadScreen,
    setVibrate,
    resetBookmarks,
    setSound,
    handleLogout,
    isLogout,
    setLanguage,
    setIsGradient,
  } = useContext(DataContext);

  const [initTheme, setInitTheme] = useState<boolean>(false);
  function toggleTheme() {
    const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    setCurrentTheme(newTheme as any);
  }
  // useEffect(() => {
  //   if (initTheme) {
  //     setTimeout(() => {
  //       setInitTheme(false);
  //       toggleTheme();
  //     }, 500);
  //   }
  // }, [initTheme]);
  function SettingsCard(props: any) {
    const switchProps = {
      width: widthScale(50),
      height: heightScale(25),
      // borderColor: colors.primary,
      // borderWidth: sizeScale(0),
      radiusWidth: sizeScale(10),
      backColor: colors.switch.background,
      radiusHeight: heightScale(28),
      radiusOut: sizeScale(5),
      radiusIn: sizeScale(5),
      paddingOut: sizeScale(0),
      direction: language === 'english' ? 'row-reverse' : 'row',
    };
    const RightContent = () => {
      if (props.id) {
        return (
          <MaterialCommunityIcons
            name={'content-copy'}
            color={colors.text.secondary}
            size={sizeScale(18)}
          />
        );
      }
      if (props.vibre) {
        return (
          <Switch
            {...switchProps}
            radiusFlex={vibrate ? 'flex-start' : 'flex-end'}
            radiusColor={vibrate ? colors.switch.primary : '#474646'}
            radiusWidth={sizeScale(vibrate ? 27 : 20)}
          />
        );
      }
      if (props.dark) {
        return (
          <Switch
            {...switchProps}
            radiusFlex={currentTheme === THEME_DARK ? 'flex-start' : 'flex-end'}
            radiusColor={
              currentTheme === THEME_DARK ? colors.active.primary : '#474646'
            }
            radiusWidth={sizeScale(currentTheme === THEME_DARK ? 27 : 20)}
          />
        );
      }
      if (props.language) {
        return (
          <Switch
            {...switchProps}
            enTextState={true}
            enTextWidth={sizeScale(27)}
            radiusFlex={language === 'english' ? 'flex-start' : 'flex-end'}
            radiusColor={
              language === 'english' ? colors.switch.primary : '#474646'
            }
            radiusWidth={sizeScale(language === 'english' ? 27 : 20)}
          />
        );
      }
      if (props.sound) {
        return (
          <Switch
            {...switchProps}
            radiusFlex={sound ? 'flex-start' : 'flex-end'}
            radiusColor={sound ? colors.switch.primary : '#474646'}
            radiusWidth={sizeScale(sound ? 27 : 20)}
          />
        );
      }
      if (props.gradient) {
        return (
          <Switch
            {...switchProps}
            radiusFlex={isGradient ? 'flex-start' : 'flex-end'}
            radiusColor={isGradient ? colors.switch.primary : '#474646'}
            radiusWidth={sizeScale(isGradient ? 27 : 20)}
          />
        );
      }
      // if (props.language) {
      //   return (
      //     <View
      //       style={{
      //         flexDirection: 'row',
      //         borderRadius: sizeScale(5),
      //         width: widthScale(60),
      //         height: '55%',
      //         alignItems: 'center',
      //         justifyContent: 'center',
      //         overflow: 'hidden',
      //       }}
      //     >
      //       <View
      //         style={[
      //           {
      //             alignItems: 'center',
      //             justifyContent: 'center',
      //             alignContent: 'center',

      //             height: '100%',
      //           },
      //           language === 'arabic'
      //             ? { backgroundColor: colors.active.primary, flex: 0.6 }
      //             : { backgroundColor: colors.text.secondary, flex: 0.4 },
      //         ]}
      //       >
      //         <Text
      //           style={[
      //             {
      //               textAlign: 'center',
      //               fontFamily: 'Cairo-Bold',
      //               fontSize: sizeScale(15),
      //               marginTop: sizeScale(-3),
      //             },
      //             language === 'english'
      //               ? { color: colors.staticText.dark.primary }
      //               : { color: colors.staticText.dark.primary },
      //           ]}
      //         >
      //           ع
      //         </Text>
      //       </View>
      //       <View
      //         style={[
      //           {
      //             alignItems: 'center',
      //             justifyContent: 'center',
      //             height: '100%',
      //           },
      //           language === 'english'
      //             ? { backgroundColor: colors.active.primary, flex: 0.6 }
      //             : { backgroundColor: colors.text.secondary, flex: 0.4 },
      //         ]}
      //       >
      //         <Text
      //           style={[
      //             {
      //               fontWeight: 'bold',
      //             },
      //             currentTheme === 'dark'
      //               ? { color: colors.text.primary }
      //               : { color: colors.text.primary },
      //           ]}
      //         >
      //           En
      //         </Text>
      //       </View>
      //     </View>
      //   );
      // }
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
        style={[
          {
            alignItems: 'center',
            width: '100%',
            height: heightScale(47),
            borderBottomColor: colors.secondary,
            borderBottomWidth:
              props.index >= Object.keys(props.objectKey)?.length - 1 ? 0 : 0,
            overflow: 'hidden',
            justifyContent: 'space-between',
            flexDirection: language === 'arabic' ? 'row-reverse' : 'row',
          },
        ]}
        onPress={props.press}
      >
        <View
          style={{
            width: widthScale(47),
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {props.itemIconSet === 'MaterialCommunityIcons' ? (
            <MaterialCommunityIcons
              name={props.icon}
              color={props.color}
              size={sizeScale(18)}
              style={
                props.itemId === 4 && { transform: [{ rotate: '-30deg' }] }
              }
            />
          ) : (
            <MaterialIcons
              name={props.icon}
              color={props.color}
              size={sizeScale(18)}
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
              height: '100%',
              flexDirection: 'row',
              justifyContent:
                language === 'english' ? 'flex-start' : 'flex-end',
            },
          ]}
        >
          <Text
            style={[
              {
                color: props.labelColor,
                fontSize: sizeScale(15),
              },
              language === 'english'
                ? {
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                  }
                : {
                    fontFamily: 'Cairo-SemiBold',
                  },
            ]}
          >
            {props.label}
          </Text>
        </View>
        <View
          style={[
            {
              flex: 1,
              height: '100%',
              alignItems: language === 'english' ? 'flex-end' : 'flex-start',
              justifyContent: 'center',
              paddingHorizontal: sizeScale(10),
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
      label: texts.idNumberEdt,
      condition: 'id',
      icon: 'id-card',
      //content-copy
      color: 'gray',
      iconSet: 'MaterialCommunityIcons',
    },
    {
      label: texts.statisticsEdt,
      condition: 'statistics',
      icon: 'chart-box',
      color: 'gray',
      iconSet: 'MaterialCommunityIcons',
    },
    {
      label: texts.langEdt,
      condition: 'language',
      icon: 'translate',
      color: 'gray',
      iconSet: 'MaterialCommunityIcons',
    },
    {
      label: texts.soundEdt,
      condition: 'sound',
      icon: sound ? 'volume-source' : 'volume-variant-off',
      color: 'gray',
      iconSet: 'MaterialCommunityIcons',
    },
    {
      label: texts.vibrateEdt,
      condition: 'vibrate',
      icon: vibrate ? 'vibrate' : 'vibrate-off',
      color: 'gray',
      iconSet: 'MaterialCommunityIcons',
    },
    {
      label: texts.darkModeEdt,
      condition: 'dark',
      icon: 'moon-waning-crescent',
      color: 'gray',
      iconSet: 'MaterialCommunityIcons',
    },
    {
      label: texts.gradientEdt,
      condition: 'gradient',
      icon: 'gradient',
      color: 'gray',
      iconSet: 'MaterialIcons',
    },
  ];
  const DangerSettingsList = [
    {
      label: texts.resetDataEdt,
      condition: 'reset data',
      icon: 'refresh',
      color: colors.text.secondary,
    },
    {
      label: texts.deleteEdt,
      condition: 'delete account',
      icon: 'delete',
      color: colors.text.secondary,
    },
  ];

  // const toggleVibrate = () => setVibrate((prev: boolean) => !prev);

  function resetStorage() {
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
      case 'id':
        break;
      case 'language':
        setLanguage((prev: String) =>
          prev === 'arabic' ? 'english' : 'arabic',
        );
        //navigation.navigate('Language');
        break;
      case 'vibrate':
        // setInitTheme(true);
        setVibrate((prev: boolean) => !prev);
        // if (!vibrate) {
        //   Vibration.vibrate(200)
        // }
        break;
      case 'dark':
        toggleTheme();
        break;

      case 'sound':
        // setInitTheme(true);
        setSound((prev: any) => !prev);
        break;

      case 'gradient':
        setIsGradient((prev: any) => !prev);
        break;

      case 'contactUs':
        navigation.navigate('ContactUs');
        break;

      default:
        break;
    }
  };
  const ContactList = [
    {
      text: 'Email',
      icon: 'email',
      color: '#EA4335',
    },
    {
      text: 'Whatsapp',
      icon: 'call',
      color: '#25D366',
    },
    {
      text: 'Telegram',
      icon: 'telegram',
      color: '#24A1DE',
    },
  ];

  // const [logoutLoad, setLogoutLoad] = useState<boolean>(false);
  // function logoutFun() {
  //   setLogoutLoad(true);
  //   startTimer(() => {
  //     setLogoutLoad(false);
  //     navigation.navigate('Login');
  //     setSnackbarState(true);
  //     setSnackOptions({ label: texts.logoutDone, icon: 'logout' });
  //   });
  // }

  useEffect(() => {
    return () => clearExistingTimer();
  }, []);

  // const logAllStoredData = async () => {
  //   try {
  //     const keys = await AsyncStorage.getAllKeys();
  //     const stores = await AsyncStorage.multiGet(keys);

  //     stores.forEach(([key, value]) => {
  //       console.log(`${key}: ${value}`);
  //     });
  //   } catch (error) {
  //     console.error('Error fetching all AsyncStorage data:', error);
  //   }
  // };
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
        {isGradient && (
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
            }}
            colors={colors.gradient.background}
          />
        )}
        <ActivityIndicator size={30} color={'#8da012'} />
      </View>
    );
  }
  // if (logoutLoad) {
  //   return (
  //     <View
  //       style={[
  //         {
  //           flex: 1,
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //           backgroundColor: colors.primary,
  //         },
  //       ]}
  //     >
  //       {isGradient && (
  //         <LinearGradient
  //           start={{ x: 0, y: 0 }}
  //           end={{ x: 1, y: 1 }}
  //           style={{
  //             position: 'absolute',
  //             top: 0,
  //             bottom: 0,
  //             right: 0,
  //             left: 0,
  //           }}
  //           colors={colors.gradient.background}
  //         />
  //       )}
  //       <ActivityIndicator size={30} />
  //     </View>
  //   );
  // }

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        paddingHorizontal: sizeScale(20),
      }}
    >
      {isGradient && (
        <LinearGradient
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
          colors={colors.gradient.primary}
        />
      )}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          width: '100%',
          height: 70,
          backgroundColor: 'transparent',
          justifyContent: 'space-between',
          paddingHorizontal: sizeScale(5),
        }}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            height: heightScale(50),
            gap: sizeScale(10),
          }}
        >
          {false && (
            <View
              style={{
                width: widthScale(35),
                height: heightScale(35),
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {userImage ? (
                <Image
                  style={{
                    width: widthScale(35),
                    height: heightScale(35),
                    borderRadius: sizeScale(8),
                  }}
                  source={{ uri: userImage }}
                />
              ) : (
                <MaterialIcons
                  name="person"
                  size={sizeScale(25)}
                  color={colors.text.primary}
                />
              )}
            </View>
          )}

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
                gap: sizeScale(8),
              }}
            >
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: sizeScale(17),
                  fontWeight: '700',
                  alignItems: 'center',
                }}
              >
                {userName}
              </Text>
              {!userVip ? (
                <FreeBadge
                  width={widthScale(35)}
                  height={heightScale(15)}
                  backColor={colors.secondary}
                  elevation={0}
                />
              ) : userVip ? (
                <VipBadge
                  width={sizeScale(27)}
                  height={heightScale(15)}
                  title={true}
                  iconSize={sizeScale(12)}
                  iconColor={'#dba400'}
                  radius={sizeScale(2)}
                  backColor={colors.secondary}
                  titleColor={colors.text.primary}
                  elevation={0}
                  textSize={sizeScale(10)}
                  icon={false}
                />
              ) : null}
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                columnGap: 3,
              }}
            >
              {userAccuracy ? (
                <Text
                  style={[
                    {
                      color: colors.text.primary,
                      fontSize: sizeScale(13),
                      textAlign: 'center',
                    },
                  ]}
                >
                  {userAccuracy}
                </Text>
              ) : (
                <Text
                  style={[
                    {
                      color: colors.text.primary,
                      fontSize: sizeScale(13),
                      textAlign: 'center',
                    },
                  ]}
                >
                  0
                </Text>
              )}
              <FontAwesome5
                name="percentage"
                size={sizeScale(13)}
                color={colors.text.secondary}
              />
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
            overflow: 'hidden',
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            width: widthScale(35),
            height: heightScale(35),
            backgroundColor: colors.secondary,
            elevation: 2,
          }}
          onPress={() => {
            navigation.navigate('MainTabs', { screen: 'Home' });
            if (sound) playSound('settingsButton');
          }}
        >
          <MaterialIcons
            name="close"
            color={colors.text.secondary}
            size={sizeScale(22)}
          />
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
            paddingHorizontal: sizeScale(20),
          }}
        >
          <Text
            style={{
              marginVertical: 0,
              flex: 1,
              textAlign: 'left',
              color: colors.text.primary,
              fontSize: sizeScale(12),
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
                height: heightScale(35),
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
                colors={colors.gradient.background}
              />
            )}
            <View
              style={{
                width: widthScale(35),
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={require('../assets/icons/google.png')}
                style={{
                  width: widthScale(18),
                  height: heightScale(18),
                }}
              />
            </View>
            <View
              style={{
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight: sizeScale(10),
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: sizeScale(15),
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
        showsVerticalScrollIndicator={false}
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
            overflow: 'hidden',
            gap: sizeScale(6),
          }}
        >
          {settingsList.map((item, index) => (
            <SettingsCard
              itemIconSet={item.iconSet}
              key={item.condition}
              index={index}
              objectKey={settingsList}
              label={item.label}
              labelColor={colors.text.primary}
              icon={item.icon}
              color={item.color}
              press={() => settingsListPress(item)}
              id={item.condition === 'id'}
              dark={item.condition === 'dark'}
              vibre={item.condition === 'vibrate'}
              sound={item.condition === 'sound'}
              language={item.condition === 'language'}
              gradient={item.condition === 'gradient'}
            />
          ))}
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              gap: sizeScale(15),
            }}
          >
            {DangerSettingsList.map(item => (
              // <SettingsCard
              //   key={item.condition}
              //   index={index}
              //   objectKey={DangerSettingsList}
              //   label={item.label}
              //   labelColor={colors.text.primary}
              //   icon={item.icon}
              //   color={item.color}
              //   press={() => dangerSettingsListPress(item)}
              // />
              <Pressable
                android_ripple={{
                  color: colors.primary,
                  borderless: false,
                  foreground: true,
                }}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  height: heightScale(47),
                  borderRadius: sizeScale(8),
                  overflow: 'hidden',
                  justifyContent: 'center',
                  flexDirection: language === 'arabic' ? 'row-reverse' : 'row',
                  backgroundColor: colors.secondary,
                }}
                onPress={() => dangerSettingsListPress(item)}
              >
                {isGradient && (
                  <LinearGradient
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      right: 0,
                      left: 0,
                    }}
                    colors={colors.gradient.secondary}
                  />
                )}
                <View
                  style={{
                    flex: 0.4,
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon === 'MaterialCommunityIcons' ? (
                    <MaterialCommunityIcons
                      name={item?.icon}
                      color={item?.color}
                      size={sizeScale(18)}
                    />
                  ) : (
                    <MaterialIcons
                      name={item.icon}
                      color={item.color}
                      size={sizeScale(18)}
                    />
                  )}
                </View>
                <View
                  style={[
                    {
                      alignItems: 'center',
                      flex: 1,
                      height: '100%',
                      flexDirection: 'row',
                      justifyContent:
                        language === 'english' ? 'flex-start' : 'flex-end',
                    },
                  ]}
                >
                  <Text
                    style={[
                      {
                        color: colors.text.primary,
                        fontSize: sizeScale(15),
                      },
                      language === 'english'
                        ? {
                            fontWeight: 'bold',
                            fontFamily: 'sans-serif',
                          }
                        : {
                            fontFamily: 'Cairo-SemiBold',
                          },
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
          {/* <SettingsCard
            label={texts.logout}
            labelColor={colors.text.primary}
            objectKey={0}
            icon={'logout'}
            color={colors.text.secondary}
            press={() => {
              if (user) {
                handleLogout(navigation);
              }
            }}
          /> */}
        </View>
      </ScrollView>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          gap: sizeScale(10),
        }}
      >
        <Pressable
          android_ripple={{
            color: colors.primary,
            borderless: false,
            foreground: true,
          }}
          style={[
            {
              marginTop: sizeScale(10),
              marginBottom: sizeScale(10),
              alignItems: 'center',
              backgroundColor: colors.active.primary,
              width: '100%',
              height: heightScale(47),
              overflow: 'hidden',
              justifyContent: 'flex-start',
              flexDirection: language === 'arabic' ? 'row-reverse' : 'row',
              borderRadius: 20,
            },
          ]}
          onPress={() => {
            if (user) {
              handleLogout(navigation);
            }
          }}
        >
          {currentTheme === 'dark' && isGradient && (
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
              }}
              colors={[colors.active.primary, colors.active.secondary]}
            />
          )}
          {/* <View
              style={{
                width: widthScale(47),
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons
                name={'logout'}
                color={colors.staticText.dark.primary}
                size={sizeScale(18)}
              />
            </View> */}
          <View
            style={[
              {
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              },
            ]}
          >
            <Text
              style={[
                {
                  color: colors.staticText.dark.primary,
                  fontSize: sizeScale(15),
                },
                language === 'english'
                  ? {
                      fontWeight: 'bold',
                      fontFamily: 'sans-serif',
                    }
                  : {
                      fontFamily: 'Cairo-Bold',
                    },
              ]}
            >
              {texts.logout}
            </Text>
          </View>
        </Pressable>

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={[
              {
                color: colors.text.secondary,
                fontSize: 12,
              },
              language === 'english'
                ? {
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                  }
                : {
                    fontFamily: 'Cairo-Bold',
                  },
            ]}
          >
            {texts.contactUsEdt}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: sizeScale(15),
            marginBottom: sizeScale(5),
          }}
        >
          {ContactList.map(items => (
            <Pressable
              android_ripple={{
                borderless: false,
                foreground: true,
                color: colors.primary,
              }}
              key={items.text}
              style={{
                // flex: 1,
                borderRadius: sizeScale(10),
                backgroundColor: items.color ?? colors.secondary,
                height: heightScale(40),
                width: widthScale(40),
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <MaterialIcons
                  name={items.icon}
                  color={colors.static.text.primary}
                  size={sizeScale(25)}
                />
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      <CopyrightsFooter />
      <Modal
        visible={initTheme}
        transparent
        onRequestClose={() => setInitTheme(false)}
      >
        <View
          style={[
            {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
            },
          ]}
        >
          <View
            style={[
              {
                elevation: 10,
                borderRadius: sizeScale(8),
                position: 'absolute',
                width: widthScale(screen.width * 0.9),
                height: heightScale(80),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.primary,
              },
            ]}
          >
            <ActivityIndicator size={30} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;

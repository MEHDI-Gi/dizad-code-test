import React, { useContext } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Linking,
  ActivityIndicator,
  StatusBar,
  Modal,
} from 'react-native';
import { DataContext } from '../context/contextData.tsx';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useGoogleSignIn } from '../context/auth.ts';
import VipBadge from '../components/elements/VipBadge.tsx';
import { useNavigation } from '@react-navigation/native';
import FreeBadge from '../components/elements/FreeBadge.tsx';
import { useSize } from '../hooks/useSize.ts';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { useColors } from '../hooks/useColors.ts';
import { useVip } from '../hooks/useVip.ts';
import { useUserAccuracy } from '../hooks/useUserAccuracy.ts';
import PermitCategories from './layout/home/PermitCategories.tsx';
import { useTexts } from '../hooks/useTexts.ts';
import { BlurView } from '@react-native-community/blur';
import Dots from '../components/elements/Dots.tsx';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function Home() {
  const { screen, widthScale, heightScale, sizeScale } = useSize();
  const { user } = useGoogleSignIn();
  const { userVip, setUserPlan } = useVip();
  const { userAccuracy } = useUserAccuracy();
  const colors = useColors();
  const texts = useTexts();

  const {
    userName,
    userImage,
    sound,
    playSound,
    lessonsData,
    examData,
    firebaseLoaded,
    setFirebaseLoaded,
    imgBase,
    language,
    isGradient,
  } = useContext(DataContext);

  const navigation = useNavigation<any>();

  const questCover = `${imgBase}/cover/qst.png`;
  const examsCover = `${imgBase}/cover/exm.png`;
  // const priorityCover = `${imgBase}/cover/prio.png`;
  const priorityCover = `${imgBase}/priority/L1/0.jpg`;
  const signsCover = `${imgBase}/cover/sgn.png`;

  const splitUserAccu = String(userAccuracy || 0);
  const [intPart, decPart = '0'] = splitUserAccu.split('.');

  let totalSgn = 0;

  (lessonsData?.content?.signs?.content || []).forEach(
    (current: { items: any }) => {
      totalSgn += Object.keys(current?.items || {}).length;
    },
  );

  let totalPri = 0;
  (lessonsData?.content?.priority?.content || []).forEach(
    (current: { items: any }) => {
      totalPri += Object.keys(current?.items || {}).length;
    },
  );

  const totalQst = Object.keys(
    lessonsData?.content?.questions?.content || {},
  ).length;

  const totalExm = Object.keys(examData?.content?.items || {}).length;

  const contentItems = [
    {
      cond: 'Exm',
      label: texts?.exmTitle,
      img: examsCover ?? null,
      sub: '',
      length: totalExm,
    },
    {
      cond: 'Sgn',
      label: texts?.sgnTitle,
      img: signsCover ?? null,
      sub: '',
      length: totalSgn,
    },
    {
      cond: 'Qst',
      label: texts?.qstTitle,
      img: questCover ?? null,
      sub: '',
      length: totalQst,
    },
    {
      cond: 'Pri',
      label: texts?.priTitle,
      img: priorityCover ?? null,
      sub: '',
      length: totalPri,
    },
  ];
  const contentItemsPress = (item: any) => {
    switch (item.cond) {
      case 'Sgn':
        navigation.navigate('MainTabs', {
          screen: 'Lessons',
          params: { screen: 'Signs', initial: false },
        });
        break;
      case 'Pri':
        navigation.navigate('MainTabs', {
          screen: 'Lessons',
          params: { screen: 'Priority', initial: false },
        });

        break;
      case 'Qst':
        navigation.navigate('MainTabs', {
          screen: 'Lessons',
          params: { screen: 'Questions', initial: false },
        });
        break;
      default:
        break;
    }
  };
  const [isExternalModalVisible, setIsExternalModalVisible] =
    React.useState(false);
  const extSources = [
    {
      title: 'Videos',
      icon: 'youtube',
      color: '#FF0000',
      sub: '',
    },
    {
      title: 'Links',
      icon: 'link',
      color: '#00FF00',
      sub: '',
    },
    {
      title: 'News',
      icon: 'newspaper',
      color: '#0000FF',
      sub: '',
    },
    { title: 'Web Sites', icon: 'web', color: '#FFFF00', sub: '' },
  ];
  const constExtSourcesPress = (item: any) => {
    switch (item.title) {
      case 'Videos':
        setIsExternalModalVisible(true);
        break;
      case 'Links':
        setIsExternalModalVisible(true);
        break;
      case 'News':
        setIsExternalModalVisible(true);
        break;
      case 'Web Sites':
        setIsExternalModalVisible(true);
        break;
    }
  };
  return (
    <View
      style={[
        styles.container,
        {
          width: screen?.width,
          flex: 1,
          backgroundColor: colors?.primary,
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      ]}
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
        style={[
          {
            zIndex: 9,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
          },
        ]}
      >
        <View
          style={[
            {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              backgroundColor: colors.primary,
            },
            isGradient
              ? {
                  opacity: 0.5,
                }
              : {
                  opacity: 0.9,
                },
          ]}
        />
        <View
          style={[
            {
              paddingHorizontal: sizeScale(20),
              flexDirection: 'row',
              width: '100%',

              height: heightScale(60),
              justifyContent: 'space-between',
              alignItems: 'center',
              elevation: 3,
              overflow: 'hidden',
            },
          ]}
        >
          <View
            style={{
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row',
              height: heightScale(50),
              columnGap: 10,
              flex: 1,
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 5,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.secondary,
                width: widthScale(36),
                height: heightScale(36),
              }}
              onPress={() => {
                if (sound) playSound('settingsButton');
                navigation.navigate('Profile');
              }}
            >
              {userImage ? (
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  resizeMode="cover"
                  source={{ uri: userImage }}
                />
              ) : (
                <MaterialCommunityIcons
                  name="account"
                  size={35}
                  color={colors.text.primary}
                />
              )}
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'column',
                backgroundColor: 'transparent',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {!firebaseLoaded ? (
                  <ShimmerPlaceHolder
                    style={{ width: widthScale(60), height: heightScale(15) }}
                    shimmerColors={[
                      colors.secondary,
                      '#6161617c',
                      colors.secondary,
                    ]}
                  />
                ) : userName ? (
                  <Text
                    style={{
                      fontSize: sizeScale(16),
                      fontWeight: '700',
                      color: colors.text.primary,
                    }}
                  >
                    {userName}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: sizeScale(16),
                      fontWeight: '700',
                      color: colors.text.primary,
                    }}
                  >
                    user
                  </Text>
                )}
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

          {!userVip ? (
            <FreeBadge
              backColor={colors.secondary}
              elevation={!isGradient ? 3 : 0}
              height={heightScale(28)}
              width={widthScale(45)}
            />
          ) : (
            <VipBadge
              width={widthScale(45)}
              height={heightScale(28)}
              title={false}
              iconSize={sizeScale(15)}
              iconColor={'#dba400'}
              radius={sizeScale(5)}
              backColor={colors.secondary}
              titleColor={colors.text.primary}
              elevation={!isGradient ? 3 : 0}
              textSize={sizeScale(12)}
              icon={true}
            />
          )}
        </View>
      </View>
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: sizeScale(80),
          paddingBottom: sizeScale(70),
          rowGap: sizeScale(10),
        }}
        style={{
          flex: 1,
          width: '100%',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: 'transparent',
            flexDirection: 'row',
            width: '100%',
            flex: 1,
            flexWrap: 'wrap',
            gap: sizeScale(10),
          }}
        >
          {!firebaseLoaded ? (
            <View
              style={[
                {
                  flexDirection: language === 'english' ? 'row' : 'row-reverse',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  width: '90%',
                  height: heightScale(screen.width * 0.25),
                  borderRadius: 8,

                  overflow: 'hidden',
                  gap: sizeScale(15),
                },
              ]}
            >
              <ShimmerPlaceHolder
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: sizeScale(8),
                }}
                shimmerColors={[
                  colors.secondary,
                  '#6161617c',
                  colors.secondary,
                ]}
              />
              <View
                style={[
                  language === 'english'
                    ? {
                        marginLeft: sizeScale(10),
                      }
                    : {
                        marginRight: sizeScale(10),
                      },
                  {
                    width: widthScale(screen.width * 0.22),
                    height: heightScale(screen.width * 0.22),
                    borderRadius: sizeScale(8),
                    backgroundColor: colors.primary,
                  },
                ]}
              />
              <View
                style={{
                  width: '100%',
                  height: heightScale(screen.width * 0.22),
                  flexDirection: 'column',
                  alignItems:
                    language === 'english' ? 'flex-start' : 'flex-end',
                  justifyContent: 'space-evenly',
                }}
              >
                <View
                  style={{
                    backgroundColor: colors.primary,
                    width: '50%',
                    height: heightScale(30),
                  }}
                />
                <View
                  style={{
                    backgroundColor: colors.primary,
                    width: '30%',
                    height: heightScale(20),
                  }}
                />
                <View
                  style={{
                    backgroundColor: colors.primary,
                    width: '60%',
                    height: heightScale(10),
                  }}
                />
              </View>
            </View>
          ) : (
            <Pressable
              android_ripple={{
                borderless: false,
                color: colors.secondary,
                foreground: true,
              }}
              onPress={() =>
                navigation.navigate('MainTabs', { screen: 'Exams' })
              }
              style={[
                language === 'english'
                  ? {
                      flexDirection: 'row-reverse',
                    }
                  : {
                      flexDirection: 'row',
                    },
                {
                  alignItems: 'center',
                  backgroundColor: colors.secondary,
                  elevation: !isGradient ? 3 : 0,
                  width: '90%',
                  height: heightScale(screen.width * 0.25),
                  borderRadius: sizeScale(8),
                  justifyContent: 'center',
                  overflow: 'hidden',
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
                  colors={colors.gradient.secondary}
                />
              )}
              <View
                style={[
                  language === 'english'
                    ? {
                        alignItems: 'flex-start',
                      }
                    : {
                        alignItems: 'flex-end',
                      },
                  {
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    width: '100%',
                    height: '100%',
                    paddingHorizontal: sizeScale(10),
                    paddingVertical: sizeScale(10),
                    flex: 1,
                  },
                ]}
              >
                <Text
                  style={{
                    fontFamily: 'Cairo-Bold',
                    color: colors.text.primary,
                    fontSize: sizeScale(16),
                  }}
                >
                  {contentItems[0]?.label}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Cairo',

                    color: colors.text.secondary,
                    fontSize: sizeScale(14),
                  }}
                >
                  {contentItems[0]?.length} {contentItems[0]?.sub}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <View
                    style={[
                      language === 'english'
                        ? {
                            justifyContent: 'flex-start',
                          }
                        : {
                            justifyContent: 'flex-end',
                          },
                      {
                        flexDirection: 'row',
                        width: '100%',
                        height: heightScale(8),
                        backgroundColor: colors.text.secondary,
                        borderRadius: sizeScale(10),
                        alignItems: 'center',
                        overflow: 'hidden',
                      },
                    ]}
                  >
                    <View
                      style={{
                        width: '5%',
                        height: '100%',
                        backgroundColor: 'green',
                        borderRadius: sizeScale(10),
                        borderTopEndRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    />
                  </View>
                </View>
              </View>
              <View
                style={[
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: widthScale(screen.width * 0.25),
                    overflow: 'hidden',
                    padding: 0,
                    borderRadius: 0,
                  },
                ]}
              >
                {contentItems[0]?.img ? (
                  <Image
                    style={{
                      width: '85%',
                      height: '85%',
                      borderRadius: sizeScale(8),
                      resizeMode: 'cover',
                    }}
                    source={{ uri: contentItems[0]?.img }}
                  />
                ) : (
                  <ShimmerPlaceHolder
                    style={{ width: '100%', height: '100%' }}
                    shimmerColors={[
                      colors.secondary,
                      '#6161617c',
                      colors.secondary,
                    ]}
                  />
                )}
              </View>
            </Pressable>
          )}
          {contentItems.map((item: any, index: number) => {
            if (index === 0) return null;
            if (!firebaseLoaded) {
              return (
                <View
                  key={`shimmer-0-${item.cond}`}
                  style={[
                    {
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                      flexDirection:
                        language === 'english' ? 'row' : 'row-reverse',
                      width: '90%',
                      height: heightScale(screen.width * 0.25),
                      borderRadius: sizeScale(8),
                      justifyContent: 'flex-start',
                      overflow: 'hidden',
                      padding: sizeScale(10),
                      gap: sizeScale(15),
                    },
                  ]}
                >
                  <ShimmerPlaceHolder
                    style={{
                      width: widthScale(screen.width * 0.22),
                      height: heightScale(screen.width * 0.22),
                      borderRadius: sizeScale(8),
                    }}
                    shimmerColors={[
                      colors.secondary,
                      '#6161617c',
                      colors.secondary,
                    ]}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: heightScale(screen.width * 0.22),
                      flexDirection: 'column',
                      alignItems:
                        language === 'english' ? 'flex-start' : 'flex-end',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <ShimmerPlaceHolder
                      style={{
                        width: '50%',
                        height: heightScale(30),
                      }}
                      shimmerColors={[
                        colors.secondary,
                        '#6161617c',
                        colors.secondary,
                      ]}
                    />
                    <ShimmerPlaceHolder
                      style={{
                        width: '30%',
                        height: heightScale(20),
                      }}
                      shimmerColors={[
                        colors.secondary,
                        '#6161617c',
                        colors.secondary,
                      ]}
                    />
                  </View>
                </View>
              );
            }
            return (
              <Pressable
                android_ripple={{
                  borderless: false,
                  color: colors.secondary,
                  foreground: true,
                }}
                onPress={() => contentItemsPress(item)}
                key={`key-1-${item.cond}`}
                style={[
                  language === 'english'
                    ? {
                        flexDirection: 'row-reverse',
                      }
                    : {
                        flexDirection: 'row',
                      },
                  {
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    width: '90%',
                    height: heightScale(screen.width * 0.25),
                    borderRadius: sizeScale(8),
                    justifyContent: 'center',
                    overflow: 'hidden',
                  },
                ]}
              >
                <View
                  style={[
                    language === 'english'
                      ? {
                          right: 0,
                        }
                      : {
                          left: 0,
                        },
                    {
                      position: 'absolute',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                      padding: sizeScale(15),
                    },
                  ]}
                >
                  <SimpleLineIcons
                    name={language === 'english' ? 'arrow-right' : 'arrow-left'}
                    color={colors.text.secondary}
                    size={sizeScale(10)}
                  />
                </View>
                <View
                  style={[
                    language === 'english'
                      ? {
                          alignItems: 'flex-start',
                        }
                      : {
                          alignItems: 'flex-end',
                        },
                    {
                      justifyContent: 'center',
                      backgroundColor: 'transparent',
                      width: '100%',
                      height: '100%',
                      paddingHorizontal: sizeScale(10),
                      paddingVertical: sizeScale(10),
                      flex: 1,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: 'Cairo-Bold',
                      color: colors.text.primary,
                      fontSize: sizeScale(16),
                    }}
                  >
                    {item?.label}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Cairo',
                      color: colors.text.secondary,
                      fontSize: sizeScale(14),
                    }}
                  >
                    {item?.length} {item?.sub}
                  </Text>
                </View>
                <View
                  style={[
                    {
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      width: widthScale(screen.width * 0.25),
                      overflow: 'hidden',
                      padding: 0,
                      borderRadius: 0,
                    },
                  ]}
                >
                  {item?.img ? (
                    <Image
                      style={{
                        width: '85%',
                        height: '85%',
                        borderRadius: sizeScale(10),
                        resizeMode: 'cover',
                      }}
                      source={{ uri: item?.img }}
                    />
                  ) : (
                    <ShimmerPlaceHolder
                      style={{
                        width: '85%',
                        height: '85%',
                        borderRadius: sizeScale(10),
                      }}
                      shimmerColors={[
                        colors.secondary,

                        '#6161617c',
                        colors.secondary,
                      ]}
                    />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
        <PermitCategories />
        {true && (
          <View
            style={{
              width: '85%',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              columnGap: sizeScale(5),
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                columnGap: sizeScale(5),
              }}
            >
              <MaterialCommunityIcons
                name="newspaper"
                color={colors.text.secondary}
                size={sizeScale(20)}
              />
              <Text
                style={{
                  fontFamily: '',
                  color: colors.text.secondary,
                  fontSize: sizeScale(14),
                  textAlign: 'center',
                }}
              >
                externel source
              </Text>
            </View>
          </View>
        )}
        {true && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              width: '90%',
              flex: 1,
              flexWrap: 'wrap',
              gap: sizeScale(7),
            }}
          >
            {extSources.map((item: any, index: number) => {
              if (!firebaseLoaded) {
                return (
                  <ShimmerPlaceHolder
                    key={`shimmer-1-${index}`}
                    style={{
                      width: '100%',
                      height: heightScale(screen.width * 0.25),
                      borderRadius: sizeScale(8),
                    }}
                    shimmerColors={[
                      colors.secondary,
                      '#6161617c',
                      colors.secondary,
                    ]}
                  />
                );
              }
              return (
                <Pressable
                  android_ripple={{
                    borderless: false,
                    color: colors.primary,
                    foreground: true,
                  }}
                  onPress={() => constExtSourcesPress(item)}
                  key={`key-0-${index}`}
                  style={[
                    {
                      alignItems: 'center',
                      backgroundColor: colors.secondary,
                      width: '48%',
                      borderRadius: sizeScale(8),
                      height: heightScale(screen.width * 0.25),
                      flexDirection: 'row',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      elevation: !isGradient ? 5 : 0,
                      columnGap: sizeScale(10),
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
                      colors={colors.gradient.secondary}
                    />
                  )}
                  {true && (
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                      }}
                    >
                      <MaterialCommunityIcons
                        name={item?.icon}
                        color={item?.color ?? colors.text.secondary}
                        size={sizeScale(28)}
                      />
                    </View>
                  )}
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                    }}
                  >
                    <Text
                      style={[
                        language !== 'english'
                          ? {
                              fontFamily: 'Cairo',
                            }
                          : {
                              fontFamily: '',
                              fontWeight: 'bold',
                            },
                        {
                          color: colors.text.primary,
                          fontSize: sizeScale(14),
                          textAlign: 'right',
                        },
                      ]}
                    >
                      {item.title}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
            <Modal
              visible={isExternalModalVisible}
              animationType="slide"
              transparent={true}
              statusBarTranslucent={true}
              onRequestClose={() => {
                setIsExternalModalVisible(false);
              }}
            >
              <View
                style={[
                  {
                    width: '100%',
                    height: '100%',
                    top: 0,
                    position: 'absolute',
                    zIndex: 99999,
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}
              >
                <Pressable
                  style={{
                    width: '100%',
                    height: '100%',
                    top: 0,
                    position: 'absolute',
                    backgroundColor: '#0000002f',
                  }}
                  onPress={() => {
                    setIsExternalModalVisible(false);
                  }}
                />
                <View
                  style={[
                    {
                      width: '90%',
                      height: '90%',
                      backgroundColor: colors.secondary,
                      zIndex: 99999,
                      borderRadius: 10,
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      elevation: 5,
                      overflow: 'hidden',
                    },
                  ]}
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
                      width: '100%',
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}
                  >
                    <Dots />
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ color: 'white', fontWeight: '800' }}>
                        Videos
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 50,
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}
                    >
                      <Pressable
                        android_ripple={{
                          color: colors.primary,
                          borderless: false,
                          foreground: true,
                        }}
                        onPress={() => {
                          setIsExternalModalVisible(false);
                        }}
                        style={{
                          width: 50,
                          height: 50,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <MaterialCommunityIcons
                          name="close"
                          color={'lightgray'}
                          size={20}
                        />
                      </Pressable>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      paddingVertical: sizeScale(10),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <View
                      style={{
                        width: '100%',
                        paddingHorizontal: sizeScale(20),
                        paddingVertical: sizeScale(10),
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: sizeScale(6),
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }}
                    ></View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
});

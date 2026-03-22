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
} from 'react-native';
import { DataContext } from '../context/contextData.tsx';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useGoogleSignIn } from '../context/auth.ts';
import VipBadge from '../components/elements/VipBadge.tsx';

import {
  useNavigation,
} from '@react-navigation/native';
import FreeBadge from '../components/elements/FreeBadge.tsx';
import { useSize } from '../hooks/useSize.ts';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { useColors } from '../hooks/useColors.ts';
import { useVip } from '../hooks/useVip.ts';
import { useUserAccuracy } from '../hooks/useUserAccuracy.ts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function Home() {
  const { screen,
    widthScale,
    heightScale,
    sizeScale,
  } = useSize();
  const { user } = useGoogleSignIn();
  const { userVip, setUserPlan } = useVip();
  const { userAccuracy } = useUserAccuracy();
  const colors = useColors();

  const {
    userName,
    userImage,
    sound,
    playSound,
    lessonsData,
    examData,
    firebaseLoaded,
    imgBase
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
      label: 'إمتحان (Quiz)',
      img: examsCover ?? null,
      sub: '',
      length: totalExm,
    },
    {
      cond: 'Sgn',
      label: 'إشارات',
      img: signsCover ?? null,
      sub: '',
      length: totalSgn,
    },
    {
      cond: 'Qst',
      label: 'أسئلة',
      img: questCover ?? null,
      sub: '',
      length: totalQst,
    },
    {
      cond: 'Pri',
      label: 'أولوية',
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
  const extSources = [
    {
      label:
        'قانون المرور / اشارات المرور / تقاطعات الطرق و نظام الأولوية في الجزائر',
      img: examsCover,
      sub: '',
    },
    { label: '', img: examsCover ?? null, sub: '' },
    { label: '', img: questCover ?? null, sub: '' },
    { label: '', img: questCover ?? null, sub: '' },
  ];


  return (
    <View style={[styles.container, {
      width: screen.width,
      flex: 1,
      backgroundColor: colors.primary,
      justifyContent: 'space-between',
      alignItems: 'center',
    },]}>
      <View style={[{
        zIndex: 9,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
      },]}>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            backgroundColor: colors.primary,
            opacity: 0.9,
          }}
        />
        <View style={[{
          paddingHorizontal: sizeScale(20),
          flexDirection: 'row',
          width: '100%',

          height: heightScale(60),
          justifyContent: 'space-between',
          alignItems: 'center',
          elevation: 3,
          overflow: 'hidden',
        },]}>
          <View style={{
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            height: heightScale(50),
            columnGap: 10,
            flex: 1,
          }}>
            <TouchableOpacity
              style={{
                borderRadius: 5,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.secondary,
                width: widthScale(35),
                height: heightScale(35),
              }}
              onPress={() => {
                if (sound) playSound('settingsButton');
                navigation.navigate('Profile');
              }}>
              {userImage ? (
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  resizeMode='cover'
                  source={{ uri: userImage }}
                />
              ) :
                <MaterialCommunityIcons
                  name='account'
                  size={35}
                  color={colors.text.primary}
                />

              }
            </TouchableOpacity>

            <View style={{
              flexDirection: 'column',
              backgroundColor: 'transparent',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flex: 1,
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {!firebaseLoaded ?
                  <ShimmerPlaceHolder
                    style={{ width: widthScale(60), height: heightScale(15) }}
                    shimmerColors={[
                      colors.secondary,
                      '#6161617c',
                      colors.secondary,
                    ]}
                  /> :
                  userName ? <Text style={{
                    fontSize: sizeScale(16),
                    fontWeight: '500',
                    color: colors.text.primary,
                  }}>
                    {userName}
                  </Text> :
                    <Text style={{
                      fontSize: sizeScale(16),
                      fontWeight: '500',
                      color: colors.text.primary,
                    }}>
                      user
                    </Text>
                }
              </View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                columnGap: 3
              }}>
                {userAccuracy ?
                  <Text style={[{
                    color: colors.text.primary,
                    fontSize: sizeScale(13),
                    textAlign: 'center',
                  }]}>
                    {userAccuracy}
                  </Text>
                  :
                  <Text style={[{
                    color: colors.text.primary,
                    fontSize: sizeScale(13),
                    textAlign: 'center',
                  }]}>
                    0
                  </Text>
                }
                <FontAwesome5
                  name='percentage'
                  size={sizeScale(13)}
                  color={colors.text.secondary}
                />
              </View>
            </View>
          </View>

          {!userVip ?
            (<FreeBadge
              backColor={colors.secondary}
              elevation={3}
              height={heightScale(28)}
              width={widthScale(45)}
            />)
            :
            (<VipBadge
              width={widthScale(45)}
              height={heightScale(28)}
              title={false}
              iconSize={sizeScale(15)}
              iconColor={'#dba400'}
              radius={sizeScale(5)}
              backColor={colors.secondary}
              titleColor={colors.text.primary}
              elevation={3}
              textSize={sizeScale(12)}
              icon={true}
            />)}

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
        }}>
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
          {!firebaseLoaded ?
            <View style={{
              alignItems: 'center',
              width: '90%',
              height: heightScale(screen.width * 0.25),
              borderRadius: 8,
              flexDirection: 'row-reverse',
              justifyContent: 'flex-start',
              overflow: 'hidden',
              gap: sizeScale(15)
            }}>
              <ShimmerPlaceHolder
                style={{
                  position: 'absolute',
                  width: "100%",
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
                style={{
                  width: widthScale(screen.width * 0.22),
                  height: heightScale(screen.width * 0.22),
                  marginRight: sizeScale(10),
                  borderRadius: sizeScale(8),
                  backgroundColor: colors.primary,
                }}
              />
              <View style={{
                width: "100%",
                height: heightScale(screen.width * 0.22),
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: "space-evenly"
              }}>
                <View
                  style={{
                    backgroundColor: colors.primary,
                    width: "50%",
                    height: heightScale(30),
                  }}
                />
                <View
                  style={{
                    backgroundColor: colors.primary,
                    width: "30%",
                    height: heightScale(20),
                  }}
                />
                <View
                  style={{
                    backgroundColor: colors.primary,
                    width: "60%",
                    height: heightScale(10),
                  }}
                />
              </View>
            </View>
            :
            <Pressable
              android_ripple={{
                borderless: false,
                color: colors.secondary,
                foreground: true,
              }}
              onPress={() => navigation.navigate('MainTabs', { screen: 'Exams' })}
              style={[
                {
                  alignItems: 'center',
                  backgroundColor: colors.secondary,
                  elevation: 3, width: '90%',
                  height: heightScale(screen.width * 0.25),
                  borderRadius: sizeScale(8),
                  flexDirection: 'row',
                  justifyContent: 'center',
                  overflow: 'hidden',
                },
              ]}
            >

              <View
                style={[
                  {
                    alignItems: 'flex-end',
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
                <View style={{
                  flexDirection: "row",
                  justifyContent: 'center',
                  alignItems: "center",
                  width: '100%',

                }}>
                  <View style={{
                    width: '90%',
                    height: heightScale(8),
                    backgroundColor: colors.text.secondary,
                    borderRadius: sizeScale(10),
                    flexDirection: "row-reverse",
                    justifyContent: 'flex-start',
                    alignItems: "center",
                    overflow: 'hidden'
                  }}>
                    <View style={{
                      width: '5%',
                      height: '100%',
                      backgroundColor: 'green',
                      borderRadius: sizeScale(10),
                      borderTopEndRadius: 0,
                      borderBottomRightRadius: 0,

                    }} />

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
            </Pressable>}
          {contentItems.map((item: any, index: number) => {
            if (index === 0) return null;
            if (!firebaseLoaded) {
              return (
                <View style={{
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  width: '90%',
                  height: heightScale(screen.width * 0.25),
                  borderRadius: sizeScale(8),
                  flexDirection: 'row-reverse',
                  justifyContent: 'flex-start',
                  overflow: 'hidden',
                  padding: sizeScale(10),
                  gap: sizeScale(15)
                }}>
                  <ShimmerPlaceHolder
                    key={`shimmer-${index}`}
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
                  <View style={{
                    width: "100%",
                    height: heightScale(screen.width * 0.22),
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: "space-evenly"
                  }}>
                    <ShimmerPlaceHolder
                      style={{
                        width: "50%",
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
                        width: "30%",
                        height: heightScale(20),
                      }}
                      shimmerColors={[
                        colors.secondary,
                        '#6161617c',
                        colors.secondary,
                      ]}
                    />
                  </View>
                </View>)
            }
            return (
              <Pressable
                android_ripple={{
                  borderless: false,
                  color: colors.secondary,
                  foreground: true,
                }}
                onPress={() => contentItemsPress(item)}
                key={`key-${index}`}
                style={[
                  {
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    width: '90%',
                    height: heightScale(screen.width * 0.25),

                    borderRadius: sizeScale(8),
                    flexDirection: 'row',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  },

                ]}
              >
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    padding: sizeScale(15),
                  }}
                >
                  <SimpleLineIcons
                    name="arrow-left"
                    color={colors.text.secondary}
                    size={sizeScale(10)}
                  />
                </View>
                <View
                  style={[
                    {
                      alignItems: 'flex-end',
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
            );
          })}
        </View>

        <View
          style={{
            width: '85%',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            columnGap: sizeScale(5),
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialCommunityIcons
              name="arrow-top-left"
              color={colors.text.secondary}
              size={sizeScale(18)}
            />
          </View>

          <Text
            style={{
              fontFamily: 'Cairo',
              color: colors.text.secondary,
              fontSize: sizeScale(16),
              textAlign: 'center',
            }}
          >
            مصادر خارجية
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: sizeScale(0),
            paddingBottom: sizeScale(10),
            rowGap: sizeScale(10),
          }}
          style={{
            flex: 1,
            width: '95%',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              width: '90%',
              flex: 1,
              gap: sizeScale(7),
            }}
          >
            {extSources.map((item: any, index: number) => {
              if (!firebaseLoaded) {
                return (
                  <ShimmerPlaceHolder
                    key={`shimmer-${index}`}
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
                  />)
              }
              return (
                <Pressable
                  android_ripple={{
                    borderless: false,
                    color: colors.primary,
                    foreground: true,
                  }}
                  onPress={() => {
                    Linking.openURL(
                      'https://www.youtube.com/playlist?list=PLIuGUVzSi-K4754yPL6zul8QbGiK9xYNR',
                    );
                  }}
                  key={`key-${index}`}
                  style={[
                    {
                      alignItems: 'center',
                      backgroundColor: colors.secondary,
                      width: heightScale(screen.width * 0.25),
                      height: heightScale(screen.width * 0.25),
                      padding: sizeScale(10),
                      borderRadius: sizeScale(8),
                      flexDirection: 'column',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      elevation: 5,
                      columnGap: sizeScale(0),
                    },
                  ]}
                >
                  <Image
                    style={{
                      width: widthScale(screen.width * 0.15),
                      height: widthScale(screen.width * 0.15),
                      borderRadius: sizeScale(50),
                      resizeMode: 'cover',
                    }}
                    source={{ uri: item?.img }}
                  />
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      flex: 1,
                      zIndex: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'Cairo',
                        color: colors.text.primary,
                        fontSize: sizeScale(14),
                        textAlign: 'right',
                      }}
                    >
                      title
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

        </ScrollView>
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
                  key={`shimmer-${index}`}
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
                />)
            }
            return (
              <Pressable
                android_ripple={{
                  borderless: false,
                  color: colors.primary,
                  foreground: true,
                }}
                onPress={() => {
                  Linking.openURL(
                    'https://www.youtube.com/playlist?list=PLIuGUVzSi-K4754yPL6zul8QbGiK9xYNR',
                  );
                }}
                key={`key-${index}`}
                style={[
                  {
                    alignItems: 'center',
                    backgroundColor: colors.secondary,
                    width: '100%',
                    height: heightScale(screen.width * 0.25),
                    borderRadius: sizeScale(8),
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-evenly',
                    paddingHorizontal: sizeScale(20),
                    paddingVertical: sizeScale(10),
                    overflow: 'hidden',
                    elevation: 5,
                    columnGap: sizeScale(10),
                  },
                ]}
              >
                <Image
                  style={{
                    width: widthScale(screen.width * 0.35),
                    height: '100%',
                    borderRadius: sizeScale(10),
                    resizeMode: 'cover',
                  }}
                  source={{ uri: item?.img }}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    flex: 1,
                    rowGap: sizeScale(5),
                    zIndex: 2,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Cairo',
                      color: colors.text.primary,
                      fontSize: sizeScale(14),
                      textAlign: 'right',
                    }}
                  >
                    {item.label}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView >
    </View >
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

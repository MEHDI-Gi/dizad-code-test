import { useContext, useState } from 'react';
import { Image, Linking, ScrollView, View } from 'react-native';
import { DataContext } from '../../../context/contextData';
import { useSize } from '../../../hooks/useSize';
import { useColors } from '../../../hooks/useColors';
import { useTexts } from '../../../hooks/useTexts';
import { Pressable, Text, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { useGoogleSignIn } from '../../../context/auth';
import { useVip } from '../../../hooks/useVip';
import { useUserAccuracy } from '../../../hooks/useUserAccuracy';
import Dots from '../../../components/elements/Dots';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function ExternalSources() {
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

  const playlists = [
    {
      title: 'Auto ecole Laghouat تعليم السياقة الأغواط',
      channel: '@Auto_ecole_laghouat',
      logo: 'https://yt3.googleusercontent.com/-K1fdrbtRghdUVYaLYfMEjJvpnWKMEPnjIEgE56cFSEoM786Z2585uKIl5PqmZbqCZPLd6n-=s160-c-k-c0x00ffffff-no-rj',
      url: 'https://www.youtube.com/@Auto_ecole_laghouat/playlists',
    },
    {
      title: 'code de la route khalil  قانون المرور',
      channel: '@codedelaroutekhalil2009',
      logo: 'https://yt3.googleusercontent.com/4n6SSKY6KKQjXpfcuH_BCgS_r4zEAKnUBxxAKAmTkPN8JCtqoEdzaSNjAmF8uvzdB3lG4iK9=s160-c-k-c0x00ffffff-no-rj',
      url: 'https://www.youtube.com/@codedelaroutekhalil2009/playlists',
    },
    {
      title: 'تعليم السياقة مسعودي',
      channel: '@auto_ecole_messaoudi',
      logo: 'https://yt3.googleusercontent.com/c3gdqjrsDClK_cb2R3PLgNTbP6HMuA7KI81AT7IyBqk2x7FAS6s-5B6Emr2cueZ11ZdsSM9sFQ=s160-c-k-c0x00ffffff-no-rj',
      url: 'https://www.youtube.com/@auto_ecole_messaoudi/playlists',
    },
    {
      title: 'تعليم السياقة حاج سعيد',
      channel: '@autoecolehadjsaid',
      logo: 'https://yt3.googleusercontent.com/Edtsj1PHueR45FCyEo2poMTn_eZEpSPxS-1AOGKiyhtXHazMHPWF3Lmzsypfk_FW-elnCf2tYpI=s160-c-k-c0x00ffffff-no-rj',
      url: 'https://www.youtube.com/@autoecolehadjsaid/playlists',
    },
    {
      title: 'Yassine Kersani TV',
      channel: '@yassinekersani',
      logo: 'https://yt3.googleusercontent.com/Qvvj1o3D8Y1yoFhSRBv7MDkeZkghz8qsWkUlyWCQ7Ig3Iko6MkzOkj0bGOxKfFqPKfBYnUMPHXc=s160-c-k-c0x00ffffff-no-rj',
      url: 'https://www.youtube.com/@yassinekersani/playlists',
    },
    {
      title: 'قناة دعاء للتعليم المروري',
      channel: '@monitrice_douaa',
      logo: 'https://yt3.googleusercontent.com/Bl9pfu4qlmczzntE0FsPaVi8loCQlwpVvbQKtL1GVVNpxzuzua_zWrOWyv6ANpvkJRJq6LmS=s160-c-k-c0x00ffffff-no-rj',
      url: 'https://www.youtube.com/@monitrice_douaa/playlists',
    },
    {
      title: 'Auto Ecole Grine  تعليم السياقة',
      channel: '@Auto-Ecole-Grine',
      logo: 'https://yt3.googleusercontent.com/E-R4v4hnUY3uGYe7vuhlEO6pPSgaC2ta0zoRdNbdPcYNTWjO-oTFTT-A2t9G829f-TuQl88v=s160-c-k-c0x00ffffff-no-rj',
      url: 'https://www.youtube.com/@Auto-Ecole-Grine/videos',
    },
    {
      title: 'Auto Ecole Sissaoui تعليم السياقة سيساوي',
      channel: '@AutoEcoleSissaoui',
      logo: 'https://yt3.googleusercontent.com/ytc/AIdro_nTK2luyVIiXrgwXaW9zZ4vF-G_8NSut7Lfu1wxMS1trGk=s160-c-k-c0x00ffffff-no-rj',
      url: 'https://www.youtube.com/@AutoEcoleSissaoui/playlists',
    },
    {
      title: 'تعليم السياقة وقانون المرور كود كرينو سيركوي ',
      channel: '@تعليم_السياقة_وقانون_المرور',
      logo: 'https://yt3.googleusercontent.com/6I9za8cXC5DkMEqKE4d7UEwSIZ5zL_Heu4zqgcWJdfR_3zMF4T470a_uTv63V2fPQS-IHTYRS5o=s160-c-k-c0x00ffffff-no-rj',
      url: 'https://www.youtube.com/@تعليم_السياقة_وقانون_المرور/videos',
    },
    {
      title: 'مدرسة تعليم السياقة أمحمد رضوان',
      channel: '@Radouane',
      logo: 'https://yt3.googleusercontent.com/ytc/AIdro_mgRMfhyXzOO63ezTCyGZFH2pmn_5u4AP0gMlAGhET58zA=s160-c-k-c0x00ffffff-no-rj',
      url: 'https://www.youtube.com/@Radouane/playlists',
    },
    {
      title: 'بوزيد الربيع لتعليم السياقة.',
      channel: '@bouzidrabie3641',
      logo: 'https://yt3.googleusercontent.com/FFCnK5TBusK-ErF6UPgZd1IjdN-yvHIKmgW6NQlOCz7Th2Zlf0ICZt2NdL7m7k3-rUyfitabvg=s160-c-k-c0x00ffffff-no-rj',
      url: 'https://www.youtube.com/@bouzidrabie3641/videos',
    },
  ];
  const [isExternalModalVisible, setIsExternalModalVisible] = useState(false);
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

  const [titles, setTitles] = useState<any>(0);
  const constExtSourcesPress = (item: any) => {
    switch (item.title) {
      case 'Videos':
        setIsExternalModalVisible(true);
        setTitles(0);
        break;
      case 'Links':
        setIsExternalModalVisible(true);
        setTitles(1);
        break;
      case 'News':
        setIsExternalModalVisible(true);
        setTitles(2);
        break;
      case 'Web Sites':
        setIsExternalModalVisible(true);
        setTitles(3);
        break;
    }
  };
  return (
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
              shimmerColors={[colors.secondary, '#6161617c', colors.secondary]}
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
                  {extSources?.[titles]?.title} {titles === 0 && 'Playlists'}
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
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ScrollView
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingTop: sizeScale(20),
                  paddingBottom: sizeScale(70),
                  rowGap: sizeScale(10),
                }}
                style={{
                  flex: 1,
                  width: '100%',
                }}
              >
                {playlists.map((item: any, index: number) => {
                  if (titles !== 0) return null;
                  if (!firebaseLoaded) {
                    return (
                      <ShimmerPlaceHolder
                        key={`shimmer-2-${index}`}
                        style={{
                          width: '90%',
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
                        color: colors.secondary,
                        foreground: true,
                      }}
                      onPress={() => {
                        Linking.openURL(item?.url).catch(err =>
                          console.error('Failed to open URL:', err),
                        );
                      }}
                      key={`key-1-${index}`}
                      style={[
                        {
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: colors.primary,
                          width: '90%',
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
                          {
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            backgroundColor: 'transparent',
                            width: '100%',
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
                            textAlign: 'right',
                          }}
                        >
                          {item?.title}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Cairo',
                            color: colors.text.secondary,
                            fontSize: sizeScale(14),
                            textAlign: 'right',
                          }}
                        >
                          {item?.channel}
                        </Text>
                      </View>
                      <View
                        style={[
                          {
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: widthScale(screen.width * 0.15),
                            height: heightScale(screen.width * 0.15),
                            overflow: 'hidden',
                            margin: sizeScale(10),
                            borderRadius: 50,
                          },
                        ]}
                      >
                        {item?.logo ? (
                          <Image
                            style={{
                              width: '100%',
                              height: '100%',

                              borderRadius: sizeScale(10),
                              resizeMode: 'cover',
                            }}
                            source={{ uri: item?.logo }}
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
              </ScrollView>
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
  );
}

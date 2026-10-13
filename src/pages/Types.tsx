import React, { useContext, useState } from 'react';
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
  Modal,
  StatusBar,
} from 'react-native';
import { DataContext } from '../context/contextData.tsx';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useGoogleSignIn } from '../context/auth.ts';
import { useNavigation } from '@react-navigation/native';
import { useSize } from '../hooks/useSize.ts';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { useColors } from '../hooks/useColors.ts';
import { useVip } from '../hooks/useVip.ts';
import { useUserAccuracy } from '../hooks/useUserAccuracy.ts';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function Types() {
  const { screen, widthScale, heightScale, sizeScale } = useSize();
  const { user } = useGoogleSignIn();
  const { userVip, setUserPlan } = useVip();
  const { userAccuracy } = useUserAccuracy();
  const colors = useColors();
  const navigation = useNavigation<any>();
  const {
    userName,
    userImage,
    sound,
    playSound,
    lessonsData,
    examData,
    firebaseLoaded,
    imgBase,
    language,
  } = useContext(DataContext);

  const TYPES_CONTENT = lessonsData?.content?.types?.content || [];
  const typesContent = TYPES_CONTENT.map((item: any, index: any) => ({
    id: item.id ?? index,
    label: `type ${index + 1}`,
    condition: `types ${index}`,
    img: item.img && `${imgBase}/priority/${item.folder}/${item.img}.jpg`,

    items: item.items || [], // Include items for nested <lists>                                                                                     </lists>
  }));
  const typesItemsList = [
    {
      icon: 'car-side',
      label: language === 'english' ? 'B' : 'ب',
      src: 'MaterialCommunityIcons',
    },
    {
      icon: 'motorcycle',
      label: language === 'english' ? 'A' : 'أ',
      src: 'FontAwesome5',
    },
    {
      icon: 'truck',
      label: language === 'english' ? 'C' : '',
      src: 'MaterialCommunityIcons',
    },
    {
      icon: 'bus',
      label: language === 'english' ? 'D' : '',
      src: 'FontAwesome5',
    },
  ];

  const [openModal, setOpenModal] = useState(false);

  return (
    <View
      style={{
        paddingTop: sizeScale(20),
        // borderRadius: sizeScale(8),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'flex-start',
        elevation: 5,
        backgroundColor: colors.secondary,
        flex: 1,
        width: '100%',
      }}
    >
      <View
        style={{
          width: '100%',
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: language === 'english' ? 'row-reverse' : 'row',
        }}
      >
        <Pressable
          android_ripple={{
            borderless: false,
            color: colors.primary,
            foreground: true,
          }}
          onPress={() => navigation.navigate('MainTabs')}
          style={[
            {
              borderRadius: sizeScale(50),
              backgroundColor: 'transparent',
              marginRight: sizeScale(5),
              width: sizeScale(50),
              height: sizeScale(50),
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            },
          ]}
        >
          <MaterialCommunityIcons
            name={'close'}
            color={colors.text.secondary}
            size={sizeScale(28)}
          />
        </Pressable>
        <View
          style={[
            {
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'center',
              overflow: 'hidden',
            },
          ]}
        >
          <Text
            style={{
              fontFamily: language == 'english' ? 'sans-serif' : 'Cairo-Bold',
              color: colors.text.secondary,
              fontSize: sizeScale(16),
            }}
          >
            Permit Categories
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          width: '100%',
          flex: 1,
          gap: sizeScale(10),
        }}
      >
        {TYPES_CONTENT.map((item: any, index: number) => {
          if (!firebaseLoaded) {
            return (
              <ShimmerPlaceHolder
                key={`shimmer-${index}`}
                style={{
                  backgroundColor: colors.secondary,
                  alignItems: 'center',
                  borderRadius: sizeScale(10),
                  overflow: 'hidden',
                  elevation: 5,
                  with: widthScale(10),
                  height: heightScale(20),
                  columnGap: sizeScale(14),
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
              onPress={() => {
                setOpenModal(true);
              }}
              key={`key-${index}`}
              style={[
                {
                  backgroundColor: colors.secondary,
                  alignItems: 'center',
                  flex: 1,
                  paddingVertical: sizeScale(9),
                  borderRadius: sizeScale(10),
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  overflow: 'hidden',
                },
              ]}
            >
              <View
                style={[
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  },
                ]}
              >
                {item.src === 'MaterialCommunityIcons' ? (
                  <MaterialCommunityIcons
                    name={item.icon}
                    color={colors.text.secondary}
                    size={sizeScale(20)}
                  />
                ) : item.src === 'FontAwesome5' ? (
                  <FontAwesome5
                    name={item.icon}
                    color={colors.text.secondary}
                    size={sizeScale(16)}
                  />
                ) : null}
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily:
                      language === 'english' ? 'sans-serif' : 'Cairo-Bold',
                    color: colors.text.secondary,
                    fontSize: sizeScale(18),
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  {item.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

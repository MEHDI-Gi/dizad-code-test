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
import { DataContext } from '../../../context/contextData.tsx';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useGoogleSignIn } from '../../../context/auth.ts';
import { useNavigation } from '@react-navigation/native';
import { useSize } from '../../../hooks/useSize.ts';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { useColors } from '../../../hooks/useColors.ts';
import { useVip } from '../../../hooks/useVip.ts';
import { useUserAccuracy } from '../../../hooks/useUserAccuracy.ts';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function PermitCategories() {
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
    isGradient,
  } = useContext(DataContext);

  const permitCategories = [
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
      src: 'MaterialCommunityIcons',
    },
    {
      icon: 'arrow-right',
      src: 'FontAwesome5',
    },
  ];

  const [openModal, setOpenModal] = useState(false);

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '90%',
        flex: 1,
        gap: sizeScale(8),
      }}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '100%',
          flex: 1,
          gap: sizeScale(10),
        }}
      >
        {permitCategories.map((item: any, index: number) => {
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
                  height: heightScale(screen.width * 0.12),
                  borderRadius: sizeScale(10),
                  flexDirection: 'row',
                  justifyContent: item.label ? 'space-evenly' : 'center',
                  overflow: 'hidden',
                },
                index === permitCategories.length - 1 && {
                  flex: 0,
                  width: widthScale(screen.width * 0.12),
                  height: heightScale(screen.width * 0.12),
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
                  {item?.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

import React, { useRef, useState, useContext, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  StatusBar,
  ActivityIndicator,
  DrawerLayoutAndroid,
  Dimensions,
} from 'react-native';
import {
  TextInput,
  Button,
  IconButton,
  MD3Colors,
  Icon,
  Appbar,
} from 'react-native-paper';
import { DataContext } from '../context/contextData.tsx';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import LinearGradient from 'react-native-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types.ts';

import { useSize } from '../hooks/useSize.ts';
import { useGoogleSignIn } from '../context/auth.ts';
import { useColors } from '../hooks/useColors.ts';

export default function Exams() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { lessons, screen, isMEDscreen, sizeScale } = useSize();
  const colors = useColors();
  const {
    signsData,
    setSignsItemsIndex,
    signsItemsIndex,
    lessonPercentage,
    lessonsCurrentLevelIndex,
    signsDataLength,
    setDataLevelIndex,
    answerStats,
    levelsRank,
    setLevelsRank,
    quizCategoriesData,
    userPlan,
    sound,
    playSound,
    isGradient,
    texts,
    language,
    isRewardAdd,
    setIsRewardAdd,
    setOpenItems,
  } = useContext(DataContext);

  const title = 'Exams';
  const [comingSoon, setComingSoon] = useState<boolean>(false);

  return (
    <View
      style={[
        {
          flexDirection: 'column',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.primary,
          gap: sizeScale(10),
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
          colors={[colors.primary, '#152331']}
        />
      )}
      <Text
        style={{
          fontWeight: '600',
          color: colors.text.primary,
          fontSize: sizeScale(17),
        }}
      >
        Coming Soon
      </Text>

      <MaterialIcons
        name="construction"
        size={sizeScale(20)}
        color={colors.button.primary}
      />
    </View>
  );
}

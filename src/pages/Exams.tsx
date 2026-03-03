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

  const { lessons, screen, isMEDscreen } = useSize();
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
          gap: 10,
        },
      ]}
    >
      <Text
        style={{
          fontWeight: '600',
          color: colors.text.primary,
          fontSize: isMEDscreen ? 15 : 20,
        }}
      >
        Coming Soon
      </Text>

      <MaterialIcons
        name="construction" size={isMEDscreen ? 15 : 20} color={colors.button.primary} />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  xpArea: {
    flexDirection: 'row',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  statisticsAreaContainer: {
    width: '100%',
    paddingVertical: 10,
    paddingBottom: 10,
    paddingTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statisticsTitleArea: {
    paddingHorizontal: 15,
    marginBottom: 0,
    backgroundColor: 'transparent',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  statisticsTitle: {
    lineHeight: 35,
    fontFamily: 'Cairo_600SemiBold',
    fontSize: 16,
    textAlign: 'center',
  },
  statisticsArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
    height: 100,
    borderRadius: 10,
  },
  statisticsItems: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 8,
    width: 80,
    height: '100%',
    marginHorizontal: 3,
    alignItems: 'center',
    paddingVertical: 10,
  },
  statisticsItemsTitle: {
    fontSize: 12,
    fontFamily: 'Cairo_600SemiBold',
    textAlign: 'center',
  },
  mainArea: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
    paddingHorizontal: 10,
  },
  levelListItems: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
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
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startBtn: {
    textAlign: 'center',
    borderRadius: 9,
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  startBtnText: {
    fontFamily: 'Cairo_700Bold',
    textAlign: 'center',
  },
  startButtonArea: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    backgroundColor: '#22799c',
    textAlign: 'center',
    borderRadius: 8,
    width: '93%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  startButtonTitle: {
    fontFamily: 'Cairo_700Bold',
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 45,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,
    backgroundColor: 'gray',
    width: 300,
    height: 60,
    borderRadius: 0,
    paddingHorizontal: 10,
    elevation: 3,
  },
  statistics: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,
    width: 60,
    height: 60,
    borderRadius: 0,
  },
});

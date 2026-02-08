import {
  BackHandler,
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  ActivityIndicator,
  Pressable,
  Vibration
} from 'react-native';
import { DataContext } from '../context/contextData';
import { TextInput, Button, IconButton, MD3Colors, Icon, Appbar, RadioButton, ProgressBar, Snackbar, Surface, Dialog, Portal, PaperProvider } from 'react-native-paper';
import React, { useRef, useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import VipBadge from '../components/elements/VipBadge';
import HeartBadge from '../components/elements/FreeBadge';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

import type { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BottomTab from '../components/elements/BottomTab';
import CategoriesList from './home/CategoriesList';
import { useColors } from '../hooks/useColors';

const TestsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    setHelpPoint,
    helpPoint,
    quizData,
    answersRef,
    setGlobFalseAns,
    dataLevelIndex, setDataLevelIndex,

  } = useContext(DataContext);
  const colors = useColors();

  return (
    <View style={
      {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary
      }
    }>
      <View style={{
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text style={{ fontFamily: "Cairo", color: colors.text.primary, fontSize: 16, }}>
          Tests
        </Text>
      </View>
      <View style={[styles.mainContainer, { backgroundColor: 'transparent' }]}>
        <View style={styles.mainArea}>
          <CategoriesList />
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  mainArea: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: "center",
    backgroundColor: "transparent",
    position: 'relative',
    paddingHorizontal: 10,
  },
  header: {
    zIndex: 99999,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "100%",
    height: 50,
    paddingHorizontal: 10,
    overflow: 'hidden',

  },
  timeArea: {
    zIndex: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  exitArea: {
    zIndex: 9999,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",

  },
  progressBarArea: {
    width: "65%",
    height: 40,
    backgroundColor: "transparent",
    justifyContent: 'center'
  },
  helpArea: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  helpBtn: {
    flexDirection: "row",
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 50,
  },
  content: {
    flex: 1,
    zIndex: 9999,
    width: '100%',
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
  questContainer: {
    width: "92%",
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 0,
    padding: 0,
  },
  questTextContainer: {
    flex: 1,
    backgroundColor: "transparent",
    width: "100%",
    padding: 8,
    alignItems: "center",
    justifyContent: 'center'
  },
  questText: {
    fontSize: 16,
    fontFamily: "Cairo_700Bold",
    textAlign: "center",
    lineHeight: 30
  },
  answersContainer: {
    flex: 3,
    position: 'relative',
    backgroundColor: "transparent",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  answersBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
    borderRadius: 5,
    marginVertical: 5,
    width: '90%',
    height: 45
  },

  answerBtnActive: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
    backgroundColor: "#2e436e",
    borderRadius: 5,
    marginVertical: 5,
    width: '90%',
    height: 45
  },

  answersBtnTxt: {
    color: "white",
    fontSize: 15,
    fontFamily: "Cairo_700Bold",
    lineHeight: 45
  },
  checkButtonArea: {
    width: "90%",
    height: 100,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "transparent"
  },
  checkButton: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
    borderRadius: 8,
    flex: 1,
    height: 40,
  },
  helpButton: {
    position: "absolute",
    right: 0,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    width: 45,
    height: 45,
    backgroundColor: "transparent"
  },
  nextButtonContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 0,
    justifyContent: 'flex-end',
    transform: "translate(0, 100%)",
    zIndex: 999,
    paddingBottom: 0,

  },
  nextButtonArea: {
    width: "100%",
    height: 100,
    position: 'relative',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "transparent"
  },
  nextButton: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
    borderRadius: 8,
    width: "90%",
    height: 50,
    marginVertical: 0,

  },
  resulteText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Cairo_700Bold",
  },
  checkButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold"
  },
});
export default TestsScreen;
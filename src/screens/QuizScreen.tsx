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
import LevelEnd from './quiz/LevelEnd';
import LivesHeartEnd from './quiz/LivesHeartEnd';

import type { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const QuizScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  const {
    setHelpPoint,
    helpPoint,
    quizData,
    answersRef,
    globTrueAns, setGlobTrueAns,
    globFalseAns,
    setGlobFalseAns,
    colors,
    dataLevelIndex, setDataLevelIndex,
    updateQuestIndex, updateAnswerStats,
    questIndices, answerStats,
    percentage,
    currentQuestionsIndex, currentLevelIndex,
    levelEndState, setlevelEndState,
    exitBtn, setExitBtn,
    setHandleTimerBackground, vibrate, sound, playSound,
    isGradient, setSnackbarState, setSnackOptions, setHeartsCard,
    setUserXp, userPlan
  } = useContext(DataContext);

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [answersResult, setAnswersResult] = useState<string>('');
  const [isAnswersSelected, setIsAnswersSelected] = useState<boolean>(false)
  const [isPointsAvailable, setIsPointsAvailable] = useState<boolean>(false)
  const [isAnsBtnAct, setIsAnsBtnAct] = useState<boolean>(false);
  const [buttonsStates, setButtonsStates] = useState<boolean[]>([false, false, false]);
  const [checkedButtonIndex, setCheckedButtonIndex] = useState<number>(-1);
  const [trueAnswer, setTrueAnswer] = useState<boolean>(false);
  const [showCorrectAnswerIndex, setShowCorrectAnswerIndex] = useState<number | null>(null);
  const [isPointHelpPressed, setIsPointHelpPressed] = useState<boolean>(false);

  const [answerSelectPosition, setAnswerSelectPosition] = useState<number>(0);
  const [helpSnackPosition, setHelpSnackPosition] = useState<number>(0);
  const [isButtonChecked, setIsButtonChecked] = useState<boolean>(false);



  const [backgroundEffect, setBackgroundEffect] = useState(false);

  const imgUri = quizData?.[`ct${dataLevelIndex}`]?.[`Q${questIndices[`ct${dataLevelIndex}`]}`]?.img;
  const qstTxt = quizData?.[`ct${dataLevelIndex}`]?.[`Q${questIndices[`ct${dataLevelIndex}`]}`]?.['Question'];
  const ansTxt = quizData?.[`ct${dataLevelIndex}`]?.[`Q${questIndices[`ct${dataLevelIndex}`]}`]?.[`Answers`];
  const rgtAns = quizData?.[`ct${dataLevelIndex}`]?.[`Q${questIndices[`ct${dataLevelIndex}`]}`]?.[`RightAnswer`];

  const ansTxtOff = ['a1', 'a2', 'a3']


  const handleAnswerSelect = (answers: string, index: number) => {
    setIsChecked(true)
    setIsAnsBtnAct(true);
    setCheckedButtonIndex(index);
    console.log(`${isAnsBtnAct} from handleAnswer`)
    setIsAnswersSelected(false)
    setButtonsStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    })
    setSelectedAnswer(answers);
  };

  const checkAnswer = () => {
    if (selectedAnswer === '' || !isChecked) {
      setIsAnswersSelected(true)
      if (isPointsAvailable) {
        setAnswerSelectPosition(35)
        setHelpSnackPosition(0)
      } else {
        setAnswerSelectPosition(0)
      }
      setTimeout(() => { setIsAnswersSelected(false) }, 3000)

      if (sound) playSound('alert')
    } else if (selectedAnswer === rgtAns && isChecked) {
      setUserXp((prev: string | number) => + 50);


      if (sound) playSound("correctAnswer")
      setBackgroundEffect(true)
      nextButtonTranslate.value = 0;
      setAnswersResult('إجابة صحيحة');
      setTrueAnswer(true);
      setGlobTrueAns((prev: number) => prev + 1);
      setIsButtonChecked(true);
      updateAnswerStats(`ct${dataLevelIndex}`, { correct: 1 });
    } else if (selectedAnswer !== rgtAns && isChecked) {
      if (vibrate) Vibration.vibrate(100)
      if (sound) playSound("wrongAnswer")
      nextButtonTranslate.value = 0;
      setBackgroundEffect(true)
      updateAnswerStats(`ct${dataLevelIndex}`, { false: + 1 });
      setIsButtonChecked(true);
      setTrueAnswer(false);
      setAnswersResult('إجابة خاطئة');
      setGlobFalseAns((prev: number) => prev + 1);
    }
  };

  const NextButton = () => {
    timeOutViewTranslate.value = 300;
    nextButtonTranslate.value = 300;
    if (currentQuestionsIndex < currentLevelIndex) {
      updateQuestIndex(`ct${dataLevelIndex}`, currentQuestionsIndex + 1);
      setHandleTimerBackground(false);
    } else if (currentQuestionsIndex === currentLevelIndex) {
      updateQuestIndex(`ct${dataLevelIndex}`, currentQuestionsIndex + 1);
    }
    setBackgroundEffect(false)
    setIsPointHelpPressed(false);
    setIsAnsBtnAct(false);
    setShowCorrectAnswerIndex(null);
    setIsChecked(false);
    setIsButtonChecked(false);
  };

  const quitButton = () => {
    nextButtonTranslate.value = 300;
    if (currentQuestionsIndex < currentLevelIndex) {
      updateQuestIndex(`ct${dataLevelIndex}`, currentQuestionsIndex + 1);
      setHandleTimerBackground(false);
    } else if (currentQuestionsIndex === currentLevelIndex) {
      updateQuestIndex(`ct${dataLevelIndex}`, currentQuestionsIndex + 1);
    }
    setBackgroundEffect(false)
    setIsPointHelpPressed(false);
    setIsAnsBtnAct(false);
    setShowCorrectAnswerIndex(null);
    setIsChecked(false);
    setIsButtonChecked(false);
    navigation.navigate('Home')
  };

  const HelpPoints = () => {
    if (helpPoint >= 1) {
      // Determine correct answer index
      const correctIndex = quizData[`ct${dataLevelIndex}`][`Q${questIndices[`ct${dataLevelIndex}`]}`]['Answers'].findIndex(
        (answer: any) => answer === quizData[`ct${dataLevelIndex}`][`Q${questIndices[`ct${dataLevelIndex}`]}`]['RightAnswer']
      );

      if (correctIndex !== -1) {
        setHelpPoint((prev: number) => prev - 1)
        setIsPointHelpPressed(true)
        setShowCorrectAnswerIndex(correctIndex); // Set state with correct index
        setIsAnsBtnAct(correctIndex); // Update isAnsBtnAct to mark the answer as selected
        setIsChecked(true); // Set isChecked to true
        setSelectedAnswer(quizData[`ct${dataLevelIndex}`][`Q${questIndices[`ct${dataLevelIndex}`]}`]['Answers'][correctIndex]); // Update selectedAnswer
      }
      if (sound) playSound('quizButton')
    } else {
      setIsPointsAvailable(true)
      if (isAnswersSelected) {
        setHelpSnackPosition(35)
        setAnswerSelectPosition(0)
      } else {
        setHelpSnackPosition(0)
      }
      setTimeout(() => { setIsPointsAvailable(false) }, 3000)
      if (sound) playSound('alert')
    }
  }

  useEffect(() => {
    if (currentQuestionsIndex > currentLevelIndex) {
      setlevelEndState(true);
    } else {
      setlevelEndState(false);

    }
  }, [currentQuestionsIndex])

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => { setExitBtn(true); return true; });
    return () => subscription.remove();
  }, []);

  const timeOutViewTranslate = useSharedValue(300);
  const timeOutConfig = {
    duration: 300,
    easing: Easing.out(Easing.exp),
  };

  const timeOutAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(timeOutViewTranslate.value, timeOutConfig) },
      ]
    }
  });

  const nextButtonTranslate = useSharedValue(300);
  const config = {
    duration: 300,
    easing: Easing.out(Easing.exp),
  };

  const nextBtnAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(nextButtonTranslate.value, config) },
      ]
    }
  });


  if (!levelEndState) {
    return (
      <View
        style={[styles.container, { backgroundColor: colors.primary, position: 'relative' }]}>
        {isGradient &&
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 1
            }}
            colors={[colors.primary, colors.gradSec]}
          />}
        <PaperProvider>
          <View style={{
            position: 'absolute',
            top: 0,
            backgroundColor: colors.secText,
            width: "100%", height: 0.7, flexDirection: 'row'
          }}>
            <View style={{ backgroundColor: "orange", width: `${percentage}%`, }}></View>
          </View>
          <View style={[styles.header, {}]}>
            <View style={styles.exitArea}>
              <IconButton
                style={{
                  transform: [{ rotate: '180deg' }],
                  zIndex: 9999,
                }}
                onPress={() => { navigation.navigate('Home'); }}
                iconColor={colors.quizExitIcon}
                size={22}
                icon="close" />
            </View>

            <View style={[styles.timeArea]}>
              <View style={{
                borderRadius: 2,
                alignItems: "center",
                justifyContent: 'center',
                width: 40,
                height: 24,
              }}>
                {userPlan ?
                  <Ionicons
                    name='infinite'
                    size={18}
                    color={colors.priText}
                  /> :
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: colors.priText }}>
                    notime</Text>}
              </View>
            </View>

            <View style={{
              height: 30,
              width: 80,
              // paddingHorizontal: 5,
              flexDirection: 'row',
              alignItems: "center",
              justifyContent: "flex-end",
              // backgroundColor: colors.secondary,
              borderRadius: 10,
              overflow: "hidden"
            }}>

              <View style={[{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: 'row',
              }]}
              >
                {userPlan === "" ?
                  <VipBadge
                    width={50}
                    height={28}
                    title={true}
                    iconSize={14}
                    iconColor={"#46b0b6ff"}
                    radius={8}
                    backColor={'transparent'}
                    titleColor={colors.priText}
                    elevation={3}
                  /> :
                  <HeartBadge backColor={undefined} elevation={undefined} />}
              </View>

            </View>
          </View>

          <View style={[styles.content]}>
            <View style={{ flex: 3, width: "100%", alignItems: 'center', backgroundColor: 'transparent', justifyContent: 'center', flexDirection: 'column' }}>
              <Surface mode={"flat"} style={[styles.questContainer, { height: 170, backgroundColor: colors.secondary, position: 'relative' }]}>
                {imgUri &&
                  (<Image
                    style={{ width: "100%", height: 170, }}
                    source={{ uri: imgUri }} />)
                }
              </Surface>
            </View>

            <View style={styles.questTextContainer}>
              <View style={{
                flexDirection: 'row',
                width: 28,
                height: 28,
                alignItems: "center",
                justifyContent: "center",
                // backgroundColor: colors.secondary,
                position: 'absolute',
                top: -10,
                zIndex: 9999,
              }}>
                <Icon size={12} color={colors.priText} source="pound" />
                <Text style={{ color: colors.secText, fontWeight: 'bold', fontSize: 15, marginHorizontal: 0, }}>{questIndices[`ct${dataLevelIndex}`]}
                </Text>
              </View>
              {false && <View style={{
                position: 'absolute',
                bottom: 0,
                right: -5,
                backgroundColor: colors.secondary,
                elevation: 4,
                borderRadius: 50,
                borderEndEndRadius: 0,
                borderTopEndRadius: 0,
                width: 28,
                height: 28,
                alignItems: 'center',
                justifyContent: "center",
                overflow: 'hidden',
              }}>
                <Pressable
                  android_ripple={{ color: colors.primary, borderless: false }}
                  style={[{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: "center",
                  }]}
                  onPress={HelpPoints}>
                  {isGradient && <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0.5
                    }}
                    colors={[colors.gradSec, colors.gradPri]}
                  />}
                  <Icon size={16} color={'#dba400'} source="lightbulb-on" />
                </Pressable>
              </View>}

              {qstTxt ?
                <Text style={[styles.questText, { color: colors.priText, }]}>{qstTxt}</Text> :
                <ActivityIndicator size="small" />}
            </View>

            {ansTxt ? <View style={styles.answersContainer}>
              {ansTxt?.map((answers: any, index: any) => (
                <Pressable
                  android_ripple={{ color: colors.primary, borderless: false }}
                  style={[
                    styles.answersBtn, {
                      backgroundColor: colors.secondary,
                      overflow: 'hidden',
                      elevation: 0,
                    },
                    isAnsBtnAct === index ?
                      { backgroundColor: "#dba400" } : {},
                    showCorrectAnswerIndex === index ?
                      { backgroundColor: '#dba400', elevation: 0 } : {}
                  ]}
                  ref={(el) => { if (el) { answersRef.current[index] = el; } }}
                  onPress={() => { handleAnswerSelect(answers, index); }}
                  key={index}>

                  <Text style={[styles.answersBtnTxt, {
                    color: isAnsBtnAct === index ? "black" : colors.priText,
                  }]}>{answers}</Text>

                </Pressable>))}
            </View> :
              <View style={styles.answersContainer}>
                {ansTxtOff?.map((answers, index) => (
                  <View
                    key={index}
                    style={[
                      {
                        alignItems: 'center',
                        justifyContent: "center",
                        borderRadius: 5,
                        marginVertical: 5,
                        width: '90%',
                        height: 45,
                        backgroundColor: colors.answers,
                        overflow: 'hidden',
                        elevation: 0,
                      },
                    ]}
                  >


                  </View>))}
              </View>}


            <View style={[styles.checkButtonArea,
            { flexDirection: 'column' }]}>
              <View style={{
                height: 28,
                width: '100%',
                alignItems: 'flex-end',
                justifyContent: "center",
                marginBottom: 5,
                overflow: 'hidden',
              }}>
                <Pressable
                  android_ripple={{ color: colors.primary, borderless: false }}
                  style={[{
                    backgroundColor: colors.secondary,
                    width: '15%',
                    height: '100%',
                    elevation: 4,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: "space-evenly",
                    flexDirection: 'row',
                  }]}
                  onPress={HelpPoints}>
                  {isGradient && <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0.5
                    }}
                    colors={[colors.gradSec, colors.gradPri]}
                  />}
                  <Text style={{ color: colors.priText, fontSize: 15, fontWeight: 'bold', marginHorizontal: 3, }}>
                    {helpPoint}</Text>
                  {isPointHelpPressed ?
                    <Icon size={16} color={'#dba400'} source="lightbulb-on" /> :
                    <Icon size={16} color={'#dba4007c'} source="lightbulb" />}
                </Pressable>
              </View>
              <Pressable
                android_ripple={{ color: isChecked ? colors.primary : 'transparent', borderless: false }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  width: '100%',
                  height: 40,
                  overflow: 'hidden',
                  elevation: isChecked ? 5 : 0,        // ✅ Inline conditional
                  backgroundColor: isChecked ? "#dba400" : "#dba40066"  // ✅ Inline conditional
                }}
                onPress={checkAnswer}>
                {isGradient && <LinearGradient
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: '120%',
                    height: '120%',
                    opacity: 0.5
                  }}
                  colors={['#dba400', '#4f3d08']}
                />}
                <Text style={[
                  styles.checkButtonText,
                  { color: isChecked ? "black" : colors.priText, }]}>CHECK</Text>
              </Pressable>
            </View>
          </View>

          {/* next card */}
          <Animated.View
            needsOffscreenAlphaCompositing={true}
            style={[{
              borderColor: trueAnswer ? 'green' : 'darkred',
              borderWidth: 2,
              overflow: 'hidden',
              zIndex: 99999,
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: -4,
              width: '100%',
              height: '40%',
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
              alignItems: 'center',
              justifyContent: 'space-between',
            }, nextBtnAnimStyle]}>
            <View style={{ backgroundColor: trueAnswer ? '#0d1403' : '#200c0c', width: '100%', height: '100%', position: 'absolute' }}></View>
            <View style={{ width: '100%', padding: 20, alignItems: 'center', justifyContent: 'center' }}>
              <View style={[{ backgroundColor: trueAnswer ? '#48ce1318' : '#8b000033', borderRadius: 50, width: 45, height: 45, alignItems: 'center', justifyContent: 'center' }]}>
                {trueAnswer ?
                  <Foundation name='social-foursquare' color={'green'} size={25} /> :
                  <Entypo name={'squared-cross'} color={'darkred'} size={25} />}
              </View>
            </View>
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'white', fontFamily: 'Cairo_700Bold', fontSize: 18, }}>{answersResult}</Text>
            </View>
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <Pressable
                android_ripple={{ color: colors.primary, borderless: false }}
                style={[
                  styles.nextButton, {
                    backgroundColor: trueAnswer ? 'green' : 'darkred',
                    elevation: 3,
                  }]}
                onPress={NextButton}>
                <Text style={[styles.checkButtonText, { color: trueAnswer ? "white" : "white" }]}>Next</Text>
              </Pressable>
              <Pressable
                android_ripple={{ color: colors.primary, borderless: false }}
                style={[
                  {
                    marginVertical: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 3
                  }]}

                onPress={quitButton}>
                <Text style={[{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "300"
                }]}>Quit</Text>
              </Pressable>
            </View>
          </Animated.View>
          {backgroundEffect &&
            <View style={{
              zIndex: 9999,
              backgroundColor: '#00000052',
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}></View>}

          {isAnswersSelected && <View
            style={{
              position: 'absolute',
              bottom: answerSelectPosition,
              zIndex: 99999,
              backgroundColor: 'black',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              width: '60%',
              height: 30,
              marginBottom: '13%',
              borderRadius: 6,
              elevation: 3,
            }}
          >
            <Text style={{ color: 'gray', fontFamily: 'Cairo_700Bold', fontSize: 13, }}>لم تختر إجابة بعد</Text>
            <MaterialIcons
              style={{
                position: 'absolute',
                left: 0,
                marginHorizontal: 7,
              }}
              name='question-answer'
              size={14}
              color={'gray'} />
          </View>}

          {isPointsAvailable && <View
            style={{
              position: 'absolute',
              bottom: helpSnackPosition,
              zIndex: 99999,
              backgroundColor: 'black',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              width: '60%',
              height: 30,
              marginBottom: '13%',
              borderRadius: 6,
              elevation: 3,
            }}>
            <Text style={{ color: 'gray', fontFamily: 'Cairo_700Bold', fontSize: 13, }}>ليس لديك نقاط المساعدة</Text>
            <MaterialIcons
              style={{
                position: 'absolute',
                left: 0,
                marginHorizontal: 7,
              }}
              name='lightbulb'
              size={14}
              color={'gray'} />
          </View>}

          {/* {timeEndState && <TimeEnd />} */}
        </PaperProvider>
      </View>
    );
  } else if (levelEndState && currentQuestionsIndex > currentLevelIndex) {
    return <LevelEnd />;
  } else {
    return (
      <View style={
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.primary
        }
      }>
        <StatusBar translucent backgroundColor={colors.primary} />
        {isGradient &&
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 1
            }}
            colors={[colors.primary, colors.gradSec]}
          />}

        <ActivityIndicator size="large" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
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
export default QuizScreen;
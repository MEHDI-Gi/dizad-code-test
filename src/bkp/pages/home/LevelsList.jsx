import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Pressable, Image, StatusBar, ActivityIndicator, DrawerLayoutAndroid } from 'react-native';
import { TextInput, Button, IconButton, MD3Colors, Icon, Appbar } from 'react-native-paper';
import { DataContext } from '../../context/contextData';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
// import { Bones } from "react-bones/native";
import { Skeleton } from 'moti/skeleton';

export default function LevelsList() {
  const navigation = useNavigation();
  const {
    colors,
    dataLength,
    setDataLevelIndex,
    quizData,
    questIndices,
    resetTimer,
    setTimeEndState, answerStats,
    levelsRank, setLevelsRank,
    sound, playSound, isGradient, texts, language, setQuizActive,
  } = useContext(DataContext);
  // console.log(answerStats.lv1.correct)
  const [isLvListAvailable, setIsLvListAvailable] = useState(false)
  const ListFalse = []
  const levelList = Array.from({ length: dataLength ? dataLength : 10 }, (_, i) => {
    const levelNum = i + 1;
    return {
      id: levelNum,
      label: `level ${levelNum}`,
      condition: `level ${levelNum}`,
    };
  });
  //   const levelList = Array.from({ length: dataLength ? dataLength : 10 }, (_, i) => {
  //   const levelNum = i + 1;
  //   return {
  //     id: levelNum,
  //     label: `level ${levelNum}`,
  //     condition: `level ${levelNum}`,
  //   };
  // });
  const levelListPress = (item) => {
    // Extract the number from the condition string, e.g., "level 2" -> 2
    const match = item.condition.match(/level (\d+)/);
    if (match) {
      const levelNumber = parseInt(match[1], 10);
      setDataLevelIndex(levelNumber);
      setQuizActive(true)
      resetTimer(45);
      setTimeEndState(false)
      navigation.navigate('QuizScreen');
      if (sound) {
        playSound('levelsButton')
      }
    }
  };

  const starsList = [
    { id: 1, icon: 'star', color: '#d8b01f', },
    { id: 2, icon: 'star', color: '#d8b01f', },
    { id: 3, icon: 'star', color: '#d8b01f00', }
  ]

  return (
    <View style={{ flex: 1, paddingTop: 5, width: '100%', }}>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, width: '100%', }}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: "center",
          alignContent: "center",
        }}>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-evenly', // This will center the items
          paddingVertical: 10,
        }}>

          {levelList?.map((item, index) => {
            const levelKey = `lv${index + 1}`;
            const levelData = quizData?.[levelKey] || {}; // safely get level data or empty object
            const totalQuestions = Object.keys(levelData).length;
            const currentProgress = questIndices[levelKey] ? questIndices[levelKey] - 1 : 0;
            const percentage = totalQuestions > 0 ? (currentProgress / totalQuestions) * 100 : 0;
            const clampedProgress = Math.min(currentProgress, totalQuestions);
            // Check if previous level is completed (for levels after the first)
            const isPrevLevelCompleted =
              index === 0 // first level always enabled
                ? true
                : questIndices[`lv${index}`] > Object.keys(quizData?.[`lv${index}`] || {}).length;
            const answersStatsIndex = answerStats[`lv${index + 1}`];
            if (dataLength) {
              return (
                <Pressable
                  key={index}
                  android_ripple={{ color: colors.primary, borderless: false }}
                  onPress={() => levelListPress(item)}
                  style={[styles.levelListItems,
                  {
                    flexDirection: 'column',
                    backgroundColor: colors.secondary,
                    overflow: 'hidden',
                    opacity: 1,
                    elevation: 5,
                  },
                    // isPrevLevelCompleted ? {
                    //   opacity: 1,
                    //   elevation: 5,
                    // } : {
                    //   opacity: 0.6,
                    //   elevation: 0,
                    // },
                  ]}
                // disabled={!isPrevLevelCompleted} // optionally disable press if previous level not completed
                >
                  {isPrevLevelCompleted && isGradient &&
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: '120%',
                        height: '120%',
                        opacity: 0.5
                      }}
                      colors={[colors.gradSec, colors.gradPri]}
                    />}
                  <View
                    style={[{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'transparent',
                      width: '100%',
                      padding: 5,
                      flex: 1
                    }]}>
                    <FontAwesome name='lock' color={colors.secText} size={25} />
                  </View>
                  <View
                    style={[{
                      alignItems: language === "english" ? 'flex-start' : 'flex-end',
                      justifyContent: 'center',
                      backgroundColor: 'transparent',
                      width: '100%',
                      paddingHorizontal: 10,
                    }]}>
                    {/* <Text style={{ fontFamily: "Cairo_700Bold", color: colors.priText, fontSize: 16, }}>
                      {texts.level} {index + 1}
                    </Text> */}
                    <Text style={{ fontFamily: "Cairo_700Bold", color: colors.priText, fontSize: 16, }}>
                      {language === "English" ? quizData[`lv${index + 1}`].label : quizData[`lv${index + 1}`].label} {index + 1}
                    </Text>
                    <Text style={{
                      fontFamily: "Cairo_600SemiBold",
                      color: colors.secText,
                      fontSize: 12,
                    }}>
                      {clampedProgress} / {totalQuestions} {texts.quests}
                    </Text>
                  </View>
                  {/* {<View style={{
                  backgroundColor: 'transparent',
                  width: 50,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                 {isPrevLevelCompleted ?
                    <FontAwesome
                      style={{ marginHorizontal: 1, }}
                      name={'star'}
                      color={answersStatsIndex.correct >= 2 ? "yellow" : answersStatsIndex.correct >= 5 ? 'orange' : "red"}
                      size={18} /> :
                    <FontAwesome name='lock' color={colors.secText} size={18} />
                  } 
              </View>} */}
                </Pressable>
              )
            } else {
              return (
                <View key={index} style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '98%',
                  height: 45,
                  overflow: "hidden",
                  borderRadius: 10,
                  marginVertical: 7,
                  flexWrap: 'wrap'
                }}>
                  <Skeleton
                    colors={['#61616122', 'gray', '#61616122']}
                    height={45}
                    width={'100%'}
                  />
                </View>
              )
            }

          })}
        </View>
      </ScrollView>
    </View >
  )
}
const styles = StyleSheet.create({
  skelton: {
    marginVertical: 5
  },
  levelListItems: {
    justifyContent: "space-between",
    alignItems: 'center',
    width: '40%',
    height: 120,
    borderRadius: 8,
    margin: 5,
  },
});

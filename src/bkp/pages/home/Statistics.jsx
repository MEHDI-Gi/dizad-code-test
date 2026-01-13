import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Pressable, Image, StatusBar, DrawerLayoutAndroid } from 'react-native';
import { TextInput, Button, IconButton, MD3Colors, Avatar, Icon, Appbar } from 'react-native-paper';
import { DataContext } from '../../context/contextData';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export default function Statistics() {

  const {
    colors, texts,
    globTrueAns,
    globFalseAns, isGradient, dataLength, speed,
    user, usersData, userName, userImage,
    statisticsCard, setStatisticsCard,

  } = useContext(DataContext);
  const usersArray = Object.entries(usersData).map(([id, user]) => ({ id, ...user }));
  const onTopUsers = usersArray.slice().sort((a, b) => (b.UserXp || 0) - (a.UserXp || 0));
  const currentUser = usersArray.find(user => user.Username === userName && user.UserImage === userImage);

  const StatisticsList = [
    { label: texts.rank, resault: `${onTopUsers.indexOf(currentUser) + 1}`, icon: 'leaderboard', iconColor: '#ab751e' },
    { label: texts.correct, resault: `${globTrueAns}`, icon: 'check', iconColor: 'green' },
    { label: texts.wrong, resault: `${globFalseAns}`, icon: 'clear', iconColor: '#c94141' },
    { label: texts.fast, resault: `${speed}`, icon: 'bolt', iconColor: '#0080ff' },
    { label: texts.questIndex, resault: `${globTrueAns + globFalseAns}`, icon: 'table-rows', iconColor: '#b34f00' },
    { label: texts.quest, resault: `${dataLength}`, icon: 'quiz', iconColor: '#ecc010' },
  ];


  function StatisticsCard(props) {

    return (
      <Pressable
        android_ripple={{ color: colors.screenBack, borderless: false }}
        onPress={props.press}
        style={[
          styles.statisticsItems,
          {
            position: 'relative',
            backgroundColor: colors.secondary,
            elevation: 5,
            overflow: 'hidden'
          }
        ]}>
        {isGradient && <LinearGradient
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
        <MaterialIcons name={props.icon} size={17} color={props.color} />
        <Text style={[styles.statisticsItemsTitle, { color: colors.statsCardPriText, fontFamily: 'Cairo_700Bold', fontSize: 15 }]}>{props.resulte}</Text>
        <Text style={[styles.statisticsItemsTitle, { color: colors.statsCardSecText }]}>{props.label}</Text>
      </Pressable>

    )
  }


  return (
    <View style={[styles.statisticsAreaContainer, {
      paddingHorizontal: 10,
    }]}>
      <View style={[styles.statisticsArea, {
      }]} >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{
            paddingVertical: 1,
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }} >
          {StatisticsList.map((item, index) =>
            <StatisticsCard
              key={index}
              press={() => {
                if (item.label === texts.rank) {
                  setStatisticsCard(true)
                }
              }}
              icon={item.icon}
              color={item.iconColor}
              resulte={item.resault}
              label={item.label}
            />
          )}
        </ScrollView>
      </View>
    </View >
  )
}
const styles = StyleSheet.create({
  statisticsAreaContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  statisticsTitleArea: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  statisticsTitle: {
    lineHeight: 35,
    fontFamily: "Cairo_600SemiBold",
    fontSize: 14,
    textAlign: "center"

  },
  statisticsArea: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    width: "100%",
    marginTop: 5,
    height: 80,
    borderRadius: 10
  },
  // statisticsItems: {
  //   backgroundColor: "transparent",
  //   flexDirection: "column",
  //   justifyContent: 'space-between',
  //   alignItems: "center",
  //   borderRadius: 8,
  //   width: 60,
  //   height: '100%',
  //   marginHorizontal: 4,
  //   alignItems: "center",
  //   paddingVertical: 5,
  // },
  // statisticsItemsTitle: {
  //   fontSize: 11,
  //   fontFamily: "Cairo_600SemiBold",
  //   textAlign: "center"
  // },
  // statistics: {
  //   flexDirection: "column",
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   margin: 5,
  //   width: 60,
  //   height: 60,
  //   borderRadius: 0,
  // },
  statisticsItems: {
    flexDirection: "column",
    justifyContent: 'space-between',
    alignItems: "center",
    borderRadius: 8,
    width: 60,
    height: '100%',
    marginHorizontal: 4,
    alignItems: "center",
    paddingVertical: 5,
  },
  statisticsItemsTitle: {
    fontSize: 11,
    fontFamily: "Cairo_600SemiBold",
    textAlign: "center",
  },
  statistics: {
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,
    width: 60,
    height: 60,
    borderRadius: 0,
  },


});

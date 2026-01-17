import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Pressable, Image, StatusBar, DrawerLayoutAndroid } from 'react-native';
import { TextInput, Button, IconButton, MD3Colors, Avatar, Icon, Appbar } from 'react-native-paper';
import { DataContext } from '../../context/contextData';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Statistics() {

  const {
    colors, texts,
    globTrueAns,
    globFalseAns, isGradient, dataLength, speed,
    user,
    //  usersData,
    userName, userImage,
    statisticsCard, setStatisticsCard,

  } = useContext(DataContext);
  // const usersArray = Object.entries(usersData).map(([id, user]) => ({
  //   id,
  //   ...(user as any)
  // }));
  // const onTopUsers = usersArray.slice().sort((a, b) => (b.UserXp || 0) - (a.UserXp || 0));
  // const currentUser = usersArray.find(user => user.Username === userName && user.UserImage === userImage);

  const StatisticsList = [
    // { label: texts.rank, resault: `${onTopUsers.indexOf(currentUser) + 1}`, icon: 'leaderboard', iconColor: '#ab751e' },
    { label: texts.correct, resault: `${globTrueAns}`, icon: 'check', iconColor: 'green' },
    { label: texts.wrong, resault: `${globFalseAns}`, icon: 'clear', iconColor: '#c94141' },
    { label: texts.quest, resault: `${dataLength}`, icon: 'quiz', iconColor: '#ecc010' },
  ];


  function StatisticsCard(props: any) {

    return (
      <Pressable
        android_ripple={{ color: colors.screenBack, borderless: false ,foreground: true }}
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
        <Text style={[styles.statisticsItemsTitle, { color: colors.text.primary, fontFamily: 'cairo', fontSize: 15 }]}>{props.resulte}</Text>
        <Text style={[styles.statisticsItemsTitle, { color: colors.text.primary }]}>{props.label}</Text>
      </Pressable>

    )
  }


  return (
    <View style={[styles.statisticsAreaContainer, {
      paddingHorizontal: 0,
    }]}>
      <View style={[{
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        width: "95%",
        marginTop: 5,
        height: 80,
      }]} >
        {/* {StatisticsList.map((item, index) =>
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
          )} */}
        <Pressable
          android_ripple={{ color: colors.secondary, foreground: true, borderless: false }}
          onPress={() => { }}
          style={[
            {
              flexDirection: "row",
              justifyContent: 'center',
              borderRadius: 8,
              width: '95%',
              height: '100%',
              marginHorizontal: 4,
              alignItems: "center",
              paddingVertical: 5,
            },
            {
              position: 'relative',
              overflow: 'hidden'
            }
          ]}>


          {false && <View style={{
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: "center",
            paddingHorizontal: 15,
            gap: 10,
            height: '100%',

          }}>

            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: colors.text.secondary,
                borderRadius: 50,
              }}
            />
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: '#008700',
                borderRadius: 50,
              }}
            />
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: 'red',
                borderRadius: 50,
              }}
            />

          </View>}
          <View style={{
            flexDirection: "row",
            justifyContent: 'center',
            alignItems: "center",
            height: '100%',
            flex: 1,


          }}>

            <View style={{
              flex: 1,
              justifyContent: 'space-evenly',
              alignItems: "center",
              height: '100%',
              
            }}>
              <Text style={{
                fontFamily: "Cairo-Bold",
                color: colors.text.secondary,
                fontSize: 16,
              }}>مجموع</Text>
              <Text style={{
                color: colors.text.primary,
                fontSize: 19,
              }}>280</Text>
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'space-evenly',

              alignItems: "center",
              height: '100%',
            }}>
              <Text style={{
                fontFamily: "Cairo-Bold",
                color: colors.text.secondary,
                fontSize: 16,
              }}>خاطئة</Text>
              <Text style={{
                color: colors.text.primary,
                fontSize: 19,
              }}>15</Text>
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'space-evenly',

              alignItems: "center",
              height: '100%',
            }}>
              <Text style={{
                fontFamily: "Cairo-Bold",
                color: colors.text.secondary,
                fontSize: 16,
              }}>صحيحة</Text>
              <Text style={{
                color: colors.text.primary,
                fontSize: 19,
              }}>23</Text>
            </View>
          </View>

        </Pressable>
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
    backgroundColor: 'red'
  },
  statisticsItems: {
    flexDirection: "column",
    justifyContent: 'space-between',
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

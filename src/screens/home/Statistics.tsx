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
        width: "100%",
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
          android_ripple={{ color: colors.primary, foreground: true, borderless: false }}
          onPress={() => { }}
          style={[
            {
              flexDirection: "column",
              justifyContent: 'space-between',
              borderRadius: 8,
              width: '95%',
              height: '100%',
              marginHorizontal: 4,
              alignItems: "center",
              paddingVertical: 5,
            },
            {
              position: 'relative',
              backgroundColor: colors.secondary,
              elevation: 5,
              overflow: 'hidden'
            }
          ]}>
         
          <View style={{
            flexDirection: "column",
            justifyContent: 'center',
            width: '100%',
            alignItems: "center",
            flex: 1,
          }}>

          </View>
          <View style={{
            flexDirection: "row-reverse",
            justifyContent: 'flex-start',
            width: '100%',
            alignItems: "center",
            paddingHorizontal: 15,
            flex: 1,
            gap: 10

          }}>
            <View style={{
              flexDirection: "row-reverse",
              justifyContent: 'center',
              alignItems: "center",
              gap: 2
            }}>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: colors.primary,
                  borderRadius: 50,
                }}
              />
              <Text style={{
                color: 'white',

              }}>
                Total
              </Text>
            </View>
            <View style={{
              flexDirection: "row-reverse",
              justifyContent: 'center',
              alignItems: "center",
              gap: 2
            }}>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: '#008700',
                  borderRadius: 50,
                }}
              />
              <Text style={{
                color: 'white',

              }}>
                Correct
              </Text>
            </View>

            <View style={{
              flexDirection: "row-reverse",
              justifyContent: 'center',
              alignItems: "center",
              gap: 2
            }}>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: 'red',
                  borderRadius: 50,
                }}
              />
              <Text style={{
                color: 'white',

              }}>
                Wrong
              </Text>
            </View>
          </View>
          <View style={{
            flexDirection: "row",
            justifyContent: 'center',
            width: '100%',
            alignItems: "center",
            flex: 1,
            paddingHorizontal: 15,

          }}>
            <View style={{
              width: '100%',
              height: 3,
              backgroundColor: '#535353',
              borderRadius: 10,
              flexDirection: "row-reverse",
              justifyContent: 'flex-start',
              alignItems: "center",
              overflow: 'hidden'
            }}>
              <View style={{
                width: '50%',
                height: '100%',
                backgroundColor: '#3f8839ff',
                borderRadius: 10,
                borderTopStartRadius: 0,
                borderBottomLeftRadius: 0,

              }} />
              <View style={{
                width: '20%',
                height: '100%',
                backgroundColor: '#632b2b',
                borderRadius: 10,
                borderBottomRightRadius: 0,
                borderTopEndRadius: 0,

              }} />
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

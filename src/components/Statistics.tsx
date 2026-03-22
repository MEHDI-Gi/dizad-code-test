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
  DrawerLayoutAndroid,
} from 'react-native';
import {
  TextInput,
  Button,
  IconButton,
  MD3Colors,
  Avatar,
  Icon,
  Appbar,
} from 'react-native-paper';
import { DataContext } from '../context/contextData';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

export default function Statistics() {
  const {
    colors,
    texts,
    globTrueAns,
    globFalseAns,
    isGradient,
    dataLength,
    speed,
    user,
    //  usersData,
    statisticsCard,
    setStatisticsCard,
  } = useContext(DataContext);

  const StatisticsList = [
    {
      label: 'Accuracy',
      resault: `20%`,
      icon: 'accuracy',
      iconColor: '#ab751e',
    },
    {
      label: 'Completed',
      resault: `${dataLength}`,
      icon: 'quiz',
      iconColor: '#ecc010',
    },
    {
      label: texts.correct,
      resault: `${globTrueAns}`,
      icon: 'check',
      iconColor: 'green',
    },
    {
      label: texts.wrong,
      resault: `${globFalseAns}`,
      icon: 'clear',
      iconColor: '#c94141',
    },
  ];

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '95%',
          marginVertical: 5,
          gap: 10,
        },
      ]}
    >
      {StatisticsList.map((item, index) => (
        <Pressable
          key={index}
          android_ripple={{
            color: colors.screenBack,
            borderless: false,
            foreground: true,
          }}
          onPress={() => {
            if (item.label === texts.rank) {
              setStatisticsCard(true);
            }
          }}
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: colors.secondary,
            borderRadius: 8,
            paddingHorizontal: 10,
            height: 100,
            alignItems: 'center',
            paddingVertical: 5,
            position: 'relative',
            elevation: 5,
            overflow: 'hidden',
          }}
        >
          <MaterialIcons name={item.icon} size={20} color={item.iconColor} />
          <Text
            style={[
              {
                color: colors.text.primary,
                fontFamily: 'cairo',
                fontSize: 15,
              },
            ]}
          >
            {item.resault}
          </Text>
          <Text style={[{ color: colors.text.primary }]}>{item.label}</Text>
        </Pressable>
      ))}
      {false && (
        <Pressable
          android_ripple={{
            color: colors.secondary,
            foreground: true,
            borderless: false,
          }}
          onPress={() => { }}
          style={[
            {
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: 8,
              width: '95%',
              rowGap: 15,
              marginHorizontal: 4,
              alignItems: 'center',
              paddingVertical: 5,
              position: 'relative',
              overflow: 'hidden',
            },
          ]}
        >
          {false && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 15,
                gap: 10,
                width: '100%',
              }}
            >
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
                  backgroundColor: 'red',
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
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              flex: 1,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Cairo-Bold',
                  color: colors.text.secondary,
                  fontSize: 16,
                }}
              >
                مجموع
              </Text>
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 19,
                }}
              >
                280
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Cairo-Bold',
                  color: colors.text.secondary,
                  fontSize: 16,
                }}
              >
                خاطئة
              </Text>
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 19,
                }}
              >
                15
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Cairo-Bold',
                  color: colors.text.secondary,
                  fontSize: 16,
                }}
              >
                صحيحة
              </Text>
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 19,
                }}
              >
                23
              </Text>
            </View>
          </View>
          {false && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: 5,
                gap: 5,
              }}
            >
              <View
                style={{
                  flex: 0.6,
                  height: '100%',
                  backgroundColor: colors.text.secondary,
                  borderRadius: 50,
                }}
              />
              <View
                style={{
                  flex: 0.1,
                  height: '100%',
                  backgroundColor: 'red',
                  borderRadius: 50,
                }}
              />
              <View
                style={{
                  flex: 0.3,
                  height: '100%',
                  backgroundColor: '#008700',
                  borderRadius: 50,
                }}
              />
            </View>
          )}
        </Pressable>
      )}
    </View>
  );
}

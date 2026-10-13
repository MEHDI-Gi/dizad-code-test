import React, { useRef, useState, useContext, useEffect } from 'react';
import {
  RadioButton,
  Button,
  IconButton,
  Text,
  TextInput,
} from 'react-native-paper';
import { DataContext } from '../../context/contextData';
import { useNavigation } from '@react-navigation/native';

import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Statistics from '../../components/Statistics';
import SnackBar from '../../components/elements/SnackBar';
import Switch from '../../components/elements/Switch';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Pressable,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { RootStackParamList } from '../../../types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTexts } from '../../hooks/useTexts';
import { useColors } from '../../hooks/useColors';
import { useSize } from '../../hooks/useSize';
// import Sound from 'react-native-sound';

export default function ContactUs() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { language } = useContext(DataContext);
  const texts = useTexts();
  const colors = useColors();
  const { screen, widthScale, heightScale, sizeScale } = useSize();
  const ContactList = [
    {
      text: 'Email',
      icon: 'email',
      color: 'red'
    },
    {
      text: 'Whatsapp',
      icon: 'call',
      color: 'green'

    },
    {
      text: 'Telegram',
      icon: 'telegram',
      color: 'blue'

    },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
          position: 'relative',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: colors.primary,
        }}
      >
        <View
          style={{
            height: heightScale(screen.height * 0.25),
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={[
              {
                color: colors.text.primary,

                fontSize: sizeScale(20),
              },
              language === 'english'
                ? {
                    fontFamily: 'GoogleSans-Bold',
                  }
                : {
                    fontFamily: 'Cairo_600SemiBold',
                  },
            ]}
          >
            {texts.contactUsEdt}
          </Text>
        </View>
        <View
          style={{
            width: '70%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: sizeScale(10),
          }}
        >
          {ContactList.map((items, index) => (
            <Pressable
              android_ripple={{
                borderless: false,
                foreground: true,
                color: colors.primary,
              }}
              key={items.text}
              style={{
                borderRadius: sizeScale(10),
                backgroundColor: colors.secondary,
                height: heightScale(49),
                width: '100%',
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: '100%',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <Text
                  style={[
                    {
                      color: colors.text.primary,

                      fontSize: sizeScale(20),
                    },
                    language === 'english'
                      ? {
                          fontWeight: 'bold',
                        }
                      : {
                          fontFamily: 'Cairo_600SemiBold',
                        },
                  ]}
                >
                  {items.text}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.4,
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <MaterialIcons
                  name={items.icon}
                  color={items?.color ?? colors.text.primary}
                  size={sizeScale(25)}
                />
              </View>
            </Pressable>
          ))}
        </View>
        <View
          style={{
            height: heightScale(screen.height * 0.25),
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate('Profile');
            }}
            android_ripple={{
              color: colors.secondary,
              borderless: false,
              foreground: true,
            }}
            style={[
              {
                backgroundColor: colors.active,
                borderRadius: sizeScale(50),
                width: widthScale(50),
                height: heightScale(50),
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
          >
            <MaterialIcons
              name="home"
              color={colors.staticText.dark.primary}
              size={sizeScale(25)}
            />
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

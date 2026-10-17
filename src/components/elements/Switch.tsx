import React, { useRef, useState, useContext, useEffect } from 'react';
import {
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  TextInput,
  Dimensions,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Vibration,
} from 'react-native';
import { RadioButton, Button, IconButton } from 'react-native-paper';
import { DataContext } from '../../context/contextData';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSize } from '../../hooks/useSize';
import { useColors } from '../../hooks/useColors';

export default function Switch(props: any) {
  const navigation = useNavigation();
  const { screen, widthScale, heightScale, sizeScale } = useSize();
  const colors = useColors();
  const {
    THEME_DARK,
    THEME_LIGHT,
    playSound,
    sound,
    setSound,
    isGradient,
    setIsGradient,
    texts,
    language,
    apparence,
    setApparence,
    setColors,
    colorsList,
    currentTheme,
    setCurrentTheme,
  } = useContext(DataContext);

  return (
    <View
      style={{
        width: props.width,
        height: props.height,
        padding: props.paddingOut,
        borderRadius: props.radiusOut,
        borderColor: props.borderColor,
        borderWidth: props.borderWidth,
        flexDirection: props.direction,
        alignItems: 'center',
        justifyContent: props.radiusFlex,
        backgroundColor: props.backColor,
      }}
    >
      {props.enTextState && language !== 'english' && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            width: props.enTextWidth,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={[
              {
                textAlign: 'center',
                fontFamily: 'Cairo-Bold',
                fontSize: sizeScale(15),
                color: colors.staticText.dark.primary,
              },
            ]}
          >
            En
          </Text>
        </View>
      )}
      <View
        style={{
          width: props.radiusWidth,
          height: props.radiusHeight,
          borderRadius: props.radiusIn,
          backgroundColor: props.radiusColor,
          elevation: 3,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {props.enTextState && language === 'english' && (
          <Text
            style={[
              {
                textAlign: 'center',
                fontFamily: 'Cairo-Bold',
                fontSize: sizeScale(15),
                color: colors.staticText.dark.primary,
              },
            ]}
          >
            En
          </Text>
        )}
      </View>
    </View>
  );
}

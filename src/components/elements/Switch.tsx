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
      />
    </View>
  );
}

import React, { useRef, useState, useContext, useEffect } from 'react';
import { Alert, Modal, TouchableWithoutFeedback, Keyboard, Pressable, TextInput, Dimensions, StatusBar, Text, Image, TouchableOpacity,  StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform, Vibration } from 'react-native';
import { RadioButton, Button, IconButton, } from 'react-native-paper';
import { DataContext } from '../../context/contextData';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Switch(props:any) {
    const navigation = useNavigation();

    const {
        THEME_DARK, THEME_LIGHT,
        playSound, sound, setSound,
        isGradient, setIsGradient, texts, language,
        apparence, setApparence, setColors, colorsList, currentTheme, setCurrentTheme
    } = useContext(DataContext);

    

    return (
        <View
            style={{
                width: props.width,
                height: props.height,
                paddingHorizontal: 2,
                borderRadius: 50,
                borderColor: props.borderColor,
                borderWidth: props.borderWidth,
                flexDirection: props.direction,
                alignItems: "center",
                justifyContent: props.radioFlex,
            }}>
            <View
                style={{
                    width: props.radioWidth,
                    height: props.radioHeight,
                    borderRadius: 5,
                    backgroundColor: props.radioColor,
                }}
            />
        </View>

    )
}

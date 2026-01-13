import React, { useRef, useState, useContext, useEffect } from 'react';
import { Alert, Portal, Modal, TouchableWithoutFeedback, Keyboard, Pressable, TextInput, BackgroundImage, Dimensions, StatusBar, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, View, Box, VStack, FormControl, Input, Radio, Divider, Checkbox, Card, Appbar, KeyboardAvoidingView, ScrollView, Platform, Vibration } from 'react-native';
import { RadioButton, Button, IconButton, } from 'react-native-paper';
import { DataContext } from '../../context/contextData';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Application from 'expo-application';
import { LinearGradient } from 'expo-linear-gradient';

export default function Switch(props) {
    const navigation = useNavigation();

    const {
        colors,
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

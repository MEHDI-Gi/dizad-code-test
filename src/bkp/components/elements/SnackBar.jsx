import { TouchableWithoutFeedback, Alert, Keyboard, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, View, Box, VStack, FormControl, Input, Radio, Divider, Checkbox, Card, Appbar, KeyboardAvoidingView, ScrollView, Platform, Pressable } from 'react-native';
import { TextInput, Button, IconButton, MD3Colors, Icon, Snackbar, } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { DataContext } from '../../context/contextData';
import React, { useRef, useState, useContext, useEffect } from 'react';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing, runOnJS
} from 'react-native-reanimated';

export default function SnackBar(props,) {
    const {
        colors,
        setIsAccountDeleted, texts,
        snackbarState, setSnackbarState, language
    } = useContext(DataContext);

    const SnackBarTransition = useSharedValue(0);

    useEffect(() => {
        if (snackbarState) {
            SnackBarTransition.value = 1
            const timer = setTimeout(() => {
                SnackBarTransition.value = withTiming(0, config, () => {
                    runOnJS(setSnackbarState)(false);
                });
            }, 4000);

            return () => clearTimeout(timer);

        } else {
        }
    }, [snackbarState])


    const config = {
        duration: 500,
        easing: Easing.out(Easing.exp),
    };
    const snackbarAimated = useAnimatedStyle(() => {
        return {
            opacity: withTiming(SnackBarTransition.value, config)
        }
    });
    if (!snackbarState) return null;
    return (
        <Animated.View
            needsOffscreenAlphaCompositing={true}
            style={[{
                position: 'absolute',
                // top: props.top,
                // bottom: props.bottom,
                // right: props.right,
                // left: props.left,
                bottom: props.bottom,
                zIndex: 99999,
                backgroundColor: 'black',
                flexDirection: language === 'english' ? 'row-reverse' : 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                alignSelf: 'center',
                height: 30,
                borderRadius: 6,
                elevation: 3,
                paddingHorizontal: 5,
            }, snackbarAimated]}
        >
            <View style={{
                height: '100%',
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
            }}>
                <MaterialCommunityIcons
                    name={props.icon}
                    size={18}
                    color={'gray'} />
            </View>
            <Text style={{
                color: 'gray',
                paddingHorizontal: 5,
                fontFamily: 'Cairo_700Bold',
                fontSize: 13,
            }}>{props.label}</Text>

        </Animated.View>
    );

}

import { TextInput, Button, IconButton, MD3Colors, Icon, Snackbar, Text, } from 'react-native-paper';
import { DataContext } from '../../context/contextData';
import React, { useRef, useState, useContext, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import { useColors } from '../../hooks/useColors';

export default function SnackBar(props: { bottom: any; icon: any; label: any; },) {
    const {
        setIsAccountDeleted, texts,
        snackbarState, setSnackbarState, language
    } = useContext(DataContext);
    const colors = useColors();

    // useEffect(() => {
    //     if (snackbarState) {
    //         SnackBarTransition.value = 1
    //         const timer = setTimeout(() => {
    //             SnackBarTransition.value = withTiming(0, config, () => {
    //                 runOnJS(setSnackbarState)(false);
    //             });
    //         }, 4000);

    //         return () => clearTimeout(timer);

    //     } else {
    //     }
    // }, [snackbarState])


    // const config = {
    //     duration: 500,
    //     easing: Easing.out(Easing.exp),
    // };
    // const snackbarAimated = useAnimatedStyle(() => {
    //     return {
    //         opacity: withTiming(SnackBarTransition.value, config)
    //     }
    // });
    if (!snackbarState) return null;
    return (
        <View
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
            }]}
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

        </View>
    );

}

import { TextInput, Button, IconButton, MD3Colors, Icon, Snackbar, Text, } from 'react-native-paper';
import { DataContext } from '../../context/contextData';
import React, { useRef, useState, useContext, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import { useColors } from '../../hooks/useColors';
import { useSize } from '../../hooks/useSize';

export default function SnackBar(props: { top: any; bottom: any; icon: any; label: any; },) {
    const {
        setIsAccountDeleted, texts,
        snackbarState, setSnackbarState, language
    } = useContext(DataContext);
    const colors = useColors();
    const { screen,
        widthScale,
        heightScale,
        sizeScale,
    } = useSize();

    useEffect(() => {
        if (snackbarState) {

            const timer = setTimeout(() => {
                setSnackbarState(false)
            }, 3000);

            return () => clearTimeout(timer);

        } else {
        }
    }, [snackbarState])
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
    if (!snackbarState) return;
    return (
        <View
            needsOffscreenAlphaCompositing={true}
            style={[{
                position: 'absolute',
                top: props.top,
                // bottom: props.bottom,
                // right: props.right,
                // left: props.left,
                bottom: props.bottom,
                zIndex: 9,
                backgroundColor: colors.text.primary,
                flexDirection: language === 'english' ? 'row-reverse' : 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                alignSelf: 'center',
                height: heightScale(45),
                width: "90%",
                borderRadius: sizeScale(6),
                elevation: 3,
                paddingHorizontal: sizeScale(15),
            }]}
        >
            <View style={{
                height: '100%',
                width: widthScale(30),
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
            }}>
                <MaterialCommunityIcons
                    name={props.icon}
                    size={sizeScale(18)}
                    color={'black'} />
            </View>
            <Text style={{
                color: 'black',
                paddingHorizontal: sizeScale(5),
                fontFamily: 'Cairo_700Bold',
                fontSize: sizeScale(15),
            }}>{props.label}</Text>

        </View>
    );

}

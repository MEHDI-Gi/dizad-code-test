import React, { useRef, useState, useContext, useEffect } from 'react';
import { TouchableWithoutFeedback, Alert, Keyboard, ActivityIndicator, Text, Image, TouchableOpacity, StyleSheet, View, Pressable } from 'react-native';
import { DataContext } from '../context/contextData';
import CopyrightsFooter from '../components/CopyrightsFooter.tsx';
import { useColors } from '../hooks/useColors.ts';

export default function SplashScreen() {

    const colors = useColors();

    const title = 'رخصتي';
    const slog = 'تعليم قوانين المرور الجزائرية'

    return (
        <View style={[styles.container, { backgroundColor: colors.primary }]} >
            <View style={{
                flexDirection: 'column',
                width: "80%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: 'transparent',
                zIndex: 1,
                rowGap: 8,
                flex: 1,
            }}>
                <Text style={{
                    fontFamily: 'Cairo-ExtraBold',
                    color: colors.button.primary,
                    fontSize: 35,
                }}>{title}</Text>
                {/* <Text style={{
                    fontFamily: 'Cairo',
                    color: colors.text.secondary,
                    fontSize: 18,
                }}>{slog}</Text> */}
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        zIndex: 1,
    },
});

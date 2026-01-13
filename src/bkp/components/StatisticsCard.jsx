import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Pressable, Image, StatusBar, DrawerLayoutAndroid } from 'react-native';
import { TextInput, Button, IconButton, MD3Colors, Avatar, Icon, Appbar } from 'react-native-paper';
import { DataContext } from '../context/contextData';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export default function StatisticsCard(props) {
    const {
        colors,
        globTrueAns,
        globFalseAns, isGradient, dataLength
    } = useContext(DataContext);
    return (
        <Pressable
            android_ripple={{ color: colors.screenBack, borderless: false }}
            onPress={props.press}
            style={[
                styles.statisticsItems,
                {
                    position: 'relative',
                    backgroundColor: colors.statsCardBack,
                    elevation: 5,
                    overflow: 'hidden'
                }
            ]}>
            {isGradient && <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: '120%',
                    height: '120%',
                    opacity: 0.5
                }}
                colors={[colors.gradSec, colors.gradPri]}
            />}
            <MaterialIcons name={props.icon} size={17} color={props.color} />
            <Text style={[styles.statisticsItemsTitle, { color: colors.statsCardPriText, fontFamily: 'Cairo_700Bold', fontSize: 15 }]}>{props.resulte}</Text>
            <Text style={[styles.statisticsItemsTitle, { color: colors.statsCardSecText }]}>{props.label}</Text>
        </Pressable>

    )
}
const styles = StyleSheet.create({
    statisticsItems: {
        flexDirection: "column",
        justifyContent: 'space-between',
        alignItems: "center",
        borderRadius: 8,
        width: 60,
        height: '100%',
        marginHorizontal: 4,
        alignItems: "center",
        paddingVertical: 5,
    },
    statisticsItemsTitle: {
        fontSize: 11,
        fontFamily: "Cairo_600SemiBold",
        textAlign: "center",
    },
    statistics: {
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 5,
        width: 60,
        height: 60,
        borderRadius: 0,
    },

});

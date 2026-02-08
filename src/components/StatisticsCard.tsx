import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Pressable, Image, StatusBar, DrawerLayoutAndroid, GestureResponderEvent } from 'react-native';
import { TextInput, Button, IconButton, MD3Colors, Avatar, Icon, Appbar } from 'react-native-paper';
import { DataContext } from '../context/contextData';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ColorValue } from 'react-native';
import { useColors } from '../hooks/useColors';

export default function StatisticsCard(props: any) {
    const {
        globTrueAns,
        globFalseAns, isGradient, dataLength
    } = useContext(DataContext);
    const colors = useColors();
    return (
        <Pressable
            android_ripple={{ color: colors.screenBack, borderless: false }}
            onPress={props.press}
            style={[
                styles.statisticsItems,
                {
                    position: 'relative',
                    backgroundColor: 'red',
                    elevation: 5,
                    overflow: 'hidden'
                }
            ]}>
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

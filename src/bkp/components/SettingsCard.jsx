import React, { useRef, useState, useContext, useEffect } from 'react';
import { Alert, Portal, Modal, ActivityIndicator, Switch, TouchableWithoutFeedback, Keyboard, Pressable, TextInput, BackgroundImage, Dimensions, StatusBar, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, View, Box, VStack, FormControl, Input, Radio, Divider, Checkbox, Card, Appbar, KeyboardAvoidingView, ScrollView, Platform, Vibration } from 'react-native';
import { DataContext } from '../context/contextData';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function SettingsCard(props) {
    const {
        colors,
        language,
        texts,
    } = useContext(DataContext);
    return (
        <View style={{
            width: "97%",
            alignItems: "center",
            justifyContent: "center",
            borderColor: colors.secondary,
            borderWidth: 0,
            borderRadius: 10,
            overflow: 'hidden',
        }}>
            <Pressable
                android_ripple={{ color: colors.secondary, borderless: false }}

                style={{
                    alignItems: "center",
                    width: "100%",
                    height: 47,
                    borderRadius: 15,
                    borderBottomColor: colors.secondary,
                    borderBottomWidth: props.index >= Object.keys(props.objectKey)?.length - 1 ? 0 : 0,
                    overflow: 'hidden',
                    justifyContent: "space-between",
                    flexDirection: language === 'arabic' ? 'row-reverse' : 'row',
                }}
                onPress={props.press}
            >
                <View style={{
                    width: 47,
                    height: 47,
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    {props.itemIconSet === 'MaterialCommunityIcons' ? <MaterialCommunityIcons
                        name={props.icon}
                        color={props.color}
                        size={18}
                        style={props.itemId === 5 && { transform: [{ rotate: '-30deg' }] }}
                    /> :
                        <MaterialIcons
                            name={props.icon}
                            color={props.color}
                            size={18}
                            style={props.itemId === 5 && { transform: [{ rotate: '-30deg' }] }}
                        />}
                </View>
                <View
                    style={[{
                        alignItems: "center",
                        justifyContent: 'center',
                        flex: 1, height: 47,
                        flexDirection: 'row',
                        justifyContent: language === 'english' ? "flex-start" : "flex-end",

                    }]}
                >
                    <Text style={{
                        color: props.labelColor,
                        fontSize: 15,
                        fontFamily: "Cairo_600SemiBold",
                    }}>{props.label}</Text>
                </View>
                <View style={[{
                    width: 47,
                    height: 47,
                    alignItems: "center",
                    justifyContent: "center",
                }]}>
                    <MaterialIcons
                        name={"arrow-back-ios"}
                        color={props.color}
                        size={10}
                        style={[language === 'english' ? { transform: [{ rotate: '180deg' }] } : {}]}
                    />
                </View>
            </Pressable>
        </View>
    )
}

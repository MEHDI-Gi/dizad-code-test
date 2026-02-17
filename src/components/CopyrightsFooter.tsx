import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, ScrollView, } from 'react-native';
import { DataContext } from '../context/contextData';
import DeviceInfo from 'react-native-device-info';
import { useColors } from '../hooks/useColors';

const appVersion = DeviceInfo.getVersion();
export default function CopyrightsFooter() {

    const colors = useColors();

    return (
        <View style={{
            paddingHorizontal: 20,
            flexDirection: 'row-reverse',
            alignItems: 'center',
            width: '100%',
            height: 30,
            overflow: 'hidden',
            justifyContent: 'center',

        }}>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                width: '15%',
            }}>
                <Text style={{ color: colors.text.secondary, fontFamily: 'monospace', fontWeight: '700', fontSize: 12 }}>
                    {appVersion}
                </Text>
            </View>
        </View>

    )
}

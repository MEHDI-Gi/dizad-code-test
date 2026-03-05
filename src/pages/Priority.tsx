import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Pressable, Image, StatusBar, ActivityIndicator, DrawerLayoutAndroid, Dimensions, Modal } from 'react-native';
import { DataContext } from '../context/contextData.tsx';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import LinearGradient from 'react-native-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types.ts';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { useAutoInterstitial } from '../hooks/useAutoInterstitial.ts';
import { useAd } from '../hooks/useAd.ts';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

import { useSize } from '../hooks/useSize.ts';
import { useGoogleSignIn } from '../context/auth';
import BottomTab from '../components/elements/BottomTab.tsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useColors } from '../hooks/useColors.ts';
import { useVip } from '../hooks/useVip.ts';

export default function Priority() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const { user, logout, initializing } = useGoogleSignIn();
    const { lessons, screen,
        widthScale,
        heightScale,
        sizeScale,
    } = useSize();
    const { userVip } = useVip();

    const colors = useColors();
    const {
        sound, playSound,
        lessonsData, setPriorityItemsIndex,
        imgBase
    } = useContext(DataContext);

    const itemsSideColors = [
        '#4a2b14ff',
        '#36344aff',
        '#4f6031ff',
        '#756230ff',
        '#6e1c2dff',
        '#2F4F4F',
    ]

    const sideColors = (index: number) =>
        itemsSideColors[index % itemsSideColors.length] ?? 'white';

    const ad = useAd();
    const PRIORITY_CONTENT = lessonsData?.content?.priority?.content || [];
    const [openItems, setOpenItems] = useState<boolean>(false);

    const PRIORITY_CONTENT_LENGTH = PRIORITY_CONTENT.length; // Direct .length now!

    const priorityContent = PRIORITY_CONTENT.map((item: any, index: any) => ({
        id: item.id ?? index,
        label: `المرحلة ${index + 1}`,
        condition: `category ${index}`,
        img: item.img &&
            `${imgBase}/priority/${item.folder}/${item.img}.jpg`,

        items: item.items || [] // Include items for nested <lists>                                                                                     </lists>
    }));


    const LessonsContentPress = (item: any) => {
        const match = item.condition.match(/category (\d+)/);
        if (match) {
            const categoryNumber = parseInt(match[1], 10);
            const timer = setTimeout(() => {
                ad.isLoaded && ad.show()
            }, 500);
            setPriorityItemsIndex(categoryNumber);
            navigation.navigate('PriorityItems')
            if (sound) {
                playSound('levelsButton')
            }
            return () => clearTimeout(timer);
        }
    };

    if (!PRIORITY_CONTENT) {
        return (
            <View style={[{ flex: 1, alignItems: "center", justifyContent: 'center', backgroundColor: colors.primary }]}>
                <ActivityIndicator size={30} color={sideColors(6)} />
            </View>
        )
    }

    return (
        <View style={{
            backgroundColor: colors.primary,
            flex: 1, width: screen.width,
        }}>
            <ScrollView
                horizontal={false}
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1, width: '100%',
                }}
                contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: "center",
                    alignContent: "center",
                }}>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    justifyContent: 'space-evenly',
                    paddingVertical: sizeScale(60),
                    rowGap: sizeScale(15),
                }}>
                    {priorityContent?.map((item: any, index: any) => {
                        const total = Object.keys(lessonsData?.content?.priority?.content?.[index]?.items || {}).length;
                        if (PRIORITY_CONTENT) {
                            return (
                                <Pressable
                                    disabled={!userVip && index > 3}
                                    key={index}
                                    android_ripple={{
                                        foreground: true,
                                        color: colors.primary,
                                        borderless: false
                                    }}
                                    onPress={() => LessonsContentPress(item)}
                                    style={[
                                        {
                                            width: '90%',
                                            height: heightScale(lessons.category.height * 0.5),
                                            borderRadius: sizeScale(8),
                                            flexDirection: 'column',
                                            backgroundColor: colors.secondary,
                                            overflow: 'hidden',
                                            elevation: 5,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }

                                    ]}
                                >
                                    {!userVip && index > 3 &&
                                        <View style={{
                                            backgroundColor: colors.opacity.primary,
                                            position: "absolute",
                                            top: 0,
                                            bottom: 0,
                                            right: 0,
                                            left: 0,
                                            zIndex: 9,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {/* <LinearGradient
                                                colors={['#00ffff', colors.primary]}
                                                start={{ x: 2, y: 0 }}
                                                end={{ x: 0, y: 3 }}
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    zIndex: 5,
                                                    opacity: 0.2
                                                }}
                                            /> */}
                                            <Ionicons
                                                name='diamond-sharp'
                                                color={colors.button.primary}
                                                size={sizeScale(30)}
                                            />
                                        </View>}
                                    <View
                                        style={[{
                                            position: "absolute",
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: colors.secondary,
                                            width: '100%',
                                            height: '100%',
                                            overflow: 'hidden',
                                        }]}>
                                        {item?.img ?
                                            <Image
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                                source={{ uri: item?.img }}
                                                resizeMode={"cover"}
                                            />
                                            :
                                            <ShimmerPlaceHolder
                                                style={{ width: "100%", height: "100%", }}
                                                shimmerColors={[colors.secondary, '#6161617c', colors.secondary]}
                                            />
                                        }
                                    </View>
                                    <View
                                        style={[{
                                            alignItems: "flex-end",
                                            justifyContent: "center",
                                            position: "absolute",
                                            right: sizeScale(8),
                                            top: sizeScale(8),
                                            backgroundColor: colors.primary,
                                            paddingHorizontal: sizeScale(8),
                                            borderRadius: sizeScale(5),
                                            paddingVertical: sizeScale(3),
                                        }]}>

                                        <Text style={{
                                            fontFamily: "Cairo-Bold", color: colors.text.primary, fontSize: sizeScale(16),
                                        }}>
                                            {item.label}
                                        </Text>
                                    </View>
                                    <View
                                        style={[{
                                            alignItems: "flex-end",
                                            justifyContent: "center",
                                            position: "absolute",
                                            left: sizeScale(8),
                                            bottom: sizeScale(8),
                                            backgroundColor: colors.opacity.primary,
                                            paddingHorizontal: sizeScale(8),
                                            borderRadius: sizeScale(7),
                                            paddingVertical: sizeScale(3),
                                        }]}>
                                        <Text style={{
                                            fontFamily: "Cairo-Bold",

                                            color: colors.text.secondary,
                                            fontSize: sizeScale(12),
                                            flexDirection: 'row',

                                        }}>
                                            {total} أولوية
                                        </Text>
                                    </View>

                                </Pressable>
                            )
                        } else {
                            return (
                                <View key={index} style={{

                                    width: '45%',
                                    height: sizeScale(180),
                                    overflow: "hidden",
                                    borderRadius: sizeScale(10),
                                    marginVertical: sizeScale(7),

                                }}>
                                    <ShimmerPlaceHolder
                                        style={{ width: "100%", height: sizeScale(180), }}
                                        shimmerColors={[colors.secondary, '#6161617c', colors.secondary]}
                                    />
                                </View>
                            )
                        }

                    })}
                </View>
            </ScrollView>
        </View >

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
    },

});

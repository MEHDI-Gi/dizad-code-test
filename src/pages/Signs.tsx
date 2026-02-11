import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Pressable, Image, StatusBar, ActivityIndicator, DrawerLayoutAndroid, Dimensions } from 'react-native';
import { DataContext } from '../context/contextData.tsx';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types.ts';
import { useSize } from '../hooks/useSize.ts';
import { useGoogleSignIn } from '../context/auth';
import BottomTab from '../components/elements/BottomTab.tsx';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { useAutoInterstitial } from '../hooks/useAutoInterstitial.ts';
import { useAd } from '../hooks/useAd.ts';
import { useColors } from '../hooks/useColors.ts';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function Signs() {
    // useAutoInterstitial(route.name);
    // useAutoInterstitial(route.name, ['Signs', 'QuizResult', 'LevelComplete']);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const { user, logout, initializing } = useGoogleSignIn();
    const { lessons, screen } = useSize();
    const colors = useColors();
    const {
        setTotalSigns,
        lessonsData,
        setSignsItemsIndex,
        sound, playSound, isGradient,
        isRewardAdd, setIsRewardAdd,
        imgBase
    } = useContext(DataContext);

    const SIGNS_CONTENT = lessonsData?.content?.signs?.content || [];
    const SIGNS_CONTENT_LENGTH = SIGNS_CONTENT.length; // Direct .length now!
    const title = lessonsData?.content?.signs?.label ?? 'إشارات المرور';

    const SignsContent = SIGNS_CONTENT.map((folder: any, folderIndex: any) => ({
        id: folderIndex,
        label: folder.label ?? 'إشارات المرور',
        condition: `category ${folderIndex}`,
        img: folder.img &&
            `${imgBase}/${folder.folder}/${folder.img}.png`,
        items: folder.items || [] // Include items for nested lists
    }));

    const ad = useAd();

    const LessonsContentPress = (item: any) => {
        const match = item.condition.match(/category (\d+)/);
        if (match) {
            const categoryNumber = parseInt(match[1], 10);
            const timer = setTimeout(() => {
                ad.isLoaded && ad.show()
            }, 500);
            setSignsItemsIndex(categoryNumber);
            navigation.navigate('SignsItems');
            if (sound) {
                playSound('levelsButton')
            }
            return () => clearTimeout(timer);
        }
    };



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
                    paddingVertical: 60,
                    rowGap: 15,
                }}>
                    {SignsContent?.map((item: any, index: any) => {
                        const totalSigns = Object.keys(lessonsData?.content?.signs?.content?.[index]?.items || {}).length;
                        if (SIGNS_CONTENT) {
                            return (
                                <Pressable
                                    key={index}
                                    android_ripple={{
                                        foreground: true,
                                        color: colors.primary,
                                        borderless: false
                                    }}
                                    onPress={() => LessonsContentPress(item)}
                                    style={[{
                                        width: lessons.category.width,
                                        borderRadius: 8,
                                        flexDirection: 'column',
                                        backgroundColor: colors.secondary,
                                        overflow: 'hidden',
                                        elevation: 5,
                                    },]}>

                                    <View
                                        style={[{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: lessons.category.width,
                                            height: lessons.category.width,
                                            overflow: 'hidden',
                                        }]}>
                                        <View
                                            style={[{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: colors.primary,
                                                width: '90%',
                                                height: '90%',
                                                overflow: 'hidden',
                                                borderRadius: 5,
                                            }]}>
                                            {item?.img ?
                                                <Image
                                                    style={{
                                                        width: '70%',
                                                        height: '70%',
                                                    }}
                                                    source={{ uri: item?.img }}
                                                />
                                                :
                                                <ShimmerPlaceHolder
                                                    style={{ width: "100%", height: "100%", }}
                                                    shimmerColors={[colors.secondary, '#6161617c', colors.secondary]}
                                                />
                                            }
                                        </View>

                                    </View>
                                    <View
                                        style={[{
                                            alignItems: 'flex-end',
                                            justifyContent: 'center',
                                            backgroundColor: 'transparent',
                                            width: '100%',
                                            paddingBottom: 10,
                                            paddingHorizontal: 10,
                                        }]}>
                                        <Text style={{ fontFamily: "Cairo-Bold", color: colors.text.primary, fontSize: 16, }}>
                                            {item.label}
                                        </Text>
                                        <Text style={{
                                            fontFamily: "Cairo",
                                            color: colors.text.secondary,
                                            fontSize: 12,
                                            flexDirection: 'row',
                                        }}>
                                            {totalSigns} إشــــارة
                                        </Text>
                                    </View>

                                </Pressable>
                            )
                        } else {
                            return (
                                <View key={index} style={{

                                    width: '45%',
                                    height: 180,
                                    overflow: "hidden",
                                    borderRadius: 10,
                                    marginVertical: 7,

                                }}>
                                    <ShimmerPlaceHolder
                                        style={{ width: "100%", height: 180, }}
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

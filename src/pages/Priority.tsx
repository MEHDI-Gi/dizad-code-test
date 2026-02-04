import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Pressable, Image, StatusBar, ActivityIndicator, DrawerLayoutAndroid, Dimensions, Modal } from 'react-native';
import { TextInput, Button, IconButton, MD3Colors, Icon, Appbar } from 'react-native-paper';
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
import FastImage from '@d11/react-native-fast-image';

export default function Priority() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const { user, logout, initializing } = useGoogleSignIn();
    const { lessons, screen } = useSize();
    const {
        signsData,
        lessonsQuestIndices,
        lessonPercentage,
        lessonsCurrentLevelIndex,
        colors,
        signsDataLength,
        setDataLevelIndex,
        answerStats,
        levelsRank, setLevelsRank,
        quizCategoriesData,
        userPlan,
        sound, playSound, isGradient, texts, language,
        isRewardAdd, setIsRewardAdd,
        lessonsData,
        priorityItemsIndex, setPriorityItemsIndex,
        imgBase
    } = useContext(DataContext);

    const itemsSideColors = [
        '#4a2b14ff',  // Saddle Brown
        '#36344aff',  // Dark Slate Blue
        '#4f6031ff',  // Dark Olive Green
        '#756230ff',  // Dark Goldenrod
        '#6e1c2dff',  // Crimson
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

    if (initializing || !PRIORITY_CONTENT) {
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
                    paddingVertical: 60,
                    rowGap: 15,
                }}>
                    {priorityContent?.map((item: any, index: any) => {
                        const total = Object.keys(lessonsData?.content?.priority?.content?.[index]?.items || {}).length;
                        if (PRIORITY_CONTENT) {
                            return (
                                <Pressable
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
                                            height: lessons.category.height * 0.5,
                                            borderRadius: 8,
                                            flexDirection: 'column',
                                            backgroundColor: colors.secondary,
                                            overflow: 'hidden',
                                            elevation: 5,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        },
                                    ]}
                                >
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

                                            // <Image
                                            //     style={{
                                            //         width: '100%',
                                            //         height: '100%',

                                            //     }}
                                            //     source={{ uri: item?.img }}
                                            // />
                                            <FastImage
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                                source={{ uri: item?.img, priority: FastImage.priority.normal }}
                                                resizeMode={FastImage.resizeMode.cover}
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
                                            right: 8,
                                            top: 8,
                                            backgroundColor: colors.primary,
                                            paddingHorizontal: 8,
                                            borderRadius: 5,
                                            paddingVertical: 3,
                                        }]}>
                                        
                                        <Text style={{

                                            fontFamily: "Cairo-Bold", color: colors.text.primary, fontSize: 16,
                                        }}>
                                            {item.label}
                                            {/* {Object.keys(SignsContentInfo[index + 1].label)} */}
                                        </Text>
                                    </View>
                                     <View
                                        style={[{
                                            alignItems: "flex-end",
                                            justifyContent: "center",
                                            position: "absolute",
                                            left: 8,
                                            bottom: 8,
                                            backgroundColor: colors.opacity.primary,
                                            paddingHorizontal: 8,
                                            borderRadius: 5,
                                            paddingVertical: 3,
                                        }]}>
                                        
                                        <Text style={{
                                            fontFamily: "Cairo-Bold",
                                            
                                            color: colors.text.secondary,
                                            fontSize: 12,
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
    },
    xpArea: {
        flexDirection: "row",
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'flex-start',
        overflow: 'hidden',
    },
    statisticsAreaContainer: {
        width: "100%",
        paddingVertical: 10,
        paddingBottom: 10,
        paddingTop: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    statisticsTitleArea: {
        paddingHorizontal: 15,
        marginBottom: 0,
        backgroundColor: "transparent",
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    statisticsTitle: {
        lineHeight: 35,
        fontFamily: "Cairo_600SemiBold",
        fontSize: 16,
        textAlign: "center"

    },
    statisticsArea: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        width: "100%",
        marginTop: 5,
        height: 100,
        borderRadius: 10
    },
    statisticsItems: {
        backgroundColor: "transparent",
        flexDirection: "column",
        justifyContent: 'space-between',
        borderRadius: 8,
        width: 80,
        height: '100%',
        marginHorizontal: 3,
        alignItems: "center",
        paddingVertical: 10,
    },
    statisticsItemsTitle: {
        fontSize: 12,
        fontFamily: "Cairo_600SemiBold",
        textAlign: "center"
    },
    mainArea: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: "center",
        backgroundColor: "transparent",
        position: 'relative',
        paddingHorizontal: 10,
    },
    levelListItems: {
        flexDirection: 'row-reverse',
        justifyContent: "space-between",
        alignItems: 'center',
        width: '93%',
        borderRadius: 20,
        margin: 7,
        padding: 10,
    },
    startBtnView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 80,
        width: '100%',
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",

    },
    startBtn: {
        textAlign: "center",
        borderRadius: 9,
        width: 120,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
    },
    startBtnText: {
        fontFamily: "Cairo_700Bold",
        textAlign: 'center',
    },
    startButtonArea: {
        width: "100%", alignItems: "center", justifyContent: "center",
    },
    startButton: {
        backgroundColor: "#22799c",
        textAlign: "center",
        borderRadius: 8,
        width: "93%",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15
    },
    startButtonTitle: {
        fontFamily: "Cairo_700Bold",
        color: "black",
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 45,
    },
    section: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 5,
        backgroundColor: "gray",
        width: 300,
        height: 60,
        borderRadius: 0,
        paddingHorizontal: 10,
        elevation: 3,
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

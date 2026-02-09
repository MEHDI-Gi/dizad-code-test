import React, { useRef, useState, useContext, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Pressable, Image, StatusBar, ActivityIndicator, DrawerLayoutAndroid, Dimensions, Modal, FlatList, ListRenderItemInfo } from 'react-native';
import { TextInput, Button, IconButton, MD3Colors, Icon, Appbar } from 'react-native-paper';
import { DataContext } from '../context/contextData.tsx';
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

import {
    CompositeNavigationProp,
    NavigatorScreenParams,
    useNavigation,
    useNavigationState,
    useRoute,
} from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';
import { rotationHandlerName } from 'react-native-gesture-handler/lib/typescript/handlers/RotationGestureHandler';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import Orientation from 'react-native-orientation-locker';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '../hooks/useColors.ts';
export default function PriorityItems({ route }: any) {
    const navigation = useNavigation<any>();
    const { user, logout, initializing } = useGoogleSignIn();
    const { lessons, screen, fullScreen } = useSize();
    const colors = useColors();
    const {
        signsData,
        lessonsQuestIndices,
        lessonPercentage,
        lessonsCurrentLevelIndex,

        signsDataLength,
        setDataLevelIndex,
        answerStats,
        levelsRank, setLevelsRank,
        quizCategoriesData,
        userPlan,
        sound, playSound, isGradient, texts, language,
        isRewardAdd, setIsRewardAdd,
        lessonsData,
        priorityItemsIndex, setPriorityItemsIndexn,
        toggleBookmark,
        isBookmarked,
        bookmarkLoading,
        imgBase,
        incrementView
    } = useContext(DataContext);


    const ad = useAd();
    const PRIORITY_CONTENT = lessonsData?.content?.priority?.content || [];

    const PRIORITY_ITEMS = (lessonsData?.content?.priority?.content?.[priorityItemsIndex]?.items || []).filter((item: any) => item && typeof item === 'object');;
    const PRIORITY_ITEMS_Length = PRIORITY_ITEMS.length;

    const [priorityModal, setPriorityModal] = useState<boolean>(false)
    const [fullImage, setFullImage] = useState<boolean>(false)
    // useEffect(() => {
    //     if (fullImage) { Orientation.lockToLandscapeLeft(); }
    //     else {
    //         Orientation.lockToPortrait();
    //     }
    // }, [fullImage])
    const [selectedPriority, setSelectedPriority] = useState<number>(0);
    const title = `المرحلة ${priorityItemsIndex + 1}`;

    const [currentScrollIndex, setCurrentScrollIndex] = useState<number>(0);
    const progress = PRIORITY_ITEMS_Length > 0 ? (currentScrollIndex / PRIORITY_ITEMS_Length) * 100 : 0;

    const priorityItemsList = PRIORITY_ITEMS.map((item: any, index: any) => {
        if (!item || typeof item !== 'object') return null;

        return {
            id: item.id ?? index,
            condition: `${PRIORITY_CONTENT.folder}`,
            label: item?.label ?? null,
            img: item.img &&
                `${imgBase}/priority/L${priorityItemsIndex + 1}/${item.img}.jpg`,
        };
    });
    const [hiddenLabel, setHiddenLabel] = useState<any>([])

    const handleBookmark = useCallback((category: string, item: any) => {
        toggleBookmark(category, item);
    }, [toggleBookmark]);

    const ITEM_WIDTH = screen.width * 1

    interface ViewToken {
        item: any;
        isViewable: boolean;
    }
    // 2. Use it in your callback
    const handleViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        viewableItems.forEach((viewToken) => {
            if (viewToken.isViewable && viewToken.item) {
                incrementView('priority', viewToken.item);
            }
        });
    }, [incrementView]);

    // 3. Define the config (Required to be a ref in RN to avoid crashes)
    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
        minimumViewTime: 100,           // Must stay visible for 0.5s
    }).current;

    return (
        <View
            style={{
                backgroundColor: colors.primary, position: 'relative',
                flex: 1,
                flexDirection: "column",
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
            <View style={{
                height: 50,
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                zIndex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    top: 0,
                    backgroundColor: colors.primary,
                    opacity: 0.9
                }} />
                <Text style={{ fontFamily: "Cairo-Bold", color: colors.text.primary, fontSize: 16, }}>
                    {title}</Text>
                <Pressable
                    android_ripple={{
                        color: colors.secondary, borderless: true, foreground: true
                    }}
                    style={[{
                        position: 'absolute',
                        alignItems: "center",
                        justifyContent: "center",
                        right: 0,
                        width: 30,
                        height: 30,
                        overflow: 'hidden',
                        marginHorizontal: 15,
                    }]}
                    onPress={() => {
                        setFullImage(false)
                        navigation.navigate('MainTabs', {
                            screen: 'Lessons',
                            params: { screen: 'Priority', initial: false },
                        });
                        if (sound) playSound('settingsButton')
                    }}>
                    <MaterialIcons name='close' color={colors.text.secondary} size={25} />
                </Pressable>
            </View>


            < ScrollView
                horizontal={false}
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1, width: '100%',
                }}
                contentContainerStyle={{
                    paddingTop: 50,
                    paddingBottom: 20,
                    alignItems: 'center',
                    justifyContent: "center",
                    alignContent: "center",
                }}>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingVertical: 10,
                    gap: 10,
                    marginBottom: 40,
                }}>
                    {priorityItemsList?.map((item: any, index: number) => {
                        if (PRIORITY_CONTENT) {
                            return (
                                <Pressable
                                    key={item.id}
                                    android_ripple={{
                                        foreground: true,
                                        color: colors.primary,
                                        borderless: false
                                    }}
                                    onPress={() => {
                                        setCurrentScrollIndex(index + 1)
                                        setSelectedPriority(index);   // remember which Sx was tapped
                                        setPriorityModal(true);
                                        const timer = setTimeout(() => {
                                            ad.isLoaded && ad.show()
                                        }, 2000);
                                        return () => clearTimeout(timer);
                                    }}
                                    style={[
                                        {
                                            width: screen.width * 0.93,
                                            height: screen.width * 0.28,
                                            borderRadius: 8,
                                            flexDirection: 'column',
                                            backgroundColor: colors.secondary,
                                            alignSelf: 'flex-start',
                                            overflow: 'hidden',
                                            opacity: 1,
                                            elevation: 5,

                                        }
                                    ]}
                                >
                                    <View style={{
                                        position: 'absolute',
                                        backgroundColor: colors.opacity.primary,
                                        width: 27,
                                        height: 27,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 5,
                                        top: 5,
                                        left: 5,
                                        zIndex: 99
                                    }}>
                                        <Text style={{
                                            color: colors.text.primary,
                                            fontSize: 13,
                                            fontWeight: '600'
                                        }}>
                                            {index + 1}
                                        </Text>
                                    </View>
                                    <View
                                        style={[{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '100%',
                                            height: '100%',
                                            overflow: 'hidden',
                                            borderRadius: 5,
                                        }]}>

                                        {item?.img ?
                                            <Image
                                                style={{ width: '100%', height: '100%' }}
                                                source={{ uri: item.img }}
                                                resizeMode="cover"
                                            />
                                            :
                                            <ShimmerPlaceHolder
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    opacity: 0.5
                                                }}
                                                shimmerColors={colors.shimmer.first}
                                            />
                                        }
                                    </View>
                                </Pressable>
                            )
                        } else {
                            return (
                                <View key={index} style={{

                                    width: screen.width * 0.95,
                                    height: screen.width * 0.28,
                                    overflow: "hidden",
                                    borderRadius: 10,

                                }}>
                                    <ShimmerPlaceHolder
                                        style={{
                                            width: screen.width * 0.95,
                                            height: screen.width * 0.28,
                                            opacity: 0.5
                                        }}
                                        shimmerColors={colors.shimmer.second}
                                    />
                                </View>
                            )
                        }

                    })}
                </View>
            </ScrollView >

            <Modal
                visible={priorityModal}
                onRequestClose={() => setPriorityModal(false)}
                transparent
                animationType="slide">


                <View style={{
                    flex: 1,
                    width: "100%",
                    alignItems: 'center', justifyContent: 'center',
                }} >
                    <View style={{
                        backgroundColor: colors.primary,
                        width: "100%", height: 3, flexDirection: 'row',
                        position: "absolute",
                        top: 0,
                        zIndex: 9,

                    }}>
                        <View style={{ height: "100%", backgroundColor: colors.button.secondary, width: `${progress}%`, }}></View>
                    </View>
                    {!fullImage && <Pressable
                        android_ripple={{ borderless: false, color: colors.primary, foreground: true }}
                        style={[{
                            zIndex: 1,
                            backgroundColor: colors.secondary,
                            width: 30,
                            height: 30,
                            borderRadius: 8,
                            top: 8,
                            right: 8,
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            opacity: 0.8
                        }]}
                        onPress={() => {
                            // setQuestionsItemsIndex(index);
                            setFullImage(false)
                            setPriorityModal(false)

                        }} >
                        <MaterialIcons
                            name='close'
                            color={colors.text.primary}
                            size={20}
                        />
                    </Pressable>}
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={priorityItemsList}
                        onMomentumScrollEnd={(event) => {
                            const scrollX = event.nativeEvent.contentOffset.x;
                            const index = Math.round(scrollX / ITEM_WIDTH);
                            setCurrentScrollIndex(index + 1);
                            setHiddenLabel(true)
                        }}
                        onViewableItemsChanged={handleViewableItemsChanged}
                        viewabilityConfig={viewabilityConfig}
                        horizontal
                        snapToInterval={ITEM_WIDTH}
                        decelerationRate="fast"
                        initialScrollIndex={selectedPriority}
                        getItemLayout={(data, index) => ({
                            length: ITEM_WIDTH,
                            offset: ITEM_WIDTH * index,
                            index
                        })}
                        keyExtractor={(item, idx) => `item-${idx}`}
                        renderItem={({ item, index }: ListRenderItemInfo<any>) => {
                            return (
                                <View style={{
                                    width: screen.width,
                                    flex: 1, alignItems: 'center',
                                    justifyContent: 'center',
                                }}>

                                    <View style={{
                                        width: "100%",
                                        flex: 1,
                                        backgroundColor: colors.primary,
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        gap: 10

                                    }}>
                                        <View style={[{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: screen.width,
                                            height: screen.width * 0.5,
                                            overflow: 'hidden',

                                        }, fullImage ? {
                                            width: fullScreen.height,
                                            height: fullScreen.width,
                                            transform: '[rotate(90deg)]',
                                            position: 'absolute',
                                            zIndex: 1,
                                        } : {}]}>
                                            {!fullImage && <Pressable
                                                android_ripple={{ borderless: false, color: colors.primary, foreground: true }}
                                                style={[{
                                                    zIndex: 99,
                                                    backgroundColor: colors.secondary,
                                                    width: 30,
                                                    height: 30,
                                                    borderRadius: 8,
                                                    bottom: 8,
                                                    right: 8,
                                                    position: 'absolute',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    overflow: 'hidden',
                                                    opacity: 0.8
                                                }]}
                                                onPress={() => {
                                                    // setQuestionsItemsIndex(index);
                                                    setFullImage((prev) => !prev)
                                                }} >
                                                <MaterialCommunityIcons
                                                    name={!fullImage ? 'fullscreen' : 'fullscreen-exit'}
                                                    color={colors.text.primary}
                                                    size={25}
                                                />
                                            </Pressable>}

                                            {item?.img ? (
                                                <Image
                                                    resizeMode='cover'
                                                    style={
                                                        [{ width: '100%', height: '100%' },
                                                        fullImage ? {
                                                            width: fullScreen.height,
                                                            height: fullScreen.width,
                                                        } : {}
                                                        ]
                                                    }
                                                    source={{ uri: item.img }} />
                                            ) : (
                                                <ShimmerPlaceHolder
                                                    style={{ width: "100%", height: '100%' }}
                                                    shimmerColors={[colors.secondary, '#6161617c', colors.secondary]}
                                                />
                                            )}
                                        </View>
                                        <View style={{
                                            width: '100%',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Text style={{
                                                textAlign: 'center',
                                                fontFamily: 'Cairo-Bold',
                                                color: colors.text.primary,
                                                fontSize: 18,

                                            }}>
                                                لمن أولوية المرور ؟
                                            </Text>
                                        </View>
                                        <View style={{
                                            width: '100%',
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            overflow: 'hidden',
                                        }}>
                                            {hiddenLabel ?
                                                <View style={{
                                                    width: '100%',
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    overflow: 'hidden',
                                                    gap: 15
                                                }}>

                                                    <Pressable
                                                        android_ripple={{ color: colors.primary, borderless: false, foreground: true }}
                                                        style={[{
                                                            overflow: 'hidden',
                                                            borderRadius: 8,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            width: 120,
                                                            height: 45,
                                                            backgroundColor: colors.secondary,
                                                            zIndex: 2,


                                                        }, fullImage && {
                                                            transform: 'rotate(90deg)',
                                                            opacity: 0.8
                                                        }]}
                                                        onPress={() => setHiddenLabel(false)}
                                                    >
                                                        <MaterialCommunityIcons size={25} color={colors.text.primary} name={'eye'} />
                                                    </Pressable>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        fontFamily: 'Cairo-Bold',
                                                        color: colors.text.secondary,
                                                        fontSize: 16,
                                                    }}>
                                                        أظهر الإجابة
                                                    </Text>
                                                </View>
                                                :
                                                <ScrollView
                                                    style={{
                                                        width: '100%',
                                                        flex: 1,
                                                        paddingHorizontal: 15,
                                                    }}
                                                    contentContainerStyle={{
                                                        gap: 15,
                                                        paddingTop: 20,  // Add top/bottom padding
                                                        justifyContent: 'flex-start',
                                                        alignItems: 'center',
                                                    }}
                                                    showsVerticalScrollIndicator={false}
                                                >
                                                    {item?.label &&
                                                        < Text style={{
                                                            textAlign: 'center',
                                                            fontFamily: 'Cairo-Bold',
                                                            color: colors.text.primary,
                                                            fontSize: 18,

                                                        }}>
                                                            {item?.label}
                                                        </Text>
                                                    }
                                                    {item?.description && (
                                                        <Text

                                                            style={{
                                                                textAlign: 'center',
                                                                fontFamily: 'Cairo',
                                                                color: colors.text.secondary,
                                                                fontSize: 18,

                                                            }}>
                                                            {item.description}
                                                        </Text>
                                                    )}

                                                </ScrollView>}
                                        </View>

                                        {/* BOOKMARK */}

                                        <Pressable
                                            android_ripple={{ color: colors.primary, borderless: false, foreground: true }}
                                            style={[{
                                                position: 'absolute',
                                                bottom: 18,
                                                right: 18,
                                                overflow: 'hidden',
                                                borderRadius: 8,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 40,
                                                height: 40,
                                                backgroundColor: colors.secondary,
                                                zIndex: 2,


                                            }, fullImage && {
                                                transform: 'rotate(90deg)',
                                                opacity: 0.8
                                            }]}
                                            onPress={() => handleBookmark('priority', {
                                                id: item.id ?? `priority-${priorityItemsIndex}-${index}`,
                                            })}
                                        >
                                            {bookmarkLoading ?
                                                (
                                                    <ActivityIndicator size={'small'} color={colors.text.primary} />
                                                ) :
                                                (
                                                    <MaterialCommunityIcons size={25} color={colors.text.primary} name={
                                                        !isBookmarked('priority', { id: item.id ?? `priority-${priorityItemsIndex}-${index}` }) ?
                                                            'bookmark-outline' : 'bookmark'} />
                                                )
                                            }
                                        </Pressable>
                                        {fullImage && <Pressable
                                            android_ripple={{ borderless: false, color: colors.primary, foreground: true }}
                                            style={[{
                                                zIndex: 99,
                                                backgroundColor: colors.secondary,
                                                borderRadius: 8,
                                                position: 'absolute',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                overflow: 'hidden',
                                                opacity: 0.8,
                                                width: 40,
                                                height: 40,
                                                bottom: 18,
                                                left: 18,
                                            }]}
                                            onPress={() => {
                                                // setQuestionsItemsIndex(index);
                                                setFullImage((prev) => !prev)
                                            }} >
                                            <MaterialCommunityIcons
                                                name={!fullImage ? 'fullscreen' : 'fullscreen-exit'}
                                                color={colors.text.primary}
                                                size={25}
                                            />
                                        </Pressable>}
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
            </Modal >
        </View >
    );
}
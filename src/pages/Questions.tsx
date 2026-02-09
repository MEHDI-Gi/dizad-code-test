import React, { useRef, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Pressable, Image, StatusBar, ActivityIndicator, DrawerLayoutAndroid, Dimensions, Modal, FlatList, ListRenderItemInfo } from 'react-native';
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

import { useSize } from '../hooks/useSize.ts';
import { useGoogleSignIn } from '../context/auth';
import BottomTab from '../components/elements/BottomTab.tsx';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { BlurView } from '@react-native-community/blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemsModal from '../components/ItemsModal.tsx';
import { useAd } from '../hooks/useAd.ts';
import { useColors } from '../hooks/useColors.ts';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function Questions() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const { user, logout, initializing } = useGoogleSignIn();
    const { lessons, screen } = useSize();
    const colors = useColors();
    const {
        signsData,
        setSignsItemsIndex,
        signsItemsIndex,
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
        toggleBookmark,
        isBookmarked,
        setQuestionsItemsIndex,
        questionsItemsIndex,
        bookmarkLoading,
        incrementView
    } = useContext(DataContext);

    const handleBookmark = useCallback((category: string, item: any) => {
        toggleBookmark(category, item);
    }, [toggleBookmark]);



    const { width: screenWidth } = Dimensions.get('window');
    const ITEM_WIDTH = screenWidth * 1
    const [questionsModal, setQuestionsModal] = useState<boolean>(false)
    const [selectedQuestion, setSelectedQuestion] = useState<number>(0);
    const QUESTIONS_CONTENT = lessonsData?.content?.questions?.content || [];
    const QUESTIONS_CONTENT_LENGTH = QUESTIONS_CONTENT.length; // Direct .length now!
    const [currentScrollIndex, setCurrentScrollIndex] = useState<number>(0);
    const progress = useMemo(() =>
        QUESTIONS_CONTENT_LENGTH > 0 ? (currentScrollIndex / QUESTIONS_CONTENT_LENGTH) * 100 : 0,
        [currentScrollIndex, QUESTIONS_CONTENT_LENGTH]
    );
    // ✅ Get actual array, not object keys
    interface QuestionItem {
        id: string | number;
        label: string;
        warn: string[];
        answers: string[];
        cover: string;
    }
    const imageBase = 'https://cdn.jsdelivr.net/gh/MEHDI-Gi/dizad_road_test_assets@main/assets';
    const folder = lessonsData?.content?.questions?.content?.[selectedQuestion]?.folder;

    const questionsList = useMemo(() =>
        QUESTIONS_CONTENT.map((item: any, index: any): QuestionItem | null => {
            if (!item || typeof item !== 'object') return null;
            return {
                id: item.id ?? index,
                label: item.label ?? 'undefined',
                warn: Array.isArray(item.warn) ? item.warn : [],  // ✅ Always array
                answers: Array.isArray(item.answers) ? item.answers : [],
                cover: item.cover && imageBase ? `${imageBase}/cover/${item.cover}.png` :
                    '',
            };
        }).filter(Boolean) as QuestionItem[],
        [lessonsData?.content?.questions?.content]  // Stable dep
    );
    const logAllStoredData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const stores = await AsyncStorage.multiGet(keys);

            stores.forEach(([key, value]) => {
                console.log(`${key}: ${value}`);
            });
        } catch (error) {
            console.error('Error fetching all AsyncStorage data:', error);
        }
    };
    interface ViewToken {
        item: any;
        isViewable: boolean;
    }
    // 2. Use it in your callback
    const handleViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        viewableItems.forEach((viewToken) => {
            if (viewToken.isViewable && viewToken.item) {
                incrementView('questions', viewToken.item);
            }
        });
    }, [incrementView]);

    // 3. Define the config (Required to be a ref in RN to avoid crashes)
    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
        minimumViewTime: 100,           // Must stay visible for 0.5s
    }).current;

    // 2. Memoize the config (Crucial for RN FlatList)


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

    return (
        <View style={{
            backgroundColor: colors.primary,
            flex: 1,
            width: screen.width,
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <FlatList
                data={questionsList}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: "flex-start",
                    alignContent: "center",
                    width: "100%",
                    paddingVertical: 60,
                    gap: 10,
                }}
                renderItem={({ item, index }: ListRenderItemInfo<QuestionItem>) => (
                    <Pressable
                        key={item.id.toString()}
                        android_ripple={{
                            foreground: true,
                            color: colors.secondary,
                            borderless: false
                        }}
                        onPress={() => {
                            setSelectedQuestion(index);
                            setQuestionsModal(true);
                            const timer = setTimeout(() => {
                                ad.isLoaded && ad.show()
                            }, 2000);
                            // setQuestionsItemsIndex(index);  
                            return () => clearTimeout(timer);

                        }}
                        style={[
                            {
                                width: "95%",
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row-reverse',
                                borderRadius: 8,
                                overflow: 'hidden',
                                backgroundColor: colors.secondary,
                                elevation: 5,
                                minHeight: 70,
                            },
                        ]}
                    >
                        {/* <View
                            style={[{
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                overflow: 'hidden',
                                borderRadius: 10,
                                zIndex: 1,
                                // backgroundColor: sideColors(index),
                            },]}
                        >
                            <Text style={{
                                color: sideColors(index),
                                fontSize: 18,
                            }}>
                                {index + 1}
                            </Text>
                        </View> */}
                        <View
                            style={[
                                {
                                    flex: 1,
                                    height: "100%",
                                    flexDirection: 'row-reverse',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                    zIndex: 1,
                                    paddingHorizontal: 15,
                                    paddingVertical: 15,
                                },]}
                        >
                            <Text style={{
                                fontFamily: "Cairo",
                                textAlign: 'right',
                                color: colors.text.primary,
                                fontSize: 18,
                            }}>
                                {item.label}
                            </Text>
                        </View>

                    </Pressable>
                )
                }
                ListEmptyComponent={
                    < View
                        style={{
                            width: '90%',
                            height: 70,
                            overflow: "hidden",
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            backgroundColor: colors.secondary,
                            elevation: 5,
                        }}>
                        <ShimmerPlaceHolder
                            style={{ width: "100%", height: "100%", }}
                            shimmerColors={[colors.secondary, '#6161617c', colors.secondary]}
                        />
                    </View >
                }
            />
            < Modal
                visible={questionsModal}
                onRequestClose={() => setQuestionsModal(false)}
                transparent
                animationType="slide" >
                <View style={{
                    flex: 1,
                    alignItems: 'center', justifyContent: 'center',

                }} >
                    <View style={{
                        position: "static",
                        top: 0,
                        backgroundColor: colors.primary,
                        width: "100%", height: 4, flexDirection: 'row',
                        zIndex: 9
                    }}>
                        <View style={{ height: "100%", backgroundColor: 'orange', width: `${progress}%`, }}></View>
                    </View>
                    {/* INLINE FlatList - NO renderItem prop */}
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={questionsList}
                        onMomentumScrollEnd={(event) => {
                            const scrollX = event.nativeEvent.contentOffset.x;
                            const index = Math.round(scrollX / ITEM_WIDTH);
                            setCurrentScrollIndex(index + 1);
                            // setQuestionsItemsIndex(index);
                        }}
                        onViewableItemsChanged={handleViewableItemsChanged}
                        viewabilityConfig={viewabilityConfig}
                        horizontal
                        snapToInterval={ITEM_WIDTH}
                        decelerationRate="fast"
                        initialScrollIndex={selectedQuestion}
                        getItemLayout={(data, index) => ({
                            length: ITEM_WIDTH,
                            offset: ITEM_WIDTH * index,
                            index
                        })}
                        keyExtractor={(item) => item.id.toString()}

                        renderItem={({ item, index }: ListRenderItemInfo<QuestionItem>) => (
                            <View style={{
                                width: screenWidth,
                                alignItems: 'center', justifyContent: 'center',

                            }}>
                                <View style={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: colors.primary,
                                    // borderRadius: 8,
                                    elevation: 5,
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    overflow: 'hidden'
                                }}>
                                    <Pressable
                                        android_ripple={{ borderless: false, color: colors.primary, foreground: true }}
                                        style={{
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
                                        }}
                                        onPress={() => {
                                            // setQuestionsItemsIndex(index);
                                            setQuestionsModal(false)
                                        }} >
                                        <MaterialIcons
                                            name='close'
                                            color={colors.text.primary}
                                            size={20}
                                        />
                                    </Pressable>
                                    <View style={{
                                        width: '100%',
                                        height: screenWidth * 0.5,
                                        position: 'relative',
                                        overflow: 'hidden',
                                        alignItems: 'center'
                                    }}>
                                        {item?.cover ? (
                                            <Image
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                                resizeMode="stretch"
                                                source={{ uri: item.cover }}
                                            />
                                        ) : null}

                                        {/* LABEL OVERLAY */}
                                        {item?.label && (
                                            <View style={{
                                                position: 'absolute',
                                                bottom: 8,
                                                width: '95%',
                                                padding: 10,
                                                borderRadius: 18,
                                                overflow: 'hidden',
                                                backgroundColor: colors.opacity.primary,

                                            }}>
                                                <View style={{
                                                    position: 'absolute',
                                                    bottom: 0,                 // <- ADD THIS  
                                                    left: 0,                   // <- ADD THIS
                                                    right: 0,
                                                    top: 0,
                                                    backgroundColor: colors.opacity.primary,
                                                    opacity: 1
                                                }} />
                                                <Text style={{
                                                    fontFamily: 'Cairo',
                                                    color: colors.text.primary,
                                                    fontSize: 18,
                                                    textAlign: 'center'
                                                }}>
                                                    {item.label}
                                                </Text>
                                            </View>
                                        )}
                                    </View>



                                    <ScrollView
                                        style={{
                                            width: '100%',
                                            paddingHorizontal: 15,
                                            flex: 1,
                                        }}
                                        contentContainerStyle={{
                                            gap: 4,
                                            paddingVertical: 0,  // Add top/bottom padding
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                        }}
                                        showsVerticalScrollIndicator={false}
                                    >

                                        {item?.answers.map((item: any, index: number) => (
                                            <Text
                                                key={index}
                                                style={{
                                                    fontFamily: 'Cairo-Bold',
                                                    color: colors.text.secondary,
                                                    fontSize: 18,
                                                    textAlign: 'right',
                                                    alignSelf: 'flex-end',
                                                    padding: 5,
                                                    backgroundColor: colors.primary,

                                                }}>
                                                - {item}
                                            </Text>
                                        ))
                                        }
                                        {item?.warn.map((item: any, index: number) => (
                                            <Text
                                                key={index}
                                                style={{
                                                    fontFamily: 'Cairo',
                                                    color: 'orange',
                                                    fontSize: 16,
                                                    textAlign: 'right',
                                                    alignSelf: 'flex-end',
                                                    padding: 5,
                                                    backgroundColor: colors.primary,
                                                }}>
                                                {item}
                                            </Text>
                                        ))}
                                    </ScrollView>

                                    <View style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        flexDirection: 'row',
                                        width: "100%",
                                        height: 70,
                                        paddingHorizontal: 10,
                                        columnGap: 10,
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

                                        <Pressable
                                            android_ripple={{ color: colors.primary, borderless: false, foreground: true }}
                                            style={{
                                                overflow: 'hidden',
                                                borderRadius: 8,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 40,
                                                height: 40,
                                                backgroundColor: colors.secondary
                                            }}
                                            onPress={() => handleBookmark('questions', {
                                                id: item.id ?? `questions-${index}`,

                                            })}
                                        >
                                            {bookmarkLoading
                                                ? (
                                                    <ActivityIndicator size={'small'} color={colors.text.primary} />
                                                ) : (
                                                    <MaterialCommunityIcons size={25} color={colors.text.primary} name={
                                                        !isBookmarked('questions', { id: item.id ?? `questions-${index}` }) ?
                                                            'bookmark-outline' : 'bookmark'} />)}
                                        </Pressable>
                                    </View>
                                </View>

                            </View>
                        )}
                    />
                </View>
            </Modal >
        </View >
    );
};


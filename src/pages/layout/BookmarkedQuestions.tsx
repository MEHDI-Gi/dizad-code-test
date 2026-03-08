import React, { useRef, useState, useContext, useEffect, useMemo, useCallback } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Pressable, Image, StatusBar, ActivityIndicator, DrawerLayoutAndroid, Dimensions, FlatList, Modal, ListRenderItemInfo } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSize } from '../../hooks/useSize';
import { DataContext } from '../../context/contextData';
import { useVip } from '../../hooks/useVip';
import { useColors } from '../../hooks/useColors';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const title = "المحفوظات"

export default function BookmarkedQuestions() {

    const { lessons, screen, bookmarksSizes,
        widthScale,
        heightScale,
        sizeScale,
    } = useSize();
    const {
        lessonsData,
        incrementView,
        setUpgradeWarn,
        bookmarks,
    } = useContext(DataContext);

    const { userVip, setUserPlan } = useVip();
    const colors = useColors();
    const [questionsModal, setQuestionsModal] = useState<boolean>(false)
    const [selectedQuestion, setSelectedQuestion] = useState<number>(0);
    const [currentScrollIndex, setCurrentScrollIndex] = useState<number>(0);

    interface QuestionItem {
        id: string | number;
        label: string;
        warn: string[];
        answers: string[];
        cover: string;
    }
    const findItemById = useCallback((data: any, id: string) => {
        for (const question of lessonsData?.content?.questions?.content || []) {
            if (question.id === id || `questions-${question.id}` === id) {
                return question;
            }
        }
        return null;
    }, [lessonsData]);

    const bookmarkedQuestions = useMemo(() => {
        if (!bookmarks?.questions) return [];

        const BOOKMARKS_QUESTIONS = bookmarks.questions;
        const questionKeys = Object.keys(BOOKMARKS_QUESTIONS);

        return questionKeys
            .map((id: string) => {
                // 1. Get bookmark data (timestamp)
                const bookmarkData = BOOKMARKS_QUESTIONS[id];

                // 2. Reconstruct full item
                const fullItem = findItemById(lessonsData, id);

                // 3. MERGE!
                return {
                    ...fullItem,
                    timestamp: bookmarkData?.timestamp || 0  // ✅ Keep timestamp
                };
            })
            .filter(Boolean)
            .sort((a: any, b: any) => b.timestamp - a.timestamp);
    }, [bookmarks?.questions, lessonsData, findItemById]);
    const progress = useMemo(() =>
        bookmarkedQuestions.length > 0 ? (currentScrollIndex / bookmarkedQuestions.length) * 100 : 0,
        [currentScrollIndex, bookmarkedQuestions]
    );
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

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: colors.primary,

        }}>
            <ScrollView
                contentContainerStyle={{
                    rowGap: sizeScale(10),
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingTop: sizeScale(50),
                    paddingBottom: sizeScale(120),
                }}
                style={{
                    flex: 1,
                    width: '100%',

                }}>
                {bookmarkedQuestions.map((item: any, index: number) => (
                    <Pressable
                        android_ripple={{
                            foreground: true,
                            color: colors.secondary,
                            borderless: false
                        }}
                        onPress={() => {
                            if (!userVip && index > 9) {
                                setUpgradeWarn(true)
                            } else {
                                setSelectedQuestion(index);
                                setQuestionsModal(true);
                            }
                            // const timer = setTimeout(() => {
                            //     ad.isLoaded && ad.show()
                            // }, 2000);
                            // // setQuestionsItemsIndex(index);  
                            // return () => clearTimeout(timer);

                        }}
                        key={item.id}
                        style={{
                            backgroundColor: colors.secondary,
                            padding: sizeScale(15),
                            width: '90%',
                            flexDirection: 'row-reverse',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            borderRadius: sizeScale(8),
                            elevation: 3,
                        }}
                    >
                        <Text style={{
                            fontFamily: "Cairo",
                            color: colors.text.primary,
                            fontSize: sizeScale(18),
                            textAlign: 'right',
                        }}>
                            {item.label}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>
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
                        width: "100%", height: heightScale(4), flexDirection: 'row',
                        zIndex: 9
                    }}>
                        <View style={{ height: "100%", backgroundColor: 'orange', width: `${progress}%`, }}></View>
                    </View>
                    {/* INLINE FlatList - NO renderItem prop */}
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={bookmarkedQuestions}
                        onMomentumScrollEnd={(event) => {
                            const scrollX = event.nativeEvent.contentOffset.x;
                            const index = Math.round(scrollX / screen.width * 1);
                            setCurrentScrollIndex(index + 1);
                            // setQuestionsItemsIndex(index);
                        }}
                        onViewableItemsChanged={handleViewableItemsChanged}
                        viewabilityConfig={viewabilityConfig}
                        horizontal
                        snapToInterval={screen.width * 1}
                        decelerationRate="fast"
                        initialScrollIndex={selectedQuestion}
                        getItemLayout={(data, index) => ({
                            length: screen.width * 1,
                            offset: screen.width * 1 * index,
                            index
                        })}
                        keyExtractor={(item) => item.id.toString()}

                        renderItem={({ item, index }: ListRenderItemInfo<QuestionItem>) => (
                            <View style={{
                                width: screen.width,
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
                                            width: widthScale(30),
                                            height: heightScale(30),
                                            borderRadius: sizeScale(8),
                                            top: heightScale(8),
                                            right: widthScale(8),
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
                                        height: heightScale(screen.height * 0.5),
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

                                        {item?.label && (
                                            <View style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                width: '100%',
                                                padding: sizeScale(10),
                                                borderRadius: sizeScale(18),
                                                borderBottomLeftRadius: 0,
                                                borderBottomRightRadius: 0,
                                                overflow: 'hidden',
                                                backgroundColor: colors.primary,

                                            }}>
                                                <LinearGradient
                                                    colors={['#00ffff', colors.primary]}
                                                    start={{ x: 2, y: 0 }}
                                                    end={{ x: 0, y: 3 }}
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        zIndex: 1,
                                                        opacity: 0.2
                                                    }}
                                                />

                                                <Text style={{
                                                    fontFamily: 'Cairo',
                                                    color: colors.text.primary,
                                                    fontSize: sizeScale(18),
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
                                            flex: 1,
                                        }}
                                        contentContainerStyle={{
                                            paddingHorizontal: sizeScale(15),
                                            paddingTop: sizeScale(20),
                                            paddingBottom: sizeScale(70),
                                            gap: sizeScale(4),
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                        }}
                                        showsVerticalScrollIndicator={false}
                                    >

                                        {item?.answers?.map((item: any, index: number) => (
                                            <Text
                                                key={index}
                                                style={{
                                                    fontFamily: 'Cairo-Bold',
                                                    color: colors.text.secondary,
                                                    fontSize: sizeScale(18),
                                                    textAlign: 'right',
                                                    alignSelf: 'flex-end',
                                                    padding: sizeScale(5),
                                                    backgroundColor: colors.primary,

                                                }}>
                                                - {item}
                                            </Text>
                                        ))
                                        }
                                        {item?.warn?.map((item: any, index: number) => (
                                            <Text
                                                key={index}
                                                style={{
                                                    fontFamily: 'Cairo',
                                                    color: 'orange',
                                                    fontSize: sizeScale(16),
                                                    textAlign: 'right',
                                                    alignSelf: 'flex-end',
                                                    padding: sizeScale(5),
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
                                        height: heightScale(70),
                                        paddingHorizontal: sizeScale(10),
                                        columnGap: sizeScale(10),
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

                                        {/* <Pressable
                                            android_ripple={{ color: colors.primary, borderless: false, foreground: true }}
                                            style={{
                                                overflow: 'hidden',
                                                borderRadius: 8,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: widthScale(40),
                                                height: heightScale(40),
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
                                                    <MaterialCommunityIcons size={sizeScale(25)} color={colors.text.primary} name={
                                                        !isBookmarked('questions', { id: item.id ?? `questions-${index}` }) ?
                                                            'bookmark-outline' : 'bookmark'} />)}
                                        </Pressable> */}
                                    </View>
                                </View>

                            </View>
                        )}
                    />
                </View>
            </Modal >
        </View>
    )
}
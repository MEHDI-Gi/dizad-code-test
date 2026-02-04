import React, { useRef, useState, useContext, useEffect, useMemo, useCallback } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Pressable, Image, StatusBar, ActivityIndicator, DrawerLayoutAndroid, Dimensions } from 'react-native';
import { TextInput, Button, IconButton, MD3Colors, Icon, Appbar } from 'react-native-paper';
import { DataContext } from '../context/contextData.tsx';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import { useSize } from '../hooks/useSize.ts';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BookmarksTab from '../components/elements/BookmarksSubTab.tsx';
const SubTab = createMaterialTopTabNavigator();

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const title = "المحفوظات"
const { lessons, screen } = useSize();



function BookmarkedSigns({ bookmarksSizes, bookmarks, lessonsData, colors }: any) {
    const BOOKMARKS_SIGNS = bookmarks?.signs || {};
    const signsKeys = Object.keys(BOOKMARKS_SIGNS); // ["1765961113348"]
    const BOOKMARKS_SIGNS_LENGTH = signsKeys.length;

    // const signsContent = BOOKMARKS_SIGNS_LENGTH ? signsKeys.map(key => ({
    //     id: key,
    //     label: BOOKMARKS_SIGNS[key]?.label ?? 'undefined',
    //     img: BOOKMARKS_SIGNS[key]?.img ?? '',
    //     condition: `category ${key}`,
    // })) : [];
    const findSignById = useCallback((data: any, id: string) => {
        // Parse: "signs-0-3" → folder 0, item 3
        const match = id.match(/signs-(\d+)-(\d+)/);
        if (!match) return null;

        const [, folderIdx, itemIdx] = match;
        const folder = parseInt(folderIdx);
        const itemIndex = parseInt(itemIdx);

        const signFolder = lessonsData?.content?.signs?.content?.[folder];
        const signItem = signFolder?.items?.[itemIndex];

        if (!signItem) return null;

        const imageBase = 'https://cdn.jsdelivr.net/gh/MEHDI-Gi/dizad_road_test_assets@main/assets';
        return {
            id,
            label: signItem.label ?? 'undefined',
            img: `${imageBase}/${signFolder.folder}/${signItem.img}.png`,
        };
    }, [lessonsData]);

    // ✅ EXACT same as questions!
    const signsContent = useMemo(() => {
        const BOOKMARKS_SIGNS = bookmarks?.signs || {};
        const signsKeys = Object.keys(BOOKMARKS_SIGNS);

        if (!signsKeys.length) return [];

        return signsKeys
            .map((id: string) => {
                // 1. Get timestamp from bookmarks
                const bookmarkData = BOOKMARKS_SIGNS[id];

                // 2. Reconstruct full item from ID
                const fullItem = findSignById(lessonsData, id);

                // 3. MERGE timestamp
                return {
                    ...fullItem,
                    timestamp: bookmarkData?.timestamp || 0  // ✅ From bookmarks!
                };
            })
            .filter(Boolean)
            .sort((a: any, b: any) => b.timestamp - a.timestamp);  // ✅ Sort newest first
    }, [bookmarks?.signs, lessonsData, findSignById]);

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: colors.primary,
        }}>

            <ScrollView
                horizontal={false}
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1, width: '95%',
                    paddingVertical: 50,

                }}
                contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: "center",
                    alignContent: "center",
                }}>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {signsContent?.map((item, index) => {
                        return (
                            <Pressable
                                key={`${item.id}+${index}`}
                                android_ripple={{ color: colors.primary, borderless: false, foreground: true }}
                                onPress={() => { }}
                                style={[
                                    {
                                        width: bookmarksSizes.signs.width,
                                        height: bookmarksSizes.signs.height,
                                        borderRadius: 8,
                                        margin: 5,
                                        flexDirection: 'column',
                                        backgroundColor: colors.secondary,
                                        overflow: 'hidden',
                                        opacity: 1,
                                        elevation: 5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    },

                                ]}
                            >
                                <View
                                    style={[{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        // backgroundColor: colors.primary,
                                        width: '90%',
                                        height: '90%',
                                        overflow: 'hidden',
                                        borderRadius: 5,
                                    }]}>

                                    {item?.img ?

                                        <Image
                                            style={{
                                                width: '80%',
                                                height: '80%',

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
                            </Pressable>
                        )
                    })}
                </View>
            </ScrollView>

        </View>
    )
}
function BookmarkedQuestions({ bookmarks, lessonsData, colors }: any) {

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

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: colors.primary,

        }}>
            <ScrollView
                contentContainerStyle={{
                    rowGap: 10,
                    alignItems: 'center',
                }}
                style={{
                    flex: 1,
                    width: '100%',
                    paddingVertical: 50,
                }}>
                {bookmarkedQuestions.map((item: any) => (
                    <Pressable
                        key={item.id}
                        style={{
                            backgroundColor: colors.secondary,
                            padding: 15,
                            width: '90%',
                            flexDirection: 'row-reverse',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            borderRadius: 8,
                            elevation: 3,
                        }}
                    >
                        <Text style={{
                            fontFamily: "Cairo",
                            color: colors.text.primary,
                            fontSize: 18,
                            textAlign: 'right',
                        }}>
                            {item.label}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    )
}
function BookmarkedPriority({ bookmarksSizes, bookmarks, lessonsData, colors }: any) {
    const BOOKMARKS_PRIORITY = bookmarks?.priority || {};
    const priorityKeys = Object.keys(BOOKMARKS_PRIORITY); // ["1765961113348"]
    const BOOKMARKS_PRIORITY_LENGTH = priorityKeys.length;

    const findPriorityById = useCallback((data: any, id: string) => {
        // Parse: "signs-0-3" → folder 0, item 3
        const match = id.match(/priority-(\d+)-(\d+)/);
        if (!match) return null;

        const [, folderIdx, itemIdx] = match;
        const folder = parseInt(folderIdx);
        const itemIndex = parseInt(itemIdx);

        const priorityFolder = lessonsData?.content?.priority?.content?.[folder];
        const priorityItem = priorityFolder?.items?.[itemIndex];

        if (!priorityItem) return null;

        const imageBase = 'https://cdn.jsdelivr.net/gh/MEHDI-Gi/dizad_road_test_assets@main/assets/priority';
        return {
            id,
            label: priorityItem.label ?? 'undefined',
            img: `${imageBase}/${priorityFolder.folder}/${priorityItem.img}.jpg`,
        };
    }, [lessonsData]);

    // ✅ EXACT same as questions!
    const priorityContent = useMemo(() => {
        const BOOKMARKS_PRIORITY = bookmarks?.priority || {};
        const priorityKeys = Object.keys(BOOKMARKS_PRIORITY);

        if (!priorityKeys.length) return [];

        return priorityKeys
            .map((id: string) => {
                // 1. Get timestamp from bookmarks
                const bookmarkData = BOOKMARKS_PRIORITY[id];

                // 2. Reconstruct full item from ID
                const fullItem = findPriorityById(lessonsData, id);

                // 3. MERGE timestamp
                return {
                    ...fullItem,
                    timestamp: bookmarkData?.timestamp || 0  // ✅ From bookmarks!
                };
            })
            .filter(Boolean)
            .sort((a: any, b: any) => b.timestamp - a.timestamp);  // ✅ Sort newest first
    }, [bookmarks?.priority, lessonsData, findPriorityById]);

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: colors.primary,
        }}>

            <ScrollView
                horizontal={false}
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1, width: '95%',
                    paddingVertical: 50,

                }}
                contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: "center",
                    alignContent: "center",
                }}>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10
                }}>
                    {priorityContent?.map((item, index) => {
                        return (
                            <Pressable
                                key={item.id}
                                android_ripple={{
                                    foreground: true,
                                    color: colors.primary,
                                    borderless: false
                                }}
                                onPress={() => {
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
                                    },
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
                                            style={{ width: '90%', height: '90%', borderRadius: 5, }}
                                            shimmerColors={colors.shimmer.first}
                                        />

                                    }
                                </View>
                            </Pressable>
                        )
                    })}
                </View>
            </ScrollView>

        </View>
    )
}
export default function Bookmarks() {

    const { lessons, screen, bookmarksSizes } = useSize();
    const {
        colors,
        lessonsData,

        bookmarks,
    } = useContext(DataContext);

    return (
        <SubTab.Navigator
            tabBar={(props) => <BookmarksTab {...props} />}
            initialRouteName="Bookmarks_Signs"
            tabBarPosition="top"
        >
            <SubTab.Screen name="Bookmarks_Signs" >
                {() => <BookmarkedSigns bookmarksSizes={bookmarksSizes} bookmarks={bookmarks} lessonsData={lessonsData} colors={colors} />}

            </SubTab.Screen>
            <SubTab.Screen name="Bookmarks_Questions">
                {() => <BookmarkedQuestions bookmarks={bookmarks} lessonsData={lessonsData} colors={colors} />}
            </SubTab.Screen>
            <SubTab.Screen name="Bookmarks_Priority" >
                {() => <BookmarkedPriority bookmarks={bookmarks} lessonsData={lessonsData} colors={colors} />}

            </SubTab.Screen>
        </SubTab.Navigator>
    );
};





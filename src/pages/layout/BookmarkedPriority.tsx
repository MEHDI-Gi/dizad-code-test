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

export default function BookmarkedPriority() {

    const { lessons, screen, bookmarksSizes,
        fullScreen,
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


    const [priorityModal, setPriorityModal] = useState<boolean>(false)
    const [fullImage, setFullImage] = useState<boolean>(false)
    const [selectedPriority, setSelectedPriority] = useState<number>(0);
    const [hiddenLabel, setHiddenLabel] = useState<any>([])
    const [currentScrollIndex, setCurrentScrollIndex] = useState<number>(0);
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
    const progress = priorityContent.length > 0 ? (currentScrollIndex / priorityContent.length) * 100 : 0;

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
                    flex: 1,
                    width: '95%',


                }}
                contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: "flex-start",
                    alignContent: "center",
                    paddingTop: sizeScale(50),
                    paddingBottom: sizeScale(120),
                }}>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: sizeScale(10),

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
                                    if (!userVip && index > 9) {
                                        setUpgradeWarn(true)
                                    } else {
                                        setCurrentScrollIndex(index + 1)
                                        setSelectedPriority(index);   // remember which Sx was tapped
                                        setPriorityModal(true);
                                    }
                                }}
                                style={[
                                    {
                                        width: widthScale(screen.width * 0.85),
                                        height: heightScale(screen.width * 0.28),
                                        borderRadius: sizeScale(10),
                                        flexDirection: 'column',
                                        backgroundColor: colors.secondary,
                                        alignSelf: 'flex-start',
                                        overflow: 'hidden',
                                        opacity: 1,
                                        elevation: 5,
                                    },
                                ]}
                            >
                                <View
                                    style={[{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        height: '100%',
                                        overflow: 'hidden',
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
                        data={priorityContent}
                        onMomentumScrollEnd={(event) => {
                            const scrollX = event.nativeEvent.contentOffset.x;
                            const index = Math.round(scrollX / screen.width * 1);
                            setCurrentScrollIndex(index + 1);
                        }}
                        onViewableItemsChanged={handleViewableItemsChanged}
                        viewabilityConfig={viewabilityConfig}
                        horizontal
                        snapToInterval={screen.width * 1}
                        decelerationRate="fast"
                        initialScrollIndex={selectedPriority}
                        getItemLayout={(data, index) => ({
                            length: screen.width * 1,
                            offset: screen.width * 1 * index,
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

                                        {/* <Pressable
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
                                            onPress={() => 
                                                handleBookmark('priority', {
                                                id: item.id ?? `priority-${priorityItemsIndex}-${index}`,
                                            })
                                        }
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
                                        </Pressable> */}
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

        </View>
    )
}
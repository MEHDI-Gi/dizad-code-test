import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Pressable, Image, StatusBar, ActivityIndicator, DrawerLayoutAndroid, Dimensions, FlatList, Modal, ListRenderItemInfo } from 'react-native';
import { LinearGradient } from "react-native-linear-gradient";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

import { useSize } from "../../hooks/useSize";
import { DataContext } from "../../context/contextData";
import { useColors } from "../../hooks/useColors";
import { useVip } from "../../hooks/useVip";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function BookmarkedSigns() {
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


    const BOOKMARKS_SIGNS = bookmarks?.signs || {};
    const signsKeys = Object.keys(BOOKMARKS_SIGNS); // ["1765961113348"]
    const BOOKMARKS_SIGNS_LENGTH = signsKeys.length;
    const [openSignsModal, setOpenSignsModal] = useState<boolean>(false)
    const [selectedSign, setSelectedSign] = useState<number>(0);
    const [currentScrollIndex, setCurrentScrollIndex] = useState<number>(0);
    const ITEM_WIDTH = screen.width * 1     // visible card width
    interface ViewToken {
        item: any;
        isViewable: boolean;
    }
    // 2. Use it in your callback
    const handleViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        viewableItems.forEach((viewToken) => {
            if (viewToken.isViewable && viewToken.item) {
                incrementView('signs', viewToken.item);
            }
        });
    }, [incrementView]);

    // 3. Define the config (Required to be a ref in RN to avoid crashes)
    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
        minimumViewTime: 100,           // Must stay visible for 0.5s
    }).current;
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
    const progress = signsContent.length > 0 ? (currentScrollIndex / signsContent.length) * 100 : 0;

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

                }}
                contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: "center",
                    alignContent: "center",
                    paddingTop: sizeScale(50),
                    paddingBottom: sizeScale(120),
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
                                onPress={() => {
                                    if (!userVip && index > 9) {
                                        setUpgradeWarn(true)
                                    } else {
                                        setCurrentScrollIndex(index + 1)
                                        setSelectedSign(index);   // remember which Sx was tapped
                                        setOpenSignsModal(true);
                                        // const timer = setTimeout(() => {
                                        //   ad.isLoaded && ad.show()
                                        // }, 2000);
                                        // return () => clearTimeout(timer);
                                    }
                                }}
                                style={[
                                    {
                                        width: bookmarksSizes.signs.width,
                                        height: bookmarksSizes.signs.height,
                                        borderRadius: 8,
                                        margin: sizeScale(5),
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
                                            resizeMode='contain'
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
            <Modal
                visible={openSignsModal}
                onRequestClose={() => setOpenSignsModal(false)}
                transparent
                animationType="slide">
                <View style={{
                    flex: 1,
                    alignItems: 'center', justifyContent: 'center',

                }} >
                    <View style={{
                        backgroundColor: 'transparent',
                        width: "100%", height: 3, flexDirection: 'row'
                    }}>
                        <View style={{ height: "100%", backgroundColor: colors.button.secondary, width: `${progress}%`, }}></View>
                    </View>
                    {/* INLINE FlatList - NO renderItem prop */}
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={signsContent}
                        onMomentumScrollEnd={(event) => {
                            const scrollX = event.nativeEvent.contentOffset.x;
                            const index = Math.round(scrollX / ITEM_WIDTH);
                            setCurrentScrollIndex(index + 1);  // ✅ Tracks swipe
                        }}
                        onViewableItemsChanged={handleViewableItemsChanged}
                        viewabilityConfig={viewabilityConfig}
                        horizontal
                        // keyExtractor={(item) => item.id.toString()}
                        snapToInterval={ITEM_WIDTH}
                        decelerationRate="fast"
                        initialScrollIndex={selectedSign}
                        getItemLayout={(data, index) => ({
                            length: ITEM_WIDTH,
                            offset: ITEM_WIDTH * index,
                            index
                        })}
                        keyExtractor={(item, idx) => `item-${idx}`}
                        renderItem={({ item, index }: ListRenderItemInfo<any>) => (
                            <View style={{
                                width: screen.width, alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Pressable
                                    android_ripple={{ borderless: false, color: colors.primary, foreground: true }}
                                    style={{
                                        zIndex: 1,
                                        backgroundColor: colors.secondary,
                                        width: widthScale(30),
                                        height: heightScale(30),
                                        borderRadius: sizeScale(8),
                                        top: sizeScale(8),
                                        right: sizeScale(8),
                                        position: 'absolute',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        opacity: 0.8
                                    }}
                                    onPress={() => {
                                        // setQuestionsItemsIndex(index);
                                        setOpenSignsModal(false)
                                    }} >
                                    <MaterialIcons
                                        name='close'
                                        color={colors.text.primary}
                                        size={sizeScale(20)}
                                    />
                                </Pressable>
                                <View style={{
                                    width: "100%",
                                    flex: 1,
                                    backgroundColor: colors.primary,
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    padding: sizeScale(10),

                                }}>
                                    {/* IMAGE */}

                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: widthScale(screen.width * 0.9),
                                        height: heightScale(screen.width * 0.9),
                                        overflow: 'hidden',
                                        borderRadius: sizeScale(5),

                                    }}>
                                        {item?.img ? (
                                            <Image
                                                resizeMode='contain'
                                                style={
                                                    [{ width: '70%', height: '70%' }]
                                                } source={{ uri: item.img }} />
                                        ) : (
                                            <ShimmerPlaceHolder
                                                style={{ width: "100%", height: '100%' }}
                                                shimmerColors={[colors.secondary, '#6161617c', colors.secondary]}
                                            />
                                        )}
                                    </View>
                                    {/* TEXT */}
                                    <View style={{
                                        width: '100%',
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        overflow: 'hidden',
                                    }}>
                                        <ScrollView
                                            style={{
                                                width: '100%',
                                                flex: 1,
                                                paddingHorizontal: sizeScale(15),
                                            }}
                                            contentContainerStyle={{
                                                gap: sizeScale(15),
                                                paddingVertical: 0,  // Add top/bottom padding
                                                justifyContent: 'flex-start',
                                                alignItems: 'center',
                                            }}
                                            showsVerticalScrollIndicator={false}
                                        >
                                            {item?.label ? (
                                                <Text style={{
                                                    textAlign: 'center',
                                                    fontFamily: 'Cairo-Bold',
                                                    color: colors.text.primary,
                                                    fontSize: sizeScale(18),

                                                }}>
                                                    {item.label}
                                                </Text>
                                            ) : (
                                                <ShimmerPlaceHolder
                                                    style={{ width: "60%", height: heightScale(25), marginBottom: sizeScale(10) }}
                                                    shimmerColors={colors.shimmer.first}
                                                />
                                            )}

                                            {item?.description && (
                                                <Text

                                                    style={{
                                                        textAlign: 'center',
                                                        fontFamily: 'Cairo',
                                                        color: colors.text.secondary,
                                                        fontSize: sizeScale(18),

                                                    }}>
                                                    {item.description}
                                                </Text>
                                            )}

                                        </ScrollView>
                                        {item?.description?.split('\n').join(' ').split(' ').length > 25 && (
                                            <View style={{
                                                alignItems: 'flex-start',
                                                justifyContent: 'center',
                                                width: "89%",
                                                position: "absolute",
                                                bottom: 0,
                                                zIndex: 1,
                                                // backgroundColor: 'blue'
                                            }}>

                                                <MaterialCommunityIcons
                                                    style={{
                                                        backgroundColor: colors.secondary,
                                                        borderRadius: sizeScale(50)
                                                    }}
                                                    name='chevron-down'
                                                    color="white"
                                                    size={sizeScale(30)}
                                                />
                                            </View>
                                        )}

                                    </View>

                                    {/* BOOKMARK */}
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        flexDirection: 'row',
                                        width: "100%",
                                        height: heightScale(70),
                                        paddingHorizontal: sizeScale(10),
                                        gap: sizeScale(8),
                                    }}>
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
                                            onPress={() =>
                                                  handleBookmark('signs', {
                                                 id: item.id ?? `signs-${signsItemsIndex}-${index}`,
                                             })
                                        }
                                        >
                                           {bookmarkLoading ?
                                                (
                                                    <ActivityIndicator size={'small'} color={colors.text.primary} />
                                                ) :
                                                (
                                                    <MaterialCommunityIcons size={sizeScale(25)} color={colors.text.primary} name={
                                                        !isBookmarked('signs', { id: item.id ?? `signs-${signsItemsIndex}-${index}` }) ?
                                                            'bookmark-outline' : 'bookmark'} />
                                                )
                                            } 
                                    </Pressable>  */}
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </Modal >

        </View >
    )
}
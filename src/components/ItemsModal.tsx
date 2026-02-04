import {
    BackHandler,
    Text,
    View,
    StyleSheet,
    Image,
    StatusBar,
    ActivityIndicator,
    Pressable,
    Vibration,
    ScrollView,
    FlatList,
    Animated,
    Dimensions,
    ListRenderItemInfo,
    Modal,
} from 'react-native';
import { DataContext } from '../context/contextData';
import { TextInput, Button, IconButton, MD3Colors, Icon, Appbar, RadioButton, ProgressBar, Snackbar, Surface, Dialog, Portal, PaperProvider } from 'react-native-paper';
import React, { useRef, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';


import type { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSize } from '../hooks/useSize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { ColorSpace } from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { firebase } from '@react-native-firebase/auth';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);


export default function ItemsModal(props: any) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { lessons, screen } = useSize();

    const {
        colors,
        sound, playSound,
        isGradient,
        signsItemsIndex,
        lessonsData,
        toggleBookmark,
        isBookmarked,
        bookmarkLoading

    } = useContext(DataContext);

    const handleBookmark = useCallback((category: string, item: any) => {
        toggleBookmark(category, item);
    }, [toggleBookmark]);

    if (!props.visible) {
        return null;
    }
    return (
        <Modal
            visible={props.visible}
            onRequestClose={() => props.onRequestClose}
            transparent
            animationType="slide">
            {props.blur && <BlurView
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
                blurType='dark'
                blurRadius={3}
            />}
            {/* <Pressable
                style={{
                    width: '100%', height: '100%',
                    top: 0,
                    position: 'absolute',
                }}
                onPress={() => setOpenItems(false)} /> */}
            <View style={{
                flex: 1,
                alignItems: 'center', justifyContent: 'center',

            }} >
                <View style={{
                    position: "absolute",
                    top: 0,
                    backgroundColor: 'transparent',
                    width: "100%", height: 3, flexDirection: 'row'
                }}>
                    <View style={{ height: "100%", backgroundColor: colors.button.secondary, width: `${props.progress}%`, }}></View>
                </View>
                <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }} />
                {/* INLINE FlatList - NO renderItem prop */}
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={props.data}
                    onMomentumScrollEnd={props.onMomentumScrollEnd}
                    horizontal
                    // keyExtractor={(item) => item.id.toString()}
                    snapToInterval={props.snapToInterval}
                    decelerationRate="fast"
                    initialScrollIndex={props.initialScrollIndex}
                    getItemLayout={props.getItemLayout}
                    keyExtractor={(item, idx) => `item-${idx}`}
                    renderItem={({ item, index }: ListRenderItemInfo<any>) => {
                        if (props.isQuestModal) {
                            return (
                                <View style={{
                                    width: props.ContainerContentWidth,
                                    alignItems: 'center', justifyContent: 'center',

                                }}>
                                    <View style={{
                                        width: props.contentW,
                                        height: props.contentH,
                                        backgroundColor: props.itemsBackColor,
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
                                                borderRadius: 50,
                                                top: 8,
                                                right: 8,
                                                position: 'absolute',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                overflow: 'hidden',
                                                opacity: 0.8
                                            }}
                                            onPress={props.closeTopPress} >
                                            <MaterialIcons
                                                name='close'
                                                color={colors.text.primary}
                                                size={20}
                                            />
                                        </Pressable>
                                        <View style={{
                                            width: props.imgViewW,
                                            height: props.imgViewH,
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}>
                                            {item?.cover ? (
                                                <Image
                                                    style={{
                                                        width: props.imgW,
                                                        height: props.imgH,
                                                    }}
                                                    resizeMode="stretch"
                                                    source={{ uri: props.imgUri(item) }}
                                                />
                                            ) : null}

                                            {/* LABEL OVERLAY */}
                                            {props.title(item) && (
                                                <View style={{
                                                    position: 'absolute',
                                                    bottom: 0, left: 0, right: 0,
                                                    padding: 15
                                                }}>
                                                    <View style={{
                                                        position: 'absolute',
                                                        bottom: 0,                 // <- ADD THIS  
                                                        left: 0,                   // <- ADD THIS
                                                        right: 0,
                                                        top: 0,
                                                        backgroundColor: colors.primary,
                                                        opacity: 0.93
                                                    }} />
                                                    <Text style={{
                                                        fontFamily: 'Cairo',
                                                        color: colors.text.primary,
                                                        fontSize: 16,
                                                        textAlign: 'center'
                                                    }}>
                                                        {props.title(item)}
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

                                            {props.answers(item).map((item: any, index: number) => (
                                                <Text
                                                    key={index}
                                                    style={{
                                                        fontFamily: 'Cairo',
                                                        color: colors.text.secondary,
                                                        fontSize: 16,
                                                        textAlign: 'right',
                                                        alignSelf: 'flex-end',
                                                        padding: 5,
                                                        backgroundColor: colors.primary,

                                                    }}>
                                                    - {props.item(item)}
                                                </Text>
                                            ))
                                            }
                                            {props?.warn(item).map((item: any, index: number) => (
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
                                                    {props.item(item)}
                                                </Text>
                                            ))
                                            }

                                        </ScrollView>

                                        <View style={{
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            flexDirection: 'row',
                                            width: "100%",
                                            height: 70,
                                            paddingHorizontal: 10,
                                            gap: 5
                                            // backgroundColor: 'blue'
                                        }}>
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
                                                onPress={() => { }}
                                            >

                                                <MaterialIcons size={30} color={colors.text.primary} name='report-gmailerrorred' />

                                            </Pressable>
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
                                                onPress={() => { }}
                                            >

                                                <MaterialCommunityIcons
                                                    size={30}
                                                    color={colors.text.primary}
                                                    name='pin-outline' />

                                            </Pressable>
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
                                                onPress={() => handleBookmark(props.bookmarkCate, {
                                                    id: item.id ?? `${props.bookmarkId}${index}`,

                                                })}
                                            >
                                                {!isBookmarked(props.bookmarkCate, { id: props.item(item).id ?? `${props.bookmarkId}${index}` })
                                                    ? (
                                                        <MaterialCommunityIcons size={30} color={colors.text.primary} name='bookmark-outline' />
                                                    ) : (
                                                        <MaterialCommunityIcons size={30} color={colors.text.primary} name='bookmark' />
                                                    )}
                                            </Pressable>

                                        </View>
                                    </View>
                                </View>
                            )
                        }
                        return (
                            <View style={{ width: props.ContainerContentWidth, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{
                                    width: props.contentW,
                                    height: props.contentH,
                                    backgroundColor: props.itemsBackColor,
                                    borderRadius: props.itemsBorderR,
                                    elevation: 5,
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    overflow: 'hidden'
                                }}>
                                    {props.closeTop && <Pressable
                                        android_ripple={{ borderless: false, color: colors.primary, foreground: true }}
                                        style={{
                                            zIndex: 1,
                                            backgroundColor: colors.secondary,
                                            width: 30,
                                            height: 30,
                                            borderRadius: 50,
                                            top: 8,
                                            right: 8,
                                            position: 'absolute',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden',
                                            opacity: 0.8
                                        }}
                                        onPress={props.closeTopPress} >
                                        <MaterialIcons
                                            name='close'
                                            color={colors.text.primary}
                                            size={20}
                                        />
                                    </Pressable>}
                                    {/* IMAGE */}
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',

                                        width: props.imgContainerW,
                                        height: props.imgContainerH,
                                    }}>
                                        <View style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: props.imgViewBackColor,
                                            width: props.imgViewW,
                                            height: props.imgViewH,
                                            overflow: 'hidden',
                                            borderRadius: 5,
                                        }}>
                                            {item?.img ? (
                                                <Image style={
                                                    [{
                                                        width: props.imgW,
                                                        height: props.imgH,
                                                    }]
                                                } source={{ uri: props.imgUri(item) }} />
                                            ) : (
                                                <ShimmerPlaceHolder
                                                    style={{ width: "100%", height: '100%' }}
                                                    shimmerColors={[colors.secondary, '#6161617c', colors.secondary]}
                                                />
                                            )}
                                        </View>
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
                                                paddingHorizontal: 15,
                                            }}
                                            contentContainerStyle={{
                                                gap: 15,
                                                paddingVertical: 0,  // Add top/bottom padding
                                                justifyContent: 'flex-start',
                                                alignItems: 'center',
                                            }}
                                            showsVerticalScrollIndicator={false}
                                        >
                                            {props.title(item) ? (
                                                <Text style={{
                                                    textAlign: 'center',
                                                    fontFamily: 'Cairo',
                                                    color: colors.text.primary,
                                                    fontSize: 16,

                                                }}>
                                                    {props.title(item)}
                                                </Text>
                                            ) : (
                                                <ShimmerPlaceHolder
                                                    style={{ width: "60%", height: 25, marginBottom: 10 }}
                                                    shimmerColors={colors.shimmer.first}
                                                />
                                            )}

                                            {props.description(item) && (
                                                <Text

                                                    style={{
                                                        textAlign: 'center',
                                                        fontFamily: 'Cairo',
                                                        color: colors.text.secondary,
                                                        fontSize: 16,

                                                    }}>
                                                    {props.description(item)}
                                                </Text>
                                            )}

                                        </ScrollView>
                                        {/* {item?.description?.split('\n').join(' ').split(' ').length > 25 && (
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
                                                        borderRadius: 50
                                                    }}
                                                    name='chevron-down'
                                                    color="white"
                                                    size={30}
                                                />
                                            </View>
                                        )} */}

                                    </View>

                                    {/* BOOKMARK */}
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        flexDirection: 'row',
                                        width: "100%",
                                        height: 70,
                                        paddingHorizontal: 10,
                                        gap: 8,
                                        // backgroundColor: 'blue'
                                    }}>
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
                                            onPress={() => { }}
                                        >

                                            <MaterialIcons size={25} color={colors.text.primary} name='report-gmailerrorred' />

                                        </Pressable>
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
                                            onPress={() => handleBookmark(props.bookmarkCate, {
                                                id: item.id ?? `${props.bookmarkId}${index}`,
                                            })}

                                        >
                                            {bookmarkLoading ?
                                                (
                                                    <ActivityIndicator size={'small'} color={colors.text.primary} />
                                                ) :
                                                (
                                                    <MaterialCommunityIcons size={25} color={colors.text.primary} name={
                                                        !isBookmarked(props.bookmarkCate, { id: props.item(item).id ?? `${props.bookmarkId}${signsItemsIndex}-${index}` }) ?
                                                            'bookmark-outline' : 'bookmark'} />
                                                )
                                            }
                                        </Pressable>
                                    </View>



                                </View>
                            </View>
                        )
                    }}
                />
                <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Pressable
                        android_ripple={{ color: colors.secondary, borderless: true, foreground: true }}
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: 40,
                            height: 40,
                            borderRadius: 50,
                            overflow: 'hidden',
                            marginHorizontal: 15,
                        }}
                        onPress={props.closeModalPress}>
                        {/* <MaterialIcons name='close' color={colors.text.secondary} size={35} /> */}
                    </Pressable>
                </View>
            </View>
        </Modal>

    )
}

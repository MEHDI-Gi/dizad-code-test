import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Pressable, Image, StatusBar, ActivityIndicator, DrawerLayoutAndroid, Dimensions } from 'react-native';
import { TextInput, Button, IconButton, MD3Colors, Icon, Appbar, overlay } from 'react-native-paper';
import { DataContext } from '../context/contextData.tsx';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import LinearGradient from 'react-native-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types.ts';

import { useSize } from '../context/useSize.ts';
import { useGoogleSignIn } from '../context/auth';
import BottomTab from '../components/elements/BottomTab.tsx';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function Signs() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const { user, logout, initializing } = useGoogleSignIn();
    const { lessons, screen } = useSize();
    const {
        lessonsData,
        setSignsItemsIndex,
        colors,
        sound, playSound, isGradient,
        isRewardAdd, setIsRewardAdd,
    } = useContext(DataContext);



    const SIGNS_CONTENT = lessonsData?.content?.signs?.content || [];
    const SIGNS_CONTENT_LENGTH = SIGNS_CONTENT.length; // Direct .length now!
    const title = lessonsData?.content?.signs?.label ?? 'إشارات المرور';

    // ✅ Get actual array, not object keys

    const SignsContent = SIGNS_CONTENT.map((folder: any, folderIndex: any) => ({
        id: folderIndex,
        label: folder.label ?? 'إشارات المرور',
        condition: `category ${folderIndex}`,
        img: folder.img ?
            `https://cdn.jsdelivr.net/gh/MEHDI-Gi/dizad_road_test_assets@main/assets/${folder.folder}/${folder.img}.png` :
            '',
        items: folder.items || [] // Include items for nested lists
    }));


    const LessonsContentPress = (item: any) => {
        const match = item.condition.match(/category (\d+)/);
        if (match) {
            const categoryNumber = parseInt(match[1], 10);
            setSignsItemsIndex(categoryNumber);
            navigation.navigate('SignsItems');
            if (sound) {
                playSound('levelsButton')
            }
        }
    };

    if (initializing || !lessonsData) {
        return (
            <View style={[{ flex: 1, alignItems: "center", justifyContent: 'center', backgroundColor: colors.primary }]}>
                <ActivityIndicator size={30} />
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
                                    style={[
                                        {
                                            width: lessons.category.width,
                                            height: lessons.category.height,
                                            borderRadius: 8,
                                            flexDirection: 'column',
                                            backgroundColor: colors.secondary,
                                            overflow: 'hidden',
                                            elevation: 5,
                                        },

                                    ]}
                                >

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
                                            paddingLeft: 5,
                                            paddingHorizontal: 10,
                                        }]}>
                                        {/* <Text style={{ fontFamily: "Cairo_700Bold", color: colors.priText, fontSize: 16, }}>
                      {texts.level} {index + 1}
                    </Text> */}
                                        <Text style={{ fontFamily: "Cairo", color: colors.text.primary, fontSize: 16, }}>
                                            {item.label}
                                            {/* {Object.keys(SignsContentInfo[index + 1].label)} */}
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
            {isRewardAdd &&
                <View style={{
                    position: 'absolute',
                    backgroundColor: '#63606037',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={{
                        position: 'absolute',
                        width: '80%',
                        height: '50%',
                        borderRadius: 18,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        overflow: 'hidden',
                    }}>
                        <View style={{
                            position: 'absolute',
                            backgroundColor: colors.primary,
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}></View>
                        <View style={{
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 15
                        }}>
                            <TouchableOpacity onPress={() => { setIsRewardAdd(false) }} style={{ position: 'absolute', left: 0, paddingHorizontal: 15 }}>
                                <MaterialCommunityIcons name='close' size={25} color={colors.secText} />
                            </TouchableOpacity>
                            <Text style={{ color: colors.text.primary, fontWeight: 'bold', fontSize: 17, }}>Reward</Text>
                        </View>

                        <View style={{
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 20
                        }}>
                            <MaterialCommunityIcons name='gift-open' color={colors.text.primary} size={60} />
                            <Text style={{ color: colors.text.primary, fontFamily: 'Cairo_600SemiBold', fontSize: 15, }}>تهانينا</Text>
                        </View>
                        <View style={{
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',

                        }}>
                            <AntDesign name='heart' size={15} color={'red'} style={{ marginHorizontal: 0 }} />
                            <Text style={{ marginHorizontal: 5, color: colors.text.primary, fontSize: 15, fontWeight: 'bold' }}>1</Text>
                            <Text style={{ marginHorizontal: 5, color: colors.text.primary, fontFamily: 'Cairo_700Bold', fontSize: 15, }}>لقد حصلت على</Text>
                        </View>
                        <View style={{
                            padding: 20,
                            width: "100%",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <TouchableOpacity style={{
                                backgroundColor: 'green',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '60%',
                                paddingVertical: 3,
                                borderRadius: 5,
                            }}
                                onPress={() => { setIsRewardAdd(false) }}>
                                <Text style={{ color: colors.text.primary, fontWeight: 'bold', fontSize: 17, }}>continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>}
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

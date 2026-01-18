import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, ProgressBarAndroidBase, View, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Pressable, Image, StatusBar, DrawerLayoutAndroid, ProgressBarAndroid } from 'react-native';
import { TextInput, Button, IconButton, MD3Colors, Avatar, Icon, Appbar, } from 'react-native-paper';
import { DataContext } from '../context/contextData.tsx';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CategoriesList from './home/CategoriesList.tsx';
import Statistics from './home/Statistics.tsx';
import { useGoogleSignIn } from '../context/auth.ts';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    withSpring
} from 'react-native-reanimated';
import VipBadge from '../components/elements/VipBadge.tsx';
import HeartBadge from '../components/elements/FreeBadge.tsx';

import { CompositeNavigationProp, NavigatorScreenParams, useNavigation, useNavigationState, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types.ts';
import FreeBadge from '../components/elements/FreeBadge.tsx';
import { useSize } from '../context/useSize.ts';
import { BlurView } from '@react-native-community/blur';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import FreeCard from '../components/FreeCard.tsx';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function Home() {
    type RootStackParamList = {
        MainTabs: NavigatorScreenParams<any>;
    };
    const { screen, lessons } = useSize()
    const { user, initializing } = useGoogleSignIn();


    const {
        userXp,
        setHeartsCard,
        quizData,
        colors,
        userName,
        userImage,
        helpPoint,
        livesHeart,
        isRewardAdd,
        setIsRewardAdd,
        sound,
        playSound,
        isGradient,
        texts, currentTheme, setLoadScreen,
        userVip,
        userOnline,
        setUserOnline,
        lessonsData,
        examsData,
        questionsItemsIndex,
        examData,
        freeCard,
        vipCard,
    } = useContext(DataContext);


    const navigation = useNavigation<any>();

    const QUESTIONS_CURRENT_LABEL = lessonsData?.content?.questions?.content[questionsItemsIndex]?.label;
    const imageBase = 'https://cdn.jsdelivr.net/gh/MEHDI-Gi/dizad_road_test_assets@main/assets';
    const questCover = `${imageBase}/cover/qst.png`
    const examsCover = `${imageBase}/cover/exm.png`
    const priorityCover = `${imageBase}/cover/prio.png`
    const signsCover = `${imageBase}/cover/sgn.png`


    // `${imageBase}/cover/${item.cover}.png`
    let totalSgn = 0;
    (lessonsData?.content?.signs?.content || []).forEach((current: { items: any; }) => {
        totalSgn += Object.keys(current?.items || {}).length;
    });
    const totalQst = Object.keys(lessonsData?.content?.questions?.content || {}).length;
    const totalPri = Object.keys(lessonsData?.content?.priority?.content?.items || {}).length;
    const totalExm = Object.keys(examData?.content?.items || {}).length;

    const contentItems = [
        { cond: 'Exm', label: "إمتحان", img: examsCover ?? null, sub: "", length: totalExm },
        { cond: 'Sgn', label: 'إشارات', img: signsCover ?? null, sub: "", length: totalSgn },
        { cond: 'Pri', label: 'أولوية', img: priorityCover ?? null, sub: '', length: totalPri },
        { cond: 'Qst', label: 'أسئلة', img: questCover ?? null, sub: "", length: totalQst },
    ]
    const contentItemsPress = (item: any) => {
        switch (item.cond) {
            case 'Exm':
                navigation.navigate('MainTabs', { screen: 'Exams' });
                break;
            case 'Sgn':
                navigation.navigate('MainTabs', { screen: 'Lessons', params: { screen: 'Signs', initial: false } });

                break;
            case 'Pri':
                navigation.navigate('MainTabs', { screen: 'Lessons', params: { screen: 'Priority', initial: false } });

                break;
            case 'Qst':
                navigation.navigate('MainTabs', { screen: 'Lessons', params: { screen: 'Questions', initial: false } });
                break;
            default:
                break;
        }
    }
    const youtubeChanels = [
        { label: "", img: examsCover ?? null, sub: '', },
        { label: '', img: examsCover ?? null, sub: '', },
        { label: '', img: questCover ?? null, sub: '', },
        { label: '', img: questCover ?? null, sub: '', },
    ]






    // if (initializing) {
    //     return (
    //         <View style={[{ flex: 1, alignItems: "center", justifyContent: 'center', backgroundColor: colors.primary }]}>
    //             <ActivityIndicator size={30} color={'#566456'} />
    //         </View>
    //     )
    // }

    return (
        <View style={[styles.container, {
            width: screen.width,
            flex: 1,
            backgroundColor: colors.primary,
            justifyContent: "space-between",
            alignItems: "center",
        }]}>
            <FreeCard />

            <View style={[{
                zIndex: 9,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: 0,
            }]}>
                <View style={{
                    position: 'absolute',
                    bottom: 0,                 // <- ADD THIS  
                    left: 0,                   // <- ADD THIS
                    right: 0,
                    top: 0,
                    backgroundColor: colors.primary,
                    opacity: 0.9
                }} />
                <View style={[
                    {
                        paddingHorizontal: 0,
                        flexDirection: "row",
                        width: "90%",
                        height: 70,
                        justifyContent: "space-between",
                        alignItems: "center",
                        elevation: 3,
                        overflow: 'hidden'
                    }]}>
                    <View style={{
                        backgroundColor: 'transparent',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                        flexDirection: 'row',
                        columnGap: 10,
                    }}>
                        <View style={
                            {
                                width: 45,
                                height: 45,
                                borderRadius: 50,
                                overflow: 'hidden',
                                justifyContent: "center",
                                alignItems: "center",
                                borderColor: colors.text.primary,
                                borderWidth: 2,
                            }
                        }>

                            <TouchableOpacity
                                onPress={() => {
                                    if (sound) playSound('settingsButton')
                                    navigation.navigate('Profile');
                                }}>
                                {userImage ? <Image style={
                                    {
                                        width: 45,
                                        height: 45,

                                    }}
                                    source={{ uri: userImage }} /> :
                                    <MaterialIcons
                                        name='person'
                                        size={35}
                                        color={colors.text.primary}
                                    />
                                }
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            backgroundColor: 'transparent',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            height: 50,

                        }}>
                            <View style={{
                                flexDirection: 'column',
                                backgroundColor: 'transparent',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                            }}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={
                                        {
                                            fontSize: 16,
                                            fontWeight: "700",
                                            color: colors.text.primary,
                                        }}>
                                        {userName}
                                    </Text>
                                </View>
                                <Text style={{
                                    color: colors.text.secondary,
                                    fontSize: 11,
                                    fontWeight: "600",
                                    marginRight: 5
                                }}>
                                    {userXp} %</Text>
                            </View>
                        </View>
                    </View>

                    {userVip != '' ?
                        <VipBadge
                            width={28}
                            height={28}
                            title={false}
                            iconSize={15}
                            iconColor={"#dba400"}
                            radius={8}
                            backColor={'transparent'}
                            titleColor={colors.text.primary}
                            elevation={0}
                            textSize={12}
                            icon={true}
                        /> :
                        <FreeBadge
                            backColor={'transparent'}
                            elevation={0}
                        />
                    }
                </View>
            </View>
            <ScrollView
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingTop: 70,
                    paddingBottom: 70,
                    rowGap: 10,
                }}
                style={{
                    flex: 1,
                    width: "100%",
                }}>
                <Statistics />

                <View style={{
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    width: '90%',
                    flex: 1,
                    flexWrap: 'wrap',
                    gap: 10,
                }}>

                    {contentItems.map((item: any, index: number) => {
                        if (!QUESTIONS_CURRENT_LABEL) return (
                            <ShimmerPlaceHolder
                                duration={1500}
                                style={{
                                    width: index === 0 || index === 3 ? '100%' : '48%',

                                    height: 100,
                                }}
                                shimmerColors={[colors.secondary, '#6161617c', colors.secondary]}
                            />
                        )
                        return (
                            <Pressable
                                android_ripple={{
                                    borderless: false, color: colors.secondary, foreground: true
                                }
                                }
                                onPress={() => contentItemsPress(item)}
                                key={`key-${index}`}
                                style={[{
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                    width: '100%',
                                    height: screen.width * 0.25,

                                    borderRadius: 8,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    overflow: 'hidden',

                                },
                                    // item.cond === 'Qst' &&
                                    // {
                                    //     height: screen.width * 0.35,

                                    // },
                                    // item.cond === 'Exm' &&
                                    // {
                                    //     height: screen.width * 0.35,
                                    // },

                                    // item.cond === 'Sgn' && {
                                    //     height: screen.width * 0.45,
                                    //     width: screen.width * 0.35,

                                    // },
                                    // item.cond === 'Pri' && {
                                    //     height: screen.width * 0.45,
                                    //     flex: 1
                                    // }

                                ]}
                            >
                                {<View style={{
                                    position: 'absolute',
                                    left: 0,

                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 2,
                                    padding: 15,
                                }}>
                                    <MaterialCommunityIcons
                                        name='arrow-left'
                                        color={colors.text.secondary}
                                        size={20}
                                    />

                                </View>}
                                <View
                                    style={[{
                                        alignItems: 'flex-end',
                                        justifyContent: 'space-evenly',
                                        backgroundColor: 'transparent',
                                        width: '100%',
                                        height: '100%',
                                        paddingHorizontal: 10,
                                        paddingVertical: 10,
                                        flex: 1,


                                    }]}>

                                    <Text style={{ fontFamily: "Cairo-Bold", color: colors.text.primary, fontSize: 16, }}>
                                        {item.label}
                                        {/* {Object.keys(SignsContentInfo[index + 1].label)} */}
                                    </Text>
                                    <Text style={{
                                        fontFamily: "Cairo",

                                        color: colors.text.secondary,
                                        fontSize: 12,

                                    }}>
                                        {item.length} {item.sub}
                                    </Text>
                                    {item.cond === 'Exm' &&
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: 'center',
                                            alignItems: "center",


                                        }}>
                                            <View style={{
                                                width: '80%',
                                                height: 10,
                                                backgroundColor: colors.text.secondary,
                                                borderRadius: 10,
                                                flexDirection: "row-reverse",
                                                justifyContent: 'flex-start',
                                                alignItems: "center",
                                                overflow: 'hidden'
                                            }}>
                                                <View style={{
                                                    width: '50%',
                                                    height: '100%',
                                                    backgroundColor: 'green',
                                                    borderRadius: 10,
                                                    borderTopEndRadius: 0,
                                                    borderBottomRightRadius: 0,

                                                }} />

                                            </View>
                                        </View>
                                    }
                                </View>
                                <View
                                    style={[{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%',
                                        width: screen.width * 0.25,
                                        overflow: 'hidden',
                                        padding: 0,
                                        borderRadius: 0,

                                    }]}>

                                    {item?.img ?
                                        <Image
                                            style={{
                                                width: "85%",
                                                height: "85%",
                                                borderRadius: 10,
                                                resizeMode: 'cover',


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
                <View style={{
                    width: '90%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    columnGap: 5,
                }}>
                    <View style={{
                        backgroundColor: colors.text.secondary,

                        flex: 1,
                        height: 0.5
                    }} />
                    <Text style={{
                        fontFamily: 'Cairo',
                        color: colors.text.secondary,
                        fontSize: 16,
                        textAlign: 'center'
                    }}>
                        قنوات يوتوب
                    </Text>
                    <View style={{
                        backgroundColor: 'gray',
                        flex: 1,
                        height: 0.5

                    }} />
                </View>

                <View style={{
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    flexDirection: 'row',
                    width: '90%',
                    flex: 1,
                    flexWrap: 'wrap',
                    gap: 7,
                }}>

                    {youtubeChanels.map((item: any, index: number) => {
                        const QUESTIONS_CONTENT = lessonsData?.content?.questions?.content || [];
                        const QUESTIONS_CONTENT_LENGTH = QUESTIONS_CONTENT.length;

                        if (!QUESTIONS_CURRENT_LABEL) return (
                            <ShimmerPlaceHolder
                                duration={1500}
                                style={{
                                    width: index === 0 || index === 3 ? '100%' : '48%',

                                    height: 100,
                                }}
                                shimmerColors={[colors.secondary, '#6161617c', colors.secondary]}
                            />
                        )
                        return (
                            <Pressable
                                android_ripple={{
                                    borderless: false, color: colors.primary, foreground: true
                                }
                                }
                                onPress={() => { }}
                                key={`key-${index}`}
                                style={[{
                                    alignItems: 'center',
                                    backgroundColor: colors.secondary,
                                    width: '100%',
                                    borderRadius: 8,
                                    flexDirection: 'row-reverse',
                                    justifyContent: 'space-evenly',
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    overflow: 'hidden',
                                    elevation: 5,
                                },
                                item.cond === 'Exm' &&
                                {
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                    borderRightWidth: 4,
                                    borderRightColor: 'orange',
                                },
                                item.cond === 'Sgn' && {
                                    height: screen.width * 0.35,
                                    width: screen.width * 0.35,

                                },
                                item.cond === 'Pri' && {
                                    height: screen.width * 0.35,
                                    flex: 1
                                }

                                ]}>


                                <View style={{
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    flex: 1,
                                    rowGap: 5,
                                    zIndex: 2,

                                }}>
                                    <Text style={{
                                        fontFamily: 'Cairo-Bold',
                                        color: colors.text.primary,
                                        fontSize: 16,
                                        textAlign: 'center'
                                    }}>
                                        {item.label}
                                    </Text>
                                    <Text style={{
                                        fontFamily: 'Cairo',
                                        color: colors.text.primary,
                                        fontSize: 15,
                                        textAlign: 'right'
                                    }}>
                                        {item.sub}
                                    </Text>

                                </View>
                                <View style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 10,
                                    zIndex: 2,
                                    opacity: 0.5

                                }}>
                                    <MaterialCommunityIcons
                                        name='arrow-top-left'
                                        color={colors.text.primary}
                                        size={20}
                                    />

                                </View>
                            </Pressable>
                        )
                    })}


                </View>

            </ScrollView>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
    },
    header: {

    },
    profilePicArea: {

    },
    profilePicImg: {

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

import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Pressable, Image, StatusBar, ActivityIndicator, DrawerLayoutAndroid } from 'react-native';
import { TextInput, Button, IconButton, MD3Colors, Icon, Appbar } from 'react-native-paper';
import { DataContext } from '../../context/contextData';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
// import { Bones } from "react-bones/native";
import { Skeleton } from 'moti/skeleton';

export default function CategoriesList() {
    const navigation = useNavigation();
    const {
        colors,
        dataLength,
        setDataLevelIndex,
        quizData,
        questIndices,
        resetTimer,
        setTimeEndState, answerStats,
        levelsRank, setLevelsRank,
        quizCategoriesData,
        livesHeart, userVip,
        sound, playSound, isGradient, texts, language, setQuizActive,
    } = useContext(DataContext);

    const categoriesIcons = [
        require('../../assets/icons/balls-sports.png'),
        require('../../assets/icons/separation.png'),
        require('../../assets/icons/music.png'),
        require('../../assets/icons/watching-a-movie.png'),
        require('../../assets/icons/hieroglyph.png'),
        require('../../assets/icons/geography.png'),
        require('../../assets/icons/geography.png'),
        require('../../assets/icons/geography.png'),
        require('../../assets/icons/geography.png'),
    ]
    const categoriesLabel = {
        "en": [
            'Sport',
            'Politics',
            'Music',
            'Cinema',
            'History',
            'Geography',
            'Relegions',
        ],
        'ar': [
            "رياضة",
            "سياسة",
            "موسيقى",
            "سينما",
            "تاريخ",
            "جغرافيا",
            "ديانات"
        ]
    }
    const categoriesList = Array.from({ length: dataLength ? dataLength : 10 }, (_, i) => {
        const categoryNum = i + 1;
        return {
            id: categoryNum,
            label: language === "english" ? `${categoriesLabel['en'][i]}` : `${categoriesLabel['ar'][i]}`,
            condition: `category ${i + 1}`,
            img: `${categoriesIcons[i]}`,
        };
    });

    const categoriesListPress = (item) => {
        const match = item.condition.match(/category (\d+)/);
        if (match) {
            const categoryNumber = parseInt(match[1], 10);
            setDataLevelIndex(categoryNumber);
            setQuizActive(true)
            resetTimer(45);
            setTimeEndState(false)
            navigation.navigate('QuizScreen');
            if (sound) {
                playSound('levelsButton')
            }
        }
    };

    return (
        <View style={{ flex: 1, paddingTop: 5, width: '100%', }}>
            <ScrollView
                horizontal={false}
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, width: '100%', }}
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
                    paddingVertical: 10,
                    marginBottom: 40,
                }}>
                    {categoriesList?.map((item, index) => {
                        const categoryKey = `ct${index + 1}`;
                        const categoryData = quizData?.[categoryKey] || {}; // safely get level data or empty object
                        const totalQuestions = Object.keys(categoryData).length;
                        const currentProgress = questIndices[categoryKey] ? questIndices[categoryKey] - 1 : 0;
                        const percentage = totalQuestions > 0 ? (currentProgress / totalQuestions) * 100 : 0;
                        const clampedProgress = Math.min(currentProgress, totalQuestions);
                        const isPrevLevelCompleted =
                            index === 0
                                ? true
                                : questIndices[`ct${index}`] > Object.keys(quizData?.[`ct${index}`] || {}).length;
                        const answersStatsIndex = answerStats[`ct${index + 1}`];
                        useEffect(() => {
                            console.log('Category', index + 1, 'Key:', categoryKey, 'Data:', categoryData);
                            console.log('Keys length:', Object.keys(categoryData).length);

                        }, [])
                        if (dataLength) {
                            return (
                                <Pressable
                                    key={index}
                                    android_ripple={{ color: colors.primary, borderless: false }}
                                    onPress={() => categoriesListPress(item)}
                                    style={[
                                        {
                                            width: '45%',
                                            height: 180,
                                            borderRadius: 8,
                                            margin: 5,
                                            flexDirection: 'column',
                                            backgroundColor: colors.secondary,
                                            overflow: 'hidden',
                                            opacity: 1,
                                            elevation: 5,
                                        },
                                        userVip || livesHeart > 0 ? {
                                            opacity: 1,
                                            elevation: 5,
                                        } : {
                                            opacity: 0.6,
                                            elevation: 0,
                                        },
                                    ]}
                                    disabled={!userVip && livesHeart === 0} // optionally disable press if previous level not completed
                                >
                                    {isGradient &&
                                        <LinearGradient
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 0,
                                                width: '120%',
                                                height: '120%',
                                                opacity: 0.5
                                            }}
                                            colors={[colors.gradSec, colors.gradPri]}
                                        />}
                                    <View
                                        style={[{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '100%',
                                            flex: 1,
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
                                                overflow: 'hidden'
                                            }]}>

                                            {item.img ? <Image
                                                style={{
                                                    width: '60%',
                                                    height: '60%'
                                                }}
                                                source={item?.img}
                                            /> :
                                                <Skeleton
                                                    colors={['#61616122', '#6161617c', '#61616122']}
                                                    height={'100%'}
                                                    width={'100%'}
                                                />}
                                        </View>

                                    </View>
                                    <View
                                        style={[{
                                            alignItems: language === "english" ? 'flex-start' : 'flex-end',
                                            justifyContent: 'center',
                                            backgroundColor: 'transparent',
                                            width: '100%',
                                            paddingVertical: 5,
                                            paddingHorizontal: 10,
                                        }]}>
                                        {/* <Text style={{ fontFamily: "Cairo_700Bold", color: colors.priText, fontSize: 16, }}>
                      {texts.level} {index + 1}
                    </Text> */}
                                        <Text style={{ fontFamily: "Cairo_700Bold", color: colors.categoriesCardTitle, fontSize: 16, }}>
                                            {item.label}
                                            {/* {Object.keys(categoriesListInfo[index + 1].label)} */}
                                        </Text>
                                        <Text style={{
                                            fontFamily: "Cairo_600SemiBold",
                                            color: colors.categoriesCardSubTitle,
                                            fontSize: 12,
                                        }}>
                                            {clampedProgress} / {totalQuestions} {texts.quests}
                                        </Text>
                                    </View>

                                </Pressable>
                            )
                        } else {
                            return (
                                <View key={index} style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '45%',
                                    height: 180,
                                    overflow: "hidden",
                                    borderRadius: 10,
                                    marginVertical: 7,
                                }}>
                                    <Skeleton
                                        colors={['#61616122', '#6161617c', '#61616122']}
                                        height={'100%'}
                                        width={'100%'}
                                    />
                                </View>
                            )
                        }

                    })}
                </View>
            </ScrollView>
        </View >
    )
}
const styles = StyleSheet.create({
    skelton: {
        marginVertical: 5
    },
    levelListItems: {
        justifyContent: "space-between",
        alignItems: 'center',
        width: '40%',
        height: 120,
        borderRadius: 8,
        margin: 5,
    },
});

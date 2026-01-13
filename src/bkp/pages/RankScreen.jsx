import React, { useRef, useState, useContext, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Pressable, Image, StatusBar, DrawerLayoutAndroid } from 'react-native';
import { TextInput, Button, IconButton, MD3Colors, Avatar, Icon, Appbar, } from 'react-native-paper';
import { DataContext } from '../context/contextData';
import { useNavigation } from '@react-navigation/native';
import { useGoogleSignIn } from '../context/auth';
import {
    MaterialIcons, Ionicons, MaterialCommunityIcons, FontAwesome6
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Skeleton } from 'moti/skeleton';

import BottomTab from '../components/elements/BottomTab';
import VipBadge from '../components/elements/VipBadge';

import FastImage from 'react-native-fast-image';

export default function RankScreen() {
    const navigation = useNavigation();
    const { user, request, promptAsync, logout } = useGoogleSignIn();

    const {
        usersData,
        userXp,
        heartsCard, setHeartsCard,
        quizData,
        colors,
        userName,
        userImage,
        isGradient, texts, language, userVip
    } = useContext(DataContext);
    const usersArray = Object.entries(usersData).map(([id, user]) => ({ id, ...user }));

    // Sort descending by XP (assume XP numeric)
    const sortedUsers = usersArray.slice().sort((a, b) => (b.UserXp || 0) - (a.UserXp || 0));
    const onTopUsers = usersArray.slice().sort((a, b) => (b.UserXp || 0) - (a.UserXp || 0));

    // Take top 3  (  use it as a map or flat list  ) !!!!!!!
    const topUsers = onTopUsers.slice(0, 3);
    const filteredUsers = onTopUsers.slice(3);
    const currentUser = usersArray.find(user => user.Username === userName && user.UserImage === userImage);
    const scrollDown = useRef(null);
    const [topUsersAnime, setTopUsersAnime] = useState(false);
    const handleScroll = (event) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        if (scrollY > 100) {
            setTopUsersAnime(true);
        } else {
            setTopUsersAnime(false);
        }
    };

    const TopUsersCard = (props) => {
        if (!topUsersAnime) {
            return (
                <View
                    style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <View style={{
                        width: props.wth,
                        height: props.hgt,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // borderRadius: 15,
                        borderRadius: 5,
                        backgroundColor: props.clr,
                        padding: 3
                        // overflow: 'hidden'
                    }}>
                        <View style={{
                            position: 'absolute',
                            width: "100%",
                            height: "100%",
                            padding: 2,
                            zIndex: 999999,
                            alignItems: 'flex-start',
                            justifyContent: 'flex-end'
                        }}>
                            {props.isUserVip && <VipBadge
                                width={20}
                                height={12}
                                title={true}
                                iconSize={8}
                                iconColor={"#7bd0d4ff"}
                                radius={3}
                                backColor={colors.secondary}
                                titleColor={colors.priText}
                                elevation={3}
                                textSize={8}
                                icon={false}
                            />}
                        </View>
                        <View style={{
                            width: "50%",
                            height: "50%",
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center',
                            top: -10,
                            right: -15,
                            zIndex: 9999999
                        }}>
                            {<Image
                                onPress={() => { }}
                                style={{
                                    width: "95%",
                                    height: "95%",
                                    zIndex: 99
                                }}
                                source={props.rewardIcon}
                            />}
                            {<Image
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                }}
                                blurRadius={1}
                                tintColor={'black'}
                                source={props.rewardIcon}
                            />}
                        </View>


                        {/* Render second user */}
                        <View style={{
                            borderRadius: 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: "100%",
                            flex: 1,
                            overflow: 'hidden'
                        }}>
                            {props.usrImage ?
                                <Image
                                    onPress={() => { }}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    source={{ uri: props.usrImage }} />
                                :
                                <Skeleton
                                    colors={['#61616122', '#6161617c', '#61616122']}
                                    height={"100%"}
                                    width={"100%"}
                                />
                            }
                        </View>

                    </View>
                    <View
                        style={{
                            width: "100%",
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0,
                            overflow: 'hidden'
                        }}>
                        <Text
                            ellipsizeMode='tail'
                            numberOfLines={1}
                            style={{
                                color: colors.priText,
                                fontSize: 16,
                                fontWeight: 600,
                                textAlign: 'center',
                                maxWidth: props.wth,
                            }}>{props.usrName}</Text>
                        <Text
                            ellipsizeMode='tail'
                            style={{
                                color: colors.secText,
                                fontSize: 13,
                                fontWeight: 500,
                                maxWidth: props.wth,

                            }}>{props.usrXp} XP</Text>
                    </View>

                </View>

            )
        } else {
            return (

                <View style={{
                    height: 40,
                    width: '85%',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    alignItems: 'center',
                    // borderRadius: 15,
                    borderRadius: 5,
                    backgroundColor: colors.primary,
                    padding: 2,
                    overflow: 'hidden'
                }}>
                    <View style={{
                        borderRadius: 5,
                        backgroundColor: 'black',
                        padding: 3,
                        marginRight: 3,
                        zIndex: 9999999,
                        backgroundColor: colors.primary,

                        width: 35,
                        height: 35,
                    }}>

                        {<Image
                            onPress={() => { }}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            source={props.rewardIcon}
                        />}
                    </View>


                    <View
                        style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            padding: 0,
                            overflow: 'hidden'
                        }}>
                        <Text style={{
                            color: colors.priText,
                            fontSize: 13,
                            fontWeight: 500
                        }}>{props.usrName}</Text>
                        <Text style={{
                            color: colors.secText,
                            fontSize: 11,
                            fontWeight: 400
                        }}>{props.usrXp} XP</Text>
                    </View>
                </View>


            )

        }
    }
    // 3 icons by Icons8.com
    const firstIcon = require("../assets/icons/first-place.png")
    const secondIcon = require("../assets/icons/second-place.png")
    const thirdIcon = require("../assets/icons/third-place.png")
    const list = Array.from({ length: 7 });

    const renderItem = React.useCallback(({ item, index }) => {
        if (!item.UserName && !item.UserImage && !item.UserXp) return null;
        return (
            <View
                key={index}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: colors.secondary,
                    marginVertical: 2,
                    borderRadius: 8,
                    width: "100%",
                    height: 45,
                    paddingHorizontal: 0,
                    marginBottom: index === filteredUsers.length - 1 ? 50 : null,
                    marginTop: index === 0 ? 55 : null,
                    overflow: 'hidden'
                }}>
                {isGradient &&
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: 0.5
                        }}
                        colors={[colors.gradSec, colors.gradPri]}
                    />}
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 45,
                    height: 45,
                    overflow: 'hidden'
                }}>
                    {item.UserImage ? <Image
                        onPress={() => { }}
                        style={{
                            width: 35,
                            height: 35,
                            borderRadius: 5,
                        }}
                        source={{ uri: item.UserImage }} />

                        :

                        <Skeleton
                            colors={['#61616122', '#6161617c', '#61616122']}
                            height={35}
                            width={35}
                        />
                    }

                </View>
                <View style={{
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    flex: 1,
                    paddingLeft: 2,
                    height: 48,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}>
                        <Text style={{
                            color: colors.priText,
                            fontSize: 17,
                            fontWeight: 700,
                            marginRight: 6
                        }}>{item.Username}</Text>

                        {item.UserVip &&
                            <VipBadge
                                width={23}
                                height={13}
                                title={true}
                                iconSize={8}
                                iconColor={"#67d6dcff"}
                                radius={3}
                                backColor={colors.primary}
                                titleColor={colors.priText}
                                elevation={0}
                                textSize={8}
                                icon={false}

                            />}
                    </View>
                    <Text style={{
                        color: colors.priText,
                        fontSize: 13,
                        fontWeight: 400
                    }}>{item.UserXp} XP</Text>
                    {/* Add other user properties you want to show */}
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48
                }}>
                    <Text style={{
                        color: colors.priText,
                        fontSize: 19,
                        fontWeight: 700
                    }}>{index + 4}</Text>

                </View>
                {/* Add other user properties you want to show */}
            </View>
        )

    });

    return (
        <View style={[styles.container, { backgroundColor: colors.primary }]}>
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
                    colors={[colors.primary, colors.gradPri]}
                />}
            {usersArray ?
                <View style={[styles.container]}>
                    <View
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 9999,
                            paddingVertical: 10
                        }}>

                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                                justifyContent: !topUsersAnime ? 'center' : 'space-evenly',
                            }}>
                            <View
                                style={{ flex: 1, alignItems: 'flex-end' }}>
                                <TopUsersCard
                                    usrName={topUsers[1]?.Username}
                                    usrXp={topUsers[1]?.UserXp}
                                    usrImage={topUsers[1]?.UserImage}
                                    // pdng={40}
                                    clr="#6E7175"
                                    iconSize={25}
                                    iconColor='white'
                                    hgt={80}
                                    numIndex={2}
                                    borderClr={'#6E7175'}
                                    icnName="crown"
                                    wth={80}
                                    rewardIcon={secondIcon}
                                    isUserVip={topUsers[1]?.UserVip}
                                />
                            </View>

                            <View key={topUsers.uid} style={{ flex: 1, alignItems: 'center' }}>
                                {/* Render first user (larger, highlighted) */}
                                <TopUsersCard
                                    usrName={topUsers[0]?.Username}
                                    usrXp={topUsers[0]?.UserXp}
                                    usrImage={topUsers[0]?.UserImage}
                                    // pdng={60}
                                    clr="#8D8133"
                                    iconSize={25}
                                    iconColor='white'
                                    hgt={90}
                                    numIndex={1}
                                    borderClr={'#8D8133'}
                                    icnName='crown'
                                    wth={90}
                                    rewardIcon={firstIcon}
                                    isUserVip={topUsers[0]?.UserVip}

                                />
                            </View>

                            <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                {/* Render third user */}
                                <TopUsersCard
                                    usrName={topUsers[2]?.Username}
                                    usrXp={topUsers[2]?.UserXp}
                                    usrImage={topUsers[2]?.UserImage}
                                    // pdng={20}
                                    clr='#544535ff'
                                    iconSize={25}
                                    iconColor='white'
                                    hgt={70}
                                    numIndex={3}
                                    borderClr={'#544535ff'}
                                    icnName="crown"
                                    wth={70}
                                    rewardIcon={thirdIcon}
                                    isUserVip={topUsers[2]?.UserVip}

                                />
                            </View>
                        </View>

                    </View>
                    <View style={{
                        width: "100%",
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 3,

                    }}>
                        {currentUser &&
                            <View
                                role='heading'
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: colors.primaryOpacity,
                                    height: 50,
                                    width: '100%',
                                    borderTopColor: 'gray',
                                    borderTopWidth: 0.5,
                                    paddingHorizontal: 5,
                                    position: 'absolute',
                                    top: 0,
                                    zIndex: 99999,

                                }}>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 50,
                                    height: 50,
                                }}>
                                    {<Image
                                        onPress={() => { }}
                                        style={{
                                            width: 35,
                                            height: 35,
                                            borderRadius: 5,
                                        }}

                                        source={{ uri: currentUser.UserImage ? currentUser.UserImage : 'https://picsum.photos/200/300' }} />}

                                </View>
                                <View style={{
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    flex: 1,
                                    paddingLeft: 2,
                                    height: 48,
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                    }}>
                                        <Text
                                            style={{
                                                color: colors.priText,
                                                fontSize: 17,
                                                fontWeight: 700,
                                                marginRight: 6
                                            }}>{currentUser.Username}</Text>
                                        {userVip &&
                                            <VipBadge
                                                width={23}
                                                height={13}
                                                title={true}
                                                textSize={8}
                                                icon={false}
                                                iconSize={8}
                                                iconColor={"#67d6dcff"}
                                                radius={3}
                                                backColor={colors.secondary}
                                                titleColor={colors.priText}
                                                elevation={2}

                                            />}
                                    </View>
                                    <Text style={{
                                        color: colors.priText,
                                        fontSize: 13,
                                        fontWeight: 400
                                    }}>{currentUser.UserXp} XP</Text>



                                    {/* Add other user properties you want to show */}
                                </View>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 48,
                                    height: 48
                                }}>
                                    <Text style={{
                                        color: colors.priText,
                                        fontSize: 19,
                                        fontWeight: 700
                                    }}>{onTopUsers.indexOf(currentUser) + 1}</Text>

                                </View>
                                {/* Add other user properties you want to show */}
                            </View>

                        }

                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            style={{
                                width: "100%",
                                paddingHorizontal: 15,
                            }}
                            contentContainerStyle={{}}
                            ref={scrollDown}
                            scrollEventThrottle={0}
                            data={filteredUsers}
                            keyExtractor={item => item.id}
                            initialNumToRender={10}
                            maxToRenderPerBatch={10}
                            windowSize={5}
                            renderItem={renderItem}
                        />
                    </View>
                </View>
                :
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    backgroundColor: colors.screenBack,
                    flex: 1,
                    overflow: "hidden",
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        width: '90%',
                        height: '30%'
                    }}>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Skeleton
                                colors={['#61616122', '#6161617c', '#61616122']}
                                height={'70%'}
                                width={'90%'}
                            />

                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Skeleton
                                colors={['#61616122', '#6161617c', '#61616122']}
                                height={'70%'}
                                width={'90%'}
                            />

                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>

                            <Skeleton
                                colors={['#61616122', '#6161617c', '#61616122']}
                                height={'70%'}
                                width={'90%'}
                            />
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flex: 1
                    }}>
                        {list.map((index) => {
                            return (
                                <View key={index}
                                    style={{
                                        width: '90%',
                                        height: 50,
                                        overflow: 'hidden',
                                        marginVertical: 5,
                                        borderRadius: 10
                                    }}>
                                    <Skeleton

                                        colors={['#61616122', '#6161617c', '#61616122']}
                                        height={'100%'}
                                        width={'100%'}

                                    />

                                </View>
                            )
                        })}

                    </View>
                </View>
            }

        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'start',
        position: 'relative',
    },
})
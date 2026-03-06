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
} from 'react-native';
import { DataContext } from '../context/contextData';
import { TextInput, Button, IconButton, MD3Colors, Icon, Appbar, RadioButton, ProgressBar, Snackbar, Surface, Dialog, Portal, PaperProvider } from 'react-native-paper';
import React, { useRef, useState, useContext, useEffect } from 'react';
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
import { useColors } from '../hooks/useColors';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);



const SignsItems = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { lessons, screen,
    widthScale,
    heightScale,
    sizeScale,
  } = useSize();
  const colors = useColors();
  const {

    sound, playSound,
    isGradient,
    signsData,
    signsItemsIndex,

    toggleBookmark,
    isBookmarked

  } = useContext(DataContext);

  const [openItems, setOpenItems] = useState<boolean>(false)
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const title = signsData?.["content"]?.[signsItemsIndex]?.title ?? 'undefined';


  const SIGNS_ITEMS = signsData?.["content"]?.[signsItemsIndex]?.["items"] || {};
  const SIGNS_ITEMS_Length = Object.keys(SIGNS_ITEMS).length;

  const signsItemsList = Array.from({ length: SIGNS_ITEMS_Length ? SIGNS_ITEMS_Length : 10 }, (_, i) => {
    const index = i;
    const signIndex = `${signsItemsIndex}`;
    const label = signsData?.["content"]?.[signIndex]?.items?.[index]?.Label ?? 'undefined';
    const description = signsData?.["content"][signIndex]?.items?.[index]?.Description ?? 'undefined';
    const img = signsData?.["content"]?.[signIndex]?.items?.[index]?.img ?? '';
    const imageBase = 'https://cdn.jsdelivr.net/gh/MEHDI-Gi/dizad_road_test_assets@main/assets';
    const folder = signsData?.["content"]?.[signIndex]?.folder;
    const png = '.png';


    return {
      id: index,
      label: label,
      description: description,
      condition: `category ${i + 1}`,
      img: img && folder ? `${imageBase}/${folder}/${img}${png}` : '',
    };
  });

  const { width: screenWidth } = Dimensions.get('window');
  const ITEM_WIDTH = screenWidth * 1     // visible card width
  const MAIN_ITEM_WIDTH = screenWidth * 0.74     // visible card width
  const SPACER = (screenWidth - ITEM_WIDTH) / 2;


  const listRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;


  function Itemsoo() {

    // useEffect(() => {
    //   if (listRef.current && openItems) {
    //     const offset = selectedItemIndex * ITEM_WIDTH;
    //     listRef.current.scrollToOffset({
    //       offset,
    //       animated: false
    //     });
    //   }
    // }, [selectedItemIndex, openItems]);
    // Add left/right spacers so first/last item can be centered
    const data = [
      { type: 'spacer-left', key: 'spacer-left' },
      ...signsItemsList.map((it, idx) => ({ ...it, key: String(idx) })),
      { type: 'spacer-right', key: 'spacer-right' },
    ];
    const renderItem = ({ item, index }: { item: any; index: number }) => {
      if (item.type === 'spacer-left' || item.type === 'spacer-right') {
        return <View style={{ width: SPACER }} />;
      }

      // console.log('Adding bookmark:', JSON.stringify(item, null, 2));

      // THEN create (will always log even if crash happens after)
      const bookmarkItem = {
        id: `signs-${signsItemsIndex}-${index}`,
        label: item.label ?? 'Untitled',
        img: item.img ?? '',
        description: item.description ?? ''
      };



      const inputRange = [
        (index - 2) * ITEM_WIDTH,
        (index - 1) * ITEM_WIDTH,
        index * ITEM_WIDTH,
      ];
      const zIndex = scrollX.interpolate({
        inputRange,
        outputRange: [0, 10, 0],
        extrapolate: 'clamp',
      });
      const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.8, 1, 0.8],
        extrapolate: 'clamp',
      });

      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.8, 1, 0.8],
        extrapolate: 'clamp',
      });
      const elevation = scrollX.interpolate({
        inputRange,
        outputRange: [2, 8, 2],
        extrapolate: 'clamp',
      });
      if (!signsData) {

        return (
          <View style={{

            width: ITEM_WIDTH, alignItems: 'center', justifyContent: 'center'
          }}>

            <Animated.View
              style={{
                transform: [{ scale }],
                opacity,
                marginHorizontal: 8,
                borderRadius: 8,
                backgroundColor: colors.secondary,
                overflow: 'hidden',
                width: lessons.items.rowSwipe.width,
                height: lessons.items.rowSwipe.height,
                margin: 5,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex,
                elevation,
              }}
              key={index}
            >
              <ShimmerPlaceHolder
                style={{ width: "100%", height: "100%", }}
                shimmerColors={[colors.secondary, '#6161617c', colors.secondary]}
              />

            </Animated.View>
          </View>
        );
      }



      return (
        <View style={{

          width: ITEM_WIDTH, alignItems: 'center', justifyContent: 'center'
        }}>

          <Animated.View
            style={{
              transform: [{ scale }],
              opacity,
              marginHorizontal: 8,
              borderRadius: 8,
              backgroundColor: colors.secondary,
              overflow: 'hidden',
              width: lessons.items.rowSwipe.width,
              height: lessons.items.rowSwipe.height,
              margin: 5,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex,
              elevation,
            }}
            key={index}
          >
            {isGradient && (
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '120%',
                  height: '120%',
                  opacity: 0.5,
                }}
                colors={[colors.gradSec, colors.gradPri]}
              />
            )}

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: lessons.items.rowSwipe.width,
                height: lessons.items.rowSwipe.width,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.primary,
                  width: '90%',
                  height: '90%',
                  overflow: 'hidden',
                  borderRadius: 5,
                }}>
                {item?.img ? (
                  <Image
                    style={{ width: '80%', height: '80%' }}
                    source={{ uri: item?.img }}
                  />
                ) :
                  (
                    <ShimmerPlaceHolder
                      style={{ width: "100%", height: '100%' }}
                      shimmerColors={[colors.secondary, '#6161617c', colors.secondary]}
                    />
                  )
                }
              </View>
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: 'transparent',
                width: '80%',
                paddingVertical: 5,
                flex: 1,
              }}>
              {item?.label ? <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Cairo',
                  color: colors.text.primary,
                  fontSize: 16,
                  marginBottom: 15

                }}>
                {item.label}
              </Text> :
                <ShimmerPlaceHolder
                  style={{ width: "60%", height: 25, marginBottom: 10 }}
                  shimmerColors={colors.shimmer.first}
                />
              }
              {item?.description ? <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Cairo',
                  color: colors.text.secondary,
                  fontSize: 16,
                }}>
                {item.description}
              </Text> : null
              }
              {/* You can show progress here using clampedProgress / totalSigns */}
            </View>
            <View style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              width: "100%",
              height: 70,
              paddingHorizontal: 10,

            }}>
              <Pressable
                android_ripple={{ color: colors.primary, borderless: false, foreground: true }}
                style={{
                  overflow: 'hidden',
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 50,
                  height: 50,
                }}
                onPress={() => {
                  toggleBookmark('signs', bookmarkItem);
                }}>
                {!isBookmarked('signs', bookmarkItem) ? <MaterialCommunityIcons
                  size={30}
                  color={colors.text.secondary}
                  name='bookmark-outline'
                /> :
                  <MaterialCommunityIcons
                    size={30}
                    color={"red"}
                    name='bookmark'
                  />}
              </Pressable>
            </View>
          </Animated.View></View>
      );
    };

    return (
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9,
        flexDirection: 'column',
        width: screen.width,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <BlurView
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          blurType="dark"
          blurAmount={10}
        ></BlurView>

        <View style={{
          flexDirection: 'row',
          width: screen.width,
          height: "10%",
          alignItems: 'center',
          justifyContent: 'center',
        }}>

        </View>

        <View style={{
          height: lessons.items.rowSwipe.height,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}>
          <Animated.FlatList
            ref={listRef}
            data={data}
            keyExtractor={item => item.key}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            decelerationRate="fast"
            snapToInterval={ITEM_WIDTH}
            initialNumToRender={signsItemsList.length + 2}    // First 2 screens
            maxToRenderPerBatch={signsItemsList.length + 2}   // signsItemsList.length + 2 new per scroll
            windowSize={signsItemsList.length + 2}
            contentContainerStyle={{
              alignItems: 'center', zIndex: 10
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            renderItem={renderItem}
          />
        </View>

        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: lessons.items.rowSwipe.width,
          padding: 35,
          height: "15%",
        }}>
          <Pressable
            android_ripple={{ color: colors.primary, borderless: false, foreground: true }}
            style={{
              overflow: 'hidden',
              borderColor: colors.text.secondary,
              borderWidth: 2,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              height: 50,
            }}
            onPress={() => {
              setOpenItems(false)
            }}>
            <MaterialCommunityIcons
              size={30}
              color={colors.text.secondary}
              name='close'
            />
          </Pressable>
        </View>

      </View>

    )
  }
  function Items() {

    const [currentIndex, setCurrentIndex] = useState(selectedItemIndex);


    return (
      <View style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 5, backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
            setCurrentIndex(index);
          }}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          {signsItemsList.map((item, idx) => {
            const bookmarkItem = {
              id: `signs-${signsItemsIndex}-${idx}`,
              label: item.label ?? 'Untitled',
              img: item.img ?? '',
              description: item.description ?? ''
            };
            return (
              <View style={{

                width: ITEM_WIDTH, alignItems: 'center', justifyContent: 'center'
              }}>

                <View
                  style={{
                    marginHorizontal: 8,
                    borderRadius: 8,
                    backgroundColor: colors.secondary,
                    overflow: 'hidden',
                    width: lessons.items.rowSwipe.width,
                    height: lessons.items.rowSwipe.height,
                    margin: 5,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  key={idx}
                >
                  {isGradient && (
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '120%',
                        height: '120%',
                        opacity: 0.5,
                      }}
                      colors={[colors.gradSec, colors.gradPri]}
                    />
                  )}

                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: lessons.items.rowSwipe.width,
                      height: lessons.items.rowSwipe.width,
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.primary,
                        width: '90%',
                        height: '90%',
                        overflow: 'hidden',
                        borderRadius: 5,
                      }}>
                      {item?.img ? (
                        <Image
                          style={{ width: '80%', height: '80%' }}
                          source={{ uri: item?.img }}
                        />
                      ) :
                        (
                          <ShimmerPlaceHolder
                            style={{ width: "100%", height: '100%' }}
                            shimmerColors={[colors.secondary, '#6161617c', colors.secondary]}
                          />
                        )
                      }
                    </View>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      backgroundColor: 'transparent',
                      width: '80%',
                      paddingVertical: 5,
                      flex: 1,
                    }}>
                    {item?.label ? <Text
                      style={{
                        textAlign: 'center',
                        fontFamily: 'Cairo',
                        color: colors.text.primary,
                        fontSize: 16,
                        marginBottom: 15

                      }}>
                      {item.label}
                    </Text> :
                      <ShimmerPlaceHolder
                        style={{ width: "60%", height: 25, marginBottom: 10 }}
                        shimmerColors={colors.shimmer.first}
                      />
                    }
                    {item?.description ? <Text
                      style={{
                        textAlign: 'center',
                        fontFamily: 'Cairo',
                        color: colors.text.secondary,
                        fontSize: 16,
                      }}>
                      {item.description}
                    </Text> : null
                    }
                    {/* You can show progress here using clampedProgress / totalSigns */}
                  </View>
                  <View style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    width: "100%",
                    height: 70,
                    paddingHorizontal: 10,

                  }}>
                    <Pressable
                      android_ripple={{ color: colors.primary, borderless: false, foreground: true }}
                      style={{
                        overflow: 'hidden',
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                      }}
                      onPress={() => {
                        toggleBookmark('signs', bookmarkItem);
                      }}>
                      {!isBookmarked('signs', bookmarkItem) ? <MaterialCommunityIcons
                        size={30}
                        color={colors.text.secondary}
                        name='bookmark-outline'
                      /> :
                        <MaterialCommunityIcons
                          size={30}
                          color={"red"}
                          name='bookmark'
                        />}
                    </Pressable>
                  </View>
                </View></View>)
          })}
        </ScrollView>

        {/* Dots indicator */}
        {false && <View style={{ flexDirection: 'row', padding: 20 }}>
          {signsItemsList.map((_, idx) => (
            <View key={idx} style={{
              width: 10, height: 10, borderRadius: 5,
              backgroundColor: idx === currentIndex ? colors.primary : 'rgba(255,255,255,0.5)',
              marginHorizontal: 5
            }} />
          ))}
        </View>}

        {/* Close button */}
      </View>
    );
  }


  if (signsData) {

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.primary, position: 'relative' }]}>
        {openItems && <Items />}
        <View style={{
          height: 50,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{ fontFamily: "Cairo", color: colors.text.primary, fontSize: 16, }}>
            {title}</Text>
          <Pressable
            android_ripple={{
              color: colors.secondary, borderless: true, foreground: true
            }}
            style={{
              position: 'absolute',
              alignItems: "center",
              justifyContent: "center",
              left: 0,
              width: 35,
              height: 35,
              borderRadius: 50,
              overflow: 'hidden',
              marginHorizontal: 15,
            }}
            onPress={() => {
              navigation.navigate('MainTabs', { screen: 'Signs' })
              if (sound) playSound('settingsButton')
            }}>
            <MaterialIcons name='close' color={colors.text.secondary} size={22} />
          </Pressable>
        </View>
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
            {signsItemsList?.map((item, index) => {
              if (SIGNS_ITEMS) {
                return (
                  <Pressable
                    key={item.id}
                    android_ripple={{
                      foreground: true,
                      color: colors.primary,
                      borderless: false
                    }}
                    onPress={() => {
                      setSelectedItemIndex(index);   // remember which Sx was tapped
                      setOpenItems(true);
                    }}
                    style={[
                      {
                        width: lessons.items.width,
                        borderRadius: 8,
                        margin: 5,
                        flexDirection: 'column',
                        backgroundColor: colors.secondary,
                        overflow: 'hidden',
                        opacity: 1,
                        elevation: 5,
                      },
                    ]}
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
                        width: lessons.items.width,
                        height: lessons.items.width
                      }]}>
                      <View
                        style={[{
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: colors.secondary,
                          width: '90%',
                          height: '90%',
                          overflow: 'hidden',
                          borderRadius: 5,
                        }]}>

                        {item?.img ?

                          <Image
                            style={{
                              width: '90%',
                              height: '90%',

                            }}
                            source={{ uri: item?.img }}
                          />
                          :
                          <ShimmerPlaceHolder
                            style={{ width: '90%', height: '90%', borderRadius: 5, }}
                            shimmerColors={colors.shimmer.first}
                          />
                        }
                      </View>
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
                      style={{ width: "100%", height: 180 }}
                      shimmerColors={colors.shimmer.second}
                    />
                  </View>
                )
              }

            })}
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.primary
        }
      }>
        <StatusBar translucent backgroundColor={colors.primary} />
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
              opacity: 1
            }}
            colors={[colors.primary, colors.gradSec]}
          />}

        <ActivityIndicator size="large" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    zIndex: 99999,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "100%",
    height: 50,
    paddingHorizontal: 10,
    overflow: 'hidden',

  },
  timeArea: {
    zIndex: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  exitArea: {
    zIndex: 9999,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",

  },
  progressBarArea: {
    width: "65%",
    height: 40,
    backgroundColor: "transparent",
    justifyContent: 'center'
  },
  helpArea: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  helpBtn: {
    flexDirection: "row",
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 50,
  },
  content: {
    flex: 1,
    zIndex: 9999,
    width: '100%',
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
  questContainer: {
    width: "92%",
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 0,
    padding: 0,
  },
  questTextContainer: {
    flex: 1,
    backgroundColor: "transparent",
    width: "100%",
    padding: 8,
    alignItems: "center",
    justifyContent: 'center'
  },
  questText: {
    fontSize: 16,
    fontFamily: "Cairo_700Bold",
    textAlign: "center",
    lineHeight: 30
  },
  answersContainer: {
    flex: 3,
    position: 'relative',
    backgroundColor: "transparent",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  answersBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
    borderRadius: 5,
    marginVertical: 5,
    width: '90%',
    height: 45
  },

  answerBtnActive: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
    backgroundColor: "#2e436e",
    borderRadius: 5,
    marginVertical: 5,
    width: '90%',
    height: 45
  },

  answersBtnTxt: {
    color: "white",
    fontSize: 15,
    fontFamily: "Cairo_700Bold",
    lineHeight: 45
  },
  checkButtonArea: {
    width: "90%",
    height: 100,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "transparent"
  },
  checkButton: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
    borderRadius: 8,
    flex: 1,
    height: 40,
  },
  helpButton: {
    position: "absolute",
    right: 0,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    width: 45,
    height: 45,
    backgroundColor: "transparent"
  },
  nextButtonContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 0,
    justifyContent: 'flex-end',
    transform: "translate(0, 100%)",
    zIndex: 999,
    paddingBottom: 0,

  },
  nextButtonArea: {
    width: "100%",
    height: 100,
    position: 'relative',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "transparent"
  },
  nextButton: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
    borderRadius: 8,
    width: "90%",
    height: 50,
    marginVertical: 0,

  },
  resulteText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Cairo_700Bold",
  },
  checkButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold"
  },
});
export default SignsItems;
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
import ItemsModal from '../components/ItemsModal';

import { useAd } from '../hooks/useAd';
import { useColors } from '../hooks/useColors';
import { useVip } from '../hooks/useVip';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);



const SignsItems = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    lessons,
    screen,
    widthScale,
    heightScale,
    sizeScale,
  } = useSize();
  const { userVip } = useVip();
  const colors = useColors();
  const {

    sound, playSound,
    isGradient,
    signsItemsIndex,
    lessonsData,
    toggleBookmark,
    isBookmarked,
    bookmarkLoading,
    imgBase,
    incrementView,
    setUpgradeWarn
  } = useContext(DataContext);

  const [openSignsModal, setOpenSignsModal] = useState<boolean>(false)
  const [selectedSign, setSelectedSign] = useState<number>(0);
  const title = lessonsData?.content?.signs?.content?.[signsItemsIndex]?.label ?? 'undefined';

  const [currentScrollIndex, setCurrentScrollIndex] = useState<number>(0);

  // const addIdsToSigns = () => {
  //   const signsRef = firebase.database().ref('lessons/content/signs/content'); // Updated path

  //   signsRef.once('value', snapshot => {
  //     const signs = snapshot.val() || [];

  //     // Process each folder (0, 1, 2...)
  //     signs.forEach((folder: any, folderIdx: number) => {
  //       if (folder?.items) {
  //         // Add ID to each item: signs-0-0, signs-0-1, signs-1-0...
  //         folder.items.forEach((item: any, itemIdx: number) => {
  //           if (item && !item.id) {
  //             item.id = `signs-${folderIdx}-${itemIdx}`;
  //           }
  //         });
  //         // Update folder back to Firebase
  //         firebase.database().ref(`lessons/content/signs/content/${folderIdx}`).update(folder);
  //       }
  //     });

  //     console.log('✅ ALL signs items now have stable IDs!');
  //     console.log('Example: signs-0-0, signs-1-3, signs-2-7...');
  //   });
  // };

  // // RUN ONCE: Paste in console or <Button onPress={addIdsToSigns} title="Add IDs" />
  // addIdsToSigns();

  // ✅ Direct array access
  const SIGNS_ITEMS = (lessonsData?.content?.signs?.content?.[signsItemsIndex]?.items || []).filter((item: any) => item && typeof item === 'object');;
  const SIGNS_ITEMS_Length = SIGNS_ITEMS.length;

  const progress = SIGNS_ITEMS_Length > 0 ? (currentScrollIndex / SIGNS_ITEMS_Length) * 100 : 0;

  const [conditionItems, setConditionItems] = useState<boolean>(false)
  const folder = lessonsData?.content?.signs?.content?.[signsItemsIndex]?.folder;
  useEffect(() => {
    setConditionItems(folder === 'I');  // ✅ Only when folder changes
  }, [signsItemsIndex]);

  const signsItemsList = SIGNS_ITEMS.map((item: any, index: any) => {
    if (!item || typeof item !== 'object') return null;
    return {
      id: item.id ?? index, // Use real ID if exists
      label: item.label ?? 'undefined',
      description: item.description ?? '',
      condition: `${folder}`,
      img: item.img && `${imgBase}/${folder}/${item.img}.png`,

    };
  });

  const { width: screenWidth } = Dimensions.get('window');
  const ITEM_WIDTH = screenWidth * 1     // visible card width
  const MAIN_ITEM_WIDTH = screenWidth * 0.74     // visible card width

  const handleBookmark = useCallback((category: string, item: any) => {
    toggleBookmark(category, item);
  }, [toggleBookmark]);

  const ad = useAd();

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

  if (!signsItemsList) {
    return (
      <View style={
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.primary
        }
      }>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const [needScroll, setNeedsScroll] = useState<boolean>(false)

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.primary, position: 'relative' }]}>
      <View style={{
        height: heightScale(50),
        position: 'absolute',
        left: 0,                   // <- ADD THIS
        right: 0,
        top: 0,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',

      }}>
        <View style={{
          position: 'absolute',
          bottom: 0,                 // <- ADD THIS  
          left: 0,                   // <- ADD THIS
          right: 0,
          top: 0,
          backgroundColor: colors.primary,
          opacity: 0.9
        }} />
        <Text style={{
          fontFamily: "Cairo-Bold",
          color: colors.text.primary,
          fontSize: sizeScale(16),
        }}>
          {title}
        </Text>
        <Pressable
          android_ripple={{
            color: colors.secondary, borderless: true, foreground: true
          }}
          style={{
            position: 'absolute',
            alignItems: "center",
            justifyContent: "center",
            right: 0,
            width: widthScale(30),
            height: heightScale(30),
            overflow: 'hidden',
            marginHorizontal: 15,
          }}
          onPress={() => {
            navigation.navigate('MainTabs', { screen: 'Lessons' })
            if (sound) playSound('settingsButton')
          }}>
          <MaterialIcons name='close' color={colors.text.secondary} size={sizeScale(25)} />
        </Pressable>
      </View>
      < ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1, width: '100%',
        }}
        contentContainerStyle={{
          paddingTop: sizeScale(50),
          paddingBottom: sizeScale(20),
          alignItems: 'center',
          justifyContent: "center",
          alignContent: "center",
        }}>

        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          paddingHorizontal: sizeScale(10),
          paddingVertical: sizeScale(10),
          gap: sizeScale(10),
          marginBottom: sizeScale(40),
        }}>
          {signsItemsList?.map((item: any, index: any) => {
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
                      width: widthScale(screen.width * 0.33 - 19),
                      height: heightScale(screen.width * 0.33 - 19),
                      borderRadius: sizeScale(8),
                      flexDirection: 'column',
                      backgroundColor: colors.secondary,
                      alignSelf: 'flex-start',
                      overflow: 'hidden',
                      opacity: 1,
                      elevation: 5,
                    },
                  ]}
                >
                  {!userVip && index > 9 ?
                    <View style={{
                      backgroundColor: colors.opacity.primary,
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      right: 0,
                      left: 0,
                      zIndex: 9,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <View style={{
                        backgroundColor: colors.opacity.primary,
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        zIndex: 0,
                      }} />
                      <Ionicons
                        name='diamond-sharp'
                        color={colors.button.primary}
                        size={sizeScale(30)}
                      />
                    </View> : null
                  }
                  <View
                    style={[{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: "100%",
                      height: "100%"
                    }]}>
                    <View
                      style={[{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: signsItemsIndex === 5 ? colors.primary : colors.secondary,
                        width: '90%',
                        height: '90%',
                        overflow: 'hidden',
                        borderRadius: 5,
                      }]}>

                      {item?.img ?

                        <Image
                          resizeMode='contain'

                          style={{
                            width: '90%',
                            height: '90%',

                          }}
                          source={{ uri: item?.img }}
                        />
                        :
                        !openSignsModal ?
                          <ShimmerPlaceHolder
                            style={{ width: '90%', height: '90%', borderRadius: 5, }}
                            shimmerColors={colors.shimmer.first}
                          />
                          :
                          null
                      }
                    </View>
                  </View>
                </Pressable>
              )
            } else {
              return (
                <View key={index} style={{

                  width: '45%',
                  height: heightScale(180),
                  overflow: "hidden",
                  borderRadius: sizeScale(10),
                  marginVertical: sizeScale(7),

                }}>
                  <ShimmerPlaceHolder
                    style={{ width: "100%", height: heightScale(180) }}
                    shimmerColors={colors.shimmer.second}
                  />
                </View>
              )
            }

          })}
        </View>
      </ScrollView >

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
            data={signsItemsList}
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
                width: screenWidth, alignItems: 'center', justifyContent: 'center',
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
                    <Pressable
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
                      onPress={() => handleBookmark('signs', {
                        id: item.id ?? `signs-${signsItemsIndex}-${index}`,
                      })}
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
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </Modal>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SignsItems;
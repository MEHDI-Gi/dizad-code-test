import { TouchableWithoutFeedback, FlatList, Alert, Keyboard, ActivityIndicator, Text, Image, TouchableOpacity, StyleSheet, View, Pressable, ScrollView, ListRenderItemInfo } from 'react-native';
import { DataContext } from '../context/contextData';
import React, { useRef, useState, useContext, useEffect, useCallback } from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useColors } from '../hooks/useColors.ts';
import { useSize } from '../hooks/useSize.ts';
import CopyrightsFooter from '../components/CopyrightsFooter.tsx';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';

type LoginProps = {
  navigation: any;
};
export default function Login({ navigation }: LoginProps) {

  const colors = useColors();
  const {
    user, initializing, signIn,
    imgBase,
  } = useContext(DataContext);
  const { screen,
    widthScale,
    heightScale,
    sizeScale,
  } = useSize();


  const [isAuthProcessing, setIsAuthProcessing] = useState(false);

  const title = 'رخصتي';
  const sub = 'تعليم قوانين المرور الجزائرية'

  const questCover = `${imgBase}/cover/qst.png`;
  const examsCover = `${imgBase}/cover/exm.png`;
  const priorityCover = `${imgBase}/priority/L1/0.jpg`;
  const signsCover = `${imgBase}/cover/sgn.png`;

  const handleGoogleSignIn = async () => {
    setIsAuthProcessing(true);
    try {
      await signIn();
    } catch (error) {
      console.error("Sign In Failed", error);
    } finally {
      setIsAuthProcessing(false);
    }
  };

  useEffect(() => {
    if (initializing) return;

    if (user) {
      console.log("User detected, redirecting...");
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
    }
  }, [user, initializing]); // Only depend on these two


  const contentItems = [
    {
      cond: 'Exm',
      label: 'إمتحان',
      img: examsCover ?? null,
      sub: '',
      icon: 'graduation-cap', set: 'Entypo'
    },
    {
      cond: 'Sgn',
      label: 'إشارات',
      img: signsCover ?? null,
      sub: '',
      icon: 'trail-sign', set: 'Ionicons'

    },
    {
      cond: 'Qst',
      label: 'أسئلة',
      img: questCover ?? null,
      sub: '',
      icon: 'card-text', set: 'MaterialCommunityIcons'

    },
    {
      cond: 'Pri',
      label: 'أولوية',
      img: priorityCover ?? null,
      sub: '',
      icon: 'road-variant', set: 'MaterialCommunityIcons'

    }
  ];

  const flatListRef = useRef<FlatList>(null);
  const dataWithClones = [
    contentItems[contentItems.length - 1],
    ...contentItems,
    contentItems[0]
  ];
  const [visualIndex, setVisualIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = visualIndex + 1;

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setVisualIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [visualIndex]);

  const handleMomentumEnd = (event: any) => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / screen.width);

    // If we scrolled forward into the "Clone of First" at the very end
    if (index === dataWithClones.length - 1) {
      // Jump to the REAL first item (Index 1) INSTANTLY
      flatListRef.current?.scrollToIndex({ index: 1, animated: false });
      setVisualIndex(1);
    }
    // If user swiped backward into the "Clone of Last" at the start
    else if (index === 0) {
      flatListRef.current?.scrollToIndex({ index: contentItems.length, animated: false });
      setVisualIndex(contentItems.length);
    } else {
      setVisualIndex(index);
    }
  };

  const iconsSizes = widthScale(20);

  if (user || initializing) {
    return (
      <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, { backgroundColor: colors.primary }]}>
        <ActivityIndicator size="large" color={'#ff00c3'} />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, { backgroundColor: colors.primary }]}>
        <View style={{
          width: screen.width,
          height: screen.width * 0.5,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: 'transparent',
          zIndex: 1,
          overflow: 'hidden'
        }}>
          <FlatList
            ref={flatListRef}
            data={dataWithClones}
            horizontal
            pagingEnabled
            initialScrollIndex={1} // Start at the real first item
            onMomentumScrollEnd={handleMomentumEnd}
            getItemLayout={(_, index) => ({
              length: screen.width,
              offset: screen.width * index,
              index,
            })}
            onScrollToIndexFailed={() => { }} // Prevents the crash in your screenshot
            renderItem={({ item }) => (
              <View style={{ width: screen.width }}>
                <Image source={{ uri: item?.img }} style={{ width: '100%', height: "100%" }}
                  resizeMode="cover" />
              </View>
            )}
          />
        </View>

        <View style={{
          flexDirection: 'column',
          width: "100%",
          zIndex: 10,
          paddingHorizontal: sizeScale(20),
          paddingVertical: sizeScale(20),
          justifyContent: "flex-end",
          alignItems: "flex-end",
          backgroundColor: colors.primary,
          rowGap: sizeScale(10),
          borderBottomStartRadius: sizeScale(50),
          overflow: 'hidden'
        }}>
          <LinearGradient
            colors={['#00ffff', colors.primary]}
            start={{ x: 2, y: 0 }}
            end={{ x: 0, y: 3 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
              opacity: 0.2
            }}
          />
          <Text style={{
            fontFamily: 'Cairo-Bold',
            color: colors.button.primary,
            fontSize: sizeScale(25),
            zIndex: 3,

          }}>{title}</Text>
          <Text style={{
            fontFamily: 'Cairo-Medium',
            color: colors.text.primary,
            fontSize: sizeScale(20),
            zIndex: 3,
          }}>{sub}</Text>
        </View>
        <View style={{
          backgroundColor: colors.primary,
          flex: 1,
          width: "100%",
          justifyContent: 'center',
          alignItems: "center",
          position: 'relative',
          paddingHorizontal: sizeScale(40),
          paddingVertical: sizeScale(20),
          zIndex: 1,
        }}>

          <View style={{
            flexDirection: 'column',
            width: "100%",
            justifyContent: "center",
            alignItems: "flex-end",
            backgroundColor: 'transparent',
            zIndex: 1,
            rowGap: 10,
          }}>
            {contentItems.map((item, index) => (
              <View style={[{
                flexDirection: 'row',
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: 'transparent',
                zIndex: 1,
                columnGap: 10,
                opacity: 0.5,
              }, index === visualIndex - 1 && {
                opacity: 1,
                paddingRight: 8,
              }]}>
                <Text key={index} style={{
                  fontFamily: 'Cairo-Bold',
                  color: colors.text.primary,
                  fontSize: sizeScale(18),
                }}>{item.label}</Text>
                {
                  item.set === 'MaterialCommunityIcons' ?
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={iconsSizes}
                      color={colors.text.primary}
                    /> : item.set === 'Ionicons' ?
                      <Ionicons
                        name={item.icon}
                        size={iconsSizes}
                        color={colors.text.primary}
                      /> :
                      <Entypo
                        name={item.icon}
                        size={iconsSizes}
                        color={colors.text.primary}
                      />
                }
              </View>
            ))}
          </View>
          <View style={{
            width: '100%',
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'flex-end',
            zIndex: 1,
            gap: 15
          }}>
            <Pressable
              disabled={isAuthProcessing}
              style={[{
                backgroundColor: colors.secondary,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                borderRadius: 8,
                overflow: 'hidden',
                height: heightScale(50),
                width: '100%'
              }, { opacity: isAuthProcessing ? 0.7 : 1 },
              ]}
              android_ripple={{ foreground: true, color: colors.primary, borderless: false }}
              onPress={handleGoogleSignIn}
            >
              <View style={{
                width: widthScale(40),
                height: "100%",
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {!isAuthProcessing ?
                  <Image
                    source={require('../assets/icons/google.png')}
                    style={[{
                      width: widthScale(25),
                      height: heightScale(25),
                    }]}
                  /> :
                  <ActivityIndicator color="#ffffff" />}
              </View>
            </Pressable>
            <Text style={[{
              fontSize: sizeScale(15), fontWeight: '600', color: '#8b8b8b'
            }
            ]}>
              Continue with Google
            </Text>
          </View>
        </View>
        <CopyrightsFooter />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: "center",
    zIndex: 1,
  },

});

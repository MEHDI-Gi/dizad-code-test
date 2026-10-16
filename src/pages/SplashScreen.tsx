import React, { useRef, useState, useContext, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import { DataContext } from '../context/contextData';
import { useColors } from '../hooks/useColors.ts';
import LinearGradient from 'react-native-linear-gradient';
import CopyrightsFooter from '../components/CopyrightsFooter.tsx';

export default function SplashScreen() {
  const colors = useColors();
  const { isGradient } = useContext(DataContext);
  const title = 'رخصتي';
  const slog = 'تعليم قوانين المرور الجزائرية';

  return (
    <View
      style={[styles.container, { backgroundColor: colors.static.primary }]}
    >
      {isGradient && (
        <LinearGradient
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
          colors={[colors.primary, '#152331']}
        />
      )}
      <View
        style={{
          flexDirection: 'column',
          width: '80%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
          zIndex: 1,
          rowGap: 8,
          flex: 1,
        }}
      >
        <Text
          style={{
            fontFamily: 'Cairo-ExtraBold',
            color: colors.static.third,
            fontSize: 35,
          }}
        >
          {title}
        </Text>
        {/* <Text style={{
                    fontFamily: 'Cairo',
                    color: colors.text.secondary,
                    fontSize: 18,
                }}>{slog}</Text> */}
      </View>
      <CopyrightsFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

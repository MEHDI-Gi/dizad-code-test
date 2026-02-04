import { BackHandler,AppState, SafeAreaView ,ImageBackground , Text, View, StyleSheet, Image, StatusBar, DrawerLayoutAndroid, TouchableOpacity, Alert, ActivityIndicator , Pressable } from 'react-native';
import { DataContext } from '../../context/contextData';
import { TextInput ,Button, IconButton, MD3Colors, Icon , Appbar , RadioButton , ProgressBar, Snackbar, Surface, Dialog, Portal, PaperProvider } from 'react-native-paper';
import React, { useRef, useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Foundation,MaterialCommunityIcons, Entypo, FontAwesome6 } from '@expo/vector-icons';

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

export default function LevelEnd() {

  const navigation = useNavigation();
  const {
    colors,
    dataLevelIndex ,
    setlevelEndState, setDataLevelIndex   ,resetTimer, setTimeEndState
  } = useContext(DataContext);
  
  return (
      <View style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.primary}}>
        <Text style={{
          zIndex: 99,
          fontSize: 32,
          fontFamily: 'Cairo_700Bold',
          color: '#1f6711',
          marginBottom: 10,
          textAlign: 'center',}}>🎉 تهانينا! 🎉</Text>
        <Text style={{
          zIndex: 99,
          fontSize: 20,
          fontFamily: 'Cairo_600SemiBold',
          color: colors.secText,
          marginBottom: 30,
          textAlign: 'center',}}>لقد أنهيت المرحلة {dataLevelIndex}</Text>
          
          <View style={{width: '100%',zIndex: 99,}}>
          <TouchableOpacity style={[{
            paddingVertical: 14,
            marginVertical: 8,
            borderRadius: 10,
            alignItems: 'center',}, {backgroundColor: '#4caf4fa1',}]} 
            onPress={()=>{
                // Extract the number from the condition string, e.g., "level 2" -> 2
                  setDataLevelIndex(prev => prev + 1);
                  resetTimer(45);
                  setTimeEndState(false)
            }}>
            <Text style={{ 
              color: '#fff',
              fontFamily: 'Cairo_700Bold',
              fontSize: 18,
              fontWeight: '600',}}>المرحلة التالية</Text>
          </TouchableOpacity>
      
          <TouchableOpacity style={[{
            paddingVertical: 14,
            marginVertical: 8,
            borderRadius: 10,
            alignItems: 'center',}, {backgroundColor: '#2195f3b0',}]} onPress={()=>{setlevelEndState(false)}}>
            <Text style={{ 
              color: '#fff',
              fontFamily: 'Cairo_700Bold',
              fontSize: 18,
              fontWeight: '600',}}>إعادة المرحلة</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[{
            paddingVertical: 14,
            marginVertical: 8,
            borderRadius: 10,
            alignItems: 'center',}, {backgroundColor: '#f44336ae',}]} onPress={()=>navigation.navigate('Home')}>
            <Text style={{ 
              color: '#fff',
              fontFamily: 'Cairo_700Bold',
              fontSize: 18,
              fontWeight: '600',}}>Exit</Text>
          </TouchableOpacity>
        </View>
    </View>
    
  )
}

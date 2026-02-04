import React, { useRef, useState, useContext } from 'react';
import { RadioButton, Button, IconButton, MD3Colors, Icon, Switch, List, Text } from 'react-native-paper';
import { DataContext } from '../../context/contextData';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';
import { View, Pressable, StyleSheet } from 'react-native';


export default function LanguageComp() {
  const {
    colors,
    Language, setLanguage,
  } = useContext(DataContext);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile', 'RankScreen'>>();

  return (
    <View style={[styles.langCompMain, { backgroundColor: colors.primary }]}>
      <View style={styles.langCompButtonsArea}>
        <Pressable
          onPress={() => setLanguage('english')}
          style={({ pressed }) => [styles.langCompButtons, {
            backgroundColor: Language === 'english' ? colors.buttons : 'gray', opacity: pressed ? 0.8 : 1,
          }]}>
          <Text style={{ color: Language === 'english' ? 'white' : 'black', fontWeight: 'bold' }}>English</Text>
        </Pressable>
        <Pressable
          onPress={() => setLanguage('arabic')}
          style={({ pressed }) => [styles.langCompButtons, { backgroundColor: Language === 'arabic' ? colors.buttons : 'gray', opacity: pressed ? 0.8 : 1 }]}>
          <Text style={{ color: Language === 'arabic' ? 'white' : 'black' }}>Arabic</Text>
        </Pressable>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: 'transparent' }}>
        <Pressable
          onPress={() => { navigation.navigate('Profile') }}
          style={({ pressed }) => [{
            backgroundColor: colors.buttons,
            opacity: pressed ? 0.8 : 1,
            borderRadius: 8,
            width: '30%', height: 30,
            alignItems: 'center', justifyContent: 'center',
          }]}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>set</Text>
        </Pressable>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  langCompMain: {
    backgroundColor: 'orange',
    width: '100%',
    height: "100%",
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  langCompTitle: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  langCompButtonsArea: {
    flex: 3,
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    alignItems: 'center',
    justifyContent: 'center'
  },
  langCompButtons: {
    margin: 3,
    borderRadius: 4,
    width: '100%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

import React, { useRef, useState, useContext } from 'react';
import { Portal, Modal, TouchableWithoutFeedback, Keyboard, Pressable, TextInput, BackgroundImage, Dimensions, StatusBar, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, View, Box, VStack, FormControl, Input, Radio, Divider, Checkbox, Card, Appbar, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { RadioButton, Button, IconButton, MD3Colors, Icon, Switch, List } from 'react-native-paper';
import { DataContext } from '../../context/contextData';
import { useNavigation } from '@react-navigation/native';


export default function ProfileEdtComp() {
  const {
    colors,
    Language, setLanguage,
  } = useContext(DataContext);
  const navigation = useNavigation();

  return (
    <View style={[styles.langCompMain, { backgroundColor: colors.primary }]}>
      <View style={styles.langCompButtonsArea}>
        {false && <View>
          <RadioButton
            value="english"
            status={Language === 'english' ? 'checked' : 'unChecked'}
            onPress={() => { }}
          />
          <RadioButton
            value="arabic"
            status={Language === 'arabic' ? 'checked' : 'unChecked'}
            onPress={() => { }}
          />
        </View>}
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


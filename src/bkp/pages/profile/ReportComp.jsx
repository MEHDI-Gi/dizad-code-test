import React, { useRef, useState, useContext } from 'react';
import { Portal, Modal, TouchableWithoutFeedback, Keyboard, Pressable, TextInput, BackgroundImage, Dimensions, StatusBar, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, View, Box, VStack, FormControl, Input, Radio, Divider, Checkbox, Card, Appbar, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { RadioButton, Button, IconButton, MD3Colors, Icon, Switch, List } from 'react-native-paper';
import { DataContext } from '../../context/contextData';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function ReportComp() {
  const {
    colors,
  } = useContext(DataContext);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      const { uri } = result.assets[0];
      setSelectedImageUri(uri);
      saveImage(uri);
      setIsPicAdd(true);
    } else {
      Alert.alert('You did not select any image.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        padding: 10,
      }}>
        <View style={{
          flex: 1,
          width: '100%',
          backgroundColor: 'transparent',
          justifyContent: 'start',
          alignItems: 'center'
        }}>
        </View>
        <View style={{
          flex: 3,
          width: '100%',
          paddingHorizontal: 10,
          backgroundColor: "transparent"
        }}>
          <TextInput
            multiline={true}
            textAlignVertical="top"
            style={{
              color: 'white',
              height: '70%',
              width: '100%',
              borderColor: 'gray',
              borderWidth: 0.5,
              borderRadius: 5,
              padding: 10
            }}
            placeholderTextColor={colors.priText}
            placeholder="Write your report letter here..."
          />
          <View style={{ flexDirection: 'row' }}>
            <IconButton iconColor={colors.secText} size={20} icon={"file-document-multiple"} onPress={() => { }} />
            <IconButton iconColor={colors.secText} size={20} icon={"file-image"} onPress={pickImage} />
          </View>
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          backgroundColor: 'transparent'
        }}>
          <Pressable
            style={({ pressed }) => [{
              backgroundColor: colors.buttons,
              opacity: pressed ? 0.8 : 1,
              borderRadius: 8,
              width: '30%',
              alignItems: 'center',
              justifyContent: 'center',
              height: 30,
            }]}>
            <Text style={{ color: 'white' }}>send</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

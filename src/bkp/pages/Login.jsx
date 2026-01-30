import { TouchableWithoutFeedback, Alert, Keyboard, ActivityIndicator, Text, Image, TouchableOpacity, StyleSheet, View, Pressable } from 'react-native';
import { TextInput, Button, IconButton, MD3Colors, Icon, Snackbar as SnackBarPaper, } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { DataContext } from '../context/contextData';
import React, { useRef, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CopyrightsFooter from '../components/CopyrightsFooter';

import AppLoading from 'expo-splash-screen';
import * as Application from 'expo-application';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
const appVersion = Application.nativeApplicationVersion;
import SnackBar from '../components/elements/SnackBar';
import { useGoogleSignIn } from '../context/auth';

import LoadingScreen from '../components/LoadingScreen';
export default function Login({ navigation }) {

  const { user, initializing, signIn, logout } = useGoogleSignIn();

  const {
    colors, currentTheme,
    userName, setUserName,
    isPicAdd, setIsPicAdd, language,
    userImage, setUserImage, sound, playSound, setLoadScreen,
    isGradient, isAccountDeleted, setIsAccountDeleted, texts,
    setUserXp,
    setUserPlan,
    setLanguage,
    setVibrate,
    setDataLevelIndex,
    setQuestIndices,
    setAnswerStats,
    setSound,
    unsubscribeQuizListener,
    unsubscribeUsersListener,
    unsubscribeUserListener,
    firebaseLoaded,
    userLoaded,
    setFirebaseLoaded,
    setQuizLoaded,
    setUsersLoaded,
    setUserLoaded,
    userXp, userPlan,
    setLivesHeart,
    handleLogout,
    isLogout, setIsLogout,
  } = useContext(DataContext);

  const [isInpFocused, setIsInpFocused] = useState(false);

  const [loginExplane, setLoginExplane] = useState(false)
  const loginInputRef = useRef(null);

  const allowedUserName = /^(?=.{3,15}$)(?!.* {3})[A-Za-zأ-ي0-9]+( [A-Za-zأ-ي0-9]+){0,2}$/;
  const [isValidUserName, setIsValidUserName] = useState(true);
  const [authInProgress, setAuthInProgress] = useState(false);

  const [inputUserName, setInputUserName] = useState('')

  // const handleLogin = async () => {

  //   if (authInProgress) return;
  //   setAuthInProgress(true);

  //   try {
  //     // Optional: sign out to clear any existing sessiosn
  //     if (auth.currentUser) {
  //       await signOut(auth);
  //     }

  //     await promptAsync();
  //   } catch (error) {
  //     console.error(`Login error: ${error}`);
  //   } finally {
  //     setAuthInProgress(false);

  //   }
  // };

  const handleChange = (text) => {
    setInputUserName(text);
    console.log()
    if (text.length === 0) {
      setIsValidUserName(true);
    } else if (text.length > 3) {
      setIsValidUserName(allowedUserName.test(text));
    } else {
      setIsValidUserName(false);
    }
  };

  const [isPickErr, setIsPickErr] = useState(false)

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
      setUserImage(uri);
      saveImage(uri);
      setIsPicAdd(true);
    } else {
      setIsPickErr(true)
    }
  };

  const saveImage = async (uri) => {
    try {
      const filename = uri.split('/').pop();
      const newPath = `${FileSystem.documentDirectory}${filename}`;
      await FileSystem.copyAsync({
        from: uri,
        to: newPath,
      });
      console.log('Image saved successfully!', `Saved at: ${newPath}`);
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  function loginTrue() {
    if (inputUserName.length > 3 && isValidUserName) {
      setUserName(inputUserName)
      navigation.navigate('Home', { name: 'Home' })
      console.log(`your user name is ${userName}`)
      if (sound) playSound('welcomeIntro')

    } else {
      loginInputRef.current.focus()
    }
  };



  useEffect(() => {
    if (user && !initializing) {
      setUserName(user.displayName);
      setUserImage(user.photoURL);
    }
  }, [user, initializing]);

  const testUserData = [
    userName,
    userImage,
    userXp,
    userPlan,

  ]

  function UserIn() {
    return (
      <View style={styles.main}>

        {userImage ?
          <Image style={
            {
              width: 50,
              height: 50,
              borderRadius: 5,
              borderWidth: 0,
              borderColor: colors.priText,
            }}
            source={{ uri: userImage }} />
          :
          <MaterialIcons
            name='person'
            size={35}
            color={colors.priText}
          />
        }
        <View style={
          {
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Text style={
            {
              fontSize: 20,
              fontWeight: "600",
              color: colors.priText
            }}>
            {userName ? userName : 'user'}
          </Text>
        </View>
        <View style={{
          height: 25,
          zIndex: 99,
          backgroundColor: "transparent",
          width: "100%",
          justifyContent: 'center',
          alignItems: "center",
        }}>
          <View style={{
            backgroundColor: colors.secondary,
            height: 0.5,
            width: "50%",
          }}>
          </View>
        </View>
        <Pressable
          android_ripple={{ color: colors.primary, borderless: false }}
          style={[{
            borderRadius: 8,
            width: '60%',
            height: 35,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: colors.secondary,
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "space-evenly",
            padding: 5,
            elevation: 2
          }]}
          onPress={() => {
            if (user) { navigation.navigate("Home"); console.log('enter pressed') }
          }}>


          <MaterialIcons
            name="arrow-forward-ios"
            color={colors.priText}
            size={15}
          />
        </Pressable>
        <Pressable
          android_ripple={{ color: colors.primary, borderless: false }}
          style={[{
            borderRadius: 8,
            width: '20%',
            height: 35,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: colors.secondary,
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "center",
            padding: 5,
            elevation: 2,
            marginVertical: 5
          }]}
          onPress={() => handleLogout(navigation)}>


          <MaterialIcons
            name="logout"
            color={colors.priText}
            size={15}
          />
        </Pressable>
      </View>
    )
  }

  if (authInProgress && initializing) {
    console.log('authInProgress initializing')
    return (
      <View style={[{ flex: 1, alignItems: "center", justifyContent: 'center', backgroundColor: colors.primary }]}>
        <ActivityIndicator size={30} />
      </View>
    )
  }

  if (!isLogout) {
    return (
      <View style={[{ flex: 1, alignItems: "center", justifyContent: 'center', backgroundColor: colors.primary }]}>
        <ActivityIndicator size={30} />
      </View>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, { backgroundColor: colors.primary }]}>
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
        <View style={styles.logoArea}>
          <Text style={{
            fontFamily: 'roboto',
            color: 'white',
            fontSize: 25,
            fontWeight: '900',
          }}>Quizaar</Text>
        </View>
        {!user ?
          <View style={styles.main}>
            <View style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              padding: 15
            }}>
              <View
                style={{
                  width: "100%",
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                {!isPicAdd ?
                  <Pressable
                    disabled={user}
                    android_ripple={{ color: colors.primary }}
                    style={[styles.userPicAdd, {
                      width: 45,
                      height: 45,
                    }]}
                    onPress={pickImage}>
                    <AntDesign
                      name="plus"
                      color={"black"}
                      size={30} />
                  </Pressable> :

                  <TouchableOpacity disabled={user} onPress={pickImage}>
                    {userImage && <Image style={[styles.userProfilePic, { zIndex: 9999, }]} source={{ uri: userImage }} />}
                  </TouchableOpacity>
                }
              </View>
              <View style={styles.textInpArea}>
                {!true &&
                  <View style={{
                    zIndex: 99999,
                    position: 'absolute',
                    right: 8,
                    top: -1,
                    paddingVertical: 5,
                    paddingHorizontal: 8,
                    borderRadius: 10,
                    borderEndEndRadius: 0,
                    backgroundColor: 'lightgray',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={{ color: 'black', fontSize: 11, }}>you cant use this user name</Text>
                  </View>}
                {!isValidUserName &&
                  <View style={{
                    zIndex: 99999,
                    position: 'absolute',
                    right: 0,
                    margin: 10,
                    width: 40,
                    height: 40,
                    backgroundColor: 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <MaterialCommunityIcons
                      name='alert-box-outline'
                      color={'#9f7070'}
                      size={20}
                    />
                  </View>}
                <TextInput
                  ref={loginInputRef}
                  label={inputUserName ? "" : 'username'}
                  maxLength={15}
                  textColor={isInpFocused ? "lightgray" : "black"}
                  value={inputUserName}
                  onChangeText={handleChange}
                  mode="outlined"
                  outlineColor={isInpFocused ? "black" : "transparent"}
                  activeOutlineColor={isValidUserName ? "gray" : '#9f7070'}
                  style={[styles.userInput, { backgroundColor: isInpFocused ? colors.primary : "lightgray" }]}
                  onFocus={() => { setIsInpFocused(true) }}
                  onBlur={() => { setIsInpFocused(false) }}
                />
              </View>
              <View style={styles.loginBtnArea}>
                <Pressable
                  disabled={user}
                  android_ripple={{ color: colors.primary, borderless: false }}
                  style={[{
                    borderRadius: 5,
                    width: '95%',
                    height: 38,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    backgroundColor: isValidUserName ? "#dba400" : "#dba40085",
                  }]}
                  onPress={() => {
                    if (!user) { loginTrue() }
                    else { navigation.navigate("Home") }
                  }}>
                  {isGradient && <LinearGradient
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
                    colors={[colors.primary, "#dba400"]}
                  />}
                  <MaterialIcons
                    name="arrow-forward-ios"
                    color={"black"}
                    size={15}
                  />
                </Pressable>
              </View>
            </View>

            <View style={{
              height: 25,
              zIndex: 99,
              backgroundColor: "transparent",
              width: "85%",
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: "center",
            }}>
              <View style={{
                backgroundColor: 'lightgray',
                height: 0.5,
                opacity: 0.4,
                flex: 1,
              }}>
              </View>
              <Text style={{
                color: 'lightgray',
                paddingHorizontal: 15,
              }}>or continue with</Text>
              <View style={{
                backgroundColor: 'lightgray',
                height: 0.5,
                opacity: 0.4,
                flex: 1,
              }}>
              </View>
            </View>
            <View style={styles.googleLoginArea}>
              <Pressable
                disabled={user}
                style={[{
                  backgroundColor: colors.secondary,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  overflow: 'hidden',
                  height: 40,
                  width: '85%'
                }]}
                android_ripple={{ color: colors.primary, borderless: false }}
                onPress={signIn}
              >
                {isGradient && <LinearGradient
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
                  colors={["#2e487acc", colors.secondary]}
                />}
                <View style={{
                  width: 40,
                  height: "100%",
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Image
                    source={require('../assets/icons/google.png')}
                    style={{
                      width: 22,
                      height: 22,
                    }}
                  />

                </View>
                <View style={{
                  height: "100%",
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingRight: 15
                }}>
                  <Text style={{
                    color: 'white',
                    fontSize: 15,
                    fontWeight: '600',
                  }}>Continue with Google</Text>
                </View>
              </Pressable>


            </View>
          </View>
          :
          <UserIn />
        }

        <SnackBarPaper
          wrapperStyle={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 99999 }}
          visible={isPickErr}
          onDismiss={() => { setIsPickErr(false) }}
          action={{ label: 'Undo', onPress: () => { setIsPickErr(false) }, }}>
          You did not select any image.
        </SnackBarPaper>
        {!isValidUserName &&
          <SnackBar
            label={"Invalid username format"}
            icon={'alert-box-outline'}
            flexRow={'row'}
            top={'10%'}
          />}
        <View style={{
          height: 100,
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}>

          <CopyrightsFooter />
        </View>

        {loginExplane && <View style={{
          zIndex: 9999,
          backgroundColor: '#fcfcfc13',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
          height: '100%',
          position: "absolute"
        }}>
          <Pressable
            style={({ pressed }) => [{
              opacity: pressed ? 0.6 : 1,
              backgroundColor: '#3a86ff',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              margin: 50,
              width: 140,
              height: 50
            }]}
            onPress={() => setLoginExplane(false)}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>ok
            </Text>
          </Pressable>
        </View>}
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
  logoArea: {

    flexDirection: 'row',
    width: "85%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  logo: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  main: {
    flex: 1,
    width: "85%",
    justifyContent: 'center',
    alignItems: "center",
    position: 'relative',
    zIndex: 1,
  },
  loginInfo: {

  },
  userPicAdd: {

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "lightgray",
    borderRadius: 8,
  },
  userProfilePic: {
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  textInpArea: {
    position: 'relative',
    width: '100%',
    height: 70,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    zIndex: 1,
  },
  userInput: {
    width: "95%",
    height: 40,
    fontSize: 15,
    fontWeight: "bold",
    borderRadius: 8,
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Cairo_400Regular",
  },
  loginBtnArea: {
    width: '100%',
    height: 65,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    zIndex: 1,
  },
  loginBtn: {
    borderRadius: 5,
    width: '95%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'

  },
  googleLoginArea: {
    width: '100%',
    height: 70,
    backgroundColor: 'transparent',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    zIndex: 1,
  },
  googleBtn: {
    borderWidth: 2,
    shadowColor: 'black',
    shadowOffset: { width: 0.5, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 0,
  },
  googleIcon: {
    backgroundColor: 'white',
    color: "#1e30a6",
    borderRadius: 50,
    padding: 5,
  },
  gustLoginArea: {
    position: "absolute",
    bottom: '15%',
    width: '100%',
    height: 70,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    zIndex: 1,
  },
  gustBtn: {
    borderWidth: 2,
    shadowColor: 'black',
    shadowOffset: { width: 0.5, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 0,
  },
  footer: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  backEffect: {
    backgroundColor: "white",
    width: "100%",
    height: "90%",
    borderRadius: 20,
    position: "absolute",
    bottom: -20,
    zIndex: 0
  },

});

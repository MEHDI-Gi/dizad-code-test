import { Text, View , } from 'react-native';
import React, {useContext , useEffect} from 'react';
import { DataContext } from '../context/contextData';
export default function FirstPage({navigation}) {
  useEffect(()=>{
    const pageTimeOut = setTimeout(()=>{
        navigation.navigate('Login', {name: 'Login'});
    }, 50000)
    return () => clearTimeout(pageTimeOut);
  })
  const {
      colors
  } = useContext(DataContext);
  return(
    <>
      <View style={{justifyContent: "center", alignItems: "center", width: "100%",height: "100%" ,backgroundColor: "#E4E8DC" }}>
        <Text style={{color: "white"}}>WELCOME</Text>
          <Text></Text>
      </View>
    </>
  )
}
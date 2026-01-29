import { StatusBar, StyleSheet,  useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { DataProvider } from './src/context/contextData';

import Main from './src/screens/Main';
import { useEffect } from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar';

function App() {

  useEffect(() => {
    SystemNavigationBar.stickyImmersive();
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar hidden={true} barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <DataProvider>
          <Main />
        </DataProvider>
      </View>
    </SafeAreaProvider>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 1,
  },
});

export default App;

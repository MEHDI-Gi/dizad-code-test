import {
  AppState,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DataProvider } from './src/context/contextData';

import Main from './src/pages/Main';
import Updates from './src/components/Updates';
import { useEffect, useState } from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar';
function App() {
  // useEffect(() => {
  //   SystemNavigationBar.stickyImmersive();
  // }, []);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        SystemNavigationBar.stickyImmersive();
      }
    });

    // Initial call
    SystemNavigationBar.stickyImmersive();

    return () => subscription?.remove();
  }, []);

  const isDarkMode = useColorScheme() === 'dark';
  const update = false; // Replace with your logic to determine if an update is available

  if (update) {
    return <Updates />;
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
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

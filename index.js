import { Text, TextInput } from 'react-native';

// Disable font scaling - JavaScript version (no ! operator)
if (Text.defaultProps === undefined) {
    Text.defaultProps = {};
}
Text.defaultProps.allowFontScaling = false;

if (TextInput.defaultProps === undefined) {
    TextInput.defaultProps = {};
}
TextInput.defaultProps.allowFontScaling = false;

import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

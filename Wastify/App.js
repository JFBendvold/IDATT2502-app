import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens'; // Import enableScreens
import RootNavigator from './navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';

enableScreens(); // Call this function to enable react-native-screens

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

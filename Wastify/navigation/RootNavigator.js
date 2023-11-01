import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/screens/HomeScreen';
import ScanScreen from '../components/screens/ScanScreen';
import ResultScreen from '../components/screens/ResultScreen';
import SelectCategoryScreen from '../components/screens/SelectCategoryScreen';

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Scan" component={ScanScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SelectCategory" component={SelectCategoryScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
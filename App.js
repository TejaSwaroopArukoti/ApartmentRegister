import * as React from 'react';
import { Text, View ,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './views/Home';
import AddEntry from './views/AddEntry';
import ViewEntries from './views/ViewEntries';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddEntry" component={AddEntry} />
      <Stack.Screen name="ViewEntries" component={ViewEntries} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;
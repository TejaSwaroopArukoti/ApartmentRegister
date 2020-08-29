import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './views/Home';
import AddEntry from './views/AddEntry';
import {Provider} from 'react-redux';
import configureStore from './views/store';

const Stack = createStackNavigator();

function App() {
  return (
  <Provider store={configureStore()}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddEntry" component={AddEntry} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  );
}

export default App;
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';
import colors from '../config/colors';
import LoginScreen from './../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShadowVisible: false,
    }}>
    <Stack.Screen component={AppNavigator} name="DevArena" />
  </Stack.Navigator>
);

export default MainNavigator;

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from '../routes/routes';
import PersonalInformationScreen from '../screens/PersonalInformationScreen';
import SettingsScreen from './../screens/SettingsScreen';
import UpdatePasswordScreen from './../screens/UpdatePasswordScreen';
import colors from '../config/colors';
import PersonalInfoNavigator from './PersonalInfoNavigator';

const Stack = createNativeStackNavigator();

const AccountSettingsNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: colors.red,
      animation: 'slide_from_right',
    }}>
    <Stack.Screen
      name={routes.NESTED_SETTINGS}
      options={{headerTitle: 'Settings'}}
      component={SettingsScreen}
    />
    <Stack.Screen
      name={routes.PERSONAL_INFORMATION}
      options={{headerShown: false}}
      component={PersonalInfoNavigator}
    />
    <Stack.Screen
      name={routes.UPDATE_PASSWORD}
      options={{headerTitle: 'Update Password'}}
      component={UpdatePasswordScreen}
    />
  </Stack.Navigator>
);

export default AccountSettingsNavigator;

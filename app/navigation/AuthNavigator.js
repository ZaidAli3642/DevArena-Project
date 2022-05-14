import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './../screens/LoginScreen';
import WelcomeScreen from './../screens/WelcomeScreen';
import RegisterScreen from './../screens/RegisterScreen';
import colors from '../config/colors';
import routes from '../routes/routes';
import EmailVerificationScreen from './../screens/EmailVerificationScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: colors.darkBlue},
      headerTintColor: colors.white,
      headerTitleAlign: 'center',
    }}>
    <Stack.Screen
      name={routes.WELCOME}
      component={WelcomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={routes.LOGIN}
      component={LoginScreen}
      options={{animation: 'slide_from_right'}}
    />
    <Stack.Screen
      name={routes.REGISTER}
      component={RegisterScreen}
      options={{animation: 'slide_from_right'}}
    />
    <Stack.Screen
      name={routes.EMAIL_VERIFY}
      component={EmailVerificationScreen}
      options={{animation: 'slide_from_right'}}
    />
  </Stack.Navigator>
);

export default AuthNavigator;

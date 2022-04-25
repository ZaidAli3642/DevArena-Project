import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import colors from '../config/colors';
import routes from '../routes/routes';
import AppNavigator from './AppNavigator';
import PostViewScreen from '../screens/PostViewScreen';
import ProfileScreen from './../screens/ProfileScreen';
import SettingsScreen from './../screens/SettingsScreen';
import GroupsForYouScreen from './../screens/GroupForYouScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routes.MAIN}
      component={AppNavigator}
      options={{headerShown: false}}
    />

    <Stack.Screen
      name={routes.POST_SCREEN}
      options={{
        headerTitle: 'Post',
        headerTintColor: colors.red,
        animation: 'slide_from_right',
      }}
      component={PostViewScreen}
    />
    <Stack.Screen
      name={routes.PROFILE}
      options={{
        headerTitle: 'Profile',
        headerTintColor: colors.red,
        animation: 'slide_from_right',
      }}
      component={ProfileScreen}
    />
    <Stack.Screen
      name={routes.SETTINGS}
      options={{
        headerTitle: 'Settings',
        headerTintColor: colors.red,
        animation: 'slide_from_right',
      }}
      component={SettingsScreen}
    />
    <Stack.Screen
      name={routes.GROUPS}
      options={{
        headerTitle: 'Group',
        headerTintColor: colors.red,
        animation: 'slide_from_right',
      }}
      component={GroupsForYouScreen}
    />
  </Stack.Navigator>
);

export default MainNavigator;

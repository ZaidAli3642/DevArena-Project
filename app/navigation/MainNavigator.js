import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import colors from '../config/colors';
import routes from '../routes/routes';
import AppNavigator from './AppNavigator';
import PostViewScreen from '../screens/PostViewScreen';
import ProfileScreen from './../screens/ProfileScreen';
import AccountSettingsNavigator from './AccountSettingsNavigator';
import MainGroupsNavigator from './MainGroupsNavigator';
import GroupsScreen from './../screens/GroupsScreen';
import GroupsNavigator from './GroupsNavigator';

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
      options={{headerShown: false, animation: 'slide_from_right'}}
      component={AccountSettingsNavigator}
    />
    <Stack.Screen
      name={routes.GROUPS}
      options={{
        headerTitle: 'Group',
        headerTintColor: colors.red,
        animation: 'slide_from_right',
        headerShadowVisible: false,
      }}
      component={GroupsNavigator}
    />
    <Stack.Screen
      name={routes.SINGLE_GROUP}
      options={{
        animation: 'slide_from_right',
        title: 'Group',
        headerTintColor: colors.red,
      }}
      component={GroupsScreen}
    />
  </Stack.Navigator>
);

export default MainNavigator;

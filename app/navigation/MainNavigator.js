import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import colors from '../config/colors';
import routes from '../routes/routes';
import AppNavigator from './AppNavigator';
import PostViewScreen from '../screens/PostViewScreen';
import ProfileScreen from './../screens/ProfileScreen';
import AccountSettingsNavigator from './AccountSettingsNavigator';
import GroupsScreen from './../screens/GroupsScreen';
import GroupsNavigator from './GroupsNavigator';
import ApproveRequestScreen from '../screens/ApproveRequestScreen';
import FollowRequests from '../screens/FollowRequests';
import FollowersScreen from './../screens/FollowersScreen';
import FollowingsScreen from './../screens/FollowingsScreen';
import AllMembersScreen from './../components/AllMembersScreen';
import UpdateGroupScreen from './../screens/UpdateGroupScreen';
import InfoUpdateScreen from '../screens/InfoUpdateScreen';
import AddUserScreen from './../components/AddUserScreen';

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
    <Stack.Screen
      name={routes.REQUESTS}
      options={{
        animation: 'slide_from_right',
        title: 'Group Requests',
        headerTintColor: colors.red,
      }}
      component={ApproveRequestScreen}
    />
    <Stack.Screen
      name={routes.FOLLOW}
      options={{
        animation: 'slide_from_right',
        title: 'Follow Requests',
        headerTintColor: colors.red,
      }}
      component={FollowRequests}
    />
    <Stack.Screen
      name={routes.FOLLWERS}
      options={{
        animation: 'slide_from_right',
        title: 'Followers',
        headerTintColor: colors.red,
      }}
      component={FollowersScreen}
    />
    <Stack.Screen
      name={routes.FOLLOWINGS}
      options={{
        animation: 'slide_from_right',
        title: 'Followings',
        headerTintColor: colors.red,
      }}
      component={FollowingsScreen}
    />
    <Stack.Screen
      name={routes.ALL_MEMBERS}
      options={{
        animation: 'slide_from_right',
        title: 'All Group Members',
        headerTintColor: colors.red,
      }}
      component={AllMembersScreen}
    />
    <Stack.Screen
      name={routes.UPDATE_GROUP}
      options={{
        animation: 'slide_from_right',
        title: 'Update Group Details',
        headerTintColor: colors.red,
      }}
      component={UpdateGroupScreen}
    />
    <Stack.Screen
      name={routes.USER_INFO_UPDATE}
      options={{
        animation: 'slide_from_right',
        title: 'Update Group Details',
        headerTintColor: colors.red,
      }}
      component={InfoUpdateScreen}
    />
    <Stack.Screen
      name={routes.ADD_USER}
      options={{
        animation: 'slide_from_right',
        title: 'Add Users',
        headerTintColor: colors.red,
      }}
      component={AddUserScreen}
    />
  </Stack.Navigator>
);

export default MainNavigator;

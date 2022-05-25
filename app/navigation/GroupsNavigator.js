import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import GroupsForYouScreen from './../screens/GroupForYouScreen';
import colors from '../config/colors';
import CreateGroupScreen from './../screens/CreateGroupScreen';
import JoinGroupsScreen from './../screens/JoinGroupsScreen';
import YourGroupsScreen from './../screens/YourGroupsScreen';
import routes from '../routes/routes';

const Top = createMaterialTopTabNavigator();

const GroupsNavigator = () => (
  <Top.Navigator
    screenOptions={{
      tabBarActiveTintColor: colors.red,
      tabBarInactiveTintColor: colors.mediumGrey,
      tabBarIndicatorStyle: {backgroundColor: colors.red},
      tabBarPressColor: 'transparent',
      tabBarPressOpacity: 0,
    }}>
    <Top.Screen
      name={routes.FOR_YOU}
      component={GroupsForYouScreen}
      options={{
        title: 'For You',
      }}
    />
    <Top.Screen
      name={routes.CREATE_GROUP}
      component={CreateGroupScreen}
      options={{
        title: 'Create Group',
      }}
    />
    <Top.Screen
      name={routes.JOIN_GROUP}
      component={JoinGroupsScreen}
      options={{
        title: 'Join Group',
      }}
    />
    <Top.Screen
      name={routes.YOUR_GROUPS}
      component={YourGroupsScreen}
      options={{
        title: 'Your Groups',
      }}
    />
  </Top.Navigator>
);

export default GroupsNavigator;

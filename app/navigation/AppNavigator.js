import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CodeEditorScreen from './../screens/CodeEditorScreen';
import MenuScreen from './../screens/MenuScreen';
import NewsFeedScreen from './../screens/NewsFeedScreen';
import NotificationScreen from './../screens/NotificationScreen';
import QueryFeedScreen from './../screens/QueryFeedScreen';
import routes from '../routes/routes';
import colors from '../config/colors';
import AppHeader from '../components/AppHeader';

const Top = createMaterialTopTabNavigator();

const AppNavigator = () => (
  <>
    <AppHeader />
    <Top.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor: colors.mediumGrey,
        tabBarIconStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarIndicatorStyle: {backgroundColor: colors.red},
      }}>
      <Top.Screen
        name={routes.HOME}
        component={NewsFeedScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={25} />
          ),
        }}
      />
      <Top.Screen
        name={routes.QUERY}
        component={QueryFeedScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="question-answer" color={color} size={25} />
          ),
        }}
      />
      <Top.Screen
        name={routes.CODE}
        component={CodeEditorScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="code-tags" color={color} size={25} />
          ),
        }}
      />

      <Top.Screen
        name={routes.NOTIFICATION}
        component={NotificationScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="notifications" color={color} size={25} />
          ),
        }}
      />
      <Top.Screen
        name={routes.MENU}
        component={MenuScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="menu" color={color} size={25} />
          ),
        }}
      />
    </Top.Navigator>
  </>
);

export default AppNavigator;

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import colors from '../config/colors';
import PostViewScreen from './../screens/PostViewScreen';
import routes from '../routes/routes';
import NotificationScreen from './../screens/NotificationScreen';

const Stack = createNativeStackNavigator();

const NotificationNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={routes.NESTED_NOTIFICATION}
      component={NotificationScreen}
    />
    <Stack.Screen
      component={PostViewScreen}
      options={{animation: 'slide_from_bottom'}}
      name={routes.POST_SCREEN}
    />
  </Stack.Navigator>
);

export default NotificationNavigator;

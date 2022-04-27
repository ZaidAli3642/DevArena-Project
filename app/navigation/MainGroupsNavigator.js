import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import GroupsNavigator from './GroupsNavigator';
import routes from '../routes/routes';

const Stack = createNativeStackNavigator();

const MainGroupsNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{headerShown: false}}
      name={routes.MAIN_GROUP}
      component={GroupsNavigator}
    />
  </Stack.Navigator>
);

export default MainGroupsNavigator;

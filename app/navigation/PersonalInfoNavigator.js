import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import routes from '../routes/routes';
import PersonalInformationScreen from '../screens/PersonalInformationScreen';
import colors from '../config/colors';
import InfoUpdateScreen from './../screens/InfoUpdateScreen';
import InfoUpdatePickerScreen from './../screens/InfoUpdatePickerScreen';

const Stack = createNativeStackNavigator();

const PersonalInfoNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: 'Personal Information',
      headerTintColor: colors.red,
      animation: 'slide_from_right',
    }}>
    <Stack.Screen
      name={routes.NESTED_PERSONAL_INFORMATION}
      component={PersonalInformationScreen}
    />
    <Stack.Screen
      name={routes.USER_INFO_UPDATE}
      options={{headerTitle: 'Update Information'}}
      component={InfoUpdateScreen}
    />
    <Stack.Screen
      name={routes.USER_CATEGORY_INFO_UPDATE}
      component={InfoUpdatePickerScreen}
    />
  </Stack.Navigator>
);

export default PersonalInfoNavigator;

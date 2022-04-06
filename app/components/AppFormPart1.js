import React from 'react';
import {View, ScrollView} from 'react-native';
import {useFormikContext} from 'formik';

import AppFormField from './AppFormField';
import AppHeadingText from './AppHeadingText';

function AppFormPart1() {
  return (
    <View style={{width: '100%'}}>
      <AppHeadingText>Sign Up</AppHeadingText>

      <AppFormField
        name="firstName"
        iconName="account"
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="default"
        placeholder="First Name"
      />
      <AppFormField
        name="lastName"
        iconName="account"
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="default"
        placeholder="Last Name"
      />
      <AppFormField
        name="email"
        iconName="email"
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
      />
      <AppFormField
        name="password"
        iconName="lock"
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="default"
        placeholder="Password"
        secureTextEntry={true}
      />
    </View>
  );
}

export default AppFormPart1;

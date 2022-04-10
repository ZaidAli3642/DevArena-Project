import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../config/colors';

import AppFormField from './AppFormField';
import AppHeadingText from './AppHeadingText';

function AppFormPart1() {
  return (
    <View style={{width: '100%'}}>
      <AppHeadingText style={styles.heading}>Sign Up</AppHeadingText>

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

const styles = StyleSheet.create({
  heading: {
    color: colors.white,
  },
});

export default AppFormPart1;

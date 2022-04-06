import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as yup from 'yup';

import colors from '../config/colors';
import AppText from '../components/AppText';
import SubmitButton from '../components/SubmitButton';
import AppFormField from '../components/AppFormField';
import AppForm from '../components/AppForm';
import AppHeadingText from './../components/AppHeadingText';

const validationSchema = yup.object().shape({
  email: yup.string().required().email().label('Email'),
  password: yup.string().required().min(10).max(15).label('Password'),
});

function LoginScreen() {
  return (
    <View style={styles.container}>
      <AppHeadingText style={styles.loginText}>Log In</AppHeadingText>
      <AppForm
        initialValues={{email: '', password: ''}}
        onSubmit={values => console.log(values)}
        validationSchema={validationSchema}>
        <AppFormField
          name="email"
          iconName="email"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
        />

        <AppFormField
          autoCorrect={false}
          autoCapitalize="none"
          iconName="lock"
          keyboardType="default"
          name="password"
          placeholder="Password"
          secureTextEntry={true}
        />

        <AppText
          onPress={() => console.log('Forgot Pressed!')}
          style={styles.text}>
          Forgot Password?
        </AppText>
        <SubmitButton title="LOGIN" />
      </AppForm>

      <View style={styles.registerContainer}>
        <AppText onPress={() => console.log('Forgot Password!')}>
          Don't have an account?
        </AppText>
        <AppText
          onPress={() => console.log('Sign up Pressed!')}
          style={styles.signup}>
          Sign up
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkBlue,
    flex: 1,
    padding: 25,
  },
  text: {
    color: colors.red,
    textAlign: 'center',
    marginVertical: 20,
  },
  loginText: {
    marginBottom: 40,
  },
  registerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  signup: {
    color: colors.red,
    marginLeft: 10,
  },
});
export default LoginScreen;

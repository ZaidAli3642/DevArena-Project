import React from 'react';
import {StyleSheet} from 'react-native';

import colors from './app/config/colors';
import EmailVerificationScreen from './app/screens/EmailVerificationScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';

function App() {
  return <EmailVerificationScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    padding: 25,
  },
});
export default App;

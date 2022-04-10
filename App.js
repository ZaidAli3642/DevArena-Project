import React from 'react';
import {View, StyleSheet} from 'react-native';

import colors from './app/config/colors';
import EmailVerificationScreen from './app/screens/EmailVerificationScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import NewsFeedScreen from './app/screens/NewsFeedScreen';
import PostCard from './app/components/PostCard';

function App() {
  return <NewsFeedScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mediumWhite,
  },
});
export default App;

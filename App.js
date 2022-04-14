import React from 'react';
import {View, StyleSheet} from 'react-native';

import colors from './app/config/colors';
import NewsFeedScreen from './app/screens/NewsFeedScreen';
import RegisterScreen from './app/screens/RegisterScreen';

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

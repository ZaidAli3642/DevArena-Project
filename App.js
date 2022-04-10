import React from 'react';
import {View, StyleSheet} from 'react-native';

import colors from './app/config/colors';
import NewsFeedScreen from './app/screens/NewsFeedScreen';

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

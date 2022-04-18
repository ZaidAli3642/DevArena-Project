import React from 'react';
import {StyleSheet} from 'react-native';

import colors from './app/config/colors';
import NewsFeedScreen from './app/screens/NewsFeedScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import QueryFeedScreen from './app/screens/QueryFeedScreen';

function App() {
  return <QueryFeedScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mediumWhite,
  },
});
export default App;

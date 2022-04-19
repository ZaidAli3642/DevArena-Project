import React from 'react';
import {StyleSheet} from 'react-native';

import colors from './app/config/colors';
import NotificationScreen from './app/screens/NotificationScreen';

function App() {
  return <NotificationScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mediumWhite,
  },
});
export default App;

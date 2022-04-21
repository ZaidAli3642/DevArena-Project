import React from 'react';
import {StyleSheet} from 'react-native';

import colors from './app/config/colors';
import JoinGroupsScreen from './app/screens/JoinGroupsScreen';

function App() {
  return <JoinGroupsScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mediumWhite,
  },
});
export default App;

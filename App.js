import React from 'react';
import {StyleSheet} from 'react-native';

import colors from './app/config/colors';
import CreateGroupScreen from './app/screens/CreateGroupScreen';
import GroupsScreen from './app/screens/GroupsScreen';

function App() {
  return <CreateGroupScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mediumWhite,
  },
});
export default App;

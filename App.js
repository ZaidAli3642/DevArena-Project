import React from 'react';
import {StyleSheet} from 'react-native';

import colors from './app/config/colors';
import JoinGroupsScreen from './app/screens/JoinGroupsScreen';
import GroupsForYouScreen from './app/screens/GroupForYouScreen';
import GroupsScreen from './app/screens/GroupsScreen';
import NewsFeedScreen from './app/screens/NewsFeedScreen';

function App() {
  return <GroupsScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mediumWhite,
  },
});
export default App;

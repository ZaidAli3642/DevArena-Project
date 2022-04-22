import React from 'react';
import {StyleSheet} from 'react-native';

import colors from './app/config/colors';
import CodeEditorScreen from './app/screens/CodeEditorScreen';

function App() {
  return <CodeEditorScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mediumWhite,
  },
});
export default App;

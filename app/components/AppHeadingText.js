import React from 'react';
import {View, StyleSheet} from 'react-native';

import AppText from './AppText';

function AppHeadingText({children, style}) {
  return <AppText style={[styles.text, style]}>{children}</AppText>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 25,
  },
});
export default AppHeadingText;

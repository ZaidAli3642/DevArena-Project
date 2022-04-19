import React from 'react';
import {Text, StyleSheet} from 'react-native';

import colors from '../config/colors';

function AppText({children, style, numberOfLines, onPress}) {
  return (
    <Text
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={[styles.text, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: 'Roboto',
    color: colors.dark,
  },
});
export default AppText;

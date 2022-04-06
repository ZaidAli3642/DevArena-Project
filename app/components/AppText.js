import React from 'react';
import {Text, StyleSheet} from 'react-native';

import colors from '../config/colors';

function AppText({children, style, onPress}) {
  return (
    <Text onPress={onPress} style={[styles.text, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: 'Roboto',
    color: colors.white,
  },
});
export default AppText;

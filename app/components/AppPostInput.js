import React from 'react';
import {TouchableHighlight, StyleSheet} from 'react-native';

import AppText from './AppText';
import colors from '../config/colors';

function AppPostInput({onPress, placeholder}) {
  return (
    <TouchableHighlight
      style={styles.postInput}
      underlayColor={colors.lightGrey}
      onPress={onPress}>
      <AppText style={styles.text}>{placeholder}</AppText>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  postInput: {
    backgroundColor: colors.lightGrey,
    borderRadius: 40,
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 20,
    padding: 10,
  },
  text: {
    color: colors.mediumGrey,
  },
});
export default AppPostInput;

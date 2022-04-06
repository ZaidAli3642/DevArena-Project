import React from 'react';
import {View, StyleSheet} from 'react-native';

import colors from '../config/colors';
import AppText from './AppText';

function ErrorMessage({error}) {
  if (!error) return null;
  return <AppText style={styles.error}>{error}</AppText>;
}

const styles = StyleSheet.create({
  error: {
    color: colors.red,
  },
});
export default ErrorMessage;

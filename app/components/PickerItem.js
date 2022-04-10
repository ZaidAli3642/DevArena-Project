import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';

function PickerItem({label, onPress}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPress}>
      <AppText style={styles.label}>{label}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  label: {
    color: colors.white,
  },
});
export default PickerItem;

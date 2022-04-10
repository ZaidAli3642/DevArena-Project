import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AppText from './AppText';
import colors from '../config/colors';

function PostItem({title, iconName, iconColor}) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <MaterialCommunityIcons name={iconName} size={40} color={iconColor} />
      <AppText style={styles.text}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.mediumGrey,
    marginLeft: 10,
  },
});
export default PostItem;

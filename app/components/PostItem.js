import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AppText from './AppText';
import colors from '../config/colors';

function PostItem({title, iconName, iconColor, image}) {
  return (
    <>
      <TouchableOpacity activeOpacity={0.7} style={styles.container}>
        {!image && (
          <>
            <MaterialCommunityIcons
              name={iconName}
              size={40}
              color={iconColor}
            />
            <AppText style={styles.text}>{title}</AppText>
          </>
        )}
      </TouchableOpacity>
      {image && <Image style={styles.image} source={image} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    borderTopColor: colors.lightGrey,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginLeft: 10,
  },
  text: {
    color: colors.mediumGrey,
    marginLeft: 10,
  },
});
export default PostItem;

import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';

import AppText from '../components/AppText';
import colors from '../config/colors';
import AppButton from './AppButton';

function GroupItem({
  name,
  description,
  image,
  IconComponent,
  roundedImage = false,
  onPress,
  join_id,
  addUser,
  removed,
  added,
  add = false,
  removeMembers,
}) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container}>
        {IconComponent}
        {image && (
          <Image
            style={[styles.image, {borderRadius: roundedImage ? 40 : 10}]}
            source={{uri: image}}
          />
        )}
        {!image && !IconComponent && (
          <Image
            style={[styles.image, {borderRadius: roundedImage ? 40 : 10}]}
            source={require('../assets/profileAvatar.jpeg')}
          />
        )}

        <View style={styles.descriptionContainer}>
          <AppText style={styles.text} numberOfLines={1}>
            {name}
          </AppText>
          {description && (
            <AppText style={styles.description} numberOfLines={1}>
              {description}
            </AppText>
          )}
        </View>
        {join_id && (
          <AppButton
            title={removed ? 'Removed' : 'Remove'}
            textStyle={styles.textStyle}
            style={styles.button}
            onPress={removeMembers}
          />
        )}
        {add && (
          <AppButton
            title={added ? 'Added' : 'add'}
            textStyle={styles.textStyle}
            style={styles.button}
            onPress={addUser}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 15,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  descriptionContainer: {
    flex: 1,
    marginLeft: 10,
  },
  text: {
    color: colors.dark,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: colors.mediumGrey,
  },
});
export default GroupItem;

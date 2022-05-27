import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';

import AppText from '../components/AppText';
import colors from '../config/colors';

function GroupItem({
  name,
  description,
  image,
  IconComponent,
  roundedImage = false,
  approve_request = true,
  onPress,
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
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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

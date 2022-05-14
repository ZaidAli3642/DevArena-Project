import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';

import AppText from '../components/AppText';
import colors from '../config/colors';
import AppButton from './AppButton';

function GroupItem({item, onPress}) {
  const {groupName, groupDescription, groupImage} = item;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri:
              groupImage ||
              'https://icdn.digitaltrends.com/image/digitaltrends/avatars-character-line-up_white_bg-copy.jpg',
          }}
        />
        <View style={styles.groupDescriptionContainer}>
          <AppText style={styles.text} numberOfLines={1}>
            {groupName}
          </AppText>
          <AppText style={styles.description} numberOfLines={1}>
            {groupDescription}
          </AppText>
        </View>
        <AppButton
          style={styles.button}
          textStyle={styles.textStyle}
          title="Join"
        />
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
    marginRight: 10,
  },
  groupDescriptionContainer: {
    flex: 1,
  },
  text: {
    color: colors.dark,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: colors.mediumGrey,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  textStyle: {
    fontSize: 15,
  },
});
export default GroupItem;

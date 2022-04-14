import React, {useState} from 'react';
import {Image, View, StyleSheet} from 'react-native';

import colors from '../config/colors';
import AppText from './AppText';

function PostComment({item}) {
  const [like, setLike] = useState(false);

  const {userImage, username, description, date} = item;
  return (
    <View>
      <View style={styles.container}>
        <Image source={userImage} style={styles.image} />
        <View style={styles.descriptionContainer}>
          <AppText>{username}</AppText>
          <AppText style={styles.description}>{description}</AppText>
          <View style={styles.iconsContainer}>
            <AppText style={styles.text}>{date}</AppText>
            <AppText
              style={[
                styles.text,
                styles.like,
                {color: like ? colors.red : colors.lightBrown},
              ]}
              onPress={() => {
                setLike(!like);
              }}>
              like
            </AppText>
            <AppText
              style={[styles.text, styles.reply]}
              onPress={() => console.log('Replied')}>
              reply
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionContainer: {
    margin: 10,
    flex: 1,
    padding: 7,
    paddingLeft: 20,
    backgroundColor: colors.lightGrey,
    borderRadius: 20,
  },
  description: {
    fontSize: 15,
    color: colors.mediumGrey,
  },
  iconsContainer: {
    flexDirection: 'row',
    marginTop: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 60,
  },
  like: {
    marginLeft: 10,
  },
  reply: {
    marginLeft: 10,
  },
  text: {
    fontSize: 13,
    color: colors.lightBrown,
  },
});
export default PostComment;

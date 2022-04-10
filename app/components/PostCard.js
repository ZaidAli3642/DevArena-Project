import React from 'react';
import {View, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AppText from './AppText';
import colors from '../config/colors';

const icons = [
  {
    id: 1,
    iconName: 'thumb-up-outline',
    title: 'Like',
    onPress: () => console.log('Liked'),
  },
  {
    id: 2,
    iconName: 'thumb-down-outline',
    title: 'Dislike',
    onPress: () => console.log('Disliked'),
  },
  {
    id: 3,
    iconName: 'comment-outline',
    title: 'Comment',
    onPress: () => console.log('Commented'),
  },
  {
    id: 4,
    iconName: 'share-outline',
    title: 'Share',
    onPress: () => console.log('Shared'),
  },
];

function PostCard({description, postImage, userImage, username, date}) {
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image style={styles.image} source={userImage} />
        <View style={styles.userDescription}>
          <AppText style={styles.text}>{username}</AppText>
          <AppText style={styles.date}>{date}</AppText>
        </View>
      </View>
      {description && (
        <AppText style={styles.description}>{description}</AppText>
      )}
      {postImage && <Image style={styles.postImage} source={postImage} />}

      <View style={styles.iconContainer}>
        {icons.map(icon => (
          <TouchableWithoutFeedback key={icon.id} onPress={icon.onPress}>
            <View style={styles.singleIcon}>
              <MaterialCommunityIcons
                name={icon.iconName}
                size={25}
                color={colors.mediumGrey}
              />
              <AppText style={styles.iconTitle}>{icon.title}</AppText>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginVertical: 10,
    paddingVertical: 10,
    elevation: 10,
  },
  date: {
    fontSize: 15,
    color: colors.mediumGrey,
  },
  description: {
    color: colors.dark,
    marginBottom: 5,
    marginHorizontal: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  iconTitle: {
    color: colors.mediumGrey,
    fontSize: 15,
  },
  singleIcon: {
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
  userContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  userDescription: {
    marginLeft: 10,
  },
  postImage: {
    width: '100%',
    height: 250,
  },
});
export default PostCard;

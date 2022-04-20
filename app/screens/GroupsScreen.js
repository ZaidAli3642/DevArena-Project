import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {format} from 'timeago.js';

import AppButton from './../components/AppButton';
import colors from '../config/colors';
import PostCard from '../components/PostCard';
import AppHeadingText from '../components/AppHeadingText';

const groupPosts = [
  {
    gourpPostId: 1,
    userImage: require('../assets/girl1.jpg'),
    username: 'Emma Watson',
    date: format(new Date()),
    description: 'Wow! what a beautiful view!',
    groupName: 'Group 1',
    // postImage: require('../assets/nature1.jpg'),
  },
  {
    gourpPostId: 2,
    userImage: require('../assets/boy1.jpg'),
    username: 'Tony Stark',
    date: format(new Date()),
    description: 'Yoooooo!',
    groupName: 'Group 2',
    // postImage: require('../assets/nature2.jpg'),
  },
  {
    gourpPostId: 3,
    userImage: require('../assets/girl2.jpg'),
    username: 'Selena Gomez',
    date: format(new Date()),
    description: 'Need some sunlight!',
    groupName: 'Group 3',
    // postImage: require('../assets/nature3.jpg'),
  },
  {
    gourpPostId: 4,
    userImage: require('../assets/boy2.jpg'),
    username: 'John Kent',
    date: format(new Date()),
    description: 'Be Greatful!',
    groupName: 'Group 4',
    // postImage: require('../assets/nature4.jpg'),
  },
];

function GroupsScreen() {
  return (
    <View style={styles.container}>
      <AppHeadingText style={styles.heading}>Groups</AppHeadingText>
      <View style={styles.buttonContainer}>
        <AppButton
          title="For you"
          onPress={() => console.log('For you')}
          color={colors.mediumGrey}
          textStyle={styles.textStyle}
        />
        <AppButton
          title="Create Group"
          onPress={() => console.log('Create Group')}
          color={colors.mediumGrey}
          textStyle={styles.textStyle}
        />
        <AppButton
          title="Join Group"
          onPress={() => console.log('Join Group')}
          color={colors.mediumGrey}
          textStyle={styles.textStyle}
        />
        <AppButton
          title="Your Groups"
          onPress={() => console.log('Your Groups')}
          color={colors.mediumGrey}
          textStyle={styles.textStyle}
        />
      </View>
      <FlatList
        data={groupPosts}
        keyExtractor={groupPost => groupPost.gourpPostId.toString()}
        renderItem={({item}) => <PostCard item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  heading: {
    marginLeft: 20,
    fontSize: 25,
    marginVertical: 20,
  },
  textStyle: {
    fontSize: 15,
  },
  container: {
    flex: 1,
  },
});
export default GroupsScreen;

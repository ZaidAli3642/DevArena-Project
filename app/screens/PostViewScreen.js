import React from 'react';
import {View, StyleSheet} from 'react-native';
import PostCard from '../components/PostCard';
import {format} from 'timeago.js';

const post = {
  postId: 1,
  userImage: require('../assets/girl1.jpg'),
  username: 'Emma Watson',
  date: format(new Date()),
  description: 'Wow! what a beautiful view!',
  postImage: require('../assets/nature1.jpg'),
};

function PostViewScreen() {
  return (
    <View style={styles.container}>
      <PostCard item={post} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 350,
  },
});
export default PostViewScreen;

import React from 'react';
import {View, StyleSheet} from 'react-native';
import PostCard from '../components/PostCard';
import {format} from 'timeago.js';

const post = {
  postId: 1,
  userImage:
    'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=853&q=80',
  username: 'Emma Watson',
  date: format(new Date()),
  description: 'Wow! what a beautiful view!',
  postImage:
    'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
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

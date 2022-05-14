import React, {useState, useContext} from 'react';
import {Image, ScrollView, View, StyleSheet} from 'react-native';
import {format} from 'timeago.js';

import AppPostInput from '../components/AppPostInput';
import GroupHeader from '../components/GroupHeader';
import PostCard from '../components/PostCard';
import colors from '../config/colors';
import AppModalForm from './../components/AppModalForm';
import AuthContext from './../context/AuthContext';

const posts = [
  {
    postId: 1,
    userImage:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    username: 'Emma Watson',
    date: format(new Date()),
    description: 'Wow! what a beautiful view!',
    postImage:
      'https://images.unsplash.com/photo-1587502537815-0c8b5c9ba39a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    postId: 2,
    userImage:
      'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=853&q=80',
    username: 'Tony Stark',
    date: format(new Date()),
    description: 'Yoooooo!',
    postImage:
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    postId: 3,
    userImage:
      'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=853&q=80',
    username: 'Selena Gomez',
    date: format(new Date()),
    description: 'Need some sunlight!',
    postImage:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    postId: 4,
    userImage:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    username: 'John Kent',
    date: format(new Date()),
    description: 'Be Greatful!',
    postImage:
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
];

function GroupsScreen({route}) {
  const [allPosts, setAllPosts] = useState(posts);
  const [visible, setVisible] = useState(false);

  const groupItem = route.params.group;

  const {user} = useContext(AuthContext);

  const handleSubmit = (values, {resetForm}) => {
    const newPost = {
      postId: Date.now(),
      userImage: user.profileImage,
      username: 'Zaid Saleem',
      date: format(new Date()),
      description: values.description,
      postImage: values.image,
    };

    const newPosts = [newPost, ...allPosts];
    setAllPosts(newPosts);
    setVisible(false);
    resetForm();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <GroupHeader groupItem={groupItem} />

        <View style={styles.inputContainer}>
          <Image
            style={styles.profileImage}
            source={
              user.profileImage
                ? {uri: user.profileImage}
                : require('../assets/profileAvatar.jpeg')
            }
          />
          <AppPostInput
            placeholder="Write Something..."
            style={styles.input}
            onPress={() => setVisible(true)}
          />
        </View>
        <AppModalForm
          userTitle="Zaid Saleem"
          placeholder="What's on your mind?"
          setVisible={setVisible}
          visible={visible}
          handleSubmit={handleSubmit}
        />

        {allPosts.map(post => (
          <PostCard key={post.postId} item={post} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mediumWhite,
  },
  input: {
    marginVertical: 10,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginVertical: 10,
    paddingVertical: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
});
export default GroupsScreen;

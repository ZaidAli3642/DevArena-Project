import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, Image, StyleSheet} from 'react-native';
import {format} from 'timeago.js';

import AppPostInput from './../components/AppPostInput';
import AppModalForm from '../components/AppModalForm';
import PostCard from '../components/PostCard';
import colors from '../config/colors';
import AppText from '../components/AppText';
import AuthContext from './../context/AuthContext';
import apiClient from '../api/client';

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
      'https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80',
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

function NewsFeedScreen() {
  const [visible, setVisible] = useState(false);
  const [allPosts, setAllPosts] = useState(posts);
  const [image, setImage] = useState();

  const {user} = useContext(AuthContext);

  const getUserImage = async () => {
    try {
      const {data} = await apiClient.get(`/image/${user.user_id}`);

      if (data.imageUri) {
        setImage(data.imageUri);
      }
      console.log(image);
    } catch (error) {
      console.log('Error getting image', error);
    }
  };

  useEffect(() => {
    getUserImage();
  }, [image]);

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
    <View style={styles.container}>
      {allPosts.length === 0 ? (
        <>
          <View style={styles.input}>
            <View style={{flex: 0.2}}>
              <Image
                style={styles.image}
                source={
                  image ? {uri: image} : require('../assets/profileAvatar.jpeg')
                }
              />
            </View>
            <View style={{flex: 1}}>
              <AppPostInput
                onPress={() => setVisible(true)}
                placeholder="WRITE SOMETHING!"
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AppText>No posts for now!</AppText>
          </View>
        </>
      ) : (
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          data={allPosts}
          keyExtractor={post => post.postId.toString()}
          ListHeaderComponent={() => (
            <View style={styles.input}>
              <View style={{flex: 0.2}}>
                <Image
                  style={styles.image}
                  source={
                    image
                      ? {uri: image}
                      : require('../assets/profileAvatar.jpeg')
                  }
                />
              </View>
              <View style={{flex: 1}}>
                <AppPostInput
                  onPress={() => setVisible(true)}
                  placeholder="WRITE SOMETHING!"
                />
              </View>
            </View>
          )}
          renderItem={({item}) => {
            return <PostCard item={item} />;
          }}
        />
      )}

      <AppModalForm
        image={image}
        placeholder="What's On Your Mind?"
        setVisible={setVisible}
        userTitle="Muhammad Zaid Saleem"
        visible={visible}
        handleSubmit={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  input: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.white,
    elevation: 10,
  },
});
export default NewsFeedScreen;

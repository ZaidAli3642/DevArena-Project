import React, {useContext, useState} from 'react';
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {format} from 'timeago.js';
import * as ImagePicker from 'react-native-image-picker';

import AppText from '../components/AppText';
import AppModalForm from '../components/AppModalForm';
import AppPostInput from '../components/AppPostInput';
import PostCard from '../components/PostCard';
import ItemSeperator from '../components/ItemSeperator';
import colors from '../config/colors';
import AppButton from '../components/AppButton';
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
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    username: 'Selena Gomez',
    date: format(new Date()),
    description: 'Need some sunlight!',
    postImage:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    postId: 4,
    userImage:
      'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=853&q=80',
    username: 'John Kent',
    date: format(new Date()),
    description: 'Be Greatful!',
    postImage:
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
];

function ProfileScreen() {
  const [visible, setVisible] = useState(false);
  const [allPosts, setAllPosts] = useState(posts);
  const [profileImage, setProfileImage] = useState(null);

  const {user} = useContext(AuthContext);

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibrary({mediaType: 'photo'});
    if (!result.didCancel) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handlePress = () => {
    if (!profileImage) {
      handleSelectImage();
    } else
      Alert.alert(
        'Remove Image',
        'Are you sure you want to remove profile image?',
        [{text: 'Yes', onPress: () => setProfileImage(null)}, {text: 'No'}],
      );
  };

  const handleSubmit = (values, {resetForm}) => {
    const newPost = {
      postId: Date.now(),
      userImage: user.profileImage,
      username: 'Zaid Saleem',
      date: format(new Date()),
      description: values.description,
      postImage: values.image,
    };

    console.log(values);
    const newPosts = [newPost, ...allPosts];
    setAllPosts(newPosts);
    setVisible(false);
    resetForm();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.user}>
          <TouchableOpacity onPress={handlePress} style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={
                user.profileImage
                  ? {uri: user.profileImage}
                  : require('../assets/profileAvatar.jpeg')
              }
            />
          </TouchableOpacity>
          <AppText
            style={
              styles.title
            }>{`${user.firstName} ${user.lastName}`}</AppText>
          <AppText style={styles.description}>{user.category.category}</AppText>
          <AppButton
            style={styles.button}
            textStyle={styles.textStyle}
            color="dodgerblue"
            title="FOLLOW"
          />
        </View>
        <ItemSeperator />
        <View style={styles.input}>
          <View style={{marginHorizontal: 10}}>
            <Image
              style={styles.inputImage}
              source={
                user.profileImage
                  ? {uri: user.profileImage}
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
        <ItemSeperator />
        {allPosts.length === 0 ? (
          <>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AppText>No posts for now!</AppText>
            </View>
          </>
        ) : (
          <View style={styles.postContainer}>
            {allPosts.map(post => (
              <PostCard key={post.postId} item={post} />
            ))}
          </View>
        )}

        <AppModalForm
          placeholder="What's On Your Mind?"
          setVisible={setVisible}
          userTitle="Muhammad Zaid Saleem"
          visible={visible}
          handleSubmit={handleSubmit}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 17,
  },
  container: {
    flex: 1,
  },
  description: {
    fontSize: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    borderWidth: 4,
    borderColor: 'dodgerblue',
    width: 140,
    height: 140,
    borderRadius: 140 / 2,
    overflow: 'hidden',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingRight: 10,
    elevation: 5,
  },
  inputImage: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  postContainer: {
    marginVertical: 5,
  },
  user: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 25,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
export default ProfileScreen;

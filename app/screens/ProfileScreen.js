import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
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
import apiClient from './../api/client';
import AppFormImagePicker from '../components/AppFormImagePicker';
import postsApi from '../api/posts';

function ProfileScreen() {
  const [visible, setVisible] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const {user, setImage, image} = useContext(AuthContext);

  const getUserPosts = async () => {
    try {
      setLoading(true);
      const userPosts = await postsApi.userPosts(user.user_id);

      setAllPosts(userPosts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibrary({mediaType: 'photo'});

    if (result.didCancel || result.errorCode) return;
    const {uri, fileName, type} = result.assets[0];
    setImage(uri);
    // const newImageUri = 'file:///' + image?.split('file:/').join('');
    const photo = {
      uri: uri,
      name: fileName,
      type: type,
    };

    try {
      const formdata = new FormData();

      formdata.append('image', photo);

      formdata.append('user_id', user.user_id);

      const response = await apiClient.post('/image_upload', formdata, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserProfile = async () => {
    const response = await apiClient.delete(`/image_delete/${user.user_id}`);
    setImage(null);
    console.log(response.data);
  };

  const handlePress = () => {
    if (!image) handleSelectImage();
    else
      Alert.alert('Delete Image', 'Are you sure you want to remove?', [
        {text: 'Yes', onPress: deleteUserProfile},
        {text: 'No'},
      ]);
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
          <AppFormImagePicker
            name="image"
            image={image}
            handleSelectImage={handlePress}
            user_id={user.user_id}
          />

          <AppText
            style={
              styles.title
            }>{`${user.firstname} ${user.lastname}`}</AppText>
          <AppText style={styles.description}>{user.category}</AppText>
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
        <ItemSeperator />
        {allPosts.length === 0 ? (
          <>
            <ActivityIndicator
              animating={loading}
              size="large"
              color={colors.red}
            />
          </>
        ) : (
          <View style={styles.postContainer}>
            {allPosts.map(post => (
              <PostCard
                key={post.post_id}
                image={image}
                item={post}
                user={user}
              />
            ))}
          </View>
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

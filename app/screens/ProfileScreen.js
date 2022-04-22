import React, {useState} from 'react';
import {Image, ScrollView, View, StyleSheet} from 'react-native';
import {format} from 'timeago.js';

import AppText from '../components/AppText';
import AppModalForm from '../components/AppModalForm';
import AppPostInput from '../components/AppPostInput';
import PostCard from '../components/PostCard';
import ItemSeperator from '../components/ItemSeperator';
import colors from '../config/colors';
import AppButton from '../components/AppButton';

const posts = [
  {
    postId: 1,
    userImage: require('../assets/girl1.jpg'),
    username: 'Emma Watson',
    date: format(new Date()),
    description: 'Wow! what a beautiful view!',
    // postImage: require('../assets/nature1.jpg'),
  },
  {
    postId: 2,
    userImage: require('../assets/boy1.jpg'),
    username: 'Tony Stark',
    date: format(new Date()),
    description: 'Yoooooo!',
    // postImage: require('../assets/nature2.jpg'),
  },
  {
    postId: 3,
    userImage: require('../assets/girl2.jpg'),
    username: 'Selena Gomez',
    date: format(new Date()),
    description: 'Need some sunlight!',
    // postImage: require('../assets/nature3.jpg'),
  },
  {
    postId: 4,
    userImage: require('../assets/boy2.jpg'),
    username: 'John Kent',
    date: format(new Date()),
    description: 'Be Greatful!',
    // postImage: require('../assets/nature4.jpg'),
  },
];

function ProfileScreen() {
  const [visible, setVisible] = useState(false);
  const [allPosts, setAllPosts] = useState(posts);

  const handleSubmit = (values, {resetForm}) => {
    const newPost = {
      postId: Date.now(),
      userImage: require('../assets/zaid-saleem-image.jpg'),
      username: 'Zaid Saleem',
      date: format(new Date()),
      description: values.description,
      postImage: values.image,
    };

    console.log(values);
    const newPosts = [...allPosts, newPost];
    setAllPosts(newPosts);
    setVisible(false);
    resetForm();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.user}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../assets/zaid-saleem-image.jpg')}
            />
          </View>
          <AppText style={styles.title}>Zaid Saleem</AppText>
          <AppText style={styles.description}>Software Engineer</AppText>
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
              source={require('../assets/zaid-saleem-image.jpg')}
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

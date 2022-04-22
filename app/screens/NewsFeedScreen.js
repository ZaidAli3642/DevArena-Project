import React, {useState} from 'react';
import {View, FlatList, Image, StyleSheet} from 'react-native';
import {format} from 'timeago.js';

import AppPostInput from './../components/AppPostInput';
import AppModalForm from '../components/AppModalForm';
import PostCard from '../components/PostCard';
import colors from '../config/colors';
import AppText from '../components/AppText';

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

function NewsFeedScreen() {
  const [visible, setVisible] = useState(false);
  const [allPosts, setAllPosts] = useState([]);

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
    <View style={styles.container}>
      {allPosts.length === 0 ? (
        <>
          <View style={styles.input}>
            <View style={{flex: 0.2}}>
              <Image
                style={styles.image}
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
          )}
          renderItem={({item}) => {
            return <PostCard item={item} />;
          }}
        />
      )}

      <AppModalForm
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

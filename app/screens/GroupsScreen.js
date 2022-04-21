import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {format} from 'timeago.js';

import AppPostInput from '../components/AppPostInput';
import GroupHeader from '../components/GroupHeader';
import PostCard from '../components/PostCard';
import colors from '../config/colors';
import AppModalForm from './../components/AppModalForm';

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
  // {
  //   postId: 3,
  //   userImage: require('../assets/girl2.jpg'),
  //   username: 'Selena Gomez',
  //   date: format(new Date()),
  //   description: 'Need some sunlight!',
  //   // postImage: require('../assets/nature3.jpg'),
  // },
  // {
  //   postId: 4,
  //   userImage: require('../assets/boy2.jpg'),
  //   username: 'John Kent',
  //   date: format(new Date()),
  //   description: 'Be Greatful!',
  //   // postImage: require('../assets/nature4.jpg'),
  // },
];

function GroupsScreen() {
  const [allPosts, setAllPosts] = useState(posts);

  const [visible, setVisible] = useState(false);

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
        <GroupHeader />

        <View style={styles.inputContainer}>
          <Image
            style={styles.profileImage}
            source={require('../assets/zaid-saleem-image.jpg')}
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
        {/* <FlatList
        data={allPosts}
        keyExtractor={post => post.postId.toString()}
        // ListHeaderComponent={() => (
        //   <GroupHeader allPosts={allPosts} setAllPosts={setAllPosts} />
        // )}
        renderItem={({item}) => <PostCard item={item} />}
      /> */}
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

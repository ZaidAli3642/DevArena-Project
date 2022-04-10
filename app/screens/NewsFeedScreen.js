import React, {useState} from 'react';
import {View, FlatList, Image, StyleSheet, ScrollView} from 'react-native';
import {format} from 'timeago.js';

import AppPostInput from './../components/AppPostInput';
import AppModalForm from '../components/AppModalForm';
import PostCard from '../components/PostCard';
import colors from '../config/colors';

const posts = [
  {
    postId: 1,
    userImage: require('../assets/girl1.jpg'),
    username: 'Emma Watson',
    date: format(new Date()),
    description: 'Wow! what a beautiful view!',
    postImage: require('../assets/nature1.jpg'),
  },
  {
    postId: 2,
    userImage: require('../assets/boy1.jpg'),
    username: 'Tony Stark',
    date: format(new Date()),
    description: 'Yoooooo!',
    postImage: require('../assets/nature2.jpg'),
  },
  {
    postId: 3,
    userImage: require('../assets/girl2.jpg'),
    username: 'Selena Gomez',
    date: format(new Date()),
    description: 'Need some sunlight!',
    postImage: require('../assets/nature3.jpg'),
  },
  {
    postId: 4,
    userImage: require('../assets/boy2.jpg'),
    username: 'John Kent',
    date: format(new Date()),
    description: 'Be Greatful!',
    postImage: require('../assets/nature4.jpg'),
  },
];

function NewsFeedScreen() {
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
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
        renderItem={({item}) => (
          <PostCard
            username={item.username}
            userImage={item.userImage}
            description={item.description}
            postImage={item.postImage}
            date={item.date}
          />
        )}
      />
      <AppModalForm
        placeholder="What's On Your Mind?"
        setVisible={setVisible}
        userTitle="Muhammad Zaid Saleem"
        visible={visible}
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

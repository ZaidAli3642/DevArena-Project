import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, Image, StyleSheet} from 'react-native';

import AppPostInput from './../components/AppPostInput';
import AppModalForm from '../components/AppModalForm';
import PostCard from '../components/PostCard';
import colors from '../config/colors';
import AuthContext from './../context/AuthContext';
import ActivityIndicator from '../components/ActivityIndicator';
import postsApi from '../api/posts';

function NewsFeedScreen() {
  const [visible, setVisible] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const {user, image} = useContext(AuthContext);

  const getUserPosts = async () => {
    try {
      setLoading(true);

      const allFeedPosts = await postsApi.getFeedPosts(user.user_id, 'post');

      setAllPosts(allFeedPosts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const ac = new AbortController();
    getUserPosts();

    return () => ac.abort();
  }, []);

  const handleSubmit = async (values, {resetForm}) => {
    setDisabled(true);
    const post = await postsApi.createPost(
      user.user_id,
      values.description,
      'post',
      values.image,
    );

    setAllPosts([...post, ...allPosts]);

    setVisible(false);
    setDisabled(false);
    resetForm();
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={loading} />
      <FlatList
        contentContainerStyle={{flexGrow: 1}}
        data={allPosts}
        keyExtractor={post => post.post_id.toString()}
        ListHeaderComponent={() => (
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
        )}
        renderItem={({item}) => {
          return <PostCard user={user} image={image} item={item} />;
        }}
        refreshing={refreshing}
        onRefresh={() => {
          getUserPosts();
        }}
      />

      <AppModalForm
        image={image}
        placeholder="What's On Your Mind?"
        setVisible={setVisible}
        disabled={disabled}
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

import React, {useState, useEffect, useContext} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';

import PostCard from '../components/PostCard';
import postsApi from '../api/posts';
import AuthContext from '../context/AuthContext';
import ActivityIndicator from '../components/ActivityIndicator';

function GroupsForYouScreen() {
  const [allGroupPosts, setAllGroupsPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const {user, image} = useContext(AuthContext);

  const getGroupPosts = async () => {
    try {
      setLoading(true);
      const groupPosts = await postsApi.getFeedPosts(user.user_id, 'group');
      setAllGroupsPosts(groupPosts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroupPosts();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={loading} />
      <FlatList
        data={allGroupPosts}
        keyExtractor={groupPost => groupPost.post_id.toString()}
        renderItem={({item}) => (
          <PostCard item={item} image={image} user={user} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default GroupsForYouScreen;

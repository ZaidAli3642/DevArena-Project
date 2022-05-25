import React, {useState, useEffect, useContext} from 'react';
import {Image, View, StyleSheet, FlatList} from 'react-native';

import AppModalForm from '../components/AppModalForm';
import AppPostInput from '../components/AppPostInput';
import colors from '../config/colors';
import PostCard from '../components/PostCard';
import AuthContext from './../context/AuthContext';
import apiClient from '../api/client';
import ActivityIndicator from '../components/ActivityIndicator';
import postsApi from '../api/posts';

function QueryFeedScreen() {
  const [visible, setVisible] = useState(false);
  const [allQueries, setAllQueries] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const {user, image} = useContext(AuthContext);

  const getQueries = async () => {
    try {
      setLoading(true);
      const allFeedQueries = await postsApi.getFeedPosts(user.user_id, 'query');

      setAllQueries(allFeedQueries);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQueries();
  }, []);

  const handleSubmit = async (values, {resetForm}) => {
    const query = await postsApi.createPost(
      user.user_id,
      values.description,
      'query',
      values.image,
    );

    setAllQueries([...query, ...allQueries]);

    setVisible(false);
    resetForm();
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={loading} />
      <FlatList
        contentContainerStyle={{flexGrow: 1}}
        data={allQueries}
        keyExtractor={query => query.post_id.toString()}
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
                placeholder="WRITE QUERY!"
              />
            </View>
          </View>
        )}
        renderItem={({item}) => {
          return <PostCard item={item} user={user} />;
        }}
        refreshing={refreshing}
        onRefresh={() => getQueries()}
      />
      <AppModalForm
        image={image}
        placeholder="DO YOU HAVE A QUERY?"
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
export default QueryFeedScreen;

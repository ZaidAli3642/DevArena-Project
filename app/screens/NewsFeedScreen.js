import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, Image, StyleSheet} from 'react-native';

import AppPostInput from './../components/AppPostInput';
import AppModalForm from '../components/AppModalForm';
import PostCard from '../components/PostCard';
import colors from '../config/colors';
import AppText from '../components/AppText';
import AuthContext from './../context/AuthContext';
import apiClient from '../api/client';

function NewsFeedScreen() {
  const [visible, setVisible] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const {user, image} = useContext(AuthContext);

  const getUserPosts = async () => {
    const {data} = await apiClient.get(`/posts/${user.user_id}`);
    data.allUsersPosts.sort(function (o1, o2) {
      if (o1.created_at > o2.created_at) return -1;
      else if (o1.created_at < o2.created_at) return 1;
      else return 0;
    });
    setAllPosts(data.allUsersPosts);
  };

  useEffect(() => {
    getUserPosts();
  }, [setAllPosts]);

  const handleSubmit = async (values, {resetForm}) => {
    const formdata = new FormData();

    if (values.image) {
      const photo = {
        uri: values.image.uri,
        type: values.image.type,
        name: values.image.fileName,
      };
      formdata.append('image', photo);
    }

    formdata.append('description', values.description);
    formdata.append('user_id', user.user_id);

    setRefreshing(true);
    const response = await apiClient.post('/post', formdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    setAllPosts([...response.data, ...allPosts]);

    setVisible(false);
    resetForm();
    setRefreshing(false);
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
          keyExtractor={post => post.post_id.toString()}
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
            return <PostCard user={user} image={image} item={item} />;
          }}
          refreshing={refreshing}
          onRefresh={() => {
            getUserPosts();
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

import React, {useState, useEffect, useContext} from 'react';
import {Image, View, StyleSheet, FlatList} from 'react-native';
import {format} from 'timeago.js';

import AppText from '../components/AppText';
import AppModalForm from '../components/AppModalForm';
import AppPostInput from '../components/AppPostInput';
import colors from '../config/colors';
import PostCard from '../components/PostCard';
import AuthContext from './../context/AuthContext';
import apiClient from '../api/client';

const queries = [
  {
    queryId: 1,
    userImage:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    username: 'Emma Watson',
    date: format(new Date()),
    description: "Can't set a varaibele. Any solution?",
    postImage:
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    queryId: 2,
    userImage:
      'https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80',
    username: 'Tony Stark',
    date: format(new Date()),
    description: 'I have a bug in my code. Can anyone solve this?',
    postImage:
      'https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    queryId: 3,
    userImage:
      'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=853&q=80',
    username: 'Selena Gomez',
    date: format(new Date()),
    description: 'Which programming language is best any idea?',
    postImage:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    queryId: 4,
    userImage:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',

    username: 'John Kent',
    date: format(new Date()),
    description: 'How to set an array?',
    postImage:
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  },
];

function QueryFeedScreen() {
  const [visible, setVisible] = useState(false);
  const [allQueries, setAllQueries] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const {user, image} = useContext(AuthContext);

  const getQueries = async () => {
    try {
      const {data} = await apiClient.get(`/posts/${user.user_id}/query`);
      data.allUsersPosts.sort(function (o1, o2) {
        if (o1.created_at > o2.created_at) return -1;
        else if (o1.created_at < o2.created_at) return 1;
        else return 0;
      });
      setAllQueries(data.allUsersPosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQueries();
  }, []);

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
    formdata.append('post_type', 'query');

    setRefreshing(true);
    const response = await apiClient.post('/post', formdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    setAllQueries([...response.data, ...allQueries]);

    setVisible(false);
    resetForm();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
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
        ListEmptyComponent={() => (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 250,
            }}>
            <AppText>No posts for now!</AppText>
          </View>
        )}
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

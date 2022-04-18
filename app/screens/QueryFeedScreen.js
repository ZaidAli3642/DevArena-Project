import React, {useState} from 'react';
import {Image, View, StyleSheet, FlatList} from 'react-native';
import {format} from 'timeago.js';

import AppText from '../components/AppText';
import AppModalForm from '../components/AppModalForm';
import AppPostInput from '../components/AppPostInput';
import colors from '../config/colors';
import PostCard from '../components/PostCard';

const queries = [
  {
    queryId: 1,
    userImage: require('../assets/girl1.jpg'),
    username: 'Emma Watson',
    date: format(new Date()),
    description: "Can't set a varaibele. Any solution?",
    // postImage: require('../assets/query1.jpg'),
  },
  {
    queryId: 2,
    userImage: require('../assets/boy1.jpg'),
    username: 'Tony Stark',
    date: format(new Date()),
    description: 'I have a bug in my code. Can anyone solve this?',
    // postImage: require('../assets/query2.jpg'),
  },
  {
    queryId: 3,
    userImage: require('../assets/girl2.jpg'),
    username: 'Selena Gomez',
    date: format(new Date()),
    description: 'Which programming language is best any idea?',
    // postImage: require('../assets/query3.jpg'),
  },
  {
    queryId: 4,
    userImage: require('../assets/boy2.jpg'),
    username: 'John Kent',
    date: format(new Date()),
    description: 'How to set an array?',
    // postImage: require('../assets/query4.jpg'),
  },
];

function QueryFeedScreen() {
  const [visible, setVisible] = useState(false);
  const [allQueries, setAllQueries] = useState(queries);

  const handleSubmit = (values, {resetForm}) => {
    const newQueryPost = {
      queryId: Date.now(),
      userImage: require('../assets/zaid-saleem-image.jpg'),
      username: 'Zaid Saleem',
      date: format(new Date()),
      description: values.description,
      postImage: values.image,
    };

    console.log(values);
    const newQueries = [newQueryPost, ...allQueries];
    setAllQueries(newQueries);
    setVisible(false);
    resetForm();
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{flexGrow: 1}}
        data={allQueries}
        keyExtractor={query => query.queryId.toString()}
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
                placeholder="WRITE QUERY!"
              />
            </View>
          </View>
        )}
        renderItem={({item}) => {
          return <PostCard item={item} />;
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
      />
      <AppModalForm
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

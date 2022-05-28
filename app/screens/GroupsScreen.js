import React, {useState, useContext, useEffect} from 'react';
import {Image, ScrollView, View, StyleSheet} from 'react-native';
import {format} from 'timeago.js';

import AppPostInput from '../components/AppPostInput';
import GroupHeader from '../components/GroupHeader';
import PostCard from '../components/PostCard';
import colors from '../config/colors';
import AppModalForm from './../components/AppModalForm';
import AuthContext from './../context/AuthContext';
import groupsApi from '../api/groupsApi';
import apiClient from '../api/client';
import postsApi from '../api/posts';
import AppButton from '../components/AppButton';

function GroupsScreen({route}) {
  const [groupPosts, setGroupPosts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState(route.params.group.approve_request);

  const {group} = route.params;

  const {user, image} = useContext(AuthContext);

  const getGroupPost = async () => {
    try {
      const response = await groupsApi.groupPosts(user.user_id, group.group_id);
      setGroupPosts(response.data.allGroupPosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroupPost();
  }, []);

  const joinGroup = async () => {
    const joinDetails = {
      joined_group_id: group.group_id,
      joined_user_id: user.user_id,
      joined_firstname: user.firstname,
      joined_group_name: group.group_name,
      user_id: group.user_id,
    };

    const response = await apiClient.post('/request', joinDetails);
    console.log(response.data);
    setText(!text);
  };

  const handleSubmit = async (values, {resetForm}) => {
    const groupPost = await postsApi.createPost(
      user.user_id,
      values.description,
      'group',
      values.image,
    );

    if (groupPost[0].post_id) {
      console.log(groupPost[0].post_id);
      await apiClient.post('/group_post', {
        post_id: groupPost[0].post_id,
        group_id: group.group_id,
      });
      setGroupPosts([...groupPost, ...groupPosts]);
    }

    setVisible(false);
    resetForm();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <GroupHeader
          group={group}
          text={text}
          user={user}
          joinGroup={joinGroup}
        />

        <View style={styles.inputContainer}>
          <Image
            style={styles.profileImage}
            source={
              image ? {uri: image} : require('../assets/profileAvatar.jpeg')
            }
          />
          <AppPostInput
            placeholder="Write Something..."
            style={styles.input}
            onPress={() => setVisible(true)}
          />
        </View>
        <AppModalForm
          image={image}
          userTitle="Zaid Saleem"
          placeholder="What's on your mind?"
          setVisible={setVisible}
          visible={visible}
          handleSubmit={handleSubmit}
        />

        {groupPosts.map(post => (
          <PostCard key={post.post_id} item={post} image={image} user={user} />
        ))}
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

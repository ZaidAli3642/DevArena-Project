import React, {useState, memo, useEffect} from 'react';
import {Image, View, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {format} from 'timeago.js';
import {useNavigation} from '@react-navigation/native';

import AppButton from './AppButton';
import AppText from './AppText';
import colors from '../config/colors';
import apiClient from '../api/client';
import AppComments from './AppComments';
import postsApi from '../api/posts';
import routes from '../routes/routes';

function PostCard({item, image, user}) {
  const [liked, setLiked] = useState(item.like_post);
  const [disliked, setDisliked] = useState(item.dislike_post);
  const [visible, setVisible] = useState(false);
  const [sharedUser, setSharedUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [groupName, setGroupName] = useState(null);
  const [postLikes, setPostLikes] = useState(0);
  const [postDislikes, setPostDislikes] = useState(0);
  const [postCommentsLength, setPostCommentsLength] = useState(0);

  const navigation = useNavigation();

  const {description, imageUri, created_at, post_id, user_id} = item;

  const getSharedPostUser = async () => {
    try {
      if (item.shared_user_id) {
        const response = await apiClient.get(`/user/${item.shared_user_id}`);
        console.log(response.data);
        const {firstname, lastname} = response.data;
        setSharedUser(firstname + ' ' + lastname);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getGroupDetail = async () => {
    const {data} = await apiClient.get(`/group_post/${item.post_id}`);
    if (data.group_post[0]) {
      const {group_id} = data.group_post[0];
      const response = await apiClient.get(`/group/${group_id}`);
      setGroupName(response.data.singleGroup.group_name);
    }
  };

  const getPostLikes = async () => {
    try {
      const response = await apiClient.get(`/like/${item.post_id}`);
      setPostLikes(response.data.postLikes);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostDislikes = async () => {
    try {
      const response = await apiClient.get(`/dislike/${item.post_id}`);
      setPostDislikes(response.data.postDislikes);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostCommentsLength = async () => {
    try {
      const response = await apiClient.get(`/comment/${item.post_id}`);
      setPostCommentsLength(response.data.postComments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    getSharedPostUser();
    getGroupDetail();
    getPostLikes();
    getPostDislikes();
    getPostCommentsLength();
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleLike = async () => {
    if (disliked) {
      setPostDislikes(postDislikes - 1);
      setDisliked(false);
    }

    const likeDetails = {
      user_id: user.user_id,
      post_id: item.post_id,
    };

    try {
      const response = await postsApi.likePost(likeDetails);
      if (liked) {
        setLiked(!liked);
        return setPostLikes(postLikes - 1);
      }

      setLiked(!liked);
      setPostLikes(postLikes + 1);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async () => {
    if (liked) {
      setLiked(false);
      setPostLikes(postLikes - 1);
    }

    const dislikeDetails = {
      user_id: user.user_id,
      post_id: item.post_id,
    };

    try {
      const response = await postsApi.dislikePost(dislikeDetails);
      if (disliked) {
        setDisliked(!disliked);
        return setPostDislikes(postDislikes - 1);
      }
      setDisliked(!disliked);
      setPostDislikes(postDislikes + 1);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = async () => {
    const sharePost = {
      description: item.description,
      user_id: user.user_id,
      post_type: item.post_type,
      shared_user_id: item.user_id,
      shared_post_id: item.post_id,
    };
    if (item.post_filename) {
      sharePost.filename = item.post_filename;
      sharePost.filepath = item.post_filepath;
      sharePost.mimetype = item.post_mimetype;
      sharePost.size = item.post_size;
    }
    try {
      await postsApi.sharePost(sharePost);
    } catch (error) {
      console.log(error);
    }
  };

  const icons = [
    {
      id: 1,
      iconName: liked ? 'thumb-up' : 'thumb-up-outline',
      title: postLikes,
      color: liked ? colors.red : colors.mediumGrey,
      onPress: handleLike,
    },
    {
      id: 2,
      iconName: disliked ? 'thumb-down' : 'thumb-down-outline',
      title: postDislikes,
      color: disliked ? colors.red : colors.mediumGrey,
      onPress: handleDislike,
    },
    {
      id: 3,
      iconName: 'comment-outline',
      title: postCommentsLength,
      onPress: () => setVisible(true),
    },
    {
      id: 4,
      iconName: 'share-outline',
      title: 'Share',
      onPress: handleShare,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          style={styles.image}
          source={
            item.profile_imageUri
              ? {uri: item.profile_imageUri}
              : require('../assets/profileAvatar.jpeg')
          }
        />
        <View style={styles.userDescription}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate(routes.PROFILE, {user_id})}>
              <AppText
                style={
                  styles.text
                }>{`${item.firstname} ${item.lastname}`}</AppText>
            </TouchableOpacity>
            {sharedUser && (
              <AppText style={{marginLeft: 5, fontSize: 13}}>
                Shared from {`${sharedUser}`}
              </AppText>
            )}
          </View>
          {groupName && <AppText style={styles.group}>{groupName}</AppText>}
          <AppText style={styles.date}>{format(created_at)}</AppText>
        </View>
      </View>
      {description && (
        <AppText style={styles.description}>{description}</AppText>
      )}
      {imageUri && <Image style={styles.postImage} source={{uri: imageUri}} />}

      <View style={styles.iconContainer}>
        {icons.map(icon => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={icon.id}
            onPress={icon.onPress}>
            <View style={styles.singleIcon}>
              <MaterialCommunityIcons
                name={icon.iconName}
                size={25}
                color={icon.color || colors.mediumGrey}
              />
              <AppText style={styles.iconTitle}>{icon.title}</AppText>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <Modal visible={visible} animationType="slide">
        <AppButton
          title={'CLOSE'}
          color={colors.red}
          onPress={() => setVisible(false)}
        />
        <AppComments
          image={image}
          setPostCommentsLength={setPostCommentsLength}
          postCommentsLength={postCommentsLength}
          post_id={post_id}
          user={user}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginVertical: 5,
    paddingVertical: 10,
    elevation: 5,
  },
  group: {
    fontSize: 13,
    color: colors.green,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 15,
    color: colors.mediumGrey,
  },
  description: {
    color: colors.dark,
    marginBottom: 5,
    marginHorizontal: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  iconTitle: {
    color: colors.mediumGrey,
    fontSize: 15,
  },
  singleIcon: {
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
  userContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  userDescription: {
    marginLeft: 10,
  },
  postImage: {
    width: '100%',
    height: 250,
  },
});
export default memo(PostCard);

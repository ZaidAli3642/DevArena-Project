import React, {useState, memo, useEffect} from 'react';
import {
  Image,
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {format} from 'timeago.js';

import AppButton from './AppButton';
import AppText from './AppText';
import colors from '../config/colors';
import apiClient from '../api/client';
import AppComments from './AppComments';

function PostCard({item, image, user}) {
  const [liked, setLiked] = useState(item.like_post);
  const [disliked, setDisliked] = useState(item.dislike_post);
  const [visible, setVisible] = useState(false);
  const [sharedUser, setSharedUser] = useState(null);

  const {description, imageUri, groupName, created_at, post_id} = item;

  const getSharedPostUser = async () => {
    try {
      const response = await apiClient.get(`/user/${item.shared_user_id}`);
      const {firstname, lastname} = response.data.user[0];
      setSharedUser(firstname + ' ' + lastname);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSharedPostUser();
  }, []);

  const handleLike = async () => {
    setDisliked(false);

    const likeDetails = {
      user_id: user.user_id,
      post_id: item.post_id,
    };

    const response = await apiClient.post('/like', likeDetails);
    console.log(response.data);
    if (!liked) {
      return setLiked(true);
    }
    return setLiked(false);
  };

  const handleDislike = async () => {
    setLiked(false);

    const dislikeDetails = {
      user_id: user.user_id,
      post_id: item.post_id,
    };

    await apiClient.post('/dislike', dislikeDetails);
    if (!disliked) {
      return setDisliked(true);
    }
    return setDisliked(false);
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

    await apiClient.post('/share_post', sharePost);
  };

  const icons = [
    {
      id: 1,
      iconName: liked ? 'thumb-up' : 'thumb-up-outline',
      title: 'Like',
      color: liked ? colors.red : colors.mediumGrey,
      onPress: handleLike,
    },
    {
      id: 2,
      iconName: disliked ? 'thumb-down' : 'thumb-down-outline',
      title: 'Dislike',
      color: disliked ? colors.red : colors.mediumGrey,
      onPress: handleDislike,
    },
    {
      id: 3,
      iconName: 'comment-outline',
      title: 'Comment',
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
            <AppText style={styles.text}>{`${
              item.firstname || user?.firstname
            } ${item.lastname || user?.lastname}`}</AppText>
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
          <TouchableWithoutFeedback key={icon.id} onPress={icon.onPress}>
            <View style={styles.singleIcon}>
              <MaterialCommunityIcons
                name={icon.iconName}
                size={25}
                color={icon.color || colors.mediumGrey}
              />
              <AppText style={styles.iconTitle}>{icon.title}</AppText>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
      <Modal visible={visible} animationType="slide">
        <AppButton
          title={'CLOSE'}
          color={colors.red}
          onPress={() => setVisible(false)}
        />
        <AppComments image={image} post_id={post_id} user={user} />
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

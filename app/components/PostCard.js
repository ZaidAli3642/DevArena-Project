import React, {useState, useEffect, useRef, memo} from 'react';
import {
  Image,
  FlatList,
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {format} from 'timeago.js';

import AppButton from './AppButton';
import AppCommentForm from './AppCommentForm';
import AppText from './AppText';
import colors from '../config/colors';
import PostComment from './PostComment';
import inputRefContext from './../context/inputRefContext';
import apiClient from '../api/client';

function PostCard({item, image, user}) {
  const [liked, setLiked] = useState(item.like_post);
  const [disliked, setDisliked] = useState(item.dislike_post);
  const [allLikes, setAllLikes] = useState([]);

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

    const response = await apiClient.post('/dislike', dislikeDetails);
    if (!disliked) {
      return setDisliked(true);
    }
    return setDisliked(false);
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
      onPress: () => console.log('Shared'),
    },
  ];

  const comments = [
    {
      commentId: 1,
      userImage: require('../assets/girl1.jpg'),
      username: 'Emma Watson',
      description: 'Need some sunlight!',
      date: format(new Date()),
      commentResponses: [
        {
          commentId: 1,
          userImage: require('../assets/girl1.jpg'),
          username: 'Emma Watson',
          description: 'Need some little sunlight!',
          date: format(new Date()),
        },
        {
          commentId: 2,
          userImage: require('../assets/zaid-saleem-image.jpg'),
          username: 'Zaid Saleem',
          description: 'Need some more sunlight!',
          date: format(new Date()),
        },
      ],
    },
    {
      commentId: 2,
      userImage: require('../assets/boy1.jpg'),
      username: 'Tony Stark',
      description: 'Yoooooo!',
      date: format(new Date()),
      commentResponses: [],
    },
    {
      commentId: 3,
      userImage: require('../assets/girl2.jpg'),
      username: 'Selena',
      description: 'helloooooooo!',
      date: format(new Date()),
      commentResponses: [],
    },
    {
      commentId: 4,
      userImage: require('../assets/boy2.jpg'),
      username: 'John',
      description: 'Good Night',
      date: format(new Date()),
      commentResponses: [],
    },
  ];

  const [visible, setVisible] = useState(false);
  const [postComments, setPostComments] = useState(comments);
  const [keyboardReplyVisible, setKeyboardReplyVisible] = useState(false);
  const [selectedComment, setSelectedComment] = useState();
  const {description, imageUri, groupName, created_at} = item;

  const inputRef = useRef();

  const focusInput = () => {
    inputRef.current.focus();
  };

  const handleCommentSubmit = values => {
    const newComment = {
      commentId: Date.now(),
      userImage: require('../assets/zaid-saleem-image.jpg'),
      username: 'Zaid Saleem',
      description: values.comment,
      date: format(new Date()),
      commentResponses: [],
    };

    if (keyboardReplyVisible) {
      postComments.forEach(comment => {
        if (comment.commentId === selectedComment.commentId) {
          comment.commentResponses.push(newComment);
        } else return comment.commentResponses;
      });
      const newComments = [...postComments];
      setPostComments(newComments);
      return;
    }

    const newComments = [...postComments, newComment];
    setPostComments(newComments);
  };

  return (
    <inputRefContext.Provider value={inputRef}>
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Image
            style={styles.image}
            source={
              item.profile_imageUri || image
                ? {uri: item.profile_imageUri || image}
                : require('../assets/profileAvatar.jpeg')
            }
          />
          <View style={styles.userDescription}>
            <AppText style={styles.text}>{`${
              item.firstname || user?.firstname
            } ${item.lastname || user?.lastname}`}</AppText>
            {groupName && <AppText style={styles.group}>{groupName}</AppText>}
            <AppText style={styles.date}>{format(created_at)}</AppText>
          </View>
        </View>
        {description && (
          <AppText style={styles.description}>{description}</AppText>
        )}
        {imageUri && (
          <Image style={styles.postImage} source={{uri: imageUri}} />
        )}

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
          <View style={{flex: 1, paddingHorizontal: 10}}>
            <AppButton
              title="CLOSE"
              color={colors.red}
              onPress={() => setVisible(false)}
            />
            <FlatList
              data={postComments}
              keyExtractor={comment => comment.commentId.toString()}
              renderItem={({item}) => (
                <PostComment
                  setKeyboardReplyVisible={setKeyboardReplyVisible}
                  focusInput={focusInput}
                  onSelectComment={() => setSelectedComment(item)}
                  item={item}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
            <AppCommentForm
              selectedComment={selectedComment}
              keyboardReplyVisible={keyboardReplyVisible}
              setKeyboardReplyVisible={setKeyboardReplyVisible}
              handleSubmit={handleCommentSubmit}
            />
          </View>
        </Modal>
      </View>
    </inputRefContext.Provider>
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

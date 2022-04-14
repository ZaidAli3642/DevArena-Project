import React, {useState} from 'react';
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

function PostCard({item}) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    setDisliked(false);
    if (!liked) {
      return setLiked(true);
    }
    return setLiked(false);
  };

  const handleDislike = () => {
    setLiked(false);
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
      onPress: handleLike,
    },
    {
      id: 2,
      iconName: disliked ? 'thumb-down' : 'thumb-down-outline',
      title: 'Dislike',
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
    },
    {
      commentId: 2,
      userImage: require('../assets/boy1.jpg'),
      username: 'Tony Stark',
      description: 'Yoooooo!',
      date: format(new Date()),
    },
    {
      commentId: 3,
      userImage: require('../assets/girl2.jpg'),
      username: 'Selena',
      description: 'helloooooooo!',
      date: format(new Date()),
    },
    {
      commentId: 4,
      userImage: require('../assets/boy2.jpg'),
      username: 'John',
      description: 'Good Night',
      date: format(new Date()),
    },
  ];
  const [visible, setVisible] = useState(false);
  const [postComments, setPostComments] = useState(comments);
  const {description, postImage, userImage, username, date} = item;

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image style={styles.image} source={userImage} />
        <View style={styles.userDescription}>
          <AppText style={styles.text}>{username}</AppText>
          <AppText style={styles.date}>{date}</AppText>
        </View>
      </View>
      {description && (
        <AppText style={styles.description}>{description}</AppText>
      )}
      {postImage && (
        <Image style={styles.postImage} source={{uri: postImage}} />
      )}

      <View style={styles.iconContainer}>
        {icons.map(icon => (
          <TouchableWithoutFeedback key={icon.id} onPress={icon.onPress}>
            <View style={styles.singleIcon}>
              <MaterialCommunityIcons
                name={icon.iconName}
                size={25}
                color={colors.mediumGrey}
              />
              <AppText style={styles.iconTitle}>{icon.title}</AppText>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
      <Modal visible={visible} animationType="slide">
        <View style={{flex: 1, paddingHorizontal: 10, paddingVertical: 10}}>
          <AppButton
            title="CLOSE"
            color={colors.red}
            onPress={() => setVisible(false)}
          />
          <FlatList
            data={postComments}
            keyExtractor={comment => comment.commentId.toString()}
            renderItem={({item}) => <PostComment item={item} />}
          />
          <AppCommentForm
            comments={comments}
            onChangeComments={newComments => setPostComments(newComments)}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginVertical: 10,
    paddingVertical: 10,
    elevation: 10,
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
export default PostCard;

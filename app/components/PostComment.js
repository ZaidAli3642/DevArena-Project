import React, {useState} from 'react';
import {FlatList, Image, View, StyleSheet} from 'react-native';

import AppText from './AppText';
import colors from '../config/colors';
import ResponseComments from './ResponseComments';

function PostComment({item, focusInput, setKeyboardReplyVisible}) {
  const [like, setLike] = useState(false);
  const [commentsVisible, setCommentVisible] = useState(false);

  const {userImage, username, description, date, commentResponses} = item;
  console.log(commentResponses);
  return (
    <View>
      <View style={styles.container}>
        <Image source={userImage} style={styles.image} />
        <View style={styles.descriptionContainer}>
          <AppText>{username}</AppText>
          <AppText style={styles.description}>{description}</AppText>
          <View style={styles.iconsContainer}>
            <AppText style={styles.text}>{date}</AppText>
            <AppText
              style={[
                styles.text,
                styles.like,
                {color: like ? colors.red : colors.lightBrown},
              ]}
              onPress={() => {
                setLike(!like);
              }}>
              like
            </AppText>
            <AppText
              style={[styles.text, styles.reply]}
              onPress={() => {
                setKeyboardReplyVisible(true);
                focusInput();
              }}>
              reply
            </AppText>
          </View>
        </View>
      </View>
      {commentResponses.length !== 0 && (
        <>
          {!commentsVisible ? (
            <AppText
              onPress={() => setCommentVisible(true)}
              style={styles.responseText}>
              View Responses
            </AppText>
          ) : (
            <>
              <FlatList
                data={commentResponses}
                keyExtractor={commentResponse =>
                  commentResponse.commentId.toString()
                }
                renderItem={({item}) => <ResponseComments item={item} />}
              />
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionContainer: {
    margin: 10,
    flex: 1,
    padding: 7,
    paddingLeft: 20,
    backgroundColor: colors.lightGrey,
    borderRadius: 20,
  },
  description: {
    fontSize: 15,
    color: colors.mediumGrey,
  },
  iconsContainer: {
    flexDirection: 'row',
    marginTop: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 60,
  },
  like: {
    marginLeft: 10,
  },
  reply: {
    marginLeft: 10,
  },
  responseText: {
    fontSize: 12,
    marginLeft: 70,
    textDecorationLine: 'underline',
  },
  text: {
    fontSize: 13,
    color: colors.lightBrown,
  },
});
export default PostComment;

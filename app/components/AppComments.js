import React, {useRef} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import inputRefContext from './../context/inputRefContext';
import AppCommentForm from './AppCommentForm';
import PostComment from './PostComment';

function AppComments({
  keyboardReplyVisible,
  setKeyboardReplyVisible,
  selectedComment,
  setSelectedComment,
  route,
}) {
  const inputRef = useRef();

  const {comments: postComments} = route.params;

  const focusInput = () => {
    inputRef.current.focus();
  };

  const handleCommentSubmit = values => {
    // const newComment = {
    //   commentId: Date.now(),
    //   userImage: require('../assets/zaid-saleem-image.jpg'),
    //   username: 'Zaid Saleem',
    //   description: values.comment,
    //   date: format(new Date()),
    //   commentResponses: [],
    // };
    // if (keyboardReplyVisible) {
    //   postComments.forEach(comment => {
    //     if (comment.commentId === selectedComment.commentId) {
    //       comment.commentResponses.push(newComment);
    //     } else return comment.commentResponses;
    //   });
    //   const newComments = [...postComments];
    //   setPostComments(newComments);
    //   return;
    // }
    // const newComments = [...postComments, newComment];
    // setPostComments(newComments);
  };

  return (
    <inputRefContext.Provider value={inputRef}>
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <FlatList
          data={postComments}
          keyExtractor={comment => comment.comment_id.toString()}
          renderItem={({item}) => {
            return (
              <PostComment
                setKeyboardReplyVisible={setKeyboardReplyVisible}
                focusInput={focusInput}
                onSelectComment={() => setSelectedComment(item)}
                item={item}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
        />
        <AppCommentForm
          selectedComment={selectedComment}
          keyboardReplyVisible={keyboardReplyVisible}
          setKeyboardReplyVisible={setKeyboardReplyVisible}
          handleSubmit={handleCommentSubmit}
        />
      </View>
    </inputRefContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
export default AppComments;

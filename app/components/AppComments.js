import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import apiClient from '../api/client';

import inputRefContext from './../context/inputRefContext';
import AppCommentForm from './AppCommentForm';
import PostComment from './PostComment';

function AppComments({post_id, user, image}) {
  const [allComments, setAllComments] = useState([]);
  const [allCommentsResponse, setAllCommentsResponse] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [keyboardReplyVisible, setKeyboardReplyVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [commentPostFailed, setCommentPostFailed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const getPostComments = async () => {
    const {data} = await apiClient.get(`/comment/${post_id}/${user.user_id}`);
    setAllComments(data.allComments);
  };

  useEffect(() => {
    setIsMounted(true);
    getPostComments();

    return () => {
      setIsMounted(false);
    };
  }, [allComments, allCommentsResponse]);

  const inputRef = useRef();

  const focusInput = () => {
    inputRef.current.focus();
  };

  const handleCommentSubmit = async (values, resetForm) => {
    const newComment = {
      description: values.comment,
      post_id: post_id,
      user_id: user.user_id,
    };
    try {
      const response = await apiClient.post('/comment', newComment);
      const {comment} = response.data;

      setAllComments([
        ...allComments,
        {
          firstname: user.firstname,
          lastname: user.lastname,
          profile_image: image,
          description: comment[0].description,
          comment_id: comment[0].comment_id,
          created_at: comment[0].created_at,
          comment_response: [],
        },
      ]);

      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentResponse = async (values, resetForm) => {
    const newCommentResponse = {
      description: values.comment,
      comment_id: selectedComment.comment_id,
      user_id: user.user_id,
    };
    try {
      const response = await apiClient.post(
        '/comment_response',
        newCommentResponse,
      );

      const {commentResponse} = response.data;

      setAllCommentsResponse([
        ...allCommentsResponse,
        {
          firstname: user.firstname,
          lastname: user.lastname,
          profile_image: image,
          description: commentResponse[0].description,
          comment_response_id: commentResponse[0].comment_response_id,
          created_at: commentResponse[0].created_at,
        },
      ]);
      console.log(commentResponse);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (values, {resetForm}) => {
    if (values.comment === '') {
      setErrorMessage('Comment is required.');
      setCommentPostFailed(true);
      return;
    }
    setCommentPostFailed(false);

    if (!keyboardReplyVisible) {
      handleCommentSubmit(values, resetForm);
    } else {
      handleCommentResponse(values, resetForm);
    }
  };

  return (
    <inputRefContext.Provider value={inputRef}>
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <FlatList
          data={allComments}
          keyExtractor={comment => comment.comment_id.toString()}
          renderItem={({item}) => {
            return (
              <PostComment
                setKeyboardReplyVisible={setKeyboardReplyVisible}
                focusInput={focusInput}
                onSelectComment={() => setSelectedComment(item)}
                item={item}
                user_id={user.user_id}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
        />
        <AppCommentForm
          errorMessage={errorMessage}
          commentPostFailed={commentPostFailed}
          selectedComment={selectedComment}
          keyboardReplyVisible={keyboardReplyVisible}
          setKeyboardReplyVisible={setKeyboardReplyVisible}
          handleSubmit={handleSubmit}
        />
      </View>
    </inputRefContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
export default AppComments;

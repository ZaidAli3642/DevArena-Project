import apiClient from './client';

const getComments = async (post_id, user_id) =>
  await apiClient.get(`/comment/${post_id}/${user_id}`);

const createComment = async (comment, post_id, user_id) => {
  const newComment = {
    description: comment,
    post_id: post_id,
    user_id: user_id,
  };

  return await apiClient.post('/comment', newComment);
};

const commentResponse = async (comment, comment_id, user_id) => {
  const newResponse = {
    description: comment,
    comment_id: comment_id,
    user_id: user_id,
  };
  return await apiClient.post('/comment_response', newResponse);
};

const likeComment = async (comment_id, user_id) => {
  const likeComment = {
    comment_id,
    user_id,
  };

  await apiClient.post('/like_comments', likeComment);
};

export default {
  getComments,
  createComment,
  commentResponse,
  likeComment,
};

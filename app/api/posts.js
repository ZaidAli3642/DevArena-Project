import apiClient from './client';

const getFeedPosts = async (user_id, post_type) => {
  try {
    const {data} = await apiClient.get(`/posts/${user_id}/${post_type}`);

    const sortedFeed = data.allUsersPosts.sort(function (o1, o2) {
      if (o1.created_at > o2.created_at) return -1;
      else if (o1.created_at < o2.created_at) return 1;
      else return 0;
    });

    return sortedFeed;
  } catch (error) {
    console.log(error);
  }
};

const createPost = async (user_id, description, post_type, image) => {
  const formdata = new FormData();

  if (image) {
    const photo = {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    };
    formdata.append('image', photo);
  }

  formdata.append('description', description);
  formdata.append('user_id', user_id);
  formdata.append('post_type', post_type);

  try {
    const response = await apiClient.post('/post', formdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const likePost = async likeDetails =>
  await apiClient.post('/like', likeDetails);

const dislikePost = async dislikeDetails =>
  await apiClient.post('/dislike', dislikeDetails);

const sharePost = async sharePost =>
  await apiClient.post('/share_post', sharePost);

const userPosts = async user_id => {
  try {
    const {data} = await apiClient.get(`/post/${user_id}`);

    const sortedUserPost = data.userPosts.sort(function (o1, o2) {
      if (o1.created_at > o2.created_at) return -1;
      else if (o1.created_at < o2.created_at) return 1;
      else return 0;
    });

    return sortedUserPost;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getFeedPosts,
  createPost,
  likePost,
  dislikePost,
  sharePost,
  userPosts,
};

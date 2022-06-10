import apiClient from './client';
import {storage} from '../firebase/firebaseConfig';
import {
  ref,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';

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
  const postDetails = {
    description,
    post_type,
    user_id: user_id,
  };
  try {
    if (image) {
      const imageName = new Date().valueOf() + '_' + image.fileName;

      const imageRef = ref(storage, imageName);

      const responseImage = await fetch(image.uri);
      const blob = await responseImage.blob();

      const snapshot = await uploadBytes(imageRef, blob);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      console.log('Image Uploaded' + '  ' + downloadUrl);

      postDetails.filename = imageName;
      postDetails.path = image.uri;
      postDetails.mimetype = image.type;
      postDetails.size = image.fileSize;
      postDetails.post_imageurl = downloadUrl;
    }

    const response = await apiClient.post('/post', postDetails);

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

    const sortedUserPost = data?.userPosts?.sort(function (o1, o2) {
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

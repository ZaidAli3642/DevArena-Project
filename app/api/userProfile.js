import apiClient from './client';

const postUserProfile = async ({user_id, photo}) => {
  try {
    const formdata = new FormData();

    formdata.append('image', photo);

    formdata.append('user_id', user_id);
    await apiClient.post('/image_upload', formdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default {
  postUserProfile,
};

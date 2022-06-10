import apiClient from './client';
import {storage} from '../firebase/firebaseConfig';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

const createGroup = async (user_id, groupName, groupDescription, image) => {
  const groupDetails = {
    group_name: groupName,
    group_description: groupDescription,
    user_id,
  };

  if (image) {
    let imageName = new Date().valueOf() + '_' + image.fileName;

    const imageRef = ref(storage, imageName);

    const response = await fetch(image.uri);
    const blob = await response.blob();

    const snapshot = await uploadBytes(imageRef, blob);

    const downloadUrl = await getDownloadURL(snapshot.ref);

    groupDetails.filename = imageName;
    groupDetails.path = image.uri;
    groupDetails.mimetype = image.type;
    groupDetails.size = image.fileSize;
    groupDetails.group_imageurl = downloadUrl;
  }

  const response = await apiClient.post('/group', groupDetails);
  return response;
};

const getGroups = async user_id => await apiClient.get(`/all_group/${user_id}`);

const getCreatedGroups = async user_id =>
  await apiClient.get(`/user_group/${user_id}`);

const getJoinedGroups = async user_id =>
  await apiClient.get(`/joined_group/${user_id}`);

const groupPosts = async (user_id, group_id) =>
  await apiClient.get(`/single_group_post/${user_id}/${group_id}`);

export default {
  createGroup,
  getGroups,
  getCreatedGroups,
  getJoinedGroups,
  groupPosts,
};

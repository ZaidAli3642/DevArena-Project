import apiClient from './client';

const createGroup = async (user_id, groupName, groupDescription, image) => {
  const formdata = new FormData();

  if (image) {
    const photo = {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    };
    formdata.append('image', photo);
  }

  formdata.append('group_name', groupName);
  formdata.append('group_description', groupDescription);
  formdata.append('user_id', user_id);

  const response = await apiClient.post('/group', formdata, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

const getGroups = async user_id => await apiClient.get(`/all_group/${user_id}`);

const getCreatedGroups = async user_id =>
  await apiClient.get(`/user_group/${user_id}`);

const getJoinedGroups = async user_id =>
  await apiClient.get(`/joined_group/${user_id}`);

export default {
  createGroup,
  getGroups,
  getCreatedGroups,
  getJoinedGroups,
};

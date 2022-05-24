import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'secret';

const storeToken = async token => {
  try {
    await AsyncStorage.setItem(key, token);
  } catch (error) {
    console.log('Error storing the auth token.', error);
  }
};

const getToken = async () => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log('Error getting auth token', error);
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Error removing the auth token.', error);
  }
};

export default {
  storeToken,
  getToken,
  removeToken,
};

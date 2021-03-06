import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import SplashScreen from 'react-native-splash-screen';

import MainNavigator from './app/navigation/MainNavigator';
import AuthNavigator from './app/navigation/AuthNavigator';
import AuthContext from './app/context/AuthContext';
import authStorage from './app/context/auth/authStorage';
import apiClient from './app/api/client';
import OfflineNotice from './app/components/OfflineNotice';

function App() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);

  const getUserImage = async user_id => {
    try {
      const {data} = await apiClient.get(`/image/${user_id}`);
      setImage(data.imageUri);
    } catch (error) {
      console.log(error);
    }
  };

  const restoreToken = async () => {
    const token = await authStorage.getToken();
    if (!token) return SplashScreen.hide();

    const decodedUser = jwtDecode(token);
    setUser(decodedUser);

    if (decodedUser.user_id) getUserImage(decodedUser.user_id);
    setTimeout(() => SplashScreen.hide(), 2);
  };

  useEffect(() => {
    restoreToken();
  }, []);

  return (
    <>
      <OfflineNotice />
      <AuthContext.Provider value={{user, setUser, image, setImage}}>
        <NavigationContainer>
          {user ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </AuthContext.Provider>
    </>
  );
}

export default App;

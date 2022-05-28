import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import ListItem from '../components/ListItem';
import routes from '../routes/routes';
import apiClient from './../api/client';

function FollowersScreen({route, navigation}) {
  const [followers, setFollowers] = useState([]);

  const {user_id} = route.params;

  const getUserFollowers = async () => {
    try {
      const response = await apiClient.get(`/followers/${user_id}`);
      setFollowers(response.data.allFollowers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserFollowers();
  }, []);

  return (
    <View>
      <FlatList
        data={followers}
        keyExtractor={follower => follower.user_id.toString()}
        renderItem={({item}) => (
          <ListItem
            name={item.firstname + ' ' + item.lastname}
            image={item.profile_imageUri}
            onPress={() =>
              navigation.push(routes.PROFILE, {user_id: item.user_id})
            }
            roundedImage={true}
          />
        )}
      />
    </View>
  );
}

export default FollowersScreen;

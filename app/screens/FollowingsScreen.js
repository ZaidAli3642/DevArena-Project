import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import apiClient from './../api/client';
import routes from '../routes/routes';
import ListItem from '../components/ListItem';

function FollowingsScreen({route, navigation}) {
  const [followings, setFollowings] = useState([]);

  const {user_id} = route.params;

  const getUserFollowings = async () => {
    try {
      const response = await apiClient.get(`/following/${user_id}`);
      console.log(response.data);
      setFollowings(response.data.allFollowings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserFollowings();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={followings}
        keyExtractor={following => following.user_id.toString()}
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

export default FollowingsScreen;

import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import ListItem from '../components/ListItem';
import apiClient from './../api/client';
import AuthContext from './../context/AuthContext';

function AddUserScreen({route}) {
  const [added, setAdded] = useState(false);
  const [allFollowUsers, setAllFollowUsers] = useState([]);

  const {group} = route.params;
  console.log(group.group_id);

  const {user} = useContext(AuthContext);

  const getUsers = async () => {
    const allUnJoinedMemebers = [];

    try {
      const response = await apiClient.get(
        `/allFollowersFollowing/${user.user_id}/${group.group_id}`,
      );
      console.log(response.data);
      const groupMemebers = await apiClient.get(
        `/group_members/${group.group_id}`,
      );
      console.log(groupMemebers.data);

      response.data.allFollowUsers.forEach(followUser => {
        const members = groupMemebers.data.allMembers.some(
          members => followUser.joined_user_id === members.joined_user_id,
        );
        if (!members) {
          allUnJoinedMemebers.push(followUser);
        }
      });

      setAllFollowUsers(allUnJoinedMemebers);
    } catch (error) {
      console.log(error);
    }
  };

  const addUser = async (user_id, firstname) => {
    const joinedData = {
      joined_group_id: group.group_id,
      joined_user_id: user_id,
      joined_firstname: firstname,
      joined_group_name: group.group_name,
      user_id: group.user_id,
      approve_request: true,
    };

    await apiClient.post('/request', joinedData);

    setAdded(added => ({
      ...added,
      [user_id]: !added[user_id],
    }));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={allFollowUsers}
        keyExtractor={user => user.user_id.toString()}
        renderItem={({item}) => (
          <ListItem
            name={item.firstname + ' ' + item.lastname}
            image={item.profile_imageUri}
            roundedImage={true}
            add={true}
            added={added[item.user_id]}
            addUser={() => addUser(item.user_id, item.firstname)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
export default AddUserScreen;

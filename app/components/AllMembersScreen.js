import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import ListItem from '../components/ListItem';
import apiClient from './../api/client';
import ItemSeperator from './ItemSeperator';

function AllMembersScreen({route}) {
  const [allMembers, setAllMembers] = useState([]);
  const [removed, setRemoved] = useState(false);

  const {group} = route.params;

  const getAllGroupMembers = async () => {
    const response = await apiClient.get(`/group_members/${group.group_id}`);
    setAllMembers(response.data.allMembers);
  };

  const removeMembers = async join_id => {
    try {
      await apiClient.delete(`/remove_members/${join_id}`);
      setRemoved(removed => ({
        ...removed,
        [join_id]: !removed[join_id],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllGroupMembers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={allMembers}
        keyExtractor={member => member.join_id.toString()}
        renderItem={({item}) => (
          <ListItem
            join_id={item.join_id}
            name={item.firstname + ' ' + item.lastname}
            image={item.profile_imageUri}
            user_id={group.user_id}
            roundedImage={true}
            removed={removed[item.join_id]}
            removeMembers={() => removeMembers(item.join_id)}
          />
        )}
        ItemSeparatorComponent={ItemSeperator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default AllMembersScreen;

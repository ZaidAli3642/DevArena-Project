import React, {useState, useEffect, useContext} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';

import GroupPickerItem from './../components/GroupPickerItem';
import ItemSeperator from './../components/ItemSeperator';
import AppHeadingText from './../components/AppHeadingText';
import routes from '../routes/routes';
import apiClient from '../api/client';
import AuthContext from '../context/AuthContext';
import groupsApi from '../api/groupsApi';

const groups = [
  {
    groupId: 1,
    groupName: 'Software Engineering Group',
    groupDescription: 'All about software engineering',
    groupImage: null,
  },
  {
    groupId: 2,
    groupName: 'Coder Coder',
    groupDescription: 'Coding Tests',
    groupImage: null,
  },
  {
    groupId: 3,
    groupName: 'Developers hub',
    groupDescription: 'Helping other developers',
    groupImage: null,
  },
  {
    groupId: 4,
    groupName: 'Coding Memes',
    groupDescription: 'Fun group',
    groupImage: null,
  },
];

function JoinGroupsScreen({navigation}) {
  const [allGroups, setAllGroups] = useState([]);

  const {user} = useContext(AuthContext);

  const getAllGroups = async () => {
    try {
      const response = await groupsApi.getGroups(user.user_id);
      setAllGroups([...response.data.allGroups]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllGroups();
  }, []);

  return (
    <View style={styles.container}>
      <AppHeadingText style={styles.heading}>Suggestions</AppHeadingText>
      <FlatList
        data={allGroups}
        keyExtractor={group => group.group_id?.toString()}
        renderItem={({item}) => (
          <GroupPickerItem
            onPress={() =>
              navigation.navigate(routes.SINGLE_GROUP, {
                group: item,
              })
            }
            item={item}
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

  heading: {
    fontSize: 25,
    marginLeft: 10,
  },
});
export default JoinGroupsScreen;

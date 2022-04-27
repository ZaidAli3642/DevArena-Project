import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';

import GroupPickerItem from './../components/GroupPickerItem';
import ItemSeperator from './../components/ItemSeperator';
import AppText from './../components/AppText';
import AppButton from './../components/AppButton';
import colors from '../config/colors';
import AppHeadingText from './../components/AppHeadingText';
import routes from '../routes/routes';

const groups = [
  {
    groupId: 1,
    groupName: 'Group 1',
    groupDescription: 'Group Description 1',
    groupImage:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  },
  {
    groupId: 2,
    groupName: 'Group 2',
    groupDescription: 'Group Description 2',
    groupImage:
      'https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80',
  },
  {
    groupId: 3,
    groupName: 'Group 3',
    groupDescription: 'Group Description 3',
    groupImage:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  },
  {
    groupId: 4,
    groupName: 'Group 4',
    groupDescription: 'Group Description 4',
    groupImage:
      'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=853&q=80',
  },
  {
    groupId: 5,
    groupName: 'Group 4',
    groupDescription: 'Group Description 4',
    groupImage:
      'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=853&q=80',
  },
  {
    groupId: 6,
    groupName: 'Group 4',
    groupDescription: 'Group Description 4',
    groupImage:
      'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=853&q=80',
  },
  {
    groupId: 7,
    groupName: 'Group 4',
    groupDescription: 'Group Description 4',
    groupImage:
      'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=853&q=80',
  },
  {
    groupId: 8,
    groupName: 'Group 4',
    groupDescription: 'Group Description 4',
    groupImage:
      'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=853&q=80',
  },
  {
    groupId: 9,
    groupName: 'Group 4',
    groupDescription: 'Group Description 4',
    groupImage:
      'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=853&q=80',
  },
  {
    groupId: 10,
    groupName: 'Group 4',
    groupDescription: 'Group Description 4',
    groupImage:
      'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=853&q=80',
  },
];

function JoinGroupsScreen({navigation}) {
  return (
    <View style={styles.container}>
      <AppHeadingText style={styles.heading}>Suggestions</AppHeadingText>
      <FlatList
        data={groups}
        keyExtractor={group => group.groupId.toString()}
        renderItem={({item}) => (
          <GroupPickerItem
            onPress={() => navigation.navigate(routes.SINGLE_GROUP)}
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

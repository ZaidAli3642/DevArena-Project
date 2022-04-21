import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';

import GroupPickerItem from './../components/GroupPickerItem';
import ItemSeperator from './../components/ItemSeperator';
import AppText from './../components/AppText';
import AppButton from './../components/AppButton';
import colors from '../config/colors';
import AppHeadingText from './../components/AppHeadingText';

const groups = [
  {
    groupId: 1,
    groupName: 'Group 1',
    groupDescription: 'Group Description 1',
    groupImage: require('../assets/girl1.jpg'),
  },
  {
    groupId: 2,
    groupName: 'Group 2',
    groupDescription: 'Group Description 2',
    groupImage: require('../assets/girl2.jpg'),
  },
  {
    groupId: 3,
    groupName: 'Group 3',
    groupDescription: 'Group Description 3',
    groupImage: require('../assets/boy1.jpg'),
  },
  {
    groupId: 4,
    groupName: 'Group 4',
    groupDescription: 'Group Description 4',
    groupImage: require('../assets/boy2.jpg'),
  },
  {
    groupId: 5,
    groupName: 'Group 4',
    groupDescription: 'Group Description 4',
    groupImage: require('../assets/boy2.jpg'),
  },
  {
    groupId: 6,
    groupName: 'Group 4',
    groupDescription: 'Group Description 4',
    groupImage: require('../assets/boy2.jpg'),
  },
  {
    groupId: 7,
    groupName: 'Group 4',
    groupDescription: 'Group Description 4',
    groupImage: require('../assets/boy2.jpg'),
  },
  {
    groupId: 8,
    groupName: 'Group 4',
    groupDescription: 'Group Description 4',
    groupImage: require('../assets/boy2.jpg'),
  },
  {
    groupId: 9,
    groupName: 'Group 4',
    groupDescription: 'Group Description 4',
    groupImage: require('../assets/boy2.jpg'),
  },
  {
    groupId: 10,
    groupName: 'Group 4',
    groupDescription: 'Group Description 4',
    groupImage: require('../assets/boy2.jpg'),
  },
];

function JoinGroupsScreen() {
  return (
    <View style={styles.container}>
      <AppHeadingText style={styles.heading}>Suggestions</AppHeadingText>
      <FlatList
        data={groups}
        keyExtractor={group => group.groupId.toString()}
        renderItem={({item}) => <GroupPickerItem item={item} />}
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

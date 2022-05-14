import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';

import GroupPickerItem from './../components/GroupPickerItem';
import ItemSeperator from './../components/ItemSeperator';
import AppHeadingText from './../components/AppHeadingText';
import routes from '../routes/routes';

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
  return (
    <View style={styles.container}>
      <AppHeadingText style={styles.heading}>Suggestions</AppHeadingText>
      <FlatList
        data={groups}
        keyExtractor={group => group.groupId.toString()}
        renderItem={({item}) => (
          <GroupPickerItem
            onPress={() =>
              navigation.navigate(routes.SINGLE_GROUP, {
                group: {
                  groupName: item.groupName,
                  groupDescription: item.groupDescription,
                  groupImage:
                    item.groupImage ||
                    'https://icdn.digitaltrends.com/image/digitaltrends/avatars-character-line-up_white_bg-copy.jpg',
                },
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

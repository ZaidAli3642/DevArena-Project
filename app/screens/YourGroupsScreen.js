import React from 'react';
import {FlatList, View, StyleSheet, ScrollView} from 'react-native';

import GroupItem from '../components/GroupItem';
import ItemSeperator from './../components/ItemSeperator';
import AppText from './../components/AppText';
import AppButton from './../components/AppButton';
import colors from '../config/colors';
import AppHeadingText from '../components/AppHeadingText';

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

const createdGroups = [
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
];

// List all the Groups that you have joined
function YourGroupsScreen({GroupPickerItem = GroupItem}) {
  return (
    <>
      {groups.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <AppText style={styles.emptyTextMessage}>
            You haven't joined any group.
          </AppText>
          <AppButton
            textStyle={styles.textStyle}
            style={styles.button}
            title="TAP ME TO DISCOVER"
          />
        </View>
      ) : (
        <View style={styles.container}>
          <AppHeadingText style={styles.heading}>Your Groups</AppHeadingText>

          <View>
            <FlatList
              data={groups}
              keyExtractor={group => group.groupId.toString()}
              ListHeaderComponent={() => (
                <>
                  <View>
                    <AppText style={styles.text}>Your Created Groups</AppText>
                    <FlatList
                      scrollEnabled={false}
                      data={createdGroups}
                      keyExtractor={createdGroup =>
                        createdGroup.groupId.toString()
                      }
                      renderItem={({item}) => <GroupPickerItem item={item} />}
                      ItemSeparatorComponent={ItemSeperator}
                    />
                    <ItemSeperator />
                  </View>
                  <AppText style={[styles.text, {marginTop: 20}]}>
                    Your Joined Groups
                  </AppText>
                </>
              )}
              renderItem={({item}) => <GroupPickerItem item={item} />}
              ItemSeparatorComponent={ItemSeperator}
            />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    paddingHorizontal: 15,
  },
  emptyTextMessage: {
    color: colors.mediumGrey,
  },
  heading: {
    fontSize: 25,
    marginLeft: 10,
  },
  text: {
    marginLeft: 10,
  },
  textStyle: {
    fontSize: 17,
  },
});
export default YourGroupsScreen;

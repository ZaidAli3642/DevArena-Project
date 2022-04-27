import React from 'react';
import {FlatList, View, StyleSheet, ScrollView} from 'react-native';

import ItemSeperator from './../components/ItemSeperator';
import AppText from './../components/AppText';
import AppButton from './../components/AppButton';
import colors from '../config/colors';
import AppHeadingText from '../components/AppHeadingText';
import ListItem from './../components/ListItem';
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

const createdGroups = [
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
];

// List all the Groups that you have joined
function YourGroupsScreen({GroupPickerItem = ListItem, navigation}) {
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
                      renderItem={({item}) => (
                        <GroupPickerItem
                          name={item.groupName}
                          description={item.groupDescription}
                          image={item.groupImage}
                          onPress={() =>
                            navigation.navigate(routes.SINGLE_GROUP)
                          }
                        />
                      )}
                      ItemSeparatorComponent={ItemSeperator}
                    />
                    <ItemSeperator />
                  </View>
                  <AppText style={[styles.text, {marginTop: 20}]}>
                    Your Joined Groups
                  </AppText>
                </>
              )}
              renderItem={({item}) => (
                <GroupPickerItem
                  name={item.groupName}
                  description={item.groupDescription}
                  image={item.groupImage}
                  onPress={() => navigation.navigate(routes.SINGLE_GROUP)}
                />
              )}
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

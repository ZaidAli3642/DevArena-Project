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

const createdGroups = [
  {
    groupId: 1,
    groupName: 'Error Handling',
    groupDescription: 'Removing Bugs in codes',
    groupImage: null,
  },
  {
    groupId: 2,
    groupName: 'Front End Knowledge Group',
    groupDescription: 'front end skill developers',
    groupImage: null,
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
              contentContainerStyle={{paddingBottom: 100}}
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
                          image={
                            item.groupImage ||
                            'https://icdn.digitaltrends.com/image/digitaltrends/avatars-character-line-up_white_bg-copy.jpg'
                          }
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
                  image={
                    item.groupImage ||
                    'https://icdn.digitaltrends.com/image/digitaltrends/avatars-character-line-up_white_bg-copy.jpg'
                  }
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

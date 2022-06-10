import React, {useContext, useState, useEffect} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';

import ItemSeperator from './../components/ItemSeperator';
import AppText from './../components/AppText';
import AppButton from './../components/AppButton';
import colors from '../config/colors';
import AppHeadingText from '../components/AppHeadingText';
import ListItem from './../components/ListItem';
import routes from '../routes/routes';
import apiClient from '../api/client';
import AuthContext from '../context/AuthContext';
import groupsApi from '../api/groupsApi';

// List all the Groups that you have joined
function YourGroupsScreen({GroupPickerItem = ListItem, navigation}) {
  const [userCreatedGroups, setUserCreatedGroups] = useState([]);
  const [userJoinedGroups, setUserJoinedGroups] = useState([]);

  const {user} = useContext(AuthContext);

  const getUserCreatedGroups = async () => {
    try {
      const response = await groupsApi.getCreatedGroups(user.user_id);
      setUserCreatedGroups([...response.data.allUserGroups]);
    } catch (error) {
      console.log(error);
    }
  };

  const getJoinedUserGroups = async () => {
    try {
      const response = await groupsApi.getJoinedGroups(user.user_id);
      setUserJoinedGroups(response.data.joinedGroups);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const ac = new AbortController();

    getUserCreatedGroups();
    getJoinedUserGroups();

    return () => ac.abort();
  }, []);

  return (
    <>
      {userCreatedGroups.length === 0 && userJoinedGroups.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <AppText style={styles.emptyTextMessage}>
            You haven't created or joined any group.
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
              data={userJoinedGroups}
              keyExtractor={group => group.group_id.toString()}
              contentContainerStyle={{paddingBottom: 100}}
              ListHeaderComponent={() => (
                <>
                  <View>
                    <AppText style={styles.text}>Your Created Groups</AppText>
                    <FlatList
                      scrollEnabled={false}
                      data={userCreatedGroups}
                      keyExtractor={createdGroup =>
                        createdGroup.group_id.toString()
                      }
                      renderItem={({item}) => (
                        <GroupPickerItem
                          name={item.group_name}
                          description={item.group_description}
                          image={
                            item.group_image ||
                            'https://icdn.digitaltrends.com/image/digitaltrends/avatars-character-line-up_white_bg-copy.jpg'
                          }
                          onPress={() =>
                            navigation.navigate(routes.SINGLE_GROUP, {
                              group: item,
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
                  name={item.group_name}
                  description={item.group_description}
                  image={
                    item.group_image ||
                    'https://icdn.digitaltrends.com/image/digitaltrends/avatars-character-line-up_white_bg-copy.jpg'
                  }
                  onPress={() =>
                    navigation.navigate(routes.SINGLE_GROUP, {
                      group: item,
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

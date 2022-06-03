import React, {useState, useEffect, useContext} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';

import GroupPickerItem from './../components/GroupPickerItem';
import ItemSeperator from './../components/ItemSeperator';
import AppHeadingText from './../components/AppHeadingText';
import routes from '../routes/routes';
import AuthContext from '../context/AuthContext';
import groupsApi from '../api/groupsApi';

function JoinGroupsScreen({navigation}) {
  const [allGroups, setAllGroups] = useState([]);

  const {user} = useContext(AuthContext);

  const getAllGroups = async () => {
    try {
      const response = await groupsApi.getGroups(user.user_id);

      const result = response.data.allGroups.reduce((finalArray, current) => {
        let obj = finalArray.find(item => item.group_id === current.group_id);

        if (obj) {
          return finalArray;
        }
        return finalArray.concat([current]);
      }, []);

      setAllGroups([...result]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const ac = new AbortController();
    getAllGroups();

    return () => ac.abort();
  }, []);

  return (
    <View style={styles.container}>
      <AppHeadingText style={styles.heading}>Suggestions</AppHeadingText>
      <FlatList
        data={allGroups}
        keyExtractor={group => group.group_id.toString()}
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

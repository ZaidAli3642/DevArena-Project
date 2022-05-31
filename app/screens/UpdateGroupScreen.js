import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AppHeadingText from '../components/AppHeadingText';
import ItemSeperator from '../components/ItemSeperator';
import ListItem from '../components/ListItem';
import routes from '../routes/routes';
import colors from '../config/colors';
import Icon from '../components/Icon';

function UpdateGroupScreen({navigation, route}) {
  const {group} = route.params;

  const groupInfo = [
    {
      id: 1,
      name: 'Group Name',
      description: group.group_name,
      target: routes.USER_INFO_UPDATE,
      oldValue: group.group_name,
      oldText: 'Group Name',
      key: 'group_name',
      icon: {
        iconPackage: MaterialCommunityIcons,
        backgroundColor: 'tomato',
        name: 'account-group',
      },
    },
    {
      id: 2,
      name: 'Group Description',
      description: group.group_description,
      target: routes.USER_INFO_UPDATE,
      oldValue: group.group_description,
      oldText: 'Group Description',
      key: 'group_description',
      icon: {
        iconPackage: MaterialIcons,
        backgroundColor: colors.darkBlue,
        name: 'description',
      },
    },
  ];
  return (
    <View style={styles.container}>
      <AppHeadingText style={styles.heading}>
        Personal Information
      </AppHeadingText>
      <FlatList
        data={groupInfo}
        keyExtractor={info => info.id.toString()}
        renderItem={({item}) => (
          <View
            style={{
              padding: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <ListItem
                name={item.name}
                description={item.description}
                IconComponent={
                  <Icon
                    IconPackage={item.icon.iconPackage}
                    name={item.icon.name}
                    backgroundColor={item.icon.backgroundColor}
                  />
                }
                onPress={() =>
                  navigation.navigate(item.target, {
                    oldTextName: item.oldText,
                    oldValue: item.oldValue,
                    key: item.key,
                    group,
                  })
                }
              />
            </View>
            <MaterialCommunityIcons name="chevron-right" size={27} />
          </View>
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
    marginLeft: 20,
    fontSize: 35,
  },
});
export default UpdateGroupScreen;

import React, {useContext, useEffect, useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import AppHeadingText from '../components/AppHeadingText';
import Icon from '../components/Icon';
import ListItem from '../components/ListItem';
import colors from '../config/colors';
import routes from '../routes/routes';
import ItemSeperator from './../components/ItemSeperator';
import AuthContext from './../context/AuthContext';
import authStorage from '../context/auth/authStorage';

const menuItems = [
  {
    title: 'Settings',
    icon: {
      iconPackage: Ionicons,
      backgroundColor: colors.green,
      name: 'settings-outline',
    },
    target: routes.SETTINGS,
  },
  {
    title: 'Groups',
    icon: {
      iconPackage: MaterialIcons,
      backgroundColor: 'dodgerblue',
      name: 'group',
    },
    target: routes.GROUPS,
  },
  {
    title: 'Group Requests',
    icon: {
      iconPackage: MaterialCommunityIcons,
      backgroundColor: '#778ca3',
      name: 'check-circle-outline',
    },
    target: routes.REQUESTS,
  },
  {
    title: 'Follow Requests',
    icon: {
      iconPackage: SimpleLineIcons,
      backgroundColor: '#a55eea',
      name: 'user-follow',
    },
    target: routes.FOLLOW,
  },
];

function MenuScreen({navigation}) {
  const {user, setUser, image, setImage} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <AppHeadingText style={styles.heading}>Account</AppHeadingText>
      <View style={styles.innerContainer}>
        <ListItem
          name={`${user.firstname} ${user.lastname}`}
          description={user.category}
          image={image}
          roundedImage={true}
          onPress={() =>
            navigation.navigate(routes.PROFILE, {user_id: user.user_id})
          }
        />
      </View>

      <View style={styles.innerContainer}>
        <FlatList
          data={menuItems}
          keyExtractor={menuItem => menuItem.title.toString()}
          renderItem={({item}) => (
            <ListItem
              name={item.title}
              IconComponent={
                <Icon
                  IconPackage={item.icon.iconPackage}
                  backgroundColor={item.icon.backgroundColor}
                  name={item.icon.name}
                />
              }
              onPress={() => navigation.navigate(item.target)}
            />
          )}
          ItemSeparatorComponent={ItemSeperator}
        />

        <ListItem
          name="Logout"
          IconComponent={
            <Icon
              IconPackage={MaterialCommunityIcons}
              backgroundColor={colors.yellow}
              name="logout"
            />
          }
          onPress={() => {
            setUser(null);
            setImage(null);
            authStorage.removeToken();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    backgroundColor: colors.white,
    marginVertical: 10,
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f4f4',
  },
  heading: {
    marginLeft: 20,
    marginBottom: 0,
  },
});
export default MenuScreen;

import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AppHeadingText from '../components/AppHeadingText';
import Icon from '../components/Icon';
import ListItem from '../components/ListItem';
import colors from '../config/colors';
import ItemSeperator from './../components/ItemSeperator';

const menuItems = [
  {
    title: 'Settings',
    icon: {
      iconPackage: Ionicons,
      backgroundColor: colors.green,
      name: 'settings-outline',
    },
  },
  {
    title: 'Groups',
    icon: {
      iconPackage: MaterialIcons,
      backgroundColor: 'dodgerblue',
      name: 'group',
    },
  },
  {
    title: 'Logout',
    icon: {
      iconPackage: MaterialCommunityIcons,
      backgroundColor: colors.yellow,
      name: 'logout',
    },
  },
];

function MenuScreen() {
  return (
    <View style={styles.container}>
      <AppHeadingText style={styles.heading}>Account</AppHeadingText>
      <View style={styles.innerContainer}>
        <ListItem
          name="Zaid Saleem"
          description="Software Engineer"
          image={require('../assets/zaid-saleem-image.jpg')}
          roundedImage={true}
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
            />
          )}
          ItemSeparatorComponent={ItemSeperator}
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
  },
});
export default MenuScreen;

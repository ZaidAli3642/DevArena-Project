import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Icon from '../components/Icon';
import ItemSeperator from '../components/ItemSeperator';
import ListItem from '../components/ListItem';
import AppHeadingText from './../components/AppHeadingText';

function SettingsScreen() {
  const settings = [
    {
      id: 1,
      name: 'Personal Account Information',
      icon: {
        IconPackage: Feather,
        name: 'user',
        backgroundColor: 'tomato',
      },
    },
    {
      id: 2,
      name: 'Update Password',
      icon: {
        IconPackage: MaterialIcons,
        name: 'security',
        backgroundColor: 'dodgerblue',
      },
    },
  ];

  return (
    <View style={styles.container}>
      <AppHeadingText style={styles.heading}>Settings</AppHeadingText>
      <ListItem
        name="Zaid Saleem"
        image={require('../assets/zaid-saleem-image.jpg')}
        roundedImage={true}
        description="Software Engineer"
      />
      <ItemSeperator />
      <FlatList
        data={settings}
        keyExtractor={setting => setting.id.toString()}
        renderItem={({item}) => (
          <ListItem
            name={item.name}
            IconComponent={
              <Icon
                IconPackage={item.icon.IconPackage}
                name={item.icon.name}
                backgroundColor={item.icon.backgroundColor}
              />
            }
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
    marginLeft: 20,
  },
});
export default SettingsScreen;

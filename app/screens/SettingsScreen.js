import React, {useContext} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Icon from '../components/Icon';
import ItemSeperator from '../components/ItemSeperator';
import ListItem from '../components/ListItem';
import AppHeadingText from './../components/AppHeadingText';
import routes from '../routes/routes';
import AuthContext from './../context/AuthContext';

function SettingsScreen({navigation}) {
  const settings = [
    {
      id: 1,
      name: 'Personal Account Information',
      icon: {
        IconPackage: Feather,
        name: 'user',
        backgroundColor: 'tomato',
      },
      target: routes.PERSONAL_INFORMATION,
    },
    {
      id: 2,
      name: 'Update Password',
      icon: {
        IconPackage: MaterialIcons,
        name: 'security',
        backgroundColor: 'dodgerblue',
      },
      target: routes.UPDATE_PASSWORD,
    },
  ];

  const {user} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <AppHeadingText style={styles.heading}>Settings</AppHeadingText>
      <ListItem
        name={`${user.firstName} ${user.lastName}`}
        image={user.profileImage}
        roundedImage={true}
        description={user.category.category}
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
            onPress={() => navigation.navigate(item.target)}
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

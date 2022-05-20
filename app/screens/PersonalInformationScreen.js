import React, {useContext} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AppHeadingText from '../components/AppHeadingText';
import ItemSeperator from '../components/ItemSeperator';
import ListItem from '../components/ListItem';
import routes from '../routes/routes';
import AuthContext from './../context/AuthContext';
import colors from '../config/colors';
import Icon from '../components/Icon';

function PersonalInformationScreen({navigation}) {
  const {user} = useContext(AuthContext);

  const personalInfo = [
    {
      id: 1,
      name: 'First Name',
      description: user.firstname,
      target: routes.USER_INFO_UPDATE,
      oldValue: user.firstname,
      oldText: 'First Name',
      icon: {
        iconPackage: MaterialCommunityIcons,
        backgroundColor: 'tomato',
        name: 'account',
      },
    },
    {
      id: 2,
      name: 'Last Name',
      description: user.lastname,
      target: routes.USER_INFO_UPDATE,
      oldValue: user.lastname,
      oldText: 'Last Name',
      icon: {
        iconPackage: MaterialCommunityIcons,
        backgroundColor: colors.darkBlue,
        name: 'account',
      },
    },
    {
      id: 3,
      name: 'Email Address',
      description: user.email,
      target: routes.USER_INFO_UPDATE,
      oldValue: user.email,
      oldText: 'Email',
      icon: {
        iconPackage: MaterialCommunityIcons,
        backgroundColor: 'purple',
        name: 'email',
      },
    },
    {
      id: 4,
      name: 'Category',
      description: user.category,
      target: routes.USER_CATEGORY_INFO_UPDATE,
      oldValue: user.category,
      oldText: 'Category',
      icon: {
        iconPackage: MaterialIcons,
        backgroundColor: 'orange',
        name: 'groups',
      },
    },
  ];
  return (
    <View style={styles.container}>
      <AppHeadingText style={styles.heading}>
        Personal Information
      </AppHeadingText>
      <FlatList
        data={personalInfo}
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
export default PersonalInformationScreen;

import React, {useContext} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AppHeadingText from '../components/AppHeadingText';
import ItemSeperator from '../components/ItemSeperator';
import ListItem from '../components/ListItem';
import routes from '../routes/routes';
import AuthContext from './../context/AuthContext';

function PersonalInformationScreen({navigation}) {
  const {user} = useContext(AuthContext);

  const personalInfo = [
    {
      id: 1,
      name: 'First Name',
      description: user.firstName,
      target: routes.USER_INFO_UPDATE,
    },
    {
      id: 2,
      name: 'Last Name',
      description: user.lastName,
      target: routes.USER_INFO_UPDATE,
    },
    {
      id: 3,
      name: 'Email Address',
      description: user.email,
      target: routes.USER_INFO_UPDATE,
    },
    {
      id: 4,
      name: 'Category',
      description: user.category,
      target: routes.USER_CATEGORY_INFO_UPDATE,
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
                onPress={() => navigation.navigate(item.target)}
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

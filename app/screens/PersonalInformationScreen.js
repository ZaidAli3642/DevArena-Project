import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AppHeadingText from '../components/AppHeadingText';
import ItemSeperator from '../components/ItemSeperator';
import ListItem from '../components/ListItem';

const personalInfo = [
  {id: 1, name: 'First Name', description: 'Zaid'},
  {id: 2, name: 'Last Name', description: 'Saleem'},
  {id: 3, name: 'Email Address', description: 'xyz@gmail.com'},
  {id: 4, name: 'Category', description: 'Software Engineer'},
];

function PersonalInformationScreen() {
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
              <ListItem name={item.name} description={item.description} />
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

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AppNavigator from './app/navigation/AppNavigator';
import AppText from './app/components/AppText';
import colors from './app/config/colors';
import AppButton from './app/components/AppButton';
import UserSearchItem from './app/components/UserSearchItem';

const users = [
  {id: 1, username: 'Zaid', image: require('./app/assets/girl1.jpg')},
  {id: 2, username: 'Ali', image: require('./app/assets/girl2.jpg')},
  {id: 3, username: 'Mustafa', image: require('./app/assets/boy1.jpg')},
  {id: 4, username: 'John', image: require('./app/assets/boy2.jpg')},
];

function App() {
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const searchUser = searchQuery => {
    if (searchQuery) {
      const newData = allUsers.filter(item => {
        const itemData = item.username
          ? item.username.toUpperCase()
          : ''.toUpperCase();
        const textData = searchQuery.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(searchQuery);
    } else {
      setFilteredData(allUsers);
      setSearch(searchQuery);
    }
  };

  useEffect(() => {
    setAllUsers(users);
  }, []);

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <View style={styles.mainHeader}>
          <AppText style={styles.title}>DevArena</AppText>
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={() => setVisible(true)}>
            <MaterialIcons name="search" size={25} />
          </TouchableOpacity>
        </View>
        <AppNavigator />
      </View>
      <Modal visible={visible} animationType="slide">
        <AppButton title="CLOSE" onPress={() => setVisible(false)} />
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={25} />
          <TextInput
            placeholder="Search"
            onChangeText={text => searchUser(text)}
            autoFocus
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
          />
        </View>
        <ScrollView>
          {search
            ? filteredData.map(user => (
                <UserSearchItem key={user.id} user={user} />
              ))
            : null}
        </ScrollView>
      </Modal>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    margin: 15,
    color: colors.red,
    fontWeight: 'bold',
  },
  mainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    backgroundColor: colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
    paddingLeft: 10,
    marginHorizontal: 20,
    borderRadius: 40,
    marginVertical: 10,
  },
  searchIcon: {
    marginRight: 20,
    backgroundColor: colors.lightGrey,
    borderRadius: 40,
    padding: 10,
  },
});
export default App;

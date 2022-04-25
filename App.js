import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import AppNavigator from './app/navigation/AppNavigator';

import AppHeader from './app/components/AppHeader';

const users = [
  {id: 1, username: 'Zaid', image: require('./app/assets/girl1.jpg')},
  {id: 2, username: 'Ali', image: require('./app/assets/girl2.jpg')},
  {id: 3, username: 'Mustafa', image: require('./app/assets/boy1.jpg')},
  {id: 4, username: 'John', image: require('./app/assets/boy2.jpg')},
];

function App() {
  const [search, setSearch] = useState('');
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
      <AppHeader
        search={search}
        filteredData={filteredData}
        searchUser={searchUser}
      />
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;

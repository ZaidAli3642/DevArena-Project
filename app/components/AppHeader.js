import React, {useState} from 'react';
import {
  View,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors from '../config/colors';
import AppButton from './AppButton';
import AppText from './AppText';
import UserSearchItem from './UserSearchItem';

function AppHeader({filteredData, search, searchUser}) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <View style={styles.mainHeader}>
        <AppText style={styles.title}>DevArena</AppText>
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={() => setVisible(true)}>
          <MaterialIcons name="search" size={25} />
        </TouchableOpacity>
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
    </>
  );
}

const styles = StyleSheet.create({
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
export default AppHeader;

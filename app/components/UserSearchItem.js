import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import AppText from './AppText';
import ItemSeperator from './ItemSeperator';
import colors from '../config/colors';

function UserSearchItem({user}) {
  return (
    <View key={user.id}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
        }}>
        <Image
          style={{width: 50, height: 50, borderRadius: 50 / 2}}
          source={user.image}
        />
        <AppText
          style={{
            marginHorizontal: 10,
            fontSize: 20,
            color: colors.mediumGrey,
          }}>
          {user.username}
        </AppText>
      </View>
      <ItemSeperator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
export default UserSearchItem;

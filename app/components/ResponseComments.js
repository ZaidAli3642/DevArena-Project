import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import AppText from './AppText';
import colors from '../config/colors';

function ResponseComments({item}) {
  return (
    <View style={styles.responseCommentContainer}>
      <Image style={styles.responseImage} source={item.userImage} />
      <View>
        <AppText style={styles.responseUsername}>{item.username}</AppText>
        <AppText style={styles.description}>{item.description}</AppText>
        <AppText style={styles.text}>{item.date}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 15,
    color: colors.mediumGrey,
  },
  responseCommentContainer: {
    flexDirection: 'row',
    marginLeft: 70,
    marginVertical: 2,
  },
  responseImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 10,
  },

  responseUsername: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 13,
    color: colors.lightBrown,
  },
});
export default ResponseComments;

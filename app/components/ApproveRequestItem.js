import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import AppText from './AppText';
import AppButton from './AppButton';

function ApproveRequestItem({approveRequest, name, message, groupName}) {
  return (
    <View style={styles.requestContainer}>
      <Image
        style={styles.image}
        source={require('../assets/zaid-saleem-image.jpg')}
      />
      <View style={styles.description}>
        <AppText style={styles.title}>{name}</AppText>
        <AppText numberOfLines={1}>{message + ' ' + groupName}</AppText>
      </View>
      <AppButton
        title="Approve"
        textStyle={styles.buttonText}
        style={styles.button}
        onPress={approveRequest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 15,
  },
  description: {
    flex: 1,
    marginLeft: 5,
  },
  requestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  title: {
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 10,
  },
});
export default ApproveRequestItem;

import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

import AppHeadingText from '../components/AppHeadingText';
import AppText from '../components/AppText';
import colors from '../config/colors';

function GroupHeader() {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.coverImage}
          source={require('../assets/girl1.jpg')}
        />
        <AppHeadingText style={styles.heading}>Group 1</AppHeadingText>
        <AppText style={styles.description}>Description 1</AppText>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingBottom: 20,
    elevation: 10,
  },
  description: {
    marginLeft: 20,
  },
  heading: {
    fontSize: 25,
    marginLeft: 20,
    marginVertical: 7,
    marginTop: 15,
  },
  coverImage: {
    width: '100%',
    height: 250,
  },
  input: {
    marginVertical: 10,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginVertical: 10,
    paddingVertical: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
});
export default GroupHeader;

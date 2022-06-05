import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../config/colors';
import {useNetInfo} from '@react-native-community/netinfo';
import AppText from './AppText';

function OfflineNotice() {
  const netInfo = useNetInfo();
  console.log(netInfo);

  if (netInfo.isConnected === false || netInfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <AppText style={styles.text}>No Internet Connection</AppText>
      </View>
    );

  return null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.red,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
  },
});

export default OfflineNotice;

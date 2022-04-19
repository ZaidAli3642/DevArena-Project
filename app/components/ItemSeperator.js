import React from 'react';
import {View, StyleSheet} from 'react-native';

function ItemSeperator() {
  return <View style={styles.line}></View>;
}

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#ededed',
  },
});
export default ItemSeperator;

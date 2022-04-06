import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

function AppButton({title, color = '#4ECDC4', onPress}) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={[styles.button, {backgroundColor: color}]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 40,
    padding: 10,
    width: '100%',
    marginVertical: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
});
export default AppButton;

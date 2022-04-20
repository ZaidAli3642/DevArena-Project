import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

function AppButton({title, color = '#4ECDC4', onPress, style, textStyle}) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={[styles.button, {backgroundColor: color}, style]}>
        <Text style={[styles.title, textStyle]}>{title}</Text>
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

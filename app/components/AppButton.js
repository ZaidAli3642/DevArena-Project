import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import colors from '../config/colors';

function AppButton({
  title,
  color = '#4ECDC4',
  onPress,
  style,
  textStyle,
  disabled = false,
}) {
  return (
    <TouchableOpacity activeOpacity={0.7} disabled={disabled} onPress={onPress}>
      <View style={[styles.button, {backgroundColor: color}, style]}>
        {disabled ? (
          <ActivityIndicator
            color={colors.white}
            size={'large'}
            animating={disabled}
          />
        ) : (
          <Text style={[styles.title, textStyle]}>{title}</Text>
        )}
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

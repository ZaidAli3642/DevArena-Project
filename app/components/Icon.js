import React from 'react';
import {View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Icon({
  name,
  iconColor = '#fff',
  IconPackage,
  backgroundColor = '#000',
  size = 40,
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: backgroundColor,
        borderRadius: size / 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <IconPackage name={name} size={size * 0.5} color={iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
export default Icon;

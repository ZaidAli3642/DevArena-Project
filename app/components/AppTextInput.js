import React, {useContext} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import inputRefContext from '../context/inputRefContext';

import colors from '../config/colors';

function AppTextInput({
  name,
  iconName,
  placeholder,
  width = '100%',
  style,
  textColor = colors.white,
  values,
  ...otherProps
}) {
  const inputContext = useContext(inputRefContext);

  return (
    <View style={[styles.inputContainer, style]}>
      {iconName && (
        <MaterialCommunityIcons
          name={iconName}
          size={25}
          color={colors.mediumWhite}
        />
      )}
      <TextInput
        placeholderTextColor={colors.mediumWhite}
        placeholder={placeholder}
        style={[styles.textInput, {color: textColor}]}
        value={values}
        ref={inputContext}
        multiline
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    fontSize: 18,
    color: colors.white,
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.red,
    borderRadius: 40,
    padding: 4,
    paddingLeft: 20,
    marginVertical: 15,
  },
});
export default AppTextInput;

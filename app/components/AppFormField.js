import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useFormikContext} from 'formik';

import ErrorMessage from './ErrorMessage';
import AppTextInput from './AppTextInput';

function AppFormField({name, iconName, ...otherProps}) {
  const {handleChange, errors, values} = useFormikContext();

  return (
    <>
      <AppTextInput
        iconName={iconName}
        name={name}
        values={values[name]}
        onChangeText={handleChange(name)}
        // autoCorrect={false}
        // autoCapitalize="none"
        // keyboardType="email-address"
        // name="email"

        {...otherProps}
      />
      <ErrorMessage error={errors[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
export default AppFormField;

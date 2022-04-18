import React from 'react';
import {StyleSheet} from 'react-native';
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
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} />
    </>
  );
}

export default AppFormField;

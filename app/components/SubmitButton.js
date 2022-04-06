import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useFormikContext} from 'formik';

import AppButton from './AppButton';
import colors from '../config/colors';

function SubmitButton({title}) {
  const {handleSubmit} = useFormikContext();

  return <AppButton title={title} color={colors.red} onPress={handleSubmit} />;
}

export default SubmitButton;

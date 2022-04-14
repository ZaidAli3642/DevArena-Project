import React from 'react';
import {View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFormikContext} from 'formik';

import AppButton from './AppButton';
import colors from '../config/colors';

function SubmitButton({title}) {
  const {handleSubmit} = useFormikContext();

  return (
    <>
      {title && (
        <AppButton title={title} color={colors.red} onPress={handleSubmit} />
      )}
      {!title && (
        <MaterialCommunityIcons
          name="send-circle"
          size={70}
          color={colors.red}
          onPress={handleSubmit}
        />
      )}
    </>
  );
}

export default SubmitButton;

import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
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
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}>
          <MaterialCommunityIcons
            name="send-circle"
            size={70}
            color={colors.red}
          />
        </TouchableOpacity>
      )}
    </>
  );
}

export default SubmitButton;

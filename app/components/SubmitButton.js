import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFormikContext} from 'formik';

import AppButton from './AppButton';
import colors from '../config/colors';

function SubmitButton({title, disabled}) {
  const {handleSubmit} = useFormikContext();

  return (
    <>
      {title && (
        <AppButton
          title={title}
          color={colors.red}
          disabled={disabled}
          onPress={handleSubmit}
        />
      )}
      {!title && (
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            handleSubmit();
          }}>
          {disabled ? (
            <ActivityIndicator
              color={colors.white}
              size="large"
              animating={disabled}
            />
          ) : (
            <MaterialCommunityIcons
              name="send-circle"
              size={70}
              color={colors.red}
            />
          )}
        </TouchableOpacity>
      )}
    </>
  );
}

export default SubmitButton;

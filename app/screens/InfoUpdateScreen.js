import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as yup from 'yup';

import AppForm from '../components/AppForm';
import AppFormField from '../components/AppFormField';
import AppHeadingText from '../components/AppHeadingText';
import AppKeyboardView from '../components/AppKeyboardView';
import SubmitButton from '../components/SubmitButton';
import colors from '../config/colors';
import AppText from './../components/AppText';

function InfoUpdateScreen({route}) {
  const validationSchema = yup.object().shape({
    data: yup.string().required('Data is required').label('Data'),
  });

  const {oldTextName, oldValue} = route.params;

  const handleSubmit = values => {
    const inputKey = 'firstname';
    const data = {
      [inputKey]: values.data,
    };
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <AppHeadingText style={styles.heading}>
        Update {oldTextName}
      </AppHeadingText>
      <AppText style={styles.text}>
        Old {oldTextName}: {oldValue}
      </AppText>
      <AppForm
        initialValues={{data: ''}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        <AppKeyboardView>
          <AppFormField
            name="data"
            placeholder={oldTextName}
            textColor="black"
            autoFocus
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            style={styles.input}
          />
          <SubmitButton title="UPDATE" />
        </AppKeyboardView>
      </AppForm>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 34,
    marginLeft: 10,
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
    color: colors.mediumGrey,
    // fontWeight: 'bold',
  },
  input: {
    height: 50,
    padding: 0,
    marginVertical: 40,
    color: colors.dark,
  },
});
export default InfoUpdateScreen;

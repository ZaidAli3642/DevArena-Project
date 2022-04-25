import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as yup from 'yup';

import AppHeadingText from '../components/AppHeadingText';
import AppText from '../components/AppText';
import AppForm from '../components/AppForm';
import SubmitButton from '../components/SubmitButton';
import AppDropDown from '../components/AppDropDown';

function InfoUpdatePickerScreen() {
  const validationSchema = yup.object().shape({
    category: yup.object().nullable().required().label('Category'),
  });

  const handleSubmit = values => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <AppHeadingText style={styles.heading}>Update Category</AppHeadingText>
      <AppText style={styles.text}>Old Category: Software Engineer</AppText>

      <AppForm
        initialValues={{category: null}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        <View>
          <AppDropDown name="category" />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginVertical: 20,
          }}>
          <SubmitButton title={'Submit'} />
        </View>
      </AppForm>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
export default InfoUpdatePickerScreen;

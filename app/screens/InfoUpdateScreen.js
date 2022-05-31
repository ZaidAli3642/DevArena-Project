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
import apiClient from './../api/client';

function InfoUpdateScreen({route}) {
  const validationSchema = yup.object().shape({
    data: yup.string().required('Data is required').label('Data'),
  });

  const {oldTextName, oldValue, key, user, group} = route.params;

  const handleGroupUpdate = async data => {
    try {
      const response = await apiClient.patch(
        `/group_update/${group.group_id}`,
        {
          updatedValue: data,
        },
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserUpdate = async data => {
    try {
      const response = await apiClient.patch(`/users/${user.user_id}`, {
        updatedValue: data,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = values => {
    const data = {
      name: key,
      value: values.data,
    };

    if (group.group_id) return handleGroupUpdate(data);

    return handleUserUpdate(data);
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
        onSubmit={handleUpdate}
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

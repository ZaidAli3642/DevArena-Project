import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import * as yup from 'yup';
import apiClient from '../api/client';

import AppForm from '../components/AppForm';
import AppFormField from '../components/AppFormField';
import AppHeadingText from '../components/AppHeadingText';
import AppKeyboardView from '../components/AppKeyboardView';
import PostItem from '../components/PostItem';
import SubmitButton from '../components/SubmitButton';
import colors from '../config/colors';
import AuthContext from '../context/AuthContext';

const validationSchema = yup.object().shape({
  groupName: yup.string().required().label('Group Name'),
  groupDescription: yup.string().required().label('Group Description'),
});

function CreateGroupScreen() {
  const {user} = useContext(AuthContext);

  const handleCreateGroup = async values => {
    const formdata = new FormData();

    if (values.image) {
      const photo = {
        uri: values.image.uri,
        type: values.image.type,
        name: values.image.fileName,
      };
      formdata.append('image', photo);
    }

    formdata.append('group_name', values.groupName);
    formdata.append('group_description', values.groupDescription);
    formdata.append('user_id', user.user_id);

    const response = await apiClient.post('/group', formdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(response.data);
  };

  return (
    <View style={styles.container}>
      <AppHeadingText style={styles.heading}>Create Group</AppHeadingText>
      <AppKeyboardView>
        <AppForm
          initialValues={{groupName: '', groupDescription: '', image: ''}}
          onSubmit={handleCreateGroup}
          validationSchema={validationSchema}>
          <AppFormField
            name="groupName"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            placeholder="Name"
          />
          <AppFormField
            name="groupDescription"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            placeholder="Description"
          />

          <View style={styles.upload}>
            <PostItem
              name="image"
              iconName="upload"
              title="Upload Cover Photo"
              width={100}
              height={100}
              iconColor={colors.red}
              textStyle={styles.textStyle}
            />
          </View>
          <SubmitButton title="CREATE" />
        </AppForm>
      </AppKeyboardView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.darkBlue,
  },
  heading: {
    color: colors.white,
    fontSize: 25,
    marginVertical: 10,
  },
  textStyle: {
    color: colors.white,
  },
  upload: {
    marginTop: 10,
  },
  uploadButton: {
    backgroundColor: colors.mediumWhite,
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CreateGroupScreen;

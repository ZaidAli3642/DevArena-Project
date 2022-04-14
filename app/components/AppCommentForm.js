import React from 'react';
import {View, StyleSheet} from 'react-native';
import {format} from 'timeago.js';

import AppForm from './AppForm';
import AppFormField from './AppFormField';
import colors from '../config/colors';
import SubmitButton from './SubmitButton';

function AppCommentForm({comments, onChangeComments}) {
  return (
    <AppForm
      initialValues={{comment: ''}}
      onSubmit={values => {
        const newComment = {
          commentId: Date.now(),
          userImage: require('../assets/zaid-saleem-image.jpg'),
          username: 'Zaid Saleem',
          description: values.comment,
          date: format(new Date()),
        };
        const newComments = [...comments, newComment];
        onChangeComments(newComments);
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <AppFormField
          autoCorrect={false}
          autoCapitalize="none"
          iconName="comment"
          keyboardType="default"
          name="comment"
          placeholder="Comment"
          color={colors.darkBlue}
        />
        <SubmitButton />
      </View>
    </AppForm>
  );
}

export default AppCommentForm;

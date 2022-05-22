import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AppForm from './AppForm';
import AppFormField from './AppFormField';
import colors from '../config/colors';
import SubmitButton from './SubmitButton';
import AppText from './AppText';
import ErrorMessage from './ErrorMessage';

function AppCommentForm({
  handleSubmit,
  keyboardReplyVisible,
  setKeyboardReplyVisible,
  selectedComment,
  errorMessage,
  commentPostFailed,
}) {
  return (
    <AppForm initialValues={{comment: ''}} onSubmit={handleSubmit}>
      <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
        {keyboardReplyVisible && (
          <View style={styles.textContainer}>
            <AppText
              style={
                styles.text
              }>{`${selectedComment.firstname} ${selectedComment.lastname}`}</AppText>
            <TouchableWithoutFeedback
              onPress={() => setKeyboardReplyVisible(false)}>
              <MaterialCommunityIcons
                style={styles.closeIcon}
                name="close"
                size={13}
                color={colors.dark}
              />
            </TouchableWithoutFeedback>
          </View>
        )}

        <View style={styles.keyboardContainer}>
          <AppFormField
            autoCorrect={false}
            autoCapitalize="none"
            iconName="comment"
            keyboardType="default"
            name="comment"
            placeholder="Comment"
            color={colors.darkBlue}
            style={styles.input}
          />
          <SubmitButton />
        </View>
        {commentPostFailed && (
          <View style={{marginLeft: 20, marginBottom: 5}}>
            <ErrorMessage error={errorMessage} />
          </View>
        )}
      </View>
    </AppForm>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeIcon: {
    backgroundColor: colors.mediumWhite,
    padding: 2,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    marginBottom: 0,
    marginTop: 0,
    height: 60,
  },
  text: {
    fontSize: 13,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    marginLeft: 20,
    marginTop: 10,
  },
});

export default AppCommentForm;

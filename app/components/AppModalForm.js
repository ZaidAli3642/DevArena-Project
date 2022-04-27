import React, {useContext} from 'react';
import {View, Modal, Image, StyleSheet} from 'react-native';
import * as yup from 'yup';

import AppButton from './AppButton';
import AppForm from './AppForm';
import AppFormField from './AppFormField';
import AppKeyboardView from '../components/AppKeyboardView';
import AppText from './AppText';
import colors from '../config/colors';
import SubmitButton from './SubmitButton';
import PostItem from './PostItem';
import AuthContext from './../context/AuthContext';

const validationSchema = yup.object().shape({
  description: yup.string().required().label('Description'),
});

function AppModalForm({
  visible,
  setVisible,
  placeholder,
  userTitle,
  handleSubmit,
}) {
  const {user} = useContext(AuthContext);

  return (
    <Modal
      onRequestClose={() => setVisible(false)}
      visible={visible}
      animationType="slide">
      <View style={{flex: 1, paddingHorizontal: 10, paddingVertical: 10}}>
        <AppButton
          title="CLOSE"
          color={colors.red}
          onPress={() => setVisible(false)}
        />
        <View style={styles.user}>
          <Image style={styles.image} source={{uri: user.profileImage}} />
          <AppText
            style={
              styles.userText
            }>{`${user.firstName} ${user.lastName}`}</AppText>
        </View>
        <AppForm
          initialValues={{description: '', image: null}}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <AppKeyboardView>
            <AppFormField
              name="description"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              placeholder={placeholder}
              autoFocus
              multiline={true}
              style={styles.postInput}
              textColor={colors.mediumGrey}
            />
          </AppKeyboardView>
          <PostItem
            iconName="image"
            name="image"
            title="Image"
            iconColor={colors.yellow}
          />

          <SubmitButton title="POST" />
        </AppForm>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  postInput: {
    borderColor: 'white',
    borderRadius: 0,
    flex: 1,
    alignItems: 'flex-start',
    padding: 0,
    color: colors.black,
  },
  user: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },
  userText: {
    marginLeft: 10,
    color: colors.mediumGrey,
  },
});
export default AppModalForm;

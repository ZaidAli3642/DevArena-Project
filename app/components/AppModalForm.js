import React from 'react';
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

const validationSchema = yup.object().shape({
  description: yup.string().required().label('Description'),
});

function AppModalForm({visible, setVisible, placeholder, userTitle}) {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={{flex: 1, paddingHorizontal: 10, paddingVertical: 10}}>
        <AppButton
          title="CLOSE"
          color={colors.red}
          onPress={() => setVisible(false)}
        />
        <View style={styles.user}>
          <Image
            style={styles.image}
            source={require('../assets/zaid-saleem-image.jpg')}
          />
          <AppText style={styles.userText}>{userTitle}</AppText>
        </View>
        <AppForm
          initialValues={{description: ''}}
          onSubmit={(values, {resetForm}) => {
            console.log(values);
            setVisible(false);
            resetForm();
          }}
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
          <PostItem iconName="image" title="Image" iconColor={colors.yellow} />

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

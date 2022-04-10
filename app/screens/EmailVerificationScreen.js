import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import * as yup from 'yup';

import AppText from '../components/AppText';
import AppKeyboardView from '../components/AppKeyboardView';
import colors from '../config/colors';
import AppForm from '../components/AppForm';
import AppFormField from '../components/AppFormField';
import SubmitButton from '../components/SubmitButton';

const validationSchema = yup.object().shape({
  verificationCode: yup
    .number()
    .typeError('Code must be in numbers.')
    .positive('Code must not have negative number.')
    .integer('Code should be positive number.')
    .required()
    .label('Verification Code'),
});

function EmailVerificationScreen(props) {
  return (
    <View style={styles.container}>
      <AppKeyboardView>
        <AppForm
          initialValues={{verificationCode: ''}}
          onSubmit={values => console.log(values)}
          validationSchema={validationSchema}>
          <View style={styles.icon}>
            <Image
              style={styles.image}
              source={require('../assets/email-verification-image.png')}
            />
            <AppText style={styles.text}>Verify Email</AppText>
          </View>
          <AppText style={styles.codeText}>
            Please Enter 6 digit code sent to your xyz@gmail.com.
          </AppText>
          <AppFormField
            iconName="email-check-outline"
            name="verificationCode"
            placeholder="Verification Code"
            keyboardType="number-pad"
            autoCorrect={false}
            maxLength={6}
            textContentType="oneTimeCode"
          />
          <SubmitButton title="Verify" />
        </AppForm>
      </AppKeyboardView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
    padding: 25,
  },
  codeText: {
    color: colors.white,
    fontSize: 20,
    marginTop: 70,
    marginBottom: 20,
    paddingRight: 40,
  },
  icon: {
    top: 20,
    alignItems: 'center',
  },
  image: {
    width: 170,
    height: 170,
  },
  text: {
    color: colors.white,
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
});
export default EmailVerificationScreen;

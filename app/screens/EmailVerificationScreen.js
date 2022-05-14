import React, {useState, useContext} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import * as yup from 'yup';

import AppText from '../components/AppText';
import AppKeyboardView from '../components/AppKeyboardView';
import colors from '../config/colors';
import AppForm from '../components/AppForm';
import AppFormField from '../components/AppFormField';
import SubmitButton from '../components/SubmitButton';
import AuthContext from './../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';

const validationSchema = yup.object().shape({
  verificationCode: yup
    .number()
    .typeError('Code must be in numbers.')
    .positive('Code must not have negative number.')
    .integer('Code should be positive number.')
    .required()
    .label('Verification Code'),
});

function EmailVerificationScreen({route}) {
  const [verifyFailed, setverifyFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const secretKey = '123456';

  const {setUser} = useContext(AuthContext);

  const verifyUser = values => {
    const user = {
      id: Date.now(),
      ...route.params.values,
      profileImage: null,
    };
    console.log(user);
    if (values.verificationCode === secretKey) {
      setUser(user);
    } else {
      setErrorMessage('Verification code not matched.');
      setverifyFailed(true);
    }
  };

  return (
    <View style={styles.container}>
      <AppKeyboardView>
        <AppForm
          initialValues={{verificationCode: ''}}
          onSubmit={verifyUser}
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
          {verifyFailed && <ErrorMessage error={errorMessage} />}
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

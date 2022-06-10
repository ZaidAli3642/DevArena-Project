import React, {useState} from 'react';
import {View, StyleSheet, Keyboard, ActivityIndicator} from 'react-native';
import * as yup from 'yup';

import AppForm from '../components/AppForm';
import SubmitButton from '../components/SubmitButton';
import colors from '../config/colors';
import AppText from '../components/AppText';
import AppKeyboardView from '../components/AppKeyboardView';
import AppFormPart1 from '../components/AppFormPart1';
import AppFormPart2 from '../components/AppFormPart2';
import AppButton from '../components/AppButton';
import routes from '../routes/routes';
import apiClient from '../api/client';
import ErrorMessage from '../components/ErrorMessage';

const validationSchema = yup.object().shape({
  firstName: yup.string().required().label('First Name'),
  lastName: yup.string().required().label('Last Name'),
  email: yup.string().email().required().label('Email'),
  password: yup.string().min(8).required().label('Password'),
  category: yup.object().required().nullable().label('Category'),
});

const steps = [<AppFormPart1 />, <AppFormPart2 />];

function RegisterScreen({navigation}) {
  const [page, setPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [registerFailed, setRegisterFailed] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleRegister = async (values, {resetForm}) => {
    setDisabled(true);
    try {
      const user = {
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
        category: values.category.category,
        password: values.password,
      };

      const result = await apiClient.post('/email_verify', {email: user.email});
      if (result.data.message === 'User already exist.') {
        setErrorMessage('Email Already Exist.');
        setRegisterFailed(true);
        return;
      }
      setRegisterFailed(false);
      user.sixDigitCode = result.data.sixDigitCode;
      navigation.navigate(routes.EMAIL_VERIFY, {user});
      setDisabled(false);
    } catch (error) {
      setDisabled(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <AppKeyboardView>
        <AppForm
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            category: null,
          }}
          onSubmit={handleRegister}
          validationSchema={validationSchema}>
          {registerFailed && <ErrorMessage error={errorMessage} />}
          {steps[page]}
          {page === steps.length - 1 ? (
            <>
              <AppButton
                title="GO BACK"
                color={colors.red}
                onPress={() => setPage(page - 1)}
              />
              <SubmitButton title="SIGNUP" disabled={disabled} />
            </>
          ) : (
            <AppButton
              title="NEXT STEP"
              color={colors.red}
              onPress={() => setPage(page + 1)}
            />
          )}
        </AppForm>
        <View style={styles.loginContainer}>
          <AppText style={styles.accountCreatedText}>
            Already have an account?
          </AppText>
          <AppText
            onPress={() => {
              navigation.navigate(routes.LOGIN);
              Keyboard.dismiss();
            }}
            style={styles.login}>
            Login
          </AppText>
        </View>
      </AppKeyboardView>
    </View>
  );
}

const styles = StyleSheet.create({
  accountCreatedText: {
    color: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    padding: 25,
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  login: {
    color: colors.red,
    marginLeft: 10,
  },
});
export default RegisterScreen;

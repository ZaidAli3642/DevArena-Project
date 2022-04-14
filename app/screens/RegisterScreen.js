import React, {useState} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import * as yup from 'yup';

import AppForm from '../components/AppForm';
import SubmitButton from '../components/SubmitButton';
import colors from '../config/colors';
import AppText from '../components/AppText';
import AppKeyboardView from '../components/AppKeyboardView';
import AppFormPart1 from '../components/AppFormPart1';
import AppFormPart2 from '../components/AppFormPart2';
import AppButton from '../components/AppButton';

const validationSchema = yup.object().shape({
  firstName: yup.string().required().label('First Name'),
  lastName: yup.string().required().label('Last Name'),
  email: yup.string().email().required().label('Email'),
  password: yup.string().min(8).required().label('Password'),
  category: yup.object().required().nullable().label('Category'),
});

const steps = [<AppFormPart1 />, <AppFormPart2 />];

function RegisterScreen() {
  const [page, setPage] = useState(0);

  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <AppKeyboardView>
        <AppForm
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            category: null,
          }}
          onSubmit={(values, {resetForm}) => {
            console.log(values);
            resetForm();
          }}
          validationSchema={validationSchema}>
          {steps[page]}
          {page === steps.length - 1 ? (
            <>
              <AppButton
                title="GO BACK"
                color={colors.red}
                onPress={() => setPage(page - 1)}
              />
              <SubmitButton title="SIGNUP" />
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
              console.log('Log in Pressed!');
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

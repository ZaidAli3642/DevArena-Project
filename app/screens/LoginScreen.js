import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import * as yup from 'yup';
import jwtDecode from 'jwt-decode';

import colors from '../config/colors';
import AppText from '../components/AppText';
import SubmitButton from '../components/SubmitButton';
import AppFormField from '../components/AppFormField';
import AppForm from '../components/AppForm';
import AppHeadingText from './../components/AppHeadingText';
import routes from '../routes/routes';
import AuthContext from './../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';
import apiClient from '../api/client';
import authStorage from '../context/auth/authStorage';

const validationSchema = yup.object().shape({
  email: yup.string().required().email().label('Email'),
  password: yup.string().required().min(8).label('Password'),
});

function LoginScreen({navigation}) {
  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {setUser, setImage} = useContext(AuthContext);

  const getUserImage = async user_id => {
    try {
      const {data} = await apiClient.get(`/image/${user_id}`);
      setImage(data.imageUri);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async values => {
    const loginUser = {
      email: values.email,
      password: values.password,
    };
    try {
      const {data} = await apiClient.post('/login', loginUser);

      if (data.message) {
        setErrorMessage(data.message);
        setLoginFailed(true);
        return;
      }

      authStorage.storeToken(data.token);
      const decodedUser = jwtDecode(data.token);
      setUser(decodedUser);

      if (decodedUser.user_id) getUserImage(decodedUser.user_id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeadingText style={styles.loginText}>Log In</AppHeadingText>
      {loginFailed && <ErrorMessage error={errorMessage} />}
      <AppForm
        initialValues={{email: '', password: ''}}
        onSubmit={handleLogin}
        validationSchema={validationSchema}>
        <AppFormField
          name="email"
          iconName="email"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
        />

        <AppFormField
          autoCorrect={false}
          autoCapitalize="none"
          iconName="lock"
          keyboardType="default"
          name="password"
          placeholder="Password"
          secureTextEntry={true}
        />

        <AppText
          onPress={() => console.log('Forgot Pressed!')}
          style={styles.text}>
          Forgot Password?
        </AppText>
        <SubmitButton title="LOGIN" />
      </AppForm>

      <View style={styles.registerContainer}>
        <AppText style={styles.accountCreatedText}>
          Don't have an account?
        </AppText>
        <AppText
          onPress={() => navigation.navigate(routes.REGISTER)}
          style={styles.signup}>
          Sign up
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  accountCreatedText: {
    color: colors.white,
  },
  container: {
    backgroundColor: colors.darkBlue,
    flex: 1,
    padding: 25,
  },
  text: {
    color: colors.red,
    textAlign: 'center',
    marginVertical: 20,
  },
  loginText: {
    color: colors.white,
    marginBottom: 40,
  },
  registerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  signup: {
    color: colors.red,
    marginLeft: 10,
  },
});
export default LoginScreen;

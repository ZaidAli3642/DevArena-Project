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

const validationSchema = yup.object().shape({
  email: yup.string().required().email().label('Email'),
  password: yup.string().required().min(8).label('Password'),
});

const users = [
  {
    id: 1,
    firstName: 'Zaid',
    lastName: 'Saleem',
    email: 'zaid@gmail.com',
    password: '12345678',
    profileImage:
      'https://scontent.flhe2-2.fna.fbcdn.net/v/t1.6435-9/118771478_1214683868899290_5857139491770958704_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFFToHulY2JIFDm9dbenBTMDOmBmhKGJLsM6YGaEoYku8-hHI69taiSTrg_vUNGKAYtzVsVUJolOksE50V0rVf2&_nc_ohc=Vkxms7h13KkAX_qwv0y&_nc_ht=scontent.flhe2-2.fna&oh=00_AT-0DqaX95U2DMPP_L8dvsy7PAB-5FHtrZFc3_YgdoWgfg&oe=628F74B5',
    category: {id: 1, category: 'Software Engineer'},
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Clarke',
    email: 'john@gmail.com',
    password: '12345678',
    profileImage:
      'https://images.unsplash.com/photo-1508852951744-beab078a4b2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    category: {id: 2, category: 'Coding Tester'},
  },
  {
    id: 3,
    firstName: 'Jordan',
    lastName: 'Kent',
    email: 'jordan@gmail.com',
    password: '12345678',
    profileImage:
      'https://images.unsplash.com/photo-1483726234545-481d6e880fc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    category: {id: 3, category: 'Learner'},
  },
];

function LoginScreen({navigation}) {
  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {setUser} = useContext(AuthContext);

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

      const decodedUser = jwtDecode(data.token);
      console.log(decodedUser);
      setUser(decodedUser);
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

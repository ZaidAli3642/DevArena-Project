import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Video from 'react-native-video';

import AppButton from '../components/AppButton';
import routes from '../routes/routes';

function WelcomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/backgroundvideo.mp4')}
        resizeMode="cover"
        repeat={true}
        style={styles.backgroundVideo}
      />
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <View style={styles.buttonContainer}>
        <AppButton
          title="LOGIN"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <AppButton
          title="SIGNUP"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    marginBottom: 40,
    padding: 20,
    width: '100%',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
  },
  registerButton: {
    backgroundColor: 'tomato',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    width: 150,
  },
  logo: {
    position: 'absolute',
    top: 70,
    width: 140,
    height: 140,
  },
  loginButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    width: 150,
  },
});
export default WelcomeScreen;

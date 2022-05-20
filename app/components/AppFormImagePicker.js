import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

function AppFormImagePicker({handleSelectImage, image}) {
  return (
    <TouchableOpacity onPress={handleSelectImage} style={styles.imageContainer}>
      {!image && (
        <Image
          style={styles.image}
          source={require('../assets/profileAvatar.jpeg')}
        />
      )}
      {image && <Image style={styles.image} source={{uri: image}} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    borderWidth: 4,
    borderColor: 'dodgerblue',
    width: 140,
    height: 140,
    borderRadius: 140 / 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
export default AppFormImagePicker;

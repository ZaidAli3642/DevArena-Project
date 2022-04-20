import React from 'react';
import {TouchableOpacity, Image, StyleSheet, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import {useFormikContext} from 'formik';

import AppText from './AppText';
import colors from '../config/colors';

function PostItem({
  title,
  name,
  iconName,
  iconColor,
  width,
  height,
  textStyle,
}) {
  const {setFieldValue, values} = useFormikContext();

  const imageUri = values[name];

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibrary({mediaType: 'photo'});
    if (!result.didCancel) {
      setFieldValue(name, result.assets[0].uri);
    }
  };

  const handlePress = () => {
    if (!imageUri) handleSelectImage();
    else
      Alert.alert(
        'Delete Image',
        'Are you sure you want to delete this Image?',
        [{text: 'Yes', onPress: () => setFieldValue(name, null)}, {text: 'No'}],
      );
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={styles.container}>
        {!imageUri ? (
          <>
            <MaterialCommunityIcons
              name={iconName}
              size={40}
              color={iconColor}
            />
            <AppText style={[styles.text, textStyle]}>{title}</AppText>
          </>
        ) : (
          <Image
            style={[styles.image, {width: width, height: height}]}
            source={{uri: imageUri}}
          />
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    borderTopColor: colors.lightGrey,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginLeft: 10,
  },
  text: {
    color: colors.mediumGrey,
    marginLeft: 10,
  },
});
export default PostItem;

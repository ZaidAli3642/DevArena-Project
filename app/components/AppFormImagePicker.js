import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import colors from '../config/colors';

function AppFormImagePicker({
  handleSelectImage,
  image,
  disabled,
  userImage,
  user_id,
  otherUserId,
}) {
  if (user_id !== otherUserId)
    return (
      <View style={styles.imageContainer}>
        {!image && (
          <Image
            style={styles.image}
            source={require('../assets/profileAvatar.jpeg')}
          />
        )}
        {image && <Image style={styles.image} source={{uri: image}} />}
      </View>
    );

  return (
    <>
      {disabled ? (
        <View style={styles.activityContainer}>
          <ActivityIndicator
            style={{
              width: '100%',
              height: '100%',
            }}
            color={colors.red}
            size="large"
            animating={disabled}
          />
        </View>
      ) : (
        <TouchableOpacity
          onPress={handleSelectImage}
          style={styles.imageContainer}>
          <>
            {!userImage && (
              <>
                {!disabled && (
                  <Image
                    style={styles.image}
                    source={require('../assets/profileAvatar.jpeg')}
                  />
                )}
              </>
            )}
            {userImage && (
              <Image style={styles.image} source={{uri: userImage}} />
            )}
          </>
        </TouchableOpacity>
      )}
    </>
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
  activityContainer: {
    borderWidth: 4,
    borderColor: 'dodgerblue',
    width: 140,
    height: 140,
    borderRadius: 140 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default AppFormImagePicker;

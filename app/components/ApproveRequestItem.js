import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';

import AppText from './AppText';
import AppButton from './AppButton';
import apiClient from './../api/client';
import colors from '../config/colors';

function ApproveRequestItem({
  approveRequest,
  name,
  message,
  groupName,
  text,
  requested_user_id,
  acceptFollowRequest,
  accepted,
}) {
  const [userProfileImage, setUserProfileImage] = useState(null);
  const getRequestedUserImage = async () => {
    const response = await apiClient.get('/image/' + requested_user_id);
    setUserProfileImage(response.data.imageUri);
  };

  useEffect(() => {
    getRequestedUserImage();
  }, []);

  return (
    <View style={styles.requestContainer}>
      <Image
        style={styles.image}
        source={
          userProfileImage
            ? {uri: userProfileImage}
            : require('../assets/profileAvatar.jpeg')
        }
      />
      <View style={styles.description}>
        <AppText style={styles.title}>{name}</AppText>
        {groupName ? (
          <AppText numberOfLines={1}>{message + ' ' + groupName}</AppText>
        ) : (
          <AppText numberOfLines={1}>{'wants to follow you.'}</AppText>
        )}
      </View>
      {groupName ? (
        <AppButton
          title={text ? 'Approved' : 'Approve'}
          textStyle={styles.buttonText}
          style={styles.button}
          onPress={approveRequest}
        />
      ) : (
        <View
          style={{
            flexDirection: 'row',
            marginRight: 10,
          }}>
          <AppButton
            title={accepted ? 'Accepted' : 'Accept'}
            textStyle={styles.buttonText}
            style={[styles.button, {padding: 5}]}
            onPress={acceptFollowRequest}
          />
          <AppButton
            title="Reject"
            color={colors.red}
            textStyle={styles.buttonText}
            style={[styles.button, {padding: 5, marginLeft: 10}]}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 15,
  },
  description: {
    flex: 1,
    marginLeft: 10,
  },
  requestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  title: {
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 10,
    marginHorizontal: 5,
  },
});
export default ApproveRequestItem;

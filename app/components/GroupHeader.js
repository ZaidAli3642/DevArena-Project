import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

import AppHeadingText from '../components/AppHeadingText';
import AppText from '../components/AppText';
import colors from '../config/colors';
import AppButton from './AppButton';

function GroupHeader({group, user, joinGroup}) {
  const {
    group_description,
    group_image,
    group_name,
    joined_user_id,
    approve_request,
  } = group;

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.coverImage}
          source={{
            uri:
              group_image ||
              'https://icdn.digitaltrends.com/image/digitaltrends/avatars-character-line-up_white_bg-copy.jpg',
          }}
        />
        <View style={styles.descriptionContainer}>
          <View>
            <AppHeadingText style={styles.heading}>{group_name}</AppHeadingText>
            <AppText style={styles.description}>{group_description}</AppText>
          </View>

          {group.user_id === user.user_id ? null : joined_user_id ===
            user.user_id ? (
            <AppButton
              title={!approve_request ? 'Requested' : 'JOINED'}
              textStyle={styles.buttonText}
              color={colors.red}
              style={styles.button}
            />
          ) : (
            <AppButton
              title="JOIN"
              textStyle={styles.buttonText}
              color={colors.red}
              style={styles.button}
              onPress={joinGroup}
            />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 75,
    borderRadius: 10,
    marginRight: 20,
    marginTop: 25,
  },
  buttonText: {
    fontSize: 15,
  },

  container: {
    backgroundColor: colors.white,
    paddingBottom: 20,
    elevation: 10,
  },

  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  description: {
    marginLeft: 20,
  },
  heading: {
    fontSize: 25,
    marginLeft: 20,
    marginVertical: 7,
    marginTop: 15,
  },
  coverImage: {
    width: '100%',
    height: 250,
  },
  input: {
    marginVertical: 10,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginVertical: 10,
    paddingVertical: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
});
export default GroupHeader;

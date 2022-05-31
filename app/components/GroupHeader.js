import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AppHeadingText from '../components/AppHeadingText';
import AppText from '../components/AppText';
import colors from '../config/colors';
import AppButton from './AppButton';
import ItemSeperator from './ItemSeperator';
import routes from '../routes/routes';

function GroupHeader({group, user, text, joinGroup}) {
  const {group_description, group_image, group_name, joined_user_id} = group;

  const navigation = useNavigation();

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

          {group.user_id === user.user_id ? (
            <AppButton
              title="Add Users"
              style={[styles.button, {width: 100}]}
              textStyle={styles.buttonText}
              onPress={() => navigation.navigate(routes.ADD_USER, {group})}
            />
          ) : joined_user_id === user.user_id ? (
            <AppButton
              title={!text ? 'Requested' : 'JOINED'}
              textStyle={styles.buttonText}
              color={colors.red}
              style={[styles.button, {width: 100}]}
            />
          ) : (
            <AppButton
              title={!text ? 'JOIN' : 'Requested'}
              textStyle={styles.buttonText}
              color={colors.red}
              style={[styles.button, {width: 100}]}
              onPress={joinGroup}
            />
          )}
        </View>
        <ItemSeperator />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 10,
          }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate(routes.ALL_MEMBERS, {group})}>
            <AppText style={styles.allMembers}>All members</AppText>
          </TouchableOpacity>
          {group.user_id !== user.user_id ? null : (
            <>
              <View style={{borderLeftWidth: 1, borderLeftColor: 'black'}} />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate(routes.UPDATE_GROUP, {group})
                }>
                <AppText style={styles.allMembers}>Update group</AppText>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  allMembers: {
    marginLeft: 20,
    marginTop: 10,
  },
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
    marginBottom: 10,
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

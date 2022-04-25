import React, {useState} from 'react';
import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';

import AppText from './AppText';
import colors from '../config/colors';

function NotificationItem({
  item,
  handleDelete,
  handleMarkAsRead,
  onSendToScreen,
}) {
  const [visible, setVisible] = useState(false);

  const {date, description, image, markAsRead} = item;

  const showMenu = () => setVisible(true);

  const hideMenu = () => setVisible(false);

  return (
    <TouchableOpacity
      onPress={onSendToScreen}
      activeOpacity={0.7}
      style={[
        styles.notificationContainer,
        {backgroundColor: !markAsRead ? '#f5f5f5' : colors.white},
      ]}>
      <Image style={styles.image} source={image} />
      <View style={styles.notificationDescription}>
        <AppText style={styles.text} numberOfLines={1}>
          {description}
        </AppText>
        <AppText style={styles.description}>{date}</AppText>
      </View>

      <Menu
        visible={visible}
        anchor={
          <MaterialCommunityIcons
            onPress={showMenu}
            style={styles.notificationIcon}
            name="dots-vertical"
            size={25}
            color={colors.mediumGrey}
          />
        }
        onRequestClose={hideMenu}>
        <MenuItem
          onPress={() => {
            handleDelete(item);
            hideMenu();
          }}>
          Delete Notification
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onPress={() => {
            handleMarkAsRead(item);
            hideMenu();
          }}>
          Mark as Read
        </MenuItem>
      </Menu>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  description: {
    color: colors.green,
  },
  notificationContainer: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    padding: 10,
  },
  icon: {
    borderRadius: 20,
    padding: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginRight: 20,
  },
  notificationDescription: {
    flex: 1,
  },
  text: {
    color: colors.mediumGrey,
  },
});
export default NotificationItem;

import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import AppHeadingText from './../components/AppHeadingText';
import NotificationItem from '../components/NotificationItem';
import colors from '../config/colors';
import ItemSeperator from '../components/ItemSeperator';
import routes from '../routes/routes';

const allNotifications = [
  {
    notificationId: 1,
    image: require('../assets/girl1.jpg'),
    description: 'Someone wants to send message to you.',
    date: 'date',
    markAsRead: false,
  },
  {
    notificationId: 2,
    image: require('../assets/boy1.jpg'),
    description: 'Hey There Boy1',
    date: 'date',
    markAsRead: false,
  },
  {
    notificationId: 3,
    image: require('../assets/girl2.jpg'),
    description: 'Hey There Girl2',
    date: 'date',
    markAsRead: false,
  },
  {
    notificationId: 4,
    image: require('../assets/boy2.jpg'),
    description: 'Hey There Boy2',
    date: 'date',
    markAsRead: false,
  },
];

function NotificationScreen({navigation}) {
  const [notifications, setNotifications] = useState(allNotifications);

  const handleDelete = notification => {
    const newNotifications = notifications.filter(
      n => n.notificationId !== notification.notificationId,
    );
    setNotifications(newNotifications);
  };

  const handleMarkAsRead = notification => {
    const singleNotification = notifications.find(
      n => n.notificationId === notification.notificationId,
    );
    singleNotification.markAsRead = true;
  };

  const onSendToScreen = () => navigation.navigate(routes.POST_SCREEN);

  return (
    <View style={styles.container}>
      <AppHeadingText style={styles.heading}>Notifications</AppHeadingText>
      <FlatList
        data={notifications}
        keyExtractor={notification => notification.notificationId.toString()}
        renderItem={({item}) => (
          <NotificationItem
            item={item}
            handleMarkAsRead={handleMarkAsRead}
            handleDelete={handleDelete}
            onSendToScreen={onSendToScreen}
          />
        )}
        ItemSeparatorComponent={() => <ItemSeperator />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  heading: {
    marginLeft: 20,
    fontSize: 25,
  },
});
export default NotificationScreen;

// Notification.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar } from 'react-native';

const notificationsData = [
  // Your notifications data as defined above
];

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <FlatList
        data={notificationsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Your styles for NotificationScreen here
});

export default NotificationScreen;

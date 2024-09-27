import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const notificationsData = [
  {
    id: '1',
    message: 'John Doe liked your video.',
    time: '2 minutes ago',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    message: 'Jane Smith followed you.',
    time: '10 minutes ago',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '3',
    message: 'Emma Johnson commented: "Great video!"',
    time: '1 hour ago',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '4',
    message: 'Michael Brown liked your video.',
    time: '2 hours ago',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: '5',
    message: 'Sarah Davis followed you.',
    time: '3 hours ago',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    id: '6',
    message: 'David Wilson liked your comment.',
    time: '5 hours ago',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: '7',
    message: 'Sophia Garcia started following you.',
    time: '6 hours ago',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: '8',
    message: 'James Martinez liked your video.',
    time: '8 hours ago',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    id: '9',
    message: 'Isabella Rodriguez commented: "Loved this!"',
    time: '9 hours ago',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
  {
    id: '10',
    message: 'Liam Lee liked your video.',
    time: '10 hours ago',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    id: '11',
    message: 'Mia Hernandez followed you.',
    time: '11 hours ago',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
  {
    id: '12',
    message: 'Ethan Young liked your comment.',
    time: '12 hours ago',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
  },
  {
    id: '13',
    message: 'Ava King commented: "So funny!"',
    time: '13 hours ago',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
  },
  {
    id: '14',
    message: 'Oliver Wright liked your video.',
    time: '14 hours ago',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
  },
  {
    id: '15',
    message: 'Emily Scott followed you.',
    time: '15 hours ago',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
];

const Notification = () => {
  const renderNotification = ({ item }) => (
    <View style={styles.notificationContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notificationsData}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark background
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 80,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E', // Notification background color
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  notificationTime: {
    fontSize: 12,
    color: '#A9A9A9', // Grey color for time
  },
});

export default Notification;

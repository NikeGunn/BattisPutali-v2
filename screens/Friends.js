import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Friends = () => {
  const navigation = useNavigation();
  
  // Sample friends data
  const initialFriendsData = [
    { id: '1', name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', isFollowed: false },
    { id: '2', name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', isFollowed: false },
    { id: '3', name: 'Emma Johnson', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', isFollowed: false },
    { id: '4', name: 'Michael Brown', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', isFollowed: false },
    { id: '5', name: 'Sophia Davis', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', isFollowed: false },
    { id: '6', name: 'Liam Wilson', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', isFollowed: false },
    { id: '7', name: 'Olivia Garcia', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', isFollowed: false },
    { id: '8', name: 'James Martinez', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', isFollowed: false },
    { id: '9', name: 'Ava Rodriguez', avatar: 'https://randomuser.me/api/portraits/women/5.jpg', isFollowed: false },
    { id: '10', name: 'Ethan Lee', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', isFollowed: false },
    { id: '11', name: 'Mia Young', avatar: 'https://randomuser.me/api/portraits/women/6.jpg', isFollowed: false },
    { id: '12', name: 'Noah King', avatar: 'https://randomuser.me/api/portraits/men/6.jpg', isFollowed: false },
    { id: '13', name: 'Isabella Scott', avatar: 'https://randomuser.me/api/portraits/women/7.jpg', isFollowed: false },
    { id: '14', name: 'Lucas Wright', avatar: 'https://randomuser.me/api/portraits/men/7.jpg', isFollowed: false },
    { id: '15', name: 'Charlotte Hill', avatar: 'https://randomuser.me/api/portraits/women/8.jpg', isFollowed: false },
  ];

  const [friendsData, setFriendsData] = useState(initialFriendsData);

  const toggleFollow = (friendId) => {
    setFriendsData((prevData) =>
      prevData.map((friend) =>
        friend.id === friendId
          ? { ...friend, isFollowed: !friend.isFollowed }
          : friend
      )
    );
  };

  const renderFriend = ({ item }) => (
    <View style={styles.friendContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('FriendProfile', { friendId: item.id })} style={styles.friendInfo}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.friendName}>{item.name}</Text>
          <Text style={styles.friendStatus}>{item.isFollowed ? 'Following' : 'Not Following'}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        style={item.isFollowed ? styles.unfollowButton : styles.followButton}
        onPress={() => toggleFollow(item.id)}
      >
        <Text style={styles.buttonText}>
          {item.isFollowed ? 'Unfollow' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Friends</Text>
      <FlatList
        data={friendsData}
        renderItem={renderFriend}
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
    fontSize: 28, // Increased font size
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 80,
  },
  friendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E', // Slightly lighter dark background
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    justifyContent: 'space-between',
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  friendName: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600', // Semi-bold font
  },
  friendStatus: {
    fontSize: 14,
    color: '#A9A9A9', // Grey color for status
  },
  followButton: {
    backgroundColor: '#FF2D55', // Follow button color (bright red)
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 2,
  },
  unfollowButton: {
    backgroundColor: '#000', // Unfollow button color (white)
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 2,
    borderColor: '#FF2D55',
    borderWidth: 1,
  },
  buttonText: {
    color: '#FFFFFF', // Use white for button text
    fontWeight: 'bold',
  },
});

export default Friends;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert, TouchableOpacity, StatusBar, Platform, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserVideos, logout } from '../redux/action'; // Ensure this path is correct
import Loader from '../components/Loader'; // Ensure this component exists
import { Video } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons'; // Add this for icons

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { videos, loading } = useSelector((state) => state.videos);
  const { user } = useSelector((state) => state.auth); // Assuming user data is in auth state
  const [refreshing, setRefreshing] = useState(false); // State for refreshing

  useEffect(() => {
    fetchUserVideos(); // Fetch videos on component mount
  }, [dispatch]);

  const fetchUserVideos = async () => {
    setRefreshing(true); // Start refreshing
    await dispatch(getUserVideos());
    setRefreshing(false); // Stop refreshing
  };

  const confirmLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            dispatch(logout());
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchUserVideos} /> // Pull to refresh implementation
      }
    >
      <View style={styles.profileHeader}>
        <Image source={{ uri: user.avatar.url }} style={styles.avatar} />
        <View style={styles.profileStats}>
          <Text style={styles.statCount}>1M</Text>
          <Text style={styles.statLabel}>Likes</Text>
        </View>
        <View style={styles.profileStats}>
          <Text style={styles.statCount}>2M</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.profileStats}>
          <Text style={styles.statCount}>13.2K</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      <Text style={styles.header}>My Videos</Text>
      <View style={styles.videoGrid}>
        {videos.length > 0 ? (
          videos.map((video) => (
            <View key={video._id} style={styles.videoItem}>
              <Video
                source={{ uri: video.url }}
                style={styles.video}
                shouldPlay
                isLooping
                isMuted
                resizeMode="cover"
              />
              <View style={styles.videoTitle}>
                <Text>{video.title}</Text>
                <Text>#{video.hashtags}</Text>
              </View>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <FontAwesome name="thumbs-up" size={16} color="#FFF" />
                  <Text style={styles.statText}>1.5K</Text>
                </View>
                <View style={styles.statItem}>
                  <FontAwesome name="eye" size={16} color="#FFF" />
                  <Text style={styles.statText}>5.2K</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noVideosText}>No videos found.</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('changepassword')}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={confirmLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 22,
    backgroundColor: '#F9F9F9',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    backgroundColor: '#e0e0e0', // Placeholder for loading
  },
  profileStats: {
    alignItems: 'center',
  },
  statCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  videoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  videoItem: {
    width: '48%', // Adjust width to fit two videos per row
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 2, // Add shadow for video items
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    position: 'relative', // Added for absolute positioning of stats
  },
  video: {
    width: '100%',
    height: 200,
  },
  videoTitle: {
    marginTop: 5,
    fontWeight: 'bold',
    padding: 5,
    backgroundColor: '#F0F0F0', // Light background for title
    textAlign: 'center',
    color: '#333',
  },
  noVideosText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FF4D4D', // Red color for buttons
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statsContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
    padding: 5,
    marginVertical: 45,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statText: {
    color: '#FFF',
    marginLeft: 4,
    fontSize: 14,
  },
});

export default Profile;

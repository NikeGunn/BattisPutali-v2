import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Image, ScrollView, Alert, TouchableOpacity, StatusBar, Platform, RefreshControl, Dimensions
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserVideos, logout } from '../redux/action';
import Loader from '../components/Loader';
import { Video } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { videos, loading } = useSelector((state) => state.videos);
  const { user } = useSelector((state) => state.auth);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUserVideos();
  }, [dispatch]);

  const fetchUserVideos = async () => {
    setRefreshing(true);
    await dispatch(getUserVideos());
    setRefreshing(false);
  };

  const confirmLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => dispatch(logout()) },
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
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchUserVideos} />}
    >
      {/* Profile Header */}
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

      {/* My Videos Section */}
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
                resizeMode="cover"
                isMuted
              />
              {/* Video Title & Hashtags */}
              <View style={styles.videoOverlay}>
                <View style={styles.videoTitle}>
                  <Text style={styles.videoText}>{video.title}</Text>
                  <Text style={styles.videoHashtags}>#{video.hashtags}</Text>
                </View>
                {/* Stats for Likes & Views */}
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
            </View>
          ))
        ) : (
          <Text style={styles.noVideosText}>No videos found.</Text>
        )}
      </View>

      {/* Logout & Change Password Buttons */}
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
    paddingHorizontal: 16,
    backgroundColor: '#F9F9F9',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
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
    marginVertical: 15,
  },
  videoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  videoItem: {
    width: '48%',
    marginBottom: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  video: {
    width: '100%',
    height: 200,
  },
  videoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 10,
  },
  videoTitle: {
    alignItems: 'center',
  },
  videoText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  videoHashtags: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    color: '#FFF',
    marginLeft: 4,
    fontSize: 14,
  },
  noVideosText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FF4D4D',
    padding: 12,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Profile;
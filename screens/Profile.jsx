import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserVideos } from '../redux/action'; // Ensure this path is correct
import Loader from '../components/Loader'; // Ensure this component exists
import { Video } from 'expo-av';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { videos, loading } = useSelector((state) => state.videos);
  
  useEffect(() => {
    dispatch(getUserVideos());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Videos</Text>
      {videos.length > 0 ? (
        <FlatList
          data={videos}
          keyExtractor={(video) => video._id} // Ensure to use a unique identifier
          renderItem={({ item }) => (
            <View style={styles.videoItem}>
              <Video
                source={{ uri: item.url }} // Video URL from your API
                style={styles.video}
                useNativeControls={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                isMuted // Mute the video for autoplay
              />
              <Text style={styles.videoTitle}>{item.title}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No videos found.</Text>
      )}
      <Button title="Navigate to Another Screen" onPress={() => navigation.navigate('SomeOtherScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  videoItem: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: 200, // Adjust the height as needed
  },
  videoTitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;

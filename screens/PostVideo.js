import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { uploadVideo, getUserVideos } from '../redux/action';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Video } from 'expo-av';

const PostVideo = () => {
  const [videoUri, setVideoUri] = useState('');
  const [title, setTitle] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [uploading, setUploading] = useState(false);
  const videoRef = useRef(null); // Reference for the Video component

  const dispatch = useDispatch();
  const { loading, message, error, videos } = useSelector(state => state.videos);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Sorry, we need media library permissions to make this work!');
      }
    })();

    dispatch(getUserVideos());
  }, [dispatch]);

  const pickVideo = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setVideoUri(result.assets[0].uri);
        if (videoRef.current) {
          await videoRef.current.playAsync(); // Autoplay the selected video
        }
      } else {
        Alert.alert('No video selected');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick video: ' + error.message);
    }
  };

  const handleUpload = async () => {
    if (!videoUri || !title || !hashtags) {
      Alert.alert('Error', 'Please fill all fields and select a video!');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('hashtags', hashtags);
      formData.append('video', {
        uri: videoUri,
        type: 'video/mp4',
        name: videoUri.split('/').pop(),
      });

      dispatch(uploadVideo(formData));
      setUploading(false);
    } catch (error) {
      setUploading(false);
      Alert.alert('Error', 'An error occurred during upload: ' + error.message);
    }
  };

  // Function to handle playback status updates
  const onPlaybackStatusUpdate = async (status) => {
    if (status.didJustFinish) {
      // Restart the video when it finishes
      await videoRef.current.replayAsync();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Your Video</Text>

      <Button
        title="Choose a Video"
        onPress={pickVideo}
        icon={<Icon name="video-library" size={24} color="white" />}
        buttonStyle={styles.chooseButton}
        containerStyle={styles.chooseButtonContainer}
      />

      {videoUri ? (
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={{ uri: videoUri }}
            rate={1.0}
            volume={1.0} // Set volume to 1 for sound
            isMuted={false} // Ensure it plays with sound
            isLooping={false} // Disable looping in the Video component
            resizeMode="cover"
            shouldPlay // Autoplay when loaded
            style={styles.videoThumbnail}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate} // Update playback status
            onError={(error) => {
              console.error(error);
              Alert.alert('Error', 'Failed to play video');
            }}
          />
        </View>
      ) : (
        <Text style={styles.placeholderText}>No video selected</Text>
      )}

      <Input
        placeholder="Add a catchy title"
        value={title}
        onChangeText={setTitle}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        leftIcon={<Icon name="title" size={24} color="gray" />}
      />

      <Input
        placeholder="#hashtags"
        value={hashtags}
        onChangeText={setHashtags}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        leftIcon={<Icon name="tag" size={24} color="gray" />}
      />

      <Button
        title={uploading ? 'Uploading...' : 'Post Video'}
        onPress={handleUpload}
        disabled={uploading}
        icon={<Icon name="cloud-upload" size={24} color="white" />}
        buttonStyle={styles.uploadButton}
        containerStyle={styles.uploadButtonContainer}
      />

      {loading && <Text style={styles.loadingText}>Uploading...</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#101010', // Dark background to make it pop
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF2D55', // Title color for a vibrant look
    textAlign: 'center',
    marginBottom: 20,
  },
  chooseButton: {
    backgroundColor: '#1DB954', // Vibrant green like TikTok's record button
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
  },
  chooseButtonContainer: {
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
  },
  videoContainer: {
    borderRadius: 15,
    overflow: 'hidden', // Ensure rounded corners
    marginBottom: 20,
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  placeholderText: {
    color: '#888',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
  },
  input: {
    color: '#fff',
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: '#FF0044', // Bold red for upload button
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden', // Ensure rounded corners
  },
  uploadButtonContainer: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  loadingText: {
    textAlign: 'center',
    color: '#FF2D55', // Change loading text color
    marginTop: 10,
  },
});

export default PostVideo;

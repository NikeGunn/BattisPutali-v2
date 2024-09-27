import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { uploadVideo, getUserVideos } from '../redux/action'; // Import the new actions
import Icon from 'react-native-vector-icons/MaterialIcons'; // Icon

const PostVideo = () => {
  const [videoUri, setVideoUri] = useState('');
  const [title, setTitle] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const { loading, message, error, videos } = useSelector(state => state.videos); // Select video state

  useEffect(() => {
    // Request permission for media access
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Sorry, we need media library permissions to make this work!');
      }
    })();
    
    // Fetch user videos when the screen loads
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

      // Dispatch Redux action to upload the video
      dispatch(uploadVideo(formData));

      setUploading(false);
    } catch (error) {
      setUploading(false);
      Alert.alert('Error', 'An error occurred during upload: ' + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titlePutali}>३२ पुतली</Text>
      <Text style={styles.title}>Upload Your Video</Text>
      <Button
        title="Pick a Video"
        onPress={pickVideo}
        icon={<Icon name="video-library" size={24} color="white" />}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
      />
      {videoUri ? (
        <Image source={{ uri: videoUri }} style={styles.videoThumbnail} />
      ) : (
        <Text style={styles.placeholderText}>No video selected</Text>
      )}
      <Input
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        leftIcon={<Icon name="title" size={24} color="gray" />}
      />
      <Input
        placeholder="Hashtags"
        value={hashtags}
        onChangeText={setHashtags}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        leftIcon={<Icon name="tag" size={24} color="gray" />}
      />
      <Button
        title={uploading ? 'Uploading...' : 'Upload'}
        onPress={handleUpload}
        disabled={uploading}
        icon={<Icon name="cloud-upload" size={24} color="white" />}
        buttonStyle={styles.uploadButton}
        containerStyle={styles.uploadButtonContainer}
      />

      {loading && <Text>Loading...</Text>}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  titlePutali: {
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: "#d4a5e8",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: "tomato",
  },
  button: {
    backgroundColor: '#ff5722',
    borderRadius: 30,
    height: 50,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
    borderRadius: 10,

  },
  placeholderText: {
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
  },
  uploadButton: {
    backgroundColor: '#2196f3',
    borderRadius: 30,
    height: 50,
    paddingHorizontal: 20,
  },
  uploadButtonContainer: {
    marginTop: 20,
  },
});

export default PostVideo;

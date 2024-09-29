//Redis for caching
import React, { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { ActivityIndicator, View, Text } from 'react-native';

const VideoCache = ({ videoUri, renderCachedVideo }) => {
  const [cachedUri, setCachedUri] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cacheVideo = async () => {
      try {
        const fileName = videoUri.split('/').pop();
        const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

        const fileInfo = await FileSystem.getInfoAsync(fileUri);

        if (fileInfo.exists) {
          console.log("Video already cached at:", fileUri);
          setCachedUri(fileUri);
        } else {
          console.log("Downloading video from:", videoUri);
          await FileSystem.makeDirectoryAsync(FileSystem.cacheDirectory, { intermediates: true });
          const { uri } = await FileSystem.downloadAsync(videoUri, fileUri);
          console.log("Video cached at:", uri);
          setCachedUri(uri);
        }
      } catch (error) {
        console.error('Error caching video:', error);
      } finally {
        setLoading(false);
      }
    };

    cacheVideo().catch(error => {
      console.error('Failed to cache video:', error);
      setLoading(false);
    });
  }, [videoUri]);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading video...</Text>
      </View>
    );
  }

  if (!cachedUri) {
    return <Text>Error loading video.</Text>;
  }

  return renderCachedVideo ? renderCachedVideo(cachedUri) : <Text>Error: No render function provided.</Text>;
};

export default VideoCache;

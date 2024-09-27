// /App/screens/ho.js
import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Dimensions, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import axios from 'axios';

const { height } = Dimensions.get('window');

const Home = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const [currentVisibleVideoIndex, setCurrentVisibleVideoIndex] = useState(null);

  // Fetch videos from your API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log('Fetching videos from API...');
        const response = await axios.get('http://192.168.1.76:5000/api/v1/all-videos');
        console.log('API response:', response.data);
        
        if (response.data && response.data.videos) {
          setVideos(response.data.videos);
        } else {
          console.error('Invalid video data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  // Detect the current visible video
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const visibleItemIndex = viewableItems[0].index;
      setCurrentVisibleVideoIndex(visibleItemIndex);
    }
  });

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,  // 50% of the video must be visible to trigger play
  });

  // Automatically play/stop videos based on visibility
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVisibleVideoIndex) {
          video.playAsync();
        } else {
          video.stopAsync();
        }
      }
    });
  }, [currentVisibleVideoIndex]);

  // Handle play/pause when tapping the video
  const handleVideoTap = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.getStatusAsync().then((status) => {
        if (status.isPlaying) {
          video.pauseAsync();
        } else {
          video.playAsync();
        }
      });
    }
  };

  // Render each video in the list
  const renderItem = ({ item, index }) => (
    <TouchableWithoutFeedback onPress={() => handleVideoTap(index)}>
      <View style={styles.videoContainer}>
        <Video
          ref={(ref) => {
            videoRefs.current[index] = ref;
          }}
          source={{ uri: item.url }}
          style={styles.video}
          resizeMode="cover"
          isLooping
        />
        {/* Overlay Text */}
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.hashtags}>{item.hashtags.join(', ')}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <FlatList
      data={videos}
      pagingEnabled
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    left: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hashtags: {
    color: 'lightgray',
    fontSize: 14,
    marginTop: 5,
  },
});

export default Home;

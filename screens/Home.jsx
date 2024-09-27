import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FlatList, StyleSheet, View, Dimensions, Text } from 'react-native';
import VideoContainer from '../components/VideoContainer';
import { getVideos } from '../components/api';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const flatListRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    async function fetchVideos() {
      const data = await getVideos();
      console.log('Fetched videos:', data); // Log the fetched data
      setVideos(data); // Set the fetched data
    }
    fetchVideos();
  }, []);

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentVideoIndex(newIndex);
    }
  });

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  return (
    <FlatList
      ref={flatListRef}
      data={videos}
      renderItem={({ item, index }) => (
        <View style={styles.videoWrapper}>
          {item ? ( // Ensure item is not undefined
            <VideoContainer
              videoUri={item.url} // Ensure we're accessing the correct URL
              title={item.title}
              description={item.description || 'No description available'}
              likes={item.likes || 0}
              comments={item.comments || 0}
              shares={item.shares || 0}
              isPlaying={index === currentVideoIndex} // Autoplay only the current video
            />
          ) : (
            <Text style={styles.errorText}>No video data available</Text>
          )}
        </View>
      )}
      keyExtractor={(item) => item._id} // Ensure unique keys
      snapToInterval={Dimensions.get('window').height}
      decelerationRate="fast"
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={handleViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
    />
  );
};

const styles = StyleSheet.create({
  videoWrapper: {
    height: Dimensions.get('window').height,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Home;

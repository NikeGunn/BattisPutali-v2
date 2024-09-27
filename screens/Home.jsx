import React, { useState, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View, Dimensions, Text, RefreshControl } from 'react-native';
import VideoContainer from '../components/VideoContainer';
import { getVideos } from '../components/api';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // New state for refresh control
  const flatListRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const fetchVideos = async () => {
    const data = await getVideos();
    console.log('Fetched videos:', data); // Log the fetched data
    setVideos(data); // Set the fetched data
  };

  useEffect(() => {
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

  // Function to handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true); // Show the refreshing spinner
    await fetchVideos(); // Refetch videos
    setRefreshing(false); // Hide the refreshing spinner after fetching data
  };

  return (
    <FlatList
      ref={flatListRef}
      data={videos}
      renderItem={({ item, index }) => (
        <View style={styles.videoWrapper}>
          {item ? (
            <VideoContainer
              videoUri={item.url}
              title={item.title}
              description={item.description || 'No description available'}
              likes={item.likes || 0}
              comments={item.comments || 0}
              shares={item.shares || 0}
              hashtags={item.hashtags || []}
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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } // Add RefreshControl here
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

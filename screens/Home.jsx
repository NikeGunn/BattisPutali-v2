import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FlatList, StyleSheet, View, Dimensions, Text, RefreshControl } from 'react-native';
import VideoContainer from '../components/VideoContainer';
import { getVideos } from '../components/api';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Fisher-Yates (Knuth) Shuffle algorithm to shuffle an array
  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  // Fetch videos from API
  const fetchVideos = async () => {
    const data = await getVideos();
    console.log('Fetched videos:', data);

    // Shuffle the fetched videos
    const shuffledVideos = shuffleArray(data);
    setVideos(shuffledVideos); // Set the shuffled data
  };

  useEffect(() => {
    fetchVideos(); // Fetch and shuffle videos on initial load
  }, []);

  // Memoize the viewableItemsChanged callback to avoid unnecessary renders
  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentVideoIndex(newIndex);
    }
  }, []);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  // Function to handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchVideos(); // Refetch and reshuffle videos
    setRefreshing(false);
  };

  // Memoize the renderItem function for better performance
  const renderItem = useCallback(
    ({ item, index }) => (
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
    ),
    [currentVideoIndex]
  );

  return (
    <FlatList
      ref={flatListRef}
      data={videos}
      renderItem={renderItem} // Memoized renderItem function
      keyExtractor={(item) => item._id.toString()} // Ensure unique keys
      snapToInterval={Dimensions.get('window').height}
      decelerationRate="fast"
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={handleViewableItemsChanged} // Memoized callback
      viewabilityConfig={viewabilityConfig.current}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      initialNumToRender={5} // Reduce initial render count for better performance
      maxToRenderPerBatch={5} // Optimize the number of items rendered per batch
      windowSize={7} // Number of viewports to keep rendered (tweak based on performance)
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
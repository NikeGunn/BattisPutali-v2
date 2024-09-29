import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FlatList, StyleSheet, View, Dimensions, Text, RefreshControl } from 'react-native';
import VideoContainer from '../components/VideoContainer';
import VideoCache from '../components/VideoCache';
import { getVideos } from '../components/api';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const fetchVideos = async () => {
    const data = await getVideos();
    console.log('Fetched videos:', data);
    const shuffledVideos = shuffleArray(data);
    setVideos(shuffledVideos);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentVideoIndex(newIndex);
    }
  }, []);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchVideos();
    setRefreshing(false);
  };

  const renderItem = useCallback(
    ({ item, index }) => (
      <View style={styles.videoWrapper}>
        {item ? (
          <VideoCache
            videoUri={item.url} // Video URL passed to VideoCache for caching
            renderCachedVideo={(cachedUri) => (
              <>
                {console.log('Playing video from:', cachedUri)}
                <VideoContainer
                  videoUri={cachedUri} // Cached URI used in VideoContainer
                  title={item.title}
                  description={item.description || 'No description available'}
                  likes={item.likes || 0}
                  comments={item.comments || 0}
                  shares={item.shares || 0}
                  hashtags={item.hashtags || []}
                  isPlaying={index === currentVideoIndex} // Autoplay only the current video
                />
              </>
            )}
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
      renderItem={renderItem}
      keyExtractor={(item) => item._id.toString()}
      snapToInterval={Dimensions.get('window').height}
      decelerationRate="fast"
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={handleViewableItemsChanged}
      viewabilityConfig={viewabilityConfig.current}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={7}
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

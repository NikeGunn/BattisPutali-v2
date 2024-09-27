import React, { useRef, useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Video } from 'expo-av';
import VideoControls from './VideoControls';

const VideoContainer = ({ videoUri, title, description, hashtags, isPlaying, video }) => {
  const videoRef = useRef(null);
  const [playIconVisible, setPlayIconVisible] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false); // State to manage follow status

  useEffect(() => {
    const manageVideoPlayback = async () => {
      if (isPlaying) {
        await videoRef.current.playAsync();
        setPlayIconVisible(false);
      } else {
        await videoRef.current.pauseAsync();
        setPlayIconVisible(true);
      }
    };
    manageVideoPlayback();
  }, [isPlaying]);

  const handlePlaybackStatusUpdate = useCallback(async (status) => {
    if (status.didJustFinish) {
      await videoRef.current.replayAsync();
    }
  }, []);

  const handlePress = async () => {
    const status = await videoRef.current.getStatusAsync();
    if (status.isPlaying) {
      await videoRef.current.pauseAsync();
      setPlayIconVisible(true);
    } else {
      await videoRef.current.playAsync();
      setPlayIconVisible(false);
    }
  };

  // Follow/Unfollow button handler
  const toggleFollow = () => {
    setIsFollowed((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: videoUri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={isPlaying}
          style={styles.video}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
        {playIconVisible && (
          <View style={styles.playIconContainer}>
            <Image
              source={require('../assets/icon/play.png')}
              style={styles.playIcon}
            />
          </View>
        )}
      </TouchableOpacity>

      {/* Video Details */}
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity 
            style={isFollowed ? styles.unfollowButton : styles.followButton} 
            onPress={toggleFollow}
          >
            <Text style={styles.followButtonText}>
              {isFollowed ? 'Unfollow' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.hashtagsContainer}>
          {hashtags.map((hashtag, index) => (
            <Text key={index} style={styles.hashtag}>
              {hashtag}
            </Text>
          ))}
        </View>
      </View>

      {/* Video Controls */}
      <VideoControls
        initialLikes={video?.likes || 0}
        comments={video?.comments || 0}
        shares={video?.shares || 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'relative',
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  textContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
  },
  titleContainer: {
    flexDirection: 'row', // Align title and button horizontally
    alignItems: 'center', // Center vertically
    marginBottom: 7, // Space between title and description
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1, // Take available space
  },
  followButton: {
    backgroundColor: '#FF2D55', // Follow button color
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10, // Space between title and button
  },
  unfollowButton: {
    backgroundColor: '#000', // Unfollow button color
    borderColor: '#FF2D55',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10, // Space between title and button
  },
  followButtonText: {
    color: '#fff', // Text color
    fontSize: 14,
  },
  description: {
    color: '#fff',
    fontSize: 18,
  },
  hashtagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hashtag: {
    color: '#fff',
    fontSize: 16,
    marginRight: 5,
  },
  playIconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: 80,
    height: 80,
    tintColor: '#fff',
  },
});

export default VideoContainer;

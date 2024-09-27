import React, { useRef, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Video } from 'expo-av';
import VideoControls from './VideoControls';

const VideoContainer = ({ videoUri, title, description, likes, comments, shares, isPlaying }) => {
  const videoRef = useRef(null);
  const [playIconVisible, setPlayIconVisible] = React.useState(true); // State to manage play icon visibility

  useEffect(() => {
    const manageVideoPlayback = async () => {
      if (isPlaying) {
        await videoRef.current.playAsync();
        setPlayIconVisible(false); // Hide the play icon when video is playing
      } else {
        await videoRef.current.pauseAsync();
        setPlayIconVisible(true); // Show the play icon when video is paused
      }
    };
    manageVideoPlayback();
  }, [isPlaying]); // Effect will run when isPlaying changes

  const handlePlaybackStatusUpdate = useCallback(async (status) => {
    if (status.didJustFinish) {
      await videoRef.current.replayAsync(); // Restart the video when it finishes
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
          shouldPlay={isPlaying} // Use isPlaying to control the video
          style={styles.video}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate} // Listen for playback status updates
        />
        {playIconVisible && (
          <View style={styles.playIconContainer}>
            <Image
              source={require('../assets/icon/play.png')} // Replace with your play icon
              style={styles.playIcon}
            />
          </View>
        )}
      </TouchableOpacity>

      {/* Video Details */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Video Controls */}
      <VideoControls likes={likes} comments={comments} shares={shares} />
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
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#fff',
    fontSize: 14,
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
    tintColor: '#fff', // Optional: change the color of the play icon
  },
});

export default VideoContainer;

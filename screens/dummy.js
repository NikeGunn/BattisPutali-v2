import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Modal, TextInput, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import axios from 'axios';
import { AntDesign, FontAwesome, Ionicons, Feather } from '@expo/vector-icons';

const dummy = () => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [likes, setLikes] = useState({});
  const [commentVisible, setCommentVisible] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  
  const videoRefs = useRef([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://192.168.1.76:5000/api/v1/all-videos');
      if (response.data.success) {
        setVideos(response.data.videos);
        setLikes(response.data.videos.reduce((acc, video) => {
          acc[video._id] = 0;
          return acc;
        }, {}));
      } else {
        console.log('Failed to fetch videos');
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleScroll = (index) => {
    setCurrentIndex(index);
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) {
        video.pauseAsync();
      }
    });
  };

  const togglePlayPause = () => {
    const video = videoRefs.current[currentIndex];
    if (video) {
      if (paused) {
        video.playAsync();
      } else {
        video.pauseAsync();
      }
      setPaused(!paused);
    }
  };

  const handleLike = (videoId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [videoId]: prevLikes[videoId] + 1,
    }));
  };

  const handleUnlike = (videoId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [videoId]: prevLikes[videoId] - 1,
    }));
  };

  const openComments = (videoId) => {
    setCurrentVideoId(videoId);
    setCommentVisible(true);
  };

  const closeComments = () => {
    setCommentVisible(false);
  };

  const renderVideoItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.videoContainer} onPress={togglePlayPause}>
        <Video
          ref={(ref) => (videoRefs.current[index] = ref)}
          source={{ uri: item.url }}
          style={styles.video}
          resizeMode="cover"
          shouldPlay={index === currentIndex}
          isLooping
        />
        <View style={styles.overlay}>
          <View style={styles.videoInfo}>
            <Text style={styles.username}>{item.userId || 'Unknown User'} <TouchableOpacity><Text style={styles.followButton}>Follow</Text></TouchableOpacity></Text>
            <Text style={styles.videoTitle}>{item.title}</Text>
            <Text style={styles.hashtags}>{item.hashtags.join(' ')}</Text>
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={() => handleLike(item._id)}>
              <AntDesign name="heart" size={30} color="white" />
              <Text style={styles.actionText}>{likes[item._id]}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleUnlike(item._id)}>
              <AntDesign name="hearto" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openComments(item._id)}>
              <FontAwesome name="comment" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="share-social" size={30} color="white" />
            </TouchableOpacity>
            <Image source={{ uri: item.userImage }} style={styles.profileImage} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item._id}
        pagingEnabled
        onScroll={(e) => handleScroll(Math.floor(e.nativeEvent.contentOffset.y / 500))}
      />
      <Modal visible={commentVisible} animationType="slide" onRequestClose={closeComments}>
        <View style={styles.commentModal}>
          <TextInput placeholder="Add a comment" style={styles.commentInput} />
          <TouchableOpacity onPress={closeComments}>
            <Text style={styles.closeComment}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoContainer: {
    width: '100%',
    height: 1000,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    padding: 20,
  },
  videoInfo: {
    position: 'absolute',
    bottom: 100,
    left: 10,
  },
  username: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  followButton: {
    color: 'skyblue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoTitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
  hashtags: {
    color: 'lightgray',
    fontSize: 14,
    marginTop: 5,
  },
  actionsContainer: {
    position: 'absolute',
    right: 10,
    bottom: 100,
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 10,
  },
  commentModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentInput: {
    width: '80%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  closeComment: {
    fontSize: 20,
    color: 'blue',
  },
});

export default dummy;

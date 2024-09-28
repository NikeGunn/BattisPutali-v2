import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Image, Alert, Share } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const VideoControls = React.memo(({ initialLikes, comments, shares, videoUrl, videoTitle }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [menuVisible, setMenuVisible] = useState(false);

  const commentData = [
    { id: '1', text: 'Great video!' },
    { id: '2', text: 'I love this!' },
  ];

  const renderComment = useCallback(({ item }) => (
    <View style={styles.commentItem}>
      <Text style={styles.commentText}>{item.text}</Text>
    </View>
  ), []);

  const handleLikeClick = () => {
    const newCount = liked ? likeCount - 1 : likeCount + 1;
    setLikeCount(newCount);
    setLiked(!liked);
  };

  const handleShareClick = async () => {
    try {
      const result = await Share.share({
        message: `Check out this video: ${videoTitle}\n${videoUrl}`,
        url: videoUrl,
        title: videoTitle,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          Alert.alert('Shared with', result.activityType);
        } else {
          Alert.alert('Video shared successfully!');
        }
      } else if (result.action === Share.dismissedAction) {
        Alert.alert('Share dismissed');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.controlsContainer}>
      {/* Profile Button */}
      <TouchableOpacity style={styles.controlButton}>
        <Image
          source={{ uri: user?.avatar?.url || 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      {/* Like Button */}
      <TouchableOpacity style={styles.controlButton} onPress={handleLikeClick}>
        <FontAwesome name="heart" size={30} color={liked ? 'red' : 'white'} />
        <Text style={styles.controlText}>{likeCount}</Text>
      </TouchableOpacity>

      {/* Comment Button */}
      <TouchableOpacity style={styles.controlButton} onPress={() => setModalVisible(true)}>
        <FontAwesome name="comment" size={30} color="white" />
        <Text style={styles.controlText}>{comments}</Text>
      </TouchableOpacity>

      {/* Share Button */}
      <TouchableOpacity style={styles.controlButton} onPress={handleShareClick}>
        <FontAwesome name="share" size={30} color="white" />
        <Text style={styles.controlText}>{shares}</Text>
      </TouchableOpacity>

      {/* Three-Dot (More Options) Button */}
      <TouchableOpacity style={styles.controlButton} >
        <Entypo name="dots-three-vertical" size={30} color="white" />
      </TouchableOpacity>


      {/* Comments Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <FlatList
            data={commentData}
            renderItem={renderComment}
            keyExtractor={(item) => item.id}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={7}
          />
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  controlsContainer: {
    position: 'absolute',
    right: 10, // Align to the right side
    bottom: 65, // Adjust to be just above the footer
    alignItems: 'center',
  },
  controlButton: {
    alignItems: 'center',
    marginBottom: 20, // Spacing between buttons
  },
  controlText: {
    color: 'white',
    marginTop: 5,
    fontSize: 14,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 15,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  closeButton: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  closeButtonText: {
    color: '#FF4D4D',
    fontWeight: 'bold',
  },
  commentItem: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 1,
  },
  commentText: {
    fontSize: 16,
    color: '#333',
  },
  menuContainer: {
    position: 'absolute',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    top: -60,
    right: 50,
    zIndex: 1,
  },
  menuItem: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 5,
  },
});

export default VideoControls;

import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const VideoControls = React.memo(({ initialLikes, comments, shares }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const { user } = useSelector((state) => state.auth);

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

  const handleShareClick = () => {
    Alert.alert('Share', 'Share functionality will be implemented here!');
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
    right: 10,
    bottom: 100,
    alignItems: 'center',
  },
  controlButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  controlText: {
    color: 'white',
    marginTop: 5,
    fontSize: 14,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 20,
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
});

export default VideoControls;

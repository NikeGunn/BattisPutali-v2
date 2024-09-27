import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const VideoControls = ({ likes, comments, shares }) => {
  return (
    <View style={styles.controlsContainer}>
      {/* Like Button */}
      <TouchableOpacity style={styles.controlButton}>
        <FontAwesome name="heart" size={30} color="white" />
        <Text style={styles.controlText}>{likes}</Text>
      </TouchableOpacity>

      {/* Comment Button */}
      <TouchableOpacity style={styles.controlButton}>
        <FontAwesome name="comment" size={30} color="white" />
        <Text style={styles.controlText}>{comments}</Text>
      </TouchableOpacity>

      {/* Share Button */}
      <TouchableOpacity style={styles.controlButton}>
        <FontAwesome name="share" size={30} color="white" />
        <Text style={styles.controlText}>{shares}</Text>
      </TouchableOpacity>
    </View>
  );
};

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
});

export default VideoControls;

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const Loader = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Looping shimmer effect for the skeleton
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300], // Moves the shimmer from left to right
  });

  return (
    <View style={styles.container}>
      {/* Video Placeholder */}
      <View style={styles.videoSkeleton}>
        <Animated.View style={[styles.shimmer, { transform: [{ translateX }] }]} />
      </View>

      {/* Left Side: User Info Skeleton */}
      <View style={styles.leftSide}>
        <View style={styles.textPlaceholder} />
        <View style={[styles.textPlaceholder, styles.widerTextPlaceholder]} />
        <View style={[styles.textPlaceholder, styles.smallTextPlaceholder]} />
      </View>

      {/* Right Side: Actions Skeleton */}
      <View style={styles.rightSide}>
        {Array.from({ length: 4 }).map((_, index) => (
          <View key={index} style={styles.circlePlaceholder}>
            <Animated.View style={[styles.shimmerCircle, { transform: [{ translateX }] }]} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    position: 'relative',
  },
  videoSkeleton: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1c1c1c',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  shimmer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.4,
  },
  shimmerCircle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'absolute',
    opacity: 0.4,
  },
  leftSide: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    justifyContent: 'center',
  },
  textPlaceholder: {
    backgroundColor: '#3e3e3e',
    height: 20,
    marginBottom: 10,
    borderRadius: 4,
    width: 200,
  },
  widerTextPlaceholder: {
    width: 250,
    height: 15,
  },
  smallTextPlaceholder: {
    width: 180,
    height: 15,
  },
  rightSide: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    justifyContent: 'space-between',
    height: 250,
  },
  circlePlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#3e3e3e',
    borderRadius: 25,
    marginBottom: 25,
    overflow: 'hidden',
  },
});

export default Loader;

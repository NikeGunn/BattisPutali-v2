import { useEffect } from 'react';

export const useVideoScroll = (flatListRef, videos) => {
  useEffect(() => {
    if (flatListRef.current && videos.length > 0) {
      flatListRef.current.scrollToIndex({ index: 0, animated: true });  // Only scroll if there are videos
    }
  }, [flatListRef, videos]);
};

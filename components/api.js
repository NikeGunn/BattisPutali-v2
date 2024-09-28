export const getVideos = async () => {
  try {
    const response = await fetch('http://192.168.1.65:5000/api/v1/all-videos');
    const result = await response.json();  // Parse the JSON response
    if (result.success && result.videos) {
      // If the response contains videos, return them
      return result.videos;
    } else {
      // If the response doesn't contain videos, return an empty array
      console.error("No videos found");
      return [];
    }
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};

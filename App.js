import React from 'react';
import Main from "./Main";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}


// Eas update feature for production
// import React, { useEffect, useState } from 'react';
// import { Provider } from "react-redux";
// import { View, Text, Modal, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
// import * as Updates from 'expo-updates';
// import store from "./redux/store";
// import Main from "./Main";

// export default function App() {
//   const [updateAvailable, setUpdateAvailable] = useState(false);
//   const [isUpdating, setIsUpdating] = useState(false);

//   // Function to check for updates
//   const checkForUpdates = async () => {
//     try {
//       const update = await Updates.checkForUpdateAsync();
//       if (update.isAvailable) {
//         setUpdateAvailable(true);  // Show update modal if an update is available
//       }
//     } catch (error) {
//       console.error("Error checking for updates: ", error);
//     }
//   };

//   // Function to apply the update
//   const applyUpdate = async () => {
//     setIsUpdating(true);
//     try {
//       await Updates.fetchUpdateAsync();  // Fetch the update
//       await Updates.reloadAsync();       // Reload the app to apply the update
//     } catch (error) {
//       console.error("Error applying update: ", error);
//       setIsUpdating(false);
//     }
//   };

//   useEffect(() => {
//     checkForUpdates();  // Check for updates when the app starts
//   }, []);

//   return (
//     <Provider store={store}>
//       <Main />
//       {/* Modal for showing update notification */}
//       {updateAvailable && (
//         <Modal
//           transparent
//           animationType="slide"
//           visible={updateAvailable}
//           onRequestClose={() => setUpdateAvailable(false)}
//         >
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <Text style={styles.title}>Update Available</Text>
//               <Text style={styles.message}>
//                 A new version of the app is available. Please update to get the latest features and improvements.
//               </Text>
//               <TouchableOpacity style={styles.updateButton} onPress={applyUpdate}>
//                 <Text style={styles.updateButtonText}>
//                   {isUpdating ? "Updating..." : "Update Now"}
//                 </Text>
//                 {isUpdating && <ActivityIndicator size="small" color="#fff" />}
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       )}
//     </Provider>
//   );
// }

// // Styles for the update modal and its contents
// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     width: '80%',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   message: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   updateButton: {
//     backgroundColor: '#007bff',
//     borderRadius: 5,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   updateButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

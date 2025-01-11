// import { Platform } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// // Request Media Library Permission
// const requestMediaLibraryPermission = async (): Promise<boolean> => {
//   if (Platform.OS !== 'web') {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (status === 'granted') {
//       return true;
//     } else {
//       alert('Sorry, we need camera roll permissions to make this work!');
//       return false;
//     }
//   } else {
//     alert('This feature is not supported on web');
//     return false;
//   }
// };

// // Launch Image Picker
// export const launchImagePicker = async (): Promise<string | undefined> => {
//   // Request permission first
//   const hasPermission = await requestMediaLibraryPermission();

//   if (!hasPermission) return;

//   try {
//     // Open image picker if permission is granted
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled && result.assets && result.assets.length > 0) {
//       return result.assets[0].uri;
//     }
//   } catch (error) {
//     console.error('Error picking image: ', error);
//     return;
//   }
// };

// // Check if Media Permissions are granted
// export const checkMediaPermissions = async (): Promise<void> => {
//   const hasPermission = await requestMediaLibraryPermission();
//   if (!hasPermission) {
//     return Promise.reject('We need permission to access your photos');
//   }
//   return Promise.resolve();

// };


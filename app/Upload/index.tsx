// import React, { useState } from "react";
// import { Button, Text, View, Image } from "react-native";
// import DocumentPicker, {
//   DocumentPickerResponse,
// } from "react-native-document-picker";
// import axios from "axios";

// const FilePickerExample: React.FC = () => {
//   // Define the state to store the selected file details
//   const [file, setFile] = useState<DocumentPickerResponse[] | null>(null);

//   // Function to pick an image
//   const pickImage = async () => {
//     try {
//       const result = await DocumentPicker.pick({
//         type: [DocumentPicker.types.images], // Limit picker to image types
//       });
//       setFile(result);
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log("User canceled the picker");
//       } else {
//         console.error("Unknown error: ", err);
//       }
//     }
//   };

//   // Function to upload the image to the server
//   const uploadImage = async () => {
//     if (!file) {
//       console.log("No file selected.");
//       return;
//     }

//     const formData = new FormData();

//     // Append the image file to the formData
//     const fileToUpload = {
//       uri: file[0].uri,
//       name: file[0].name,
//       type: file[0].type,
//     };

//     const blob = await fetch(fileToUpload.uri).then((r) => r.blob());

//     formData.append("file", blob, fileToUpload.name || "default_filename");

//     // Append the userId or any other data needed
//     formData.append("userId", "1"); // Example userId, replace with dynamic value

//     try {
//       // Send the form data to your backend API
//       const response = await axios.post(
//         "http://localhost:5234/quickFix/Users/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("Upload success: ", response.data);
//     } catch (error) {
//       console.error("Upload error: ", error);
//     }
//   };

//   return (
//     <View>
//       <Button title="Pick an image (PNG/JPG)" onPress={pickImage} />
//       {file && (
//         <View>
//           <Image
//             source={{ uri: file[0].uri }}
//             style={{ width: 200, height: 200 }}
//           />
//           <Button title="Upload Image" onPress={uploadImage} />
//         </View>
//       )}
//     </View>
//   );
// };

// export default FilePickerExample;

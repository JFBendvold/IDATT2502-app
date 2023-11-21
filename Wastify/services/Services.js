import axios from "axios";
import {Alert} from "react-native";

const API_URL = "http://10.24.5.79:5000/"; // TODO: Change this to the server's IP address.

/**
 * Uploads an image to the server.
 * @param {string} imageURI - The URI of the image to upload.
 * @returns {Promise} - A Promise that resolves with the response data or rejects with an error.
 */
export const uploadImage = (imageURI, category) => {
    const formData = new FormData();
    formData.append("file", {
        uri: imageURI,
        name: "image.jpg",
        type: "image/jpeg",
    });

    formData.append("category", category);
    
    try {
        return axios.post(API_URL + "image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    } catch (error) {
        console.log(error);
        Alert.alert("Error", error.message);
    }
}

export const scanImage = (imageURI) => {
    const formData = new FormData();
    formData.append("file", {
        uri: imageURI,
        name: "image.jpg",
        type: "image/jpeg",
    });

    try {
        return axios.post(API_URL + "process_image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Accept': 'application/json',
            },
        });
    } catch (error) {
        console.log(error);
        Alert.alert("Error", error.message);
    }
}
import axios from "axios";

const API_URL = "http://10.24.39.248:8080/"; // TODO: Change this to the server's IP address.

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
    }
}
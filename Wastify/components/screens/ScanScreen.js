import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { uploadImage, scanImage } from '../../services/Services';
import { Buffer } from 'buffer';

function ScanScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [resultImage, setResultImage] = useState(null);

    useEffect(() => {
        setResultImage(null);
        const getScannerPermissions = async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        };
    
        getScannerPermissions();
    }, []);

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    async function takePicture() {
        /*
        if (camera) {
            const photo = await camera.takePictureAsync();
    
            // Navigate to the new screen and pass the image data
            navigation.navigate('SelectCategory', { rawImage: photo.uri });
        }
        */
    }

    async function scan() {
        console.log('scan');
        if (!camera) {
            return;
        }

        const photo = await camera.takePictureAsync();
        camera.pausePreview();

        try {
            const response = await scanImage(photo.uri);

            response.data.forEach((item) => {
                console.log(item.class + " " + (item.probability).toFixed(2) + "%");
            });

            const imageObjectURL = "data:image/jpeg;base64," + response.data[0].image;
    
            navigation.navigate('Result', { data: response.data });
            camera.resumePreview();
        } catch (error) {
            alert(error);
            camera.resumePreview(); // Make sure to resume preview if there's an error
        }
    }

    return (
    <View style={styles.container}>
        <Camera 
            ref={ref => setCamera(ref)}
            style={styles.camera} 
            type={CameraType.back} 
            autoFocus={Camera.Constants.AutoFocus.on}
            flashMode={Camera.Constants.FlashMode.off}
        >
            <TouchableOpacity onPress={scan} style={styles.button}>
            </TouchableOpacity>
        </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#06d6a0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    button: {
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 5,
        borderRadius: 50,
        marginBottom: 20,
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
});

export default ScanScreen;

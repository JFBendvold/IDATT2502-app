import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function ScanScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);

    useEffect(() => {
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
        if (camera) {
            const photo = await camera.takePictureAsync();
            console.log(photo.uri);

            // TODO: Send photo to backend for processing

            navigation.navigate('Result', { rawImage: photo.uri });
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
            <TouchableOpacity onPress={takePicture} style={styles.button}>
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

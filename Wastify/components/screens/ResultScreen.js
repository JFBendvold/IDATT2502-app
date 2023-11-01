import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';

function ResultScreen({ navigation, route }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const { rawImage, result } = route.params;
        alert(result);
        setImage(rawImage);
        console.log(rawImage);
    }, []);

    return (
    <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
        <TouchableOpacity onPress={() => navigation.navigate('Scan')} style={styles.button} >
            <Text style={styles.buttonText}>Scan Again</Text>
        </TouchableOpacity>
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
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'contain',
    },
    button: {
        position: 'absolute',
        bottom: 50,
        backgroundColor: '#118ab2',
        padding: 10,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
    },
});

export default ResultScreen;

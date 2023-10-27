import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

function ResultScreen({ navigation, route }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const { rawImage } = route.params;
        setImage(rawImage);
        console.log(rawImage);
    }, []);

    return (
    <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
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
    }
});

export default ResultScreen;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { uploadImage } from '../../services/Services';

function SelectCategoryScreen({ route, navigation }) {
    const { rawImage } = route.params;

    const handleSelectCategory = (category) => {
        // Upload the image with the selected category
        uploadImage(rawImage, category)
            .then((result) => {
                // Navigate to the result screen after the image is uploaded
                navigation.navigate('Result', { rawImage: rawImage, result: result.data });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>
                Select a category:
            </Text>
            <TouchableOpacity onPress={() => handleSelectCategory('trash')} style={styles.button} >
                <Text style={styles.buttonText}>Trash</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectCategory('cardboard')} style={styles.button} >
                <Text style={styles.buttonText}>Cardboard</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectCategory('plastic')} style={styles.button} >
                <Text style={styles.buttonText}>Plastic</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectCategory('metal')} style={styles.button} >
                <Text style={styles.buttonText}>Metal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectCategory('glass')} style={styles.button} >
                <Text style={styles.buttonText}>Glass</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectCategory('paper')} style={styles.button} >
                <Text style={styles.buttonText}>Paper</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectCategory('food')} style={styles.button} >
                <Text style={styles.buttonText}>Food</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#06d6a0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#118ab2',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: 200,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
    },
});

export default SelectCategoryScreen;
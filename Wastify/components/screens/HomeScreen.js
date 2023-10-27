import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function HomeScreen({ navigation }) {
    function navigateToScan() {
        navigation.navigate('Scan');
    }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>
            Wastify
        </Text>
        <Text style={styles.underTitle}>
            Scan, Sort, Sustain!
        </Text>
        <TouchableOpacity onPress={navigateToScan} style={styles.button}>
            <Text style={styles.buttonText}>
                Open Camera
            </Text>
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
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
    },
    underTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#073B4C",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default HomeScreen;

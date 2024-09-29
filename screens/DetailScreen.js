// screens/DetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchDogImage } from '../api/dogApi';

const DetailScreen = ({ route }) => {
    const { breed } = route.params; // Get the breed from route params
    const [dogImage, setDogImage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadImage = async () => {
            const image = await fetchDogImage(breed);
            setDogImage(image);
            setLoading(false);
        };
        
        loadImage();
    }, [breed]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.breedText}>{breed}</Text>
            <Image source={{ uri: dogImage }} style={styles.image} />
            {/* Add other detailed information about the breed here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    breedText: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 8,
    },
});

export default DetailScreen;

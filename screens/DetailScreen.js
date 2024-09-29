// DetailScreen.js

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { fetchDogDetails, fetchDogImage } from '../api/dogApi';

const DetailScreen = ({ route }) => {
    const { breed } = route.params;  // Assume breed contains the breed ID or name
    const [dogImage, setDogImage] = useState('');
    const [dogDetails, setDogDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadImageAndDetails = async () => {
            try {
                const image = await fetchDogImage(breed); // Assuming this returns the image URL
                const details = await fetchDogDetails(breed); // This should return full details
                
                // Make sure to fetch additional details, adjust if necessary
                setDogImage(image);
                setDogDetails(details);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadImageAndDetails();
    }, [breed]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.breedText}>{dogDetails?.name}</Text>
            <Image source={{ uri: dogImage }} style={styles.image} />
            {dogDetails && (
                <View style={styles.detailsContainer}>
                    <Text>Bred For: {dogDetails.bred_for}</Text>
                    <Text>Breed Group: {dogDetails.breed_group}</Text>
                    <Text>Height: {dogDetails.height.metric} cm</Text>
                    <Text>Weight: {dogDetails.weight.metric} kg</Text>
                    <Text>Life Expectancy: {dogDetails.life_span}</Text>
                    <Text>Origin: {dogDetails.origin}</Text>
                    <Text>Temperament: {dogDetails.temperament}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    breedText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 8,
        marginBottom: 10,
    },
    detailsContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        width: '90%',
    },
});

export default DetailScreen;

// DetailScreen.js

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { fetchDogDetails, fetchDogImage } from '../api/dogApi';

const DetailScreen = ({ route }) => {
    const { breed } = route.params;  // Breed is expected to be the breed name
    const [dogImage, setDogImage] = useState('');
    const [dogDetails, setDogDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadImageAndDetails = async () => {
            try {
                const image = await fetchDogImage(breed); // Fetch image based on breed name
                const details = await fetchDogDetails(breed); // Fetch details based on breed name
                
                setDogImage(image);   // Set the fetched image
                setDogDetails(details); // Set the fetched breed details
            } catch (error) {
                console.error("Error loading dog details:", error);
            } finally {
                setLoading(false);   // Stop loading spinner once data is fetched
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
                    <Text>Bred For: {dogDetails.bred_for || 'N/A'}</Text>
                    <Text>Breed Group: {dogDetails.breed_group || 'N/A'}</Text>
                    <Text>Height: {dogDetails.height?.metric || 'N/A'} cm</Text>
                    <Text>Weight: {dogDetails.weight?.metric || 'N/A'} kg</Text>
                    <Text>Life Expectancy: {dogDetails.life_span || 'N/A'}</Text>
                    <Text>Origin: {dogDetails.origin || 'N/A'}</Text>
                    <Text>Temperament: {dogDetails.temperament || 'N/A'}</Text>
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

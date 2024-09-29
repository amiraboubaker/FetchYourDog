import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { fetchDogDetails, fetchDogImage } from '../api/dogApi';

const DetailScreen = ({ route }) => {
    const { breed } = route.params;
    const [dogImage, setDogImage] = useState('');
    const [dogDetails, setDogDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadImageAndDetails = async () => {
            try {
                const image = await fetchDogImage(breed);
                const details = await fetchDogDetails(breed); 
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
            <Text style={styles.breedText}>{breed}</Text>
            <Image source={{ uri: dogImage }} style={styles.image} />
            {dogDetails && (
                <View style={styles.detailsContainer}>
                    <Text>Height: {dogDetails.height.metric} cm</Text>
                    <Text>Weight: {dogDetails.weight.metric} kg</Text>
                    <Text>Life Expectancy: {dogDetails.life_span}</Text>
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
    detailsContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        width: '90%',
    },
});

export default DetailScreen;

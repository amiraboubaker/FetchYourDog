// DetailScreen.js

import React, { useEffect, useState } from 'react'; // Import React and hooks
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'; // Import React Native components
import { fetchDogDetails, fetchDogImage } from '../api/dogApi'; // Import API functions to fetch dog details and images

// DetailScreen component that displays detailed information about a specific dog breed
const DetailScreen = ({ route }) => {
    // Extract the breed from the route parameters
    const { breed } = route.params;  // Breed is expected to be the breed name
    // State variables for dog image, details, and loading state
    const [dogImage, setDogImage] = useState(''); // State to hold the fetched dog image URL
    const [dogDetails, setDogDetails] = useState(null); // State to hold the fetched dog details
    const [loading, setLoading] = useState(true); // State to indicate loading state

    // useEffect hook to fetch dog image and details when the component mounts or breed changes
    useEffect(() => {
        const loadImageAndDetails = async () => {
            try {
                // Fetch image based on breed name
                const image = await fetchDogImage(breed);
                // Fetch details based on breed name
                const details = await fetchDogDetails(breed);
                
                // Set the fetched image and details in state
                setDogImage(image);   
                setDogDetails(details); 
            } catch (error) {
                // Log error if fetching fails
                console.error("Error loading dog details:", error);
            } finally {
                // Stop loading spinner once data is fetched
                setLoading(false);   
            }
        };

        // Call the function to load image and details
        loadImageAndDetails();
    }, [breed]); // Dependency array, re-run effect when breed changes

    // Show a loading spinner while fetching data
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Display loading spinner
    }

    return (
        <View style={styles.container}> {/* Main container for the detail screen */}
            {/* Display the dog's breed name */}
            <Text style={styles.breedText}>{dogDetails?.name}</Text>
            {/* Display the fetched dog image */}
            <Image source={{ uri: dogImage }} style={styles.image} />
            {dogDetails && ( // Check if dog details exist before rendering
                <View style={styles.detailsContainer}>
                    {/* Display various details about the dog breed */}
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

// Styles for the component
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

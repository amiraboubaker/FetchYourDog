// Import necessary libraries and components
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchDogImage } from '../api/dogApi'; // Import function to fetch dog image by breed
import { useFavorites } from '../context/FavoriteContext'; // Import custom hook for managing favorite breeds

// FavoritesScreen component to display a list of favorite dog breeds
const FavoritesScreen = ({ navigation }) => {
    // Destructure favorites, addFavorite, and removeFavorite from custom hook
    const { favorites, addFavorite, removeFavorite } = useFavorites(); 
    const [favoriteImages, setFavoriteImages] = useState({}); // State to hold the images of favorite breeds

    // Fetch and load images for favorite breeds when the component mounts or favorites change
    useEffect(() => {
        const loadFavoriteImages = async () => {
            const images = {}; // Object to store breed image URLs
            for (const breed of favorites) {
                const image = await fetchDogImage(breed); // Fetch image for each favorite breed
                images[breed] = image; // Store image URL in the images object
            }
            setFavoriteImages(images); // Update state with fetched images
        };

        if (favorites.length > 0) {
            loadFavoriteImages(); // Load images only if there are favorites
        }
    }, [favorites]); // Re-run effect when favorites change

    // Render each favorite item (dog breed)
    const renderFavoriteItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text> {/* Display breed name */}
            {/* Touchable to add/remove from favorites */}
            <TouchableOpacity 
                onPress={() => {
                    if (favorites.includes(item)) {
                        removeFavorite(item); // Remove breed from favorites if it's already a favorite
                    } else {
                        addFavorite(item); // Add breed to favorites if it's not already
                    }
                }}
            >
                {/* Show filled heart if breed is a favorite, otherwise show an empty heart */}
                <Icon 
                    name={favorites.includes(item) ? "favorite" : "favorite-border"} 
                    size={30} 
                    color={favorites.includes(item) ? "red" : "black"} // Red heart if favorite, black otherwise
                />
            </TouchableOpacity>
            {/* Display the image of the favorite breed */}
            <Image
                source={{ uri: favoriteImages[item] }} // Image URL from favoriteImages state
                style={styles.favoriteImage} // Styling for the image
            />
        </View>
    );

    return (
        <View style={styles.container}>
            {/* If there are favorites, render them in a FlatList */}
            {favorites.length > 0 ? (
                <FlatList
                    data={favorites} // List of favorite breeds
                    renderItem={renderFavoriteItem} // Function to render each breed
                    keyExtractor={(item) => item} // Use breed name as key
                />
            ) : (
                // If no favorites, show a message
                <Text style={styles.emptyText}>No favorites found.</Text>
            )}
        </View>
    );
};

// Styles for various elements in the FavoritesScreen component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemContainer: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemText: {
        fontSize: 18,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#666',
        marginTop: 20,
    },
    favoriteImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginTop: 5,
    },
});

export default FavoritesScreen;

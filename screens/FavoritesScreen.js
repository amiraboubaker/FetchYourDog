// screens/FavoritesScreen.js
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure this package is installed
import { fetchDogImage } from '../api/dogApi'; // Import fetchDogImage
import { useFavorites } from '../context/FavoriteContext'; // Import useFavorites

const FavoritesScreen = ({ navigation }) => {
    const { favorites, addFavorite, removeFavorite } = useFavorites(); // Use favorites, addFavorite, and removeFavorite from context
    const [favoriteImages, setFavoriteImages] = useState({}); // State to hold images for favorites

    useEffect(() => {
        const loadFavoriteImages = async () => {
            const images = {};
            for (const breed of favorites) {
                const image = await fetchDogImage(breed);
                images[breed] = image;
            }
            setFavoriteImages(images);
        };

        if (favorites.length > 0) {
            loadFavoriteImages();
        }
    }, [favorites]);

    const renderFavoriteItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
            <TouchableOpacity 
                onPress={() => {
                    if (favorites.includes(item)) {
                        removeFavorite(item); // Remove from favorites if it's already there
                    } else {
                        addFavorite(item); // Add to favorites if it's not
                    }
                }}
            >
                <Icon 
                    name={favorites.includes(item) ? "favorite" : "favorite-border"} // Change icon based on favorite status
                    size={30} 
                    color={favorites.includes(item) ? "red" : "black"} // Change color based on favorite status
                />
            </TouchableOpacity>
            <Image
                source={{ uri: favoriteImages[item] }}
                style={styles.favoriteImage}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Favorites</Text>
            {favorites.length > 0 ? (
                <FlatList
                    data={favorites}
                    renderItem={renderFavoriteItem}
                    keyExtractor={(item) => item} // Use breed name as key
                />
            ) : (
                <Text style={styles.emptyText}>No favorites found.</Text>
            )}
        </View>
    );
};

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

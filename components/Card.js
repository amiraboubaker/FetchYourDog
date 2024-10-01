import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons for using vector icons
import React from 'react'; // Import React
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'; // Import necessary components from React Native

// Define the Card component that displays a breed's image and details
const Card = ({ breed, image, onPress, onFavorite, isFavorite }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.cardContainer}> {/* TouchableOpacity for the card, triggering onPress */}
            <Image
                source={{ uri: image }} // Use the image prop to display the breed image
                style={styles.image} // Apply styles to the image
            />
            <Text style={styles.breedText}>{breed}</Text> {/* Display the breed name */}
            {/* Heart icon for adding to favorites */}
            <TouchableOpacity onPress={() => onFavorite(breed)} style={styles.favoriteIcon}> {/* Trigger onFavorite when pressed */}
                <MaterialIcons
                    name={isFavorite ? 'favorite' : 'favorite-border'} // Change icon based on favorite status
                    size={24} // Icon size
                    color={isFavorite ? 'tomato' : 'gray'} // Change icon color based on favorite status
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

// Define styles for the Card component
const styles = StyleSheet.create({
    cardContainer: {
        margin: 10, 
        padding: 10, 
        borderWidth: 1, 
        borderColor: '#ccc', 
        borderRadius: 8, 
        position: 'relative',
        backgroundColor: 'white', 
        height: 200
    },
    image: {
        width: '100%', 
        height: 135,
        borderRadius: 8, 
    },
    breedText: {
        fontSize: 16, 
        fontWeight: 'bold', 
        marginTop: 10, 
    },
    favoriteIcon: {
        position: 'absolute', 
        top: 10, 
        right: 10, 
    },
});

export default Card;

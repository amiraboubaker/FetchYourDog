import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Card = ({ breed, image, onPress, onFavorite, isFavorite }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
            <Image
                source={{ uri: image }} // Use the image prop to display the breed image
                style={styles.image}
            />
            <Text style={styles.breedText}>{breed}</Text>
            {/* Heart icon for adding to favorites */}
            <TouchableOpacity onPress={() => onFavorite(breed)} style={styles.favoriteIcon}>
                <MaterialIcons
                    name={isFavorite ? 'favorite' : 'favorite-border'}
                    size={24}
                    color={isFavorite ? 'tomato' : 'gray'}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

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

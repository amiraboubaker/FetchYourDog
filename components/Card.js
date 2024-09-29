import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Card = ({ breed, onPress, onFavorite, isFavorite }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
             <Text style={styles.breedText}>{breed}</Text>
            <Image
                source={{ uri: `https://dog.ceo/api/breed/${breed}/images/random` }}
                style={styles.image}
            />
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
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 8,
    },
    favoriteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default Card;

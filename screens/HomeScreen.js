import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { fetchDogBreeds } from '../api/dogApi';
import Card from '../components/Card';
import { useFavorites } from '../context/FavoriteContext';

const HomeScreen = ({ navigation }) => {
    const [dogBreeds, setDogBreeds] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [searchQuery, setSearchQuery] = useState(''); 
    const { favorites, addFavorite } = useFavorites(); 

    useEffect(() => {
        const loadBreeds = async () => {
            const breeds = await fetchDogBreeds();
            setDogBreeds(breeds);
            setLoading(false);
        };
        loadBreeds(); 
    }, []);

    const filteredBreeds = dogBreeds.filter(breed => 
        breed.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/userProfile.png')} style={styles.profileImage} />
                <Text style={styles.username}>Welcome, User</Text>
            </View>
            <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={24} color="gray" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for dog breeds"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <FlatList
                data={filteredBreeds}
                renderItem={({ item }) => (
                    <Card
                        breed={item}
                        onPress={() => navigation.navigate('Detail', { breed: item })}
                        onFavorite={addFavorite}
                        isFavorite={favorites.includes(item)}
                    />
                )}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.flatListContainer}
            />
            <View style={styles.navigationContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <MaterialIcons name="home" size={30} color="black" />
                    <Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
                    <MaterialIcons name="favorite" size={30} color="tomato" />
                    <Text>Favoris</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 5,
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        marginLeft: 5,
    },
    flatListContainer: {
        paddingBottom: 20,
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
});

export default HomeScreen;

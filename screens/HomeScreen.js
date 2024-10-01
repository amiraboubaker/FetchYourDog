// Import necessary libraries and components
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { fetchDogBreeds } from '../api/dogApi'; // Import function to fetch dog breeds from an API
import Card from '../components/Card'; // Import Card component
import { useFavorites } from '../context/FavoriteContext'; // Import custom hook for managing favorite breeds

// HomeScreen component to display dog breeds and allow navigation
const HomeScreen = ({ navigation }) => {
    const [dogBreeds, setDogBreeds] = useState([]); // State to hold dog breeds data
    const [loading, setLoading] = useState(true); // State to handle loading indicator
    const [searchQuery, setSearchQuery] = useState(''); // State for the search input
    const { favorites, addFavorite } = useFavorites(); // Custom hook to manage favorite breeds

    // Fetch dog breeds when the component is mounted
    useEffect(() => {
        const loadBreeds = async () => {
            const breeds = await fetchDogBreeds(); // Fetch dog breeds from API
            console.log("Breeds:", breeds); // Log the breeds fetched
            setDogBreeds(breeds); // Set the fetched breeds to state
            setLoading(false); // Disable loading state
        };
        loadBreeds(); // Call the async function to load breeds
    }, []);

    // Filter dog breeds based on the search query entered by the user
    const filteredBreeds = dogBreeds.filter(breed =>
        breed.name.toLowerCase().includes(searchQuery.toLowerCase())
    );    

    // Show loading spinner while data is being fetched
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    // Render the HomeScreen layout when data is available
    return (
        <View style={styles.container}>
            {/* Header section with profile image and username */}
            <View style={styles.header}>
                <Image source={require('../assets/dog.png')} style={styles.profileImage} />
                <Text style={styles.username}>Welcome, User</Text>
            </View>

            {/* Search bar to filter dog breeds */}
            <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={24} color="gray" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for dog breeds"
                    value={searchQuery} // Bind search query state
                    onChangeText={setSearchQuery} // Update search query on text change
                />
            </View>

            {/* FlatList to render filtered dog breeds */}
            <FlatList
                data={filteredBreeds} // Data is the filtered list of dog breeds
                renderItem={({ item }) => (
                    <Card
                        breed={item.name} // Pass breed name to Card component
                        image={item.image} // Pass breed image to Card component
                        onPress={() => navigation.navigate('Detail', { breed: item.name })} // Navigate to Detail screen with breed info
                        onFavorite={() => addFavorite(item.name)} // Add breed to favorites when pressing the favorite button
                        isFavorite={favorites.includes(item.name)} // Check if breed is already in favorites
                    />
                )}
                keyExtractor={(item) => item.name} // Key extractor for FlatList items
                contentContainerStyle={styles.flatListContainer} // Styling for FlatList
            />

            {/* Navigation buttons to Home and Favorites screens */}
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

// Styles for various elements in the HomeScreen component
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
        width: 80,
        height: 80,
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
        backgroundColor: 'white'
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

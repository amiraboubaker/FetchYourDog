// FavoriteContext.js

// Import necessary hooks and functions from React
import { createContext, useContext, useState } from 'react';

// Create a new context for managing favorites
export const FavoriteContext = createContext();

// Provider component to wrap around the application and provide favorites state
export const FavoriteProvider = ({ children }) => {
    // State to hold the list of favorite breeds
    const [favorites, setFavorites] = useState([]); // Initialize favorites as an empty array

    // Function to add a breed to favorites
    const addFavorite = (breed) => {
        // Check if the breed is not already in favorites
        if (!favorites.includes(breed)) {
            // Update favorites by adding the new breed
            setFavorites((prevFavorites) => [...prevFavorites, breed]);
        }
    };

    // Function to remove a breed from favorites
    const removeFavorite = (breed) => {
        // Update favorites by filtering out the breed to be removed
        setFavorites((prevFavorites) =>
            prevFavorites.filter((favorite) => favorite !== breed) // Keep all favorites except the one to remove
        );
    };

    // Provide the favorites state and functions to children components
    return (
        <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children} {/* Render child components that can access this context */}
        </FavoriteContext.Provider>
    );
};

// Custom hook to allow easy access to the FavoriteContext
export const useFavorites = () => {
    return useContext(FavoriteContext); // Use useContext to access favorites context
};

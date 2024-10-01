// FavoriteContext.js
import { createContext, useContext, useState } from 'react';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (breed) => {
        if (!favorites.includes(breed)) {
            setFavorites((prevFavorites) => [...prevFavorites, breed]);
        }
    };

    const removeFavorite = (breed) => {
        setFavorites((prevFavorites) => 
            prevFavorites.filter((favorite) => favorite !== breed)
        );
    };

    return (
        <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};

// Custom hook to use the FavoriteContext
export const useFavorites = () => {
    return useContext(FavoriteContext);
};

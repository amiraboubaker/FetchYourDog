// FavoriteContext.js
import { createContext, useContext, useState } from 'react';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (breed) => {
        setFavorites((prevFavorites) => [...prevFavorites, breed]);
    };

    return (
        <FavoriteContext.Provider value={{ favorites, addFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};

// Custom hook to use the FavoriteContext
export const useFavorites = () => {
    return useContext(FavoriteContext);
};

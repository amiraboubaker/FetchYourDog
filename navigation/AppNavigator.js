import { NavigationContainer } from '@react-navigation/native'; // Import the NavigationContainer for managing navigation state
import { createStackNavigator } from '@react-navigation/stack'; // Import function to create a stack navigator
import React from 'react'; // Import React
import DetailScreen from '../screens/DetailScreen'; // Import DetailScreen component
import FavoritesScreen from '../screens/FavoritesScreen'; // Import FavoritesScreen component
import HomeScreen from '../screens/HomeScreen'; // Import HomeScreen component

// Create an instance of the stack navigator
const Stack = createStackNavigator();

// Define the AppNavigator component
const AppNavigator = () => {
    return (
        <NavigationContainer> {/* Wraps the stack navigator, managing navigation state */}
            <Stack.Navigator> {/* Contains all the screens in the stack navigator */}
                <Stack.Screen name="Home" component={HomeScreen} /> {/* Home screen */}
                <Stack.Screen name="Detail" component={DetailScreen} /> {/* Detail screen */}
                <Stack.Screen name="Favorites" component={FavoritesScreen} /> {/* Favorites screen */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;

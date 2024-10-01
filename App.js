import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { FavoriteProvider } from './context/FavoriteContext';
import SignInScreen from './screens/auth/SignInScreen';
import SignUpScreen from './screens/auth/SignUpScreen';
import DetailScreen from './screens/DetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator(); // Create a stack navigator instance

const App = () => {
    const [users, setUsers] = useState([]); // State to manage the list of users

    return (
        <FavoriteProvider> {/* Provide the favorite context to the app */}
            <NavigationContainer> {/* Wrap the app in NavigationContainer for navigation functionality */}
                <Stack.Navigator initialRouteName="SignIn"> {/* Set the initial route to SignIn */}
                    <Stack.Screen name="Home" component={HomeScreen} /> {/* Home screen in the stack */}
                    <Stack.Screen name="Detail" component={DetailScreen} /> {/* Detail screen in the stack */}
                    <Stack.Screen name="SignIn"> {/* SignIn screen in the stack */}
                        {props => <SignInScreen {...props} users={users} />} {/* Pass users state to SignInScreen */}
                    </Stack.Screen>
                    <Stack.Screen name="SignUp"> {/* SignUp screen in the stack */}
                        {props => <SignUpScreen {...props} setUsers={setUsers} />} {/* Pass setUsers function to SignUpScreen */}
                    </Stack.Screen>
                    <Stack.Screen name="Favorites" component={FavoritesScreen} /> {/* Favorites screen in the stack */}
                </Stack.Navigator>
            </NavigationContainer>
        </FavoriteProvider>
    );
};

export default App; 

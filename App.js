import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { FavoriteProvider } from './context/FavoriteContext';
import SignInScreen from './screens/auth/SignInScreen';
import SignUpScreen from './screens/auth/SignUpScreen';
import DetailScreen from './screens/DetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

const App = () => {
    const [users, setUsers] = useState([]);

    return (
        <FavoriteProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="SignIn">
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Detail" component={DetailScreen} />
                    <Stack.Screen name="SignIn">
                        {props => <SignInScreen {...props} users={users} />}
                    </Stack.Screen>
                    <Stack.Screen name="SignUp">
                        {props => <SignUpScreen {...props} setUsers={setUsers} />}
                    </Stack.Screen>
                    <Stack.Screen name="Favorites" component={FavoritesScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </FavoriteProvider>
    );
};

export default App;

import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// SignInScreen component for user sign-in
const SignInScreen = ({ navigation, users }) => { // Accept navigation and users as props
    // State variables to hold email and password input
    const [email, setEmail] = useState(''); // State for email input
    const [password, setPassword] = useState(''); // State for password input

    // Function to handle user sign-in
    const handleSignIn = () => {
        // Find user matching the entered email and password
        const user = users.find(user => user.email === email && user.password === password);
        
        if (user) { // If user is found
            console.log('Signing in with:', { email, password }); // Log user data for debugging
            navigation.navigate('Home'); // Navigate to Home screen upon successful sign-in
        } else { // If user is not found
            Alert.alert('Credentials Error', 'Invalid email or password. Please try again.'); // Show error alert
        }
    };

    return (
        <View style={styles.container}> {/* Main container for the sign-in screen */}
            <Image source={require('../../assets/logo1.png')} style={styles.logo} /> {/* Display logo */}
            {/* Email input field */}
            <TextInput
                style={styles.input}
                placeholder="Email" // Placeholder for email input
                value={email} // Controlled component value
                onChangeText={setEmail} // Update email state on change
                autoCapitalize="none" // Disable auto-capitalization
                autoCorrect={false} // Disable auto-correction
                returnKeyType="next" // Change return key to "next"
            />
            {/* Password input field */}
            <TextInput
                style={styles.input}
                placeholder="Password" // Placeholder for password input
                secureTextEntry // Mask password input
                value={password} // Controlled component value
                onChangeText={setPassword} // Update password state on change
                returnKeyType="done" // Change return key to "done"
            />
            {/* Sign In button */}
            <Button title="Sign In" onPress={handleSignIn} /> {/* Call handleSignIn on press */}
            {/* Navigation to Sign Up screen */}
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUpText}>Don't have an account? Sign Up</Text> {/* Text to navigate to Sign Up */}
            </TouchableOpacity>
        </View>
    );
};
// Styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        padding: 20, 
        backgroundColor: 'white',
    },
    logo: {
        width: 350, 
        height: 350, 
        alignSelf: 'center', 
        marginBottom: 20, 
    },
    input: {
        borderWidth: 1, 
        borderColor: '#ccc', 
        borderRadius: 5, 
        padding: 10, 
        marginBottom: 20, 
    },
    signUpText: {
        marginTop: 20, 
        textAlign: 'center', 
        color: '#007BFF', 
    },
});

export default SignInScreen;

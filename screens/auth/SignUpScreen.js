import React, { useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// SignUpScreen component for user registration
const SignUpScreen = ({ navigation, setUsers }) => { // Accept setUsers from props to manage user data
    // State variables to hold user input
    const [username, setUsername] = useState(''); // State for the username input
    const [email, setEmail] = useState(''); // State for the email input
    const [password, setPassword] = useState(''); // State for the password input
    const passwordInput = useRef(null); // Reference for the password input field

    // Function to handle user registration
    const handleSignUp = () => {
        // Save user data to a higher state (or use global state/context)
        setUsers(prevUsers => [...prevUsers, { username, email, password }]); // Append new user to the existing users
        console.log('Signing up with:', { username, email, password }); // Log user data for debugging
        navigation.navigate('SignIn'); // Navigate to SignIn after successful signup
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/logo1.png')} style={styles.logo} /> {/* Display logo */}
            {/* Username input field */}
            <TextInput
                style={styles.input}
                placeholder="Username" // Placeholder for username
                value={username} // Controlled component value
                onChangeText={setUsername} // Update username state on change
                autoCapitalize="none" // Disable auto-capitalization
                autoCorrect={false} // Disable auto-correction
                returnKeyType="next" // Change return key to "next"
                onSubmitEditing={() => passwordInput.current.focus()} // Focus on password input on submit
            />
            {/* Email input field */}
            <TextInput
                style={styles.input}
                placeholder="Email" // Placeholder for email
                value={email} // Controlled component value
                onChangeText={setEmail} // Update email state on change
                autoCapitalize="none" // Disable auto-capitalization
                autoCorrect={false} // Disable auto-correction
                returnKeyType="next" // Change return key to "next"
                keyboardType="email-address" // Use keyboard suited for email input
            />
            {/* Password input field */}
            <TextInput
                ref={passwordInput} // Attach reference to this input
                style={styles.input}
                placeholder="Password" // Placeholder for password
                secureTextEntry // Mask password input
                value={password} // Controlled component value
                onChangeText={setPassword} // Update password state on change
                returnKeyType="done" // Change return key to "done"
            />
            {/* Sign Up button */}
            <Button title="Sign Up" onPress={handleSignUp} /> {/* Call handleSignUp on press */}
            {/* Navigation to Sign In screen */}
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.signInText}>Already have an account? Sign In</Text> {/* Text to navigate to Sign In */}
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
    signInText: {
        marginTop: 20, 
        textAlign: 'center', 
        color: '#007BFF', 
    },
});

export default SignUpScreen;

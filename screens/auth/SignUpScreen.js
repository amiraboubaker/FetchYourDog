import React, { useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SignUpScreen = ({ navigation, setUsers }) => { // Accept setUsers from props
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); // Added email state
    const [password, setPassword] = useState('');
    const passwordInput = useRef(null);

    const handleSignUp = () => {
        // Save user data to a higher state (or you can use a global state or context)
        setUsers(prevUsers => [...prevUsers, { username, email, password }]);
        console.log('Signing up with:', { username, email, password });
        navigation.navigate('SignIn'); // Navigate to SignIn after successful signup
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/logo1.png')} style={styles.logo} />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => passwordInput.current.focus()}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                keyboardType="email-address" // Use email keyboard
            />
            <TextInput
                ref={passwordInput}
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                returnKeyType="done"
            />
            <Button title="Sign Up" onPress={handleSignUp} />
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.signInText}>Already have an account? Sign In</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white', // Set background color to pure white
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

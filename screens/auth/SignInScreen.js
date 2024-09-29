import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SignInScreen = ({ navigation, users }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        const user = users.find(user => user.email === email && user.password === password);
        
        if (user) {
            console.log('Signing in with:', { email, password });
            navigation.navigate('Home');
        } else {
            Alert.alert('Credentials Error', 'Invalid email or password. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/logo1.png')} style={styles.logo} />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                returnKeyType="done"
            />
            <Button title="Sign In" onPress={handleSignIn} />
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

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
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/action';
import Icon from 'react-native-vector-icons/Ionicons';

const Login = ({ navigation }) => {
    const { error } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const loginHandler = () => {
        dispatch(login(email, password));
    };

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch({ type: 'clearError' });
        }
    }, [error, dispatch]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>३२ पुतली</Text>
            <Image
                source={{ uri: 'https://github.com/NikeGunn/imagess/blob/main/icon-removebg-preview.png?raw=true' }} // Add your logo here
                style={styles.logo}
            />

            <Text style={styles.welcomeText}>Log In to Your Account</Text>

            <View style={styles.inputWrapper}>
                <View style={styles.inputContainer}>
                    <Icon name="mail-outline" size={20} color="#fff" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholderTextColor="#aaa"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="lock-closed-outline" size={20} color="#fff" style={styles.inputIcon} />
                    <TextInput
                        secureTextEntry={!isPasswordVisible}
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                        placeholderTextColor="#aaa"
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                        <Icon
                            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color="#aaa"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <Button
                mode="contained"
                disabled={!email || !password}
                style={styles.loginButton}
                labelStyle={styles.loginButtonText}
                onPress={loginHandler}
            >
                Log In
            </Button>

            <TouchableOpacity onPress={() => navigation.navigate('forgetpassword')} style={styles.forgetPassword}>
                <Text style={styles.forgetPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={styles.separatorContainer}>
                <Text style={styles.separatorText}>OR</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('register')} style={styles.signUpContainer}>
                <Text style={styles.signUpText}>
                    Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark background like TikTok
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 45,
        color: '#d4a5e8', // Custom Nepali app color
        fontWeight: 'bold',
        marginBottom: 10,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    welcomeText: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputWrapper: {
        width: '100%',
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#222',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        height: 55,
        elevation: 5,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#fff',
    },
    eyeIcon: {
        padding: 5,
    },
    loginButton: {
        backgroundColor: '#FF2D55',
        borderRadius: 20,
        paddingVertical: 8,
        width: '80%',
        elevation: 5,
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    forgetPassword: {
        marginTop: 10,
    },
    forgetPasswordText: {
        fontSize: 14,
        color: '#888',
    },
    separatorContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    separatorText: {
        fontSize: 14,
        color: '#888',
    },
    signUpContainer: {
        marginTop: 15,
    },
    signUpText: {
        fontSize: 16,
        color: '#fff',
    },
    signUpLink: {
        fontWeight: 'bold',
        color: '#FF2D55',
    },
});

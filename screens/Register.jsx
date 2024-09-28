import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { register } from '../redux/action';
import mime from 'mime';
import Icon from 'react-native-vector-icons/Ionicons';

const Register = ({ navigation, route }) => {
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const dispatch = useDispatch();

    const handleImage = () => {
        navigation.navigate("camera", {
            updateProfile: false
        });
    };

    const registerHandler = () => {
        const myForm = new FormData();
        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("password", password);
        myForm.append("avatar", {
            uri: avatar,
            type: mime.getType(avatar),
            name: avatar.split("/").pop()
        });

        dispatch(register(myForm));
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    useEffect(() => {
        if (route.params) {
            if (route.params.image) {
                setAvatar(route.params.image);
            }
        }
    }, [route]);

    return (
        <View style={styles.container}>
            <Avatar.Image
                size={100}
                source={{ uri: avatar ? avatar : null }}
                style={{ backgroundColor: "#FF2D55", marginBottom: 20 }}
            />
            <TouchableOpacity onPress={handleImage}>
                <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>

            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholderTextColor="#aaa"
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        secureTextEntry={!isPasswordVisible}
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
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
                disabled={!email || !password || !name}
                style={styles.registerButton}
                onPress={registerHandler}
            >
                <Text style={styles.registerButtonText}>Register</Text>
            </Button>

            <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <Text style={styles.loginText}>
                    Have an account? <Text style={styles.loginLink}>Login</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Register;

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
    changePhotoText: {
        color: '#FF2D55',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputWrapper: {
        width: '100%',
        marginBottom: 30,
    },
    inputContainer: {
        position: 'relative',
    },
    input: {
        backgroundColor: '#222',
        borderWidth: 1,
        borderColor: '#b5b5b5',
        padding: 10,
        paddingLeft: 15,
        borderRadius: 10,
        marginVertical: 10,
        fontSize: 16,
        color: '#fff',
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
        padding: 5,
    },
    registerButton: {
        backgroundColor: '#FF2D55',
        borderRadius: 20,
        paddingVertical: 8,
        width: '80%',
        elevation: 5,
    },
    registerButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    loginText: {
        color: '#888',
        marginTop: 20,
        fontSize: 16,
    },
    loginLink: {
        color: '#FF2D55',
        fontWeight: 'bold',
    },
});

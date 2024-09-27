import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { register } from '../redux/action';
import mime from 'mime';

const Register = ({ navigation, route }) => {

    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleImage = () => {
        navigation.navigate("camera", {
            updateProfile: false
        });
    };

    const registerHandler = async () => {
        if (!avatar) {
          alert("Please select an avatar.");
          return;
        }
      
        const myForm = new FormData();
        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("password", password);
        myForm.append("avatar", {
          uri: avatar,
          type: mime.getType(avatar),
          name: avatar.split("/").pop(),
        });
      
        console.log("Form Data:", myForm); // Log the FormData for debugging
      
        const registrationSuccessful = await dispatch(register(myForm));
      
        if (registrationSuccessful) {
          // Navigate to login screen if registration is successful
          navigation.navigate('login');
        } else {
          // Optionally, you can add a toast or alert here for the user
          alert("Registration failed. Please try again.");
        }
      };
    

    useEffect(() => {
        if (route.params && route.params.image) {
            setAvatar(route.params.image);
        }
    }, [route]);

    return (
        <View style={styles.container}>
            <Avatar.Image
                size={100}
                source={{ uri: avatar ? avatar : null }}
                style={styles.avatar}
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
                <TextInput
                    secureTextEntry
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#aaa"
                />
            </View>

            <Button
                mode="contained"
                disabled={!email || !password || !name}
                style={styles.registerButton}
                labelStyle={styles.registerButtonText}
                onPress={registerHandler}
            >
                Register
            </Button>

            <TouchableOpacity onPress={() => navigation.navigate("login")} style={styles.loginLinkContainer}>
                <Text style={styles.loginLinkText}>
                    Have an Account? <Text style={styles.loginLink}>Log In</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark background for a professional look
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 45,
        color: '#d4a5e8', // Custom color for cultural relevance
        fontWeight: 'bold',
        marginBottom: 10,
    },
    avatar: {
        backgroundColor: '#FF2D55', // Placeholder color
        marginBottom: 10,
    },
    changePhotoText: {
        color: '#FF2D55',
        fontSize: 16,
        marginBottom: 20,
    },
    inputWrapper: {
        width: '80%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#222',
        color: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 15,
        fontSize: 16,
        elevation: 3,
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
    loginLinkContainer: {
        marginTop: 15,
    },
    loginLinkText: {
        fontSize: 16,
        color: '#fff',
    },
    loginLink: {
        fontWeight: 'bold',
        color: '#FF2D55',
    },
});

import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const LoginScreen = ({ navigation }) => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const timeoutRef = useRef(null);
    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState("")
    const closeAlert = () => {
        setVisible(false);
    }
    const showAlert = () => {
        setVisible(true);
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(closeAlert, 4000);
    }
    const [msg, setMsg] = useState();
    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };
    const validateInputs = () => {
        console.log(data)
        if (
            data.email === "" ||
            data.password === ""
        ) {
            setMsg("Please fill in all fields.");
            Toast.show({
                type: 'error',
                text1: 'Hello 👋',
                text2: 'Please you need to fill in all the fields',
                visibilityTime:3000
              });
            return false;
        }
        if (!isValidEmail(data.email)) {
            setMsg("Invalid email format.");
            Toast.show({
                type: 'error',
                text1: 'Hello 👋,This is an invalid email',
                text2: 'Please provide a valid email',
                visibilityTime:3000
              });
            showAlert();
            return false;
        }
        return true;
    };
    function LoginHandler() {
        if (!validateInputs()) {
            return;
        }
        const methodOptions = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/JSON",
            },
        };
        fetch("http://192.168.43.112:7000/api/app/login", methodOptions)
            .then((response) => {
                if (!response.ok) {
                    if (response.status == 401) {
                        console.log("INVALID EMAIL OR PASSWORD");
                        Toast.show({
                            type: 'error',
                            text1: 'INVALID EMAIL OR PASSWORD',
                            visibilityTime:3000
                          });
                        showAlert();
                    }
                    else {
                        if (response.status == 403) {
                            Toast.show({
                                type: 'info',
                                text1: 'YOUR ACCOUNT HAS NOT YET BEEN VERIFIED YET',
                                visibilityTime:3000
                              });
                            showAlert()
                        }
                    }
                }
                else {
                    if (response.ok) {
                        if (response.status == 201) {
                            Toast.show({
                                type: 'info',
                                text1: "USER DOESN'T EXIST",
                                visibilityTime:3000
                              });
                            showAlert()
                        }
                        else if (response.status == 202) {
                            Toast.show({
                                type: 'info',
                                text1: "INVALID CREDENTIALS",
                                visibilityTime:3000
                              });
                            showAlert()
                        }
                        else if (response.status == 200) {
                            return response.json();
                        }
                    }
                }
            })
            .then((value) => {
                console.log("here",value);
                if (value.message === "successfully logged in") {
                    // Store the token in SecureStore
                    console.log("here");
                    
                    AsyncStorage.setItem('UserToken', value.token)
                        .then(() => {
                            console.log("running here")
                            Toast.show({
                                type: 'success',
                                text1: "SUCCESSFULLY LOGGED IN",
                                visibilityTime:3000
                              });
                            // Navigate to the next screen or perform any other action
                            navigation.navigate('Home');
                        })
                        .catch((error) => {
                            Toast.show({
                                type: 'error',
                                text1: "SYSTEM FAILURE",
                                visibilityTime:3000
                              });
                            console.log('Error storing token:', error);
                        });
                }
            })
            .catch((error) => {
                // setMsg("unexpected error occured");
                console.log(error);
            });
    }

    return (
        <>
            <Image
                source={require("../../assets/header.jpg")}
                style={styles.headerImage}
            />
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Login</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            keyboardType="email-address"
                            value={data.email}
                            onChangeText={(text) => setData({ ...data, email: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            value={data.password}
                            onChangeText={(text) => setData({ ...data, password: text })}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={LoginHandler}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signupLink}
                        onPress={() => navigation.navigate("registration")}
                    >
                        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
                    </TouchableOpacity>
                </View>
                <Toast />
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#166FE5',
        borderRadius: 10, // Slightly curved edges
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '80%', // Makes the button close to full width
        alignSelf: 'center', // Centers the button horizontally
    },    
    buttonText: {
        color: 'white',
        fontSize: 20,
         alignSelf: 'center'
    },
    signupLink: {
        marginTop: 20,
    },
    headerImage: {
        width: '100%',
        height: 250, // Adjust the height according to your image
    },
    signupText: {
        color: 'blue',
        fontSize: 16,
    },
    alertContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 10,
    },
    alertText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;

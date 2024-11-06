import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';

const ActivateAccountScreen = ({ navigation }) => {
    const [data, setData] = useState({
        email: "",
        nationalID: "",
        ID: "",
        password: ""
    });
    const [nationalID, setNationalID] = useState("");
    const [step, setStep] = useState(1); // 1 = Email, 2 = National ID, 3 = Password
    const [showNID, setShowNID] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            visibilityTime: 3000
        });
    };

    const validateEmail = () => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(data.email);
    };

    const handleEmailSubmit = async () => {
        if (!data.email) {
            showToast('error', 'Missing Information', 'Please enter an email.');
            return;
        }
        if (!validateEmail()) {
            showToast('error', 'Invalid Email', 'Please enter a valid email format.');
            return;
        }

        const methodOptions = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const response = await fetch("http://192.168.1.77:7000/api/app/check", methodOptions);
            console.log(response.status);
            if (response.ok) {
                if (response.status === 200) {
                    const responseData = await response.json();

                    console.log(responseData);
                    if (responseData.confirm === true) {
                        setShowNID(true);
                        setData({
                            ...data,
                            nationalID:responseData.user.nID,
                            id:responseData.user._id
                        })
                        showToast('success', 'Email Verified', 'Please enter your national ID.');
                    }
                    else{
                        showToast('info', 'Email already verified', 'This user is already in the system');
                    }
                }
            } else {
                showToast('error', 'Verification Failed', 'Email verification failed. Please try again.');
            }
        } catch (error) {
            console.error(error);
            showToast('error', 'Error', 'System failure.');
        }
    };

    const handleNationalIDSubmit = () => {
        if (!nationalID) {
            showToast('error', 'Missing Information', 'Please enter your national ID.');
            return;
        }
        // Assuming some validation for National ID if needed
        if(nationalID===data.nationalID){
        setShowPassword(true)
        showToast('success', 'National ID Verified', 'Please proceed to enter your password.');
        }
        else{
            showToast('error', 'Incorrect national ID', 'Enter a correct national ID');
        }
    };
    const handlePasswordSubmit = async () => {
        if (!data.password) {
            showToast('error', 'Password Required', 'Please enter a password to activate.');
            return;
        }
    
        try {
            const response = await fetch("http://192.168.1.77:7000/api/app/activate", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                }
            });
    
            if (response.ok) {
                showToast('success', 'Account Activated', 'You can now log in.');
                navigation.goBack()
            }
        } catch (error) {
            console.error("System failure:", error);
            showToast('error', 'ERROR', 'SYSTEM FAILURE.');
        }
    };
    
    return (
        <>
            <Image
                source={require("../../assets/header.jpg")}
                style={styles.headerImage}
            />
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Activate Account</Text>
                    <View style={styles.formContainer}>
                        <View style={styles.formGroup}>
                            <TextInput
                                style={[styles.input, showNID && styles.disabledInput]}
                                placeholder="Enter email"
                                value={data.email}
                                editable={!showNID}
                                onChangeText={(text) => setData({ ...data, email: text })}
                                keyboardType="email-address"
                            />
                            {!showNID && (<TouchableOpacity style={styles.button} onPress={handleEmailSubmit}>
                                <Text style={styles.buttonText}>Next</Text>
                            </TouchableOpacity>)}
                        </View>


                        <View style={styles.formGroup}>
                            {showNID && (<TextInput
                                style={[styles.input, showPassword && styles.disabledInput]}
                                placeholder="Enter National ID"
                                value={nationalID}
                                editable={!showPassword}
                                onChangeText={setNationalID}
                            />
                            )}
                            {showNID && !showPassword && (<TouchableOpacity style={styles.button} onPress={handleNationalIDSubmit}>
                                <Text style={styles.buttonText}>Next</Text>
                            </TouchableOpacity>)
                            }
                        </View>


                        {showPassword && (
                            <View style={styles.formGroup}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Password"
                                    value={data.password}
                                    onChangeText={(text) => setData({ ...data, password: text })}
                                    secureTextEntry
                                />
                                <TouchableOpacity style={styles.button} onPress={handlePasswordSubmit}>
                                    <Text style={styles.buttonText}>Activate</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
            <Toast />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    disabledInput: {
        backgroundColor: '#e0e0e0',
        color: '#a0a0a0'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    headerImage: {
        width: '100%',
        height: 250,
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
    },
    formGroup: {
        width: '100%',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ActivateAccountScreen;

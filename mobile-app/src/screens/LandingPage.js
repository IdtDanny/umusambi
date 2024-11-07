import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavingsScreen = ({ navigation }) => {
  const [user,setUser]=useState();
  useEffect(() => {
    const fetchUser = async () => {
      const username = await AsyncStorage.getItem('user');
      setUser(username);
    };
  
    fetchUser();
  }, []);
    return (
        <View style={styles.container}>
            {/* Background Wrapper with Light Blue Color */}
            <View style={styles.accountCardContainer}>
                {/* Account Card */}
                <View style={styles.accountCard}>
                    <Text style={styles.accountType}>Visitor account</Text>
                    <Text style={styles.accountNumber}>{user} ****</Text>
                    <View style={styles.balanceContainer}>
                        <Text style={styles.balanceText}>**********************</Text>
                    </View>
                    <TouchableOpacity style={styles.exploreButton} onPress={()=>navigation.navigate("map")}>
                        <Text style={styles.exploreButtonText}>Explore Now</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Action Grid */}
            <View style={styles.actionGrid}>
                {[
                    { label: "Dashboard", icon: "dashboard",navigate:"welcome" },
                    { label: "History", icon: "history",navigate:"history" },
                    { label: "Map", icon: "map-marker",navigate:"map" },
                    { label: "User Profile", icon: "user",navigate:"user profile" },
                ].map((item, index) => (
                    <TouchableOpacity key={index} style={styles.actionButton} onPress={()=>navigation.navigate(item.navigate)}>
                        <FontAwesome name={item.icon} size={24} color="#007AFF" />
                        <Text style={styles.actionText}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Savings Goal Section */}
            <TouchableOpacity style={styles.savingsGoal} onPress={()=>navigation.navigate("map")}>
                <Text style={styles.goalText}>Navigate Umusambi? ➔</Text>
                <Text style={styles.goalTextBold}>Let's go together!</Text>
            </TouchableOpacity>
            <View style={styles.savingsGoal}>
                <Text style={styles.goalText}>Interactive mobile app ➔</Text>
                <Text style={styles.goalTextBold}>Interactive app to visit umusambi village!</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4FF',
        alignItems: 'center',
        paddingTop: 20,
    },
    accountCardContainer: {
        backgroundColor: '#E3F2FD', // Light blue background
        width: '90%',
        padding: 10,
        borderRadius: 15,
        marginBottom: 20,
    },
    accountCard: {
        backgroundColor: '#0D47A1', // Darker blue card color
        width: '100%',
        padding: 20,
        borderRadius: 12,
    },
    accountType: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500',
    },
    accountNumber: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    balanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    balanceText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '500',
    },
    eyeIcon: {
        marginLeft: 10,
    },
    exploreButton: {
        backgroundColor: '#F3E350',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    exploreButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    actionGrid: {
        backgroundColor: '#FFF',
        width: '90%',
        borderRadius: 12,
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    actionButton: {
        alignItems: 'center',
        width: '25%',
        marginVertical: 10,
    },
    actionText: {
        color: '#007AFF',
        fontSize: 12,
        marginTop: 5,
        textAlign: 'center',
    },
    savingsGoal: {
        backgroundColor: '#0D47A1',
        width: '90%',
        borderRadius: 12,
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'flex-start',
        marginTop: 20,
    },
    goalText: {
        color: '#FFF',
        fontSize: 14,
        marginBottom: 5,
    },
    goalTextBold: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SavingsScreen;

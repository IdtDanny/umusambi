import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { formatDateInNumbers } from '../helpers/dateHelper';
import API from '../../constants/API';


const { width, height } = Dimensions.get('window');


const PaymentHistoryScreen = () => {

  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const token = await AsyncStorage.getItem('UserToken');

    if (!token) {
      console.log("Token not available");
      return;
    }

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };
    
    try {
      const response = await fetch(`http://${API}/api/app/getuserhistory`, requestOptions);
      if (response.ok) {
        const data = await response.json();
        setPaymentHistory(data);        
        Toast.show({
          type: 'success',
          text1: 'Successfully retrieved info',
          visibilityTime: 3000
        });
      } else {
        console.error('Failed to fetch user details');
        Toast.show({
          type: 'error',
          text1: 'Hello 👋, failed to retrieve info',
          visibilityTime: 3000
        });
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Full-width Add Account Button at the Top */}
      <TouchableOpacity style={styles.fullWidthAddAccountButton}>
        <FontAwesome name="credit-card" size={24} color="#ffffff" />
        <Text style={styles.addAccountButtonText}>Visitation history</Text>
      </TouchableOpacity>

      {/* Spacer to avoid overlap with Add Account button */}
      <View style={{ height: height * 0.25 }} />

      {/* Detailed Info Card */}
      <View style={styles.infoCard}>
        <View style={styles.infoIconContainer}>
          <FontAwesome name="credit-card" size={24} color="#0D47A1" />
        </View>
        <ScrollView style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>Payment History</Text>
          {paymentHistory.length > 0 ? (
            paymentHistory.map((payment, index) => (
              <View style={styles.rowTextContainer} key={index}>
                <Text style={styles.infoDescription}>3000 RWF</Text>
                <Text style={styles.infoDescription}>{formatDateInNumbers(payment.createdAt)}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.infoDescription}>No payment history available.</Text>
          )}
        </ScrollView>
      </View>
      <Toast/>
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
  fullWidthAddAccountButton: {
    backgroundColor: '#0D47A1',
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height * 0.25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  addAccountButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    width: '90%',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    color: '#0D47A1',
    fontSize: 16,
    fontWeight: '600',
  },
  rowTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  infoDescription: {
    color: '#607D8B',
    fontSize: 14,
  },
});

export default PaymentHistoryScreen;

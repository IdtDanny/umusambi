import React,{useState,useEffect} from 'react';
import { StyleSheet,Dimensions,View } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const UserDetailScreen = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        const token = await AsyncStorage.getItem('UserToken');
        console.log(token)

        if (!token) {
            console.log("token not available");
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
            const response = await fetch(`http:${API}/api/app/getdetails`,requestOptions);
            if (response.ok) {
                const data = await response.json();
                setUser(data);
                Toast.show({
                  type: 'success',
                  text1: 'Successfully retrieved info',
                  visibilityTime: 3000
                });
            } else {
                console.error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    return (
        <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Umusambi Village</Text>
      </View>

      {/* Profile Avatar */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarBackground}>
          <FontAwesome name="user" size={48} color="#ffffff" />
        </View>
      </View>

      {/* User Info */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <FontAwesome name="user" size={24} color="#4FC3F7" style={styles.icon} />
          <Text style={styles.infoText}>{user.firstname} {user.lastname}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="email" size={24} color="#4FC3F7" style={styles.icon} />
          <Text style={styles.infoText}> {user.email} </Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome name="phone" size={24} color="#4FC3F7" style={styles.icon} />
          <Text style={styles.infoText}>{user.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome name="id-card" size={24} color="#4FC3F7" style={styles.icon} />
          <Text style={styles.infoText}>{user.nID}</Text>
        </View>
      </View>
      <Toast/>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E0F7FA',
      alignItems: 'center',
    },
    headerContainer: {
      width: '100%',
      height: height * 0.3, // Takes up 30% of the screen height
      backgroundColor: '#1974EC',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      paddingBottom: 20,
    },
    headerText: {
      color: '#fff',
      fontSize: 32,
      fontWeight: 'bold',
      letterSpacing: 1.5,
    },
    avatarContainer: {
      position: 'absolute',
      top: height * 0.22, // Positioned just below the header
      width: 130,
      height: 130,
      borderRadius: 65,
      backgroundColor: '#7986CB',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 5,
    },
    avatarBackground: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#3F51B5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoContainer: {
      width: width * 0.85,
      marginTop: height * 0.1,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginVertical: 6,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    icon: {
      marginRight: 10,
    },
    infoText: {
      fontSize: 16,
      color: '#333',
    },
  });

export default UserDetailScreen;

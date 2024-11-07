import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Block, Text, theme } from "galio-framework";
import { ScrollView } from 'react-native-gesture-handler';
import DrawerItem from './DrawerItem';
import AsyncStorage from '@react-native-async-storage/async-storage';




function CustomDrawerContent(props) {
    const [focusedItem, setFocusedItem] = useState("News");

    const handleItemPress = (itemLabel) => {
        setFocusedItem(itemLabel);
        props.navigation.navigate(itemLabel);
    };
    const handleLogout = async () => {
        await AsyncStorage.clear();

        props.navigation.navigate("Logine");
    };
    return (
        <>
            <Block
                style={styles.container}
                forceInset={{ top: "always", horizontal: "never" }}
            >
                <Block flex={0.06} style={styles.header}>
                    <Text style={styles.headerText}>UMUSAMBI VILLAGE</Text>
                </Block>
                <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        <DrawerItem label="welcome" icon="dashboard"
                            focused={focusedItem === 'welcome'}
                            onPress={() => handleItemPress('welcome')} />
                        <DrawerItem label="history" icon="credit-card"
                            focused={focusedItem === 'history'}
                            onPress={() => handleItemPress('history')} />
                        <DrawerItem label='user profile' icon="user"
                            focused={focusedItem === 'user profile'}
                            onPress={() => handleItemPress('user profile')} />
                        <DrawerItem label='map' icon="map-marker"
                            focused={focusedItem === 'map'}
                            onPress={() => handleItemPress('map')} />
                    </ScrollView>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </Block>
            </Block>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 28,
        paddingBottom: theme.SIZES.BASE,
        paddingTop: theme.SIZES.BASE * 3,
        //justifyContent: "center",
    },
    logoutButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: theme.COLORS.GRAY,
        borderRadius: 5,
        alignSelf: "center",
    },
    logoutText: {
        color: theme.COLORS.RED,
        fontWeight: "bold",
    },
    headerText: {
        color: "#166FE5",
        fontWeight: 'bold',
        fontSize: 20, // Customize the font size to your preference
        letterSpacing: 1, // Adjust letter spacing for a futuristic look
        textAlign: 'center', // Center the text
    },
});

export default CustomDrawerContent;

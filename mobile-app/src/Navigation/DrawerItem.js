import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { FontAwesome } from '@expo/vector-icons';

const DrawerItem = ({ label, focused, onPress,icon }) => {
    const containerStyles = [
        styles.defaultStyle,
        focused ? [styles.activeStyle, styles.shadow] : null
    ];
    return (
        <TouchableOpacity style={{ height: 60 }} onPress={onPress}>
            <Block flex row style={containerStyles}>
                <Block middle flex={0.1} style={{ marginRight: 5 }}>
                <FontAwesome name={icon} size={24} color="black" />
                </Block>
                <Block row center flex={0.9} style={{marginHorizontal:10}}>
                    <Text
                        size={15}
                        bold={focused ? true : false}
                        color={focused ? "white" : "rgba(1,0,0,0.7)"}
                    >
                        {label}
                    </Text>
                </Block>
            </Block>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    defaultStyle: {
        paddingVertical: 16,
        paddingHorizontal: 16
    },
    activeStyle: {
        backgroundColor: "#1778F2",
        borderRadius: 4
    },
    shadow: {
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 2
        },
        icon: {
            width: 24,
            height: 24, // Adjust size as needed
        },
        shadowRadius: 8,
        shadowOpacity: 0.1
    }
});

export default DrawerItem;


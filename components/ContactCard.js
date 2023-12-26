import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo-icons or another icon library

// Helper functions for responsive layout
import { calcHeight, calcWidth,getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';
function generateRandomLightColor() {
    const randomByte = () => 128 + Math.floor(Math.random() * 128).toString(16);
    return `#${randomByte()}${randomByte()}${randomByte()}`;
}


function ContactCard({ selected, name, phoneNumber, imageURI, onPress }) {
    return (
        <View style={styles.container}>
            {imageURI?<Image
                source={{ uri: imageURI }}
                style={styles.profileImage}
            />:
            <View style={styles.placeHolderView}>
                <Text>{name.charAt(0).charAt(0).toUpperCase()}</Text>
            </View>
            }
            <View style={styles.textContainer}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.phoneText}>{phoneNumber}</Text>
            </View>
            {selected && <Ionicons name="md-checkmark-circle" size={24} color={COLOR.BUTTON} />}
            
        </View>
    );

}

export default ContactCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: calcWidth(5),
        backgroundColor: COLOR.APP_BACKGROUND,
    },
    profileImage: {
        height:calcHeight(5),
        width:calcHeight(5),
        borderRadius:calcHeight(5),
        marginRight:calcWidth(2)
    },
    textContainer: {
        flex: 1,
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    phoneText: {
        fontSize: 14,
        color: COLOR.PRIMARY,
    },
    placeHolderView:{
        backgroundColor:generateRandomLightColor(),
        height:calcHeight(5),
        width:calcHeight(5),
        borderRadius:calcHeight(5),
        justifyContent:"center",
        alignItems:"center",
        marginRight:calcWidth(2)
    }
});
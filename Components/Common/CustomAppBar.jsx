import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CustomAppBar = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/NearBuddies_logo.jpg')} style={styles.image} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: '5.4%',
        marginTop : 20,
        marginLeft : 5,
        marginBottom : 5,
        width: '45%',
        backgroundColor : '#fff'
    },
    image:{
        marginLeft: 10,
        marginVertical: 5,
        width: '100%',
        height: '100%'
    }
});

//make this component available to the app
export default CustomAppBar;

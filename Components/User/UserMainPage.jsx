//import liraries
import React, { Component } from 'react';
import { View,SafeAreaView, TextInput, Text, StyleSheet, ScrollView, Touchable, TouchableOpacity } from 'react-native';

// create a component
class UserMainPage extends Component {
    myCommunities = [
        {
            id : 1 ,
            name : 'Cow-boys',
            imageUrl : '../assets/images/',
            grade : 3.5
        },
        {
            id : 1 ,
            name : '',
            imageUrl : '',
            grade :
        },
        {
            id : 1 ,
            name : '',
            imageUrl : '',
            grade :
        },
        {
            id : 1 ,
            name : '',
            imageUrl : '',
            grade :
        },
    ];
    nearestCommunities = [
        {
            id : 1 ,
            name : '',
            imageUrl : '',
            grade :
        },
        {
            id : 1 ,
            name : '',
            imageUrl : '',
            grade :
        },
        {
            id : 1 ,
            name : '',
            imageUrl : '',
            grade :
        },
        {
            id : 1 ,
            name : '',
            imageUrl : '',
            grade :
        },
    ];
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TextInput style={styles.TextInput}/>
                <View>
                    <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style = {styles.scrollView}
                    >
                        <TouchableOpacity><Text style = {styles.scrollViewActiveText}> Travelling </Text></TouchableOpacity>
                        <TouchableOpacity><Text style = {styles.scrollViewText}> Camping </Text></TouchableOpacity>
                        <TouchableOpacity><Text style = {styles.scrollViewText}> Cooking </Text></TouchableOpacity>
                        <TouchableOpacity><Text style = {styles.scrollViewText}> Gaming </Text></TouchableOpacity>                   
                    </ScrollView>
                </View>
                <Text style = {styles.titleStyle}>My communities</Text>
            </SafeAreaView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal : 10,
        marginVertical:10,
        backgroundColor: '#fff',     
    },
    TextInput : {
        backgroundColor : '#D2E9FE',
        height : 50,
        borderRadius : 20,
    },
    textStyle : {
        fontSize : 20
    },
    titleStyle : {
        fontSize : 25,
        fontWeight : 'bold',
    },
    scrollView : {
        marginTop: 15,
        marginBottom : 12
    },
    scrollViewActiveText : {
        fontSize : 20,
        fontWeight : 'bold',
        fontStyle : 'italic',
        color : '#EC6A6D',
        marginRight: 20
    },
    scrollViewText : {
        fontSize : 20,
        fontWeight : 'bold',
        fontStyle : 'italic',
        color : '#D0CCCC',
        marginRight: 20
    },
    
});

//make this component available to the app
export default UserMainPage;

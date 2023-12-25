//import liraries
import React, { Component } from 'react';
import { View,SafeAreaView, TextInput, Text, StyleSheet, ScrollView, Touchable, TouchableOpacity, FlatList } from 'react-native';

// create a component
class UserMainPage extends Component {
    myCommunities = [
        {
            id : 1 ,
            name : 'The cat coffee',
            imageUrl : '../assets/images/cats.jpeg',
            grade : 4.5
        },
        {
            id : 2 ,
            name : 'Cow-boys',
            imageUrl : '../assets/images/',
            grade : 3.5
        },
        {
            id : 3 ,
            name : 'Basketeers',
            imageUrl : '../assets/images/',
            grade : 4
        },
        {
            id : 4 ,
            name : 'Momies for babies',
            imageUrl : '../assets/images/',
            grade : 3.2
        },
    ];
    nearestCommunities = [
        {
            id : 5 ,
            name : 'Cookings tips',
            imageUrl : '../assets/images/',
            grade : 4.1
        },
        {
            id : 6 ,
            name : 'Animes lovers',
            imageUrl : '../assets/images',
            grade : 4.8
        },
        {
            id : 7 ,
            name : 'La taverne',
            imageUrl : '../assets/images',
            grade : 5
        },
        {
            id : 8 ,
            name : 'Les voleurs associés',
            imageUrl : '../assets/images',
            grade : 2
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
                <View style = {styles.myCommunitiesStyle} >
                    <FlatList
                    data = {this.myCommunities}
                    horizontal = {true}
                    keyExtractor = {(item)=> item.id}
                    renderItem = {(item)=> {
                        <View style = {styles.myCommunitiesViews}>
                            
                        </View>
                    }}
                    />
                </View>
                <Text style = {styles.titleStyle}>Nearest communities</Text>
                <View style = {styles.nearestCommunitiesStyle} >
                    <FlatList
                    horizontal = {true}
                    keyExtractor = {(item)=> item.id}
                    renderItem = {(item)=> {
                        
                    }}
                    />
                </View>
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

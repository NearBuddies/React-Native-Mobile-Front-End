//import liraries
import React, { useEffect, useState } from 'react';
import { View,SafeAreaView, TextInput, Text, StyleSheet, ScrollView, Touchable, TouchableOpacity, FlatList, Image, Pressable } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { makeBase64Image } from '../Common/Services/ImagesService';
import { getNearestCommunitiesToUser, getCommunitiesOfUser } from '../Common/Services/CommunityService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
// create a component
export default function UserMainPage() {
    // Se mettre une navigation
    const navigation = useNavigation();
    // Les communautés dans lesquelles je suis
    const [ myCommunities, setMyCommunities] = useState([]) 
    // Fonction de navigation vers la création de communauté
    const navigateToCreateCommunity = () => {
        navigation.navigate('UserCreateCommunity')
    }
    // Fonction pour naviguer vers la page pour voir les communautés
    const navigateToSeeCommunityPage = (id) => {
        console.log('Navigating with id '+ id)
        navigation.navigate('UserSeeCommunityPage',id)
    }
    // Fonction pour naviguer vers la page de la communauté
    const navigateToCommunityPage = (id) => {
        console.log('Navigating to community page with id '+ id)
        navigation.navigate('UserCommunityPage',id)
    }
    // Les communautés environnantes
    const [ nearestCommunities, setNearestCommunities ] = useState([])
    // Le prochain événement
    const [nextEvent, setNextEvent] = useState({
        eventId : 1,
        eventCommunity : 'Le club des heureux',
        eventName : 'Go fishing',
        eventPitch : 'Allons pêcher sur le fleuve',
        eventDate : '12/01/2024',
        eventHour : '10:00',
        imageUrl : require('../../assets/images/peche.jpg')
    }) 

    const fetchCommunities = async () => { 
        try {
            // console.log("In use effect");
            const theNearestCommunities = await getNearestCommunitiesToUser();
            // console.log("Nearest communities " + JSON.stringify(theNearestCommunities));
            setNearestCommunities(theNearestCommunities); // Set nearest communities
            // console.log("The nearest communities " + JSON.stringify(nearestCommunities));
            const userCommunities = await getCommunitiesOfUser();
            setMyCommunities(userCommunities); // Set user communities
        } catch (error) {
            console.error("Error while fetching nearest communities:", error);
        }
    };
 
    useEffect(() => {
        
        fetchCommunities()
        // console.log("myCommunities is" + JSON.stringify(myCommunities,null,2) )
    }, []);

    // Use useFocusEffect to refetch data when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
        fetchCommunities()
    }, [])
  );

    return ( 
        <SafeAreaView style={styles.container}> 
            


            <View >
                    <Pressable>
                        <TextInput style={styles.TextInput} placeholder='What are you thinking about?'/>
                        <Feather name="search" size={24} color="#ec6a6d" style={styles.textInputFeather}/>
                    </Pressable>
            </View> 


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
                    <TouchableOpacity><Text style = {styles.scrollViewText}> Lo-Fi </Text></TouchableOpacity>   
                    <TouchableOpacity><Text style = {styles.scrollViewText}> Cozy </Text></TouchableOpacity>                   
                </ScrollView>
            </View>
            <View style={styles.hearderView}>
                <Text style = {styles.titleStyle}>My communities</Text>
                <TouchableOpacity style={styles.createCommunityOpacity} onPress={ navigateToCreateCommunity }>
                    <Text style={styles.createCommunityText}>Create</Text>
                </TouchableOpacity>
            </View>
            
            <View style = {styles.myCommunitiesStyle} >
                <FlatList
                style = {styles.myCommunitiesFlatList}
                data = {myCommunities}
                horizontal = {true}
                showsHorizontalScrollIndicator = {false}
                keyExtractor = {(item)=> item.id}
                renderItem = {({item})=> (
                    <TouchableOpacity 
                    style = {styles.myCommunitiesViews}
                    onPress={()=>{navigateToCommunityPage(item.id)}}>
                        <Text>{item.name}</Text>
                        <Image 
                        source = {{ uri: makeBase64Image(item.profilPhoto) }}  // typeof item.imageUrl==='string' ? {uri : item.imageUrl} : item.imageUrl
                        style = {styles.topImagesStyle}
                        /> 
                    </TouchableOpacity>
                )}
                />
            </View>
            <View style={styles.hearderView}>
                <Text style = {styles.titleStyle}>Nearest communities</Text>
                <TouchableOpacity style={styles.seeAllCommunityOpacity}>
                    <Text style={styles.seeAllCommunityText}>See all</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.nearestCommunitiesStyle}>
                <FlatList
                    data={nearestCommunities}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={styles.nearestCommunitiesViewsStyle}
                        onPress={() => navigateToSeeCommunityPage(item.id)}>
                            <Text>{item.name}</Text>
                        <Image source={{ uri: makeBase64Image(item.profilPhoto)}} style={styles.bottomImagesStyle} />
                    </TouchableOpacity>
                    )}
                />
            </View>
            <TouchableOpacity style = {styles.nextEventView}>
                <Image 
                style = {styles.nextEventImageStyle}
                source={ typeof nextEvent.imageUrl==='string' ? {uri : nextEvent.imageUrl} : nextEvent.imageUrl }
                />
                <View style={styles.nextEventDetailsView}>
                    <Text style={styles.nextEventNameStyle}>{nextEvent.eventName}</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
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
        display : 'flex',
        backgroundColor : '#D2E9FE',
        height : 50,
        borderRadius : 20,
        paddingLeft : 40
    },
    textInputFeather : {
        position : "absolute",
        top : "27%",
        left : "2%"
    },
    textStyle : {
        fontSize : 20
    },
    titleStyle : {
        fontSize : 20,
        fontWeight : 'bold',
        marginVertical : 5
    }, 
    scrollView : {
        marginTop: 15,
        marginBottom : 12
    },
    scrollViewActiveText : {
        fontSize : 15,
        fontWeight : 'bold',
        fontStyle : 'italic',
        color : '#EC6A6D',
        marginRight: 20
    },
    scrollViewText : {
        fontSize : 15,
        fontWeight : 'bold',
        fontStyle : 'italic',
        color : '#D0CCCC',
        marginRight: 20
    },
    myCommunitiesStyle : {
        display : "flex",
        flexDirection : "row",
        height : 300,
        backgroundColor : "#fff",
        borderRadius : 10,
    },
    myCommunitiesFlatList : {
        flex : 1,
        
    },
    myCommunitiesViews : {
        height : '100%',
        width : 200,
        backgroundColor : '#EC6A6D',
        marginRight : 10,
        borderRadius : 10        
    },
    topImagesStyle : {
        height : '100%',
        width : '100%',
        resizeMode : 'cover',
        borderRadius : 10
    },
    nearestCommunitiesStyle : {
        backgroundColor : "#fff",
        flex: 1,
        borderRadius : 10
    },
    hearderView : {
        display :'flex',
        flexDirection : 'row',
        alignItems : 'center',      
    },
    createCommunityOpacity : {
        marginLeft: 'auto',
        display : 'flex',
        flexDirection: 'column',
        justifyContent : 'center',
        alignItems : 'center'
    },
    createCommunityText : {
        fontSize : 17,
        fontWeight : 'bold',
        color : "#ec6a6d",
        fontStyle : 'italic'
    },
    seeAllCommunityOpacity : {
        marginLeft: 'auto',
        display : 'flex',
        flexDirection: 'column',
        justifyContent : 'center',
        alignItems : 'center'
    },
    seeAllCommunityText : {
        fontSize : 17,
        fontWeight : 'bold',
        color : "#ec6a6d",
        fontStyle : 'italic'
    },
    nearestCommunitiesViewsStyle : {
        width : 200,
        height : 120,
        marginRight : 10,
        marginBottom : 10,
        borderRadius : 10
    },
    bottomImagesStyle : {
        width : '100%',
        height : '100%',
        borderRadius : 10
    },
    nextEventView : {
        width : '100%',
        height : 110, 
        position : 'relative',
        borderRadius : 10
    },
    nextEventImageStyle : {
        objectFit: 'cover',
        width : '100%',
        height : '100%',
        borderRadius : 10
    },
    nextEventDetailsView : {
        position : 'absolute',
        bottom : "17.5%" ,
        right : "22.5%",
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'center',
        borderWidth : 1,
        borderRadius : 20,
        borderColor : '#fff',
        width : 200,
        height : 50,
        backgroundColor : "transparent"        
    },
    nextEventNameStyle : {
        fontSize : 15,
        fontWeight : 'bold',
        color : '#fff',
    }

});


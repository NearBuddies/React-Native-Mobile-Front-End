import React, {useEffect, useState} from "react";
import { UseNavigation, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView, View, Text, Image ,TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import CustomAppBar from "../Common/CustomAppBar";
import { findCommunity } from "../Common/Services/CommunityService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NewEvent from "../Event/NewEvent";
import EventCard from "../Event/EventCard";
import { findEvent, findEventLocation, getCurrentLatitudeAndLongitude, getEventsOfUser, getNearestEventsToUser, createEvent, joinEvent } from "../Event/Services/EventService"
import { event } from "../Event/Services/EventExample"
export default function UserCommunityPage () {
    // La route
    const route = useRoute()
    // La navigation
    const navigation = useNavigation()
    // L'id de la communauté
    const community_id = route.params
    // Naviguer vers créer événement
    const navigateToCreateEvent = ()=> {
        console.log("Creating new event with community id "+community_id)
        navigation.navigate("NewEvent",community_id)
    }
    // Fonction pour naviguer vers la location de l'évent
    const navigateToViewEventLocation = (event_id) => {
        navigation.navigate('UserViewEventLocation', event_id)
    }
    console.log("Community id is"+community_id)
    // L'id de l'utilisateur
    const user_id = AsyncStorage.getItem("user_id")
    // La communauté
    const [ theCommunity , setTheCommunity ] = useState({})
    
    // Les événements
    const [events , setEvents ] = useState([event])
    console.log("Event length is "+ events.length)

    // Au démarrage de la page
    useEffect( () => {
        const fetchDatas = async () => {
            // Trouver la communauté
            const the_community = await findCommunity(community_id)
            // This work fine, console.log("The community is "+JSON.stringify(the_community,null,2))
            setTheCommunity(theCommunity)
            /********************************************* PUT THE EVENTS RETRIEVING HERE************************************************************/ 
            
            // Get the events by community

            // setEvents(something)
        }
        fetchDatas()
    },[])

    return (
        <SafeAreaView style = { styles.parentView } >
            <CustomAppBar/>
                {
                    events.map(
                        event => {
                            <EventCard
                            event={ event }
                            onRegister={()=>{ joinEvent(event.id) }}
                            onShowMap={()=>{ navigateToViewEventLocation(event.id) }}
                            onCancel={()=>{ quitEvent(event.id) }}
                            />
                        }
                    )
                }
            <TouchableOpacity style = {styles.createEventOpacity} onPress = { () => navigateToCreateEvent() }>
               <Text style = {styles.createEventText}>Create Event</Text> 
            </TouchableOpacity>                                     
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    parentView : {
        width : '90%',
        height : '100%',
        flexDirection : "column",
        justifyContent : "flex-start",
        marginHorizontal : '5%',        
    },
    createEventOpacity : {
        position : 'absolute',
        bottom : 0,
        display : "flex",
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
        borderRadius : 10,
        backgroundColor : '#ec6a6d',
        width : '90%',
        height : '7%',
        marginLeft: '5%',
        marginBottom : '2%'
    },
    createEventText : {
        fontSize: 20,
        fontWeight : 'bold',
        fontStyle : 'italic',
        color : "#fff"
    }
})
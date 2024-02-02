import React, { useEffect, useState } from "react";
import { UseNavigation, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import CustomAppBar from "../Common/CustomAppBar";
import { findCommunity } from "../Common/Services/CommunityService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NewEvent from "../Event/NewEvent";
import EventCard from "../Event/EventCard";
import {
    findEvent,
    findEventLocation,
    getCurrentLatitudeAndLongitude,
    createEvent,
    joinEvent,
    getEventsofCommunity,
    quitEvent
} from "../Event/Services/EventService"
import { event } from "../Event/Services/EventExample"
import { ScrollView } from "react-native-gesture-handler";
import { makeBase64Image } from "../Common/Services/ImagesService";
import EventDetails from "../Event/EventDetails";
export default function UserCommunityPage() {
    // La route
    const route = useRoute()
    // La navigation
    const navigation = useNavigation()
    // L'id de la communauté
    const community_id = route.params
    // Naviguer vers créer événement
    const navigateToCreateEvent = () => {
        console.log("Creating new event with community id " + community_id)
        navigation.navigate("NewEvent", community_id)
    }
    
    const navigateToViewEventDetails = (event_id) => {
        navigation.navigate('EventDetails', {event_id, community_id}) 
    }
    console.log("Community id is" + community_id)
    // L'id de l'utilisateur
    const user_id = AsyncStorage.getItem("user_id")
    // La communauté
    const [theCommunity, setTheCommunity] = useState({})

    // Les événements
    const [events, setEvents] = useState([event])
    console.log("Event length is " + events.length)
    events.map(
        e => {
            console.log(e.id)
            console.log(e.name)
        }
    )
    // Au démarrage de la page
    useEffect(() => {
        const fetchDatas = async () => {
            // Trouver la communauté
            const the_community = await findCommunity(community_id)
            // This work fine, console.log("The community is "+JSON.stringify(the_community,null,2))
            setTheCommunity(theCommunity)
            const the_events = await getEventsofCommunity(community_id);

            setEvents(the_events);
        }
        fetchDatas()
    }, [])

    return (
        <SafeAreaView style={styles.parentView} >
            <CustomAppBar />

            <View style={styles.EventsViewStyle}>
                {
                    events.map(
                        (event) => (
                            <TouchableOpacity
                                style={styles.simpleEventView}
                                onPress={() => navigateToViewEventDetails(event.id, community_id)}
                            >
                                <View style={styles.simpleEventImageView}>
                                    <Image
                                        style={styles.simpleEventImageStyle}
                                        source={{ uri: makeBase64Image(event.poster) }}
                                    />
                                </View>

                                <View style={styles.simpleEventDetailsView}>
                                    <Text style={styles.simpleEventNameStyle}>{event.name}</Text>
                                </View>

                            </TouchableOpacity>
                        )
                    )
                }
            </View>

            <TouchableOpacity style={styles.createEventOpacity} onPress={() => navigateToCreateEvent()}>
                <Text style={styles.createEventText}>Create Event</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    parentView: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        marginHorizontal: '2.5%',
    },
    EventsViewStyle: {
        backgroundColor: "#fff",
        display: "flex",
        flex: 1,
        borderRadius: 10,
    },
    simpleEventView: {
        display: "flex",
        width: "98%",
        marginHorizontal: "1%",
        backgroundColor: "#deff",
        marginVertical: 2,
        borderRadius: 10,
        height: 150

    },
    simpleEventImageView: {
        width: "95%",
        marginHorizontal: "2.5%",
        height: "70%",
        borderRadius: 10,
        marginVertical: 2,
    },
    simpleEventImageStyle: {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    simpleEventDetailsView: {
        display: 'flex',
        height: "10%",
        flexDirection: 'column',
        marginLeft: 8,
        borderRadius: 20,
        borderColor: '#fff',
        width: '100%',
        color: '#ec6a6d',
        height: '1',
        backgroundColor: "transparent"
    },
    simpleEventNameStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
    },
    createEventOpacity: {
        position: 'absolute',
        bottom: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: '#ec6a6d',
        width: '90%',
        height: '7%',
        marginLeft: '5%',
        marginBottom: '2%'
    },
    createEventText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: "#fff"
    }
});

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import EventCard from './EventCard'; 
import  { findEvent, joinEvent,quitEvent } from './Services/EventService'

const EventDetails = () => {
    const navigation = useNavigation()
    const route = useRoute()
    // Take id of event
    const {event_id,community_id} = route.params
    console.log("Route params are "+ event_id)
    // The event
    const [ eventToSeeMore, setEventToSeeMore ] = useState(null)
    // Function to use join event and navigate
    const joinEventAndNavigate = async () => {
        navigation.navigate('UserCommunityPage', community_id)
    }
    // Fonction pour naviguer vers la location de l'évent
    const navigateToViewEventLocation = (event_id) => {
        navigation.navigate('UserViewEventLocation', event_id)
    }

    useEffect(() => {
        // Fetch datas
        const fetchDatas = async () =>{
            const theEvent = await findEvent(event_id)
            console.log("Event id is "+ event_id)
            setEventToSeeMore(theEvent)
        }
        fetchDatas()
    },[])



return (
    <View style={styles.container}>
        {
            eventToSeeMore != null && (
                <EventCard 
                event={eventToSeeMore} 
                onRegister={ async ()=> {
                    const result = await joinEvent(eventToSeeMore.id)
                    result === 'ALREADY_IN' && (
                        Alert.alert("Vous êtes deja dans l'event")  
                    )
                    result === 'JUST_JOINED' && (
                        Alert.alert("Vous avez rejoint avec succès")
                    )
                    navigation.navigate('UserCommunityPage', community_id)
                } }

                

                onCancel={ async ()=> {
                    const result = await quitEvent(eventToSeeMore.id)
                    result === 'ALREADY_QUITTED' && (
                        Alert.alert("Vous êtes hors de l'event")
                    )
                    result === 'JUST_QUITTED' && (
                        Alert.alert("Vous avez quitté avec succès")
                    )
                    navigation.navigate('UserCommunityPage', community_id)
                } }
                onShowMap={ ()=> navigateToViewEventLocation(eventToSeeMore.id ) }
                />
            )
        }

        
    </View>
);
};

const styles = StyleSheet.create({
    container: {
        display : "flex",
        flex: 1,
        justifyContent : "center",
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
    },
});

export default EventDetails;
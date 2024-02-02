import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
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
    const [ eventToSeeMore, setEventToSeeMore ] = useState({})
    // Function to use join event and navigate
    const joinEventAndNavigate = async (event_id) => {
        await joinEvent(event_id)
        navigation.navigate('UserCommunityPage', community_id)
        
    }
    // Function to quit event and navigate
    const quitEventAndNavigate = async(event_id) => {
        await quitEvent(event_id);
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
            setEventToSeeMore(theEvent)
        }
        fetchDatas()
    },[])



return (
    <View style={styles.container}>
        <EventCard 
        event={eventToSeeMore} 
        onRegister={ ()=> joinEvent(eventToSeeMore.id) }
        onCancel={ ()=> quitEventAndNavigate(eventToSeeMore.id) }
        onShowMap={ ()=> navigateToViewEventLocation(eventToSeeMore.id ) }
        />
    </View>
);
};

const styles = StyleSheet.create({
    container: {
        display : "flex",
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
});

export default EventDetails;
import React, {useEffect, useState} from "react";
import { UseNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView, View, Text, Image ,TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import CustomAppBar from "../Common/CustomAppBar";
import { findCommunity } from "../Common/Services/CommunityService";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function UserCommunityPage () {
    // La route
    const route = useRoute()
    // L'id de la communauté
    const community_id = route.params
    console.log("Community id is"+community_id)
    // L'id de l'utilisateur
    const user_id = AsyncStorage.getItem("user_id")
    // La communauté
    const [ theCommunity , setTheCommunity ] = useState({})
    
    
    // Les événements
    const [events , setEvents ] = useState([])

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
            <FlatList
            data = {events}
            keyExtractor = {(item) => {item.id}}
            renderItem = {({item}) => (
                /************************CODE THE EVENT CARD HERE, YOU DON'T NEED USER PROFIL PHOTO**************************/
                <Text>YOU CAN DELETE THIS</Text>
            )}
            />                                     
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
    

})
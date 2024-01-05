import React, {useEffect, useState} from "react";
import { UseNavigation } from '@react-navigation/native';
import { SafeAreaView, View, Text, Image ,TouchableOpacity, StyleSheet } from 'react-native';
import CustomAppBar from "../Common/CustomAppBar";
import { FlatList } from "react-native-web";
export default function UserCommunityPage () {
    // L'id de la communauté

    // L'id de l'utilisateur

    // La communauté
    const [ theCommunity , setTheCommunity ] = useState({})
    // La fonction pour trouver la communauté
    const getTheCommunity = (communityId) => {
        
    }
    // Les événements
    const [events , getEvents ] = useState([
        {}, {}, {}
    ])
    // Au démarrage de la page
    useEffect( () => {
        // Trouver la communauté

        /*
        getTheCommunity().then(()=>{
            // Mettre à jour la communauté


        }).catch( error => { console.log(error) });
        */

        // Trouver le rang de l'utilisateur dans la communauté
         //...

    },[])

    return (
        <SafeAreaView style = { styles.parentView } >
            <CustomAppBar/>
            <FlatList
            data = {events}
            keyExtractor = {(item) => {item.id}}
            renderItem = {({item}) => (
                <Text>Data</Text>
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
import React, {useEffect, useState} from "react";
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, Text, Image ,TouchableOpacity, Pressable } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAppBar from "../Common/CustomAppBar";
import UserCommunityPage from "./UserCommunityPage";
import { findCommunity, joinCommunity } from "../Common/Services/CommunityService";
import { makeBase64Image } from "../Common/Services/ImagesService";

export default function UserSeeCommunityPage() {
    // On met une petite navigation
    const navigation = useNavigation()
    const route = useRoute()
    // Take id of community
    const community_id = route.params
    console.log("Route params are "+ community_id)
    // The community
    const [ communityToSeeMore, setCommunityToSeeMore ] = useState({})

    // Fonction pour naviguer vers la carte de la communauté
    const navigateToViewCommunityLocation = (community_id) => {
        navigation.navigate('UserViewCommunityLocation', community_id)
    }

    // Fonction pour gérer join community
    const navigateToJoinedCommunityLocation = async (community_id) => {
        const response = await joinCommunity(community_id)
        if(response==='JUST_JOINED'){
            navigation.navigate('UserNavigation')
        }
        else {
            navigation.navigate('UserCommunityPage', community_id)
        }
    }

    // At the page opening
    useEffect(()=>{
        const fetchDatas = async () => {
            const the_community = await findCommunity(community_id)
            setCommunityToSeeMore(the_community)
        }
        fetchDatas()
    },[])

    // Render the page
    return (
        <SafeAreaView>
            <CustomAppBar/>
            <View style = {styles.parentView}>
                <View style = {styles.imageView}>
                    <Image 
                    style = {styles.imageStyle}
                    source= { {uri: makeBase64Image(communityToSeeMore.profilPhoto)} }
                    />
                </View>

                <View style={styles.middleView}>

                    <TouchableOpacity style = {styles.nameGradeOpacity}>
                        <Text style={styles.communityNameStyle}>{communityToSeeMore.name}</Text>
                        <View style = {styles.gradesView}>
                            <View style = {styles.starView}>
                                <Image 
                                source = {require('../../assets/icons/star.jpg')}
                                style = {styles.starStyle}
                                />
                            </View>
                            <Text style = {styles.numberOfReviewStyle}>5 - 97 Reviews</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{navigateToViewCommunityLocation(community_id)}}>    
                            <Text style={styles.ViewOnMapText}>View on map</Text>
                    </TouchableOpacity>

                </View>

                <View style = {styles.descriptionView}>
                    <Text style = {styles.communityDescriptionStyle}>
                        {communityToSeeMore.description}
                    </Text>
                </View>
                <TouchableOpacity
                style = {styles.joinCommunityStyle}
                onPress={ ()=> navigateToJoinedCommunityLocation(communityToSeeMore.id)}
                >
                    <Text style = {styles.joinCommunityTextStyle}>Join community</Text>
                </TouchableOpacity>
                
            </View>
        </SafeAreaView>
    )
}

const styles = {
    parentView : {
        display : 'flex',
        flexDirection : 'column',
        width : '100%',
        height : '100%',
        backgroundColor : '#fff'
    },
    imageView : {
        height : '30%',
        width : '95%',
        marginTop : '3%',
        alignSelf: 'center',
        borderRadius : 10
    },
    imageStyle : {
        width : '100%',
        height : '100%',
        borderRadius : 10,
    },
    nameGradeOpacity : {
        display : 'flex',
        flexDirection : 'column',
        marginTop : '2%',
        marginLeft : '2.5%'
    },
    ViewOnMapText : {
        color: '#ec6a6d',
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'italic', 
        marginLeft: '42%'
    },
    communityNameStyle : {
        fontSize : 20,
        fontWeight : 'bold',
        color : '#000'
    },
    gradesView : {
        display : 'flex',
        flexDirection : 'row',
        width : '100%',
        height : 'auto'
    },
    starView : {
        width : 30,
        height : 30,
        marginRight : '2%'
    },
    starStyle : {
        width : '100%',
        height : '100%',
        resizeMode : 'cover'
    },
    numberOfReviewStyle : {
        marginTop : '0.7%'
    },
    descriptionView : {
        width : '95%',
        height : 'auto',
        alignSelf : 'center',
        backgroundColor : '#daecff',
        marginTop :'3%',
        paddingHorizontal:  5,
        borderRadius : 10
    },
    communityDescriptionStyle : {
        textAlign : 'justify',
        letterSpacing : 0,
        lineHeight : 24,
        color : '#fff',
        fontWeight : 'bold'
    },
    joinCommunityStyle : {
        display : 'flex',
        flexDirection : 'column',
        alignItems: 'center',
        justifyContent : 'center',
        backgroundColor: '#ec6a6d',
        width : '95%',
        height : '5%',
        alignSelf : 'center',
        marginVertical : '12%',
        borderRadius : 10,
        marginTop : '50%',
        marginBottom : '2%'
    },
    joinCommunityTextStyle : {
        fontSize : 15,
        fontWeight : 'bold',
        color : '#fff'
    },
    middleView : {
        display : "flex",
        flexDirection : "row",
        alignItems : "center"
    }
}
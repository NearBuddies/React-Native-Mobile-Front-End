import React, {useState} from "react";
import { UseNavigation, useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, Text, Image ,TouchableOpacity, Pressable } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAppBar from "../Common/CustomAppBar";
import UserCommunityPage from "./UserCommunityPage";

export default function UserSeeCommunityPage() {
    // On met une petite navigation
    const navigation = useNavigation();
    // On met la communauté donc on va visualiser les détails
    const [communityToSeeMore, setCommunityToSeeMore] = useState({
        id : 4,
        imageUrl : require('../../assets/images/animesphere.jpeg'),
        latitude : 33.007114,
        longitude : -7.11240,
        communityName : 'AnimeSphere',
        communityGrade : 5,
        communityNumberOfReviews : 270,
        communityDescription : 
`🌟 AnimeSphere – Your anime community! 
🎉👋  Join us to discuss favorite anime, discover gems, and connect with fellow fans.
🤩🎮 Engage in quizzes, polls, and challenges. Make friends, share fan art, and celebrate the anime universe! 
🌈🚀 Join AnimeSphere – where every member is part of our anime family! 🌟
#AnimeSphere #AnimeLove`            
    })

    // Fonction pour joindre la communauté
    const joinCommunity = (communityId) => {
        // Prendre mon identifiant
        const userId = AsyncStorage.getItem('userId');
        // Envoyer la requête après faite au backend
            // ...
        // Then , si c'est fait
            // Naviguer vers la communauté, nouveau membre
            navigation.navigate('UserCommunityPage');
    }

    // Fonction pour naviguer vers la carte de la communauté
    const navigateToViewCommunityLocation = () => {
        navigation.navigate('UserViewCommunityLocation', { communityToSeeMore });
    }

    return (
        <SafeAreaView>
            <CustomAppBar/>
            <View style = {styles.parentView}>
                <View style = {styles.imageView}>
                    <Image 
                    style = {styles.imageStyle}
                    source= {communityToSeeMore.imageUrl}
                    />
                </View>

                <TouchableOpacity style = {styles.nameGradeOpacity}>
                    <Text style={styles.communityNameStyle}>{communityToSeeMore.communityName}</Text>
                    <View style = {styles.gradesView}>
                        <View style = {styles.starView}>
                            <Image 
                            source = {require('../../assets/icons/star.jpg')}
                            style = {styles.starStyle}
                            />
                        </View>
                        <Text style = {styles.numberOfReviewStyle}>{communityToSeeMore.communityGrade} - {communityToSeeMore.communityNumberOfReviews} Reviews</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{navigateToViewCommunityLocation()}}>    
                        <Text style={styles.ViewOnMapText}>View on map</Text>
                    </TouchableOpacity>



                <View style = {styles.descriptionView}>
                    <Text style = {styles.communityDescriptionStyle}>
                        {communityToSeeMore.communityDescription}
                    </Text>
                </View>
                <TouchableOpacity
                style = {styles.joinCommunityStyle}
                onPress={ ()=> joinCommunity(communityToSeeMore.id)}
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
        fontStyle: 'italic'
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
        marginTop : '15%',
        marginBottom : '2%'
    },
    joinCommunityTextStyle : {
        fontSize : 15,
        fontWeight : 'bold',
        color : '#fff'
    }
}
import React, {useState} from "react";
import { UseNavigation, useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, Text, Image ,TouchableOpacity, Pressable } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAppBar from "../Common/CustomAppBar";
import UserCommunityPage from "./UserCommunityPage";

export default function UserSeeCommunityPage() {
    // On met une navigation
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
        communityDescription : `🌟 AnimeSphere – Your anime community! 🎉

        👋 Join us to discuss favorite anime, discover gems, and connect with fellow fans. 🤩
        
        🎮 Engage in quizzes, polls, and challenges. Make friends, share fan art, and celebrate the anime universe! 🌈
        
        🚀 Join AnimeSphere – where every member is part of our anime family! 🌟 #AnimeSphere AnimeLove`            
    })
    // Fonction pour joindre la communauté
    const joinCommunity = (communityId) => {
        // Prendre mon identifiant
        const userId = AsyncStorage.getItem('userId');
        // Envoyer la requête après faite au backend
            // ...
        // Then , si c'est fait
            // Naviguer vers la communauté
            navigation.navigate('UserCommunityPage');
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
                    <TouchableOpacity>
                        <Text>{communityToSeeMore.communityName}</Text>
                        <View style = {styles.gradesView}>
                            <Image 
                            source = {require('../../assets/icons/star.jpg')}
                            style = {styles.starStyle}
                            />
                            <Text>{communityToSeeMore.communityNumberOfReviews} Reviews</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style = {styles.communityDescriptionStyle}>
                        {communityToSeeMore.communityDescription}
                    </Text>
                    <TouchableOpacity style = {styles.joinCommuntyStyle}>
                        <Text style = {styles.joinCommuntyTextStyle}>Join community</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = {

}